const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const bodyParser = require('body-parser');
const { setTimeout } = require('timers/promises');

const app = express();
app.use(bodyParser.json());

// Database sederhana untuk menyimpan webhook (dalam produksi gunakan database yang sesuai)
const webhooks = new Map();

// Generate secret key untuk signature verification
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Enkripsi data menggunakan AES-256-CBC
const encryptData = (data, secretKey) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
};

// Generate signature untuk verifikasi
const generateSignature = (data, secretKey) => {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(JSON.stringify(data));
  return hmac.digest('hex');
};

// Endpoint untuk mendaftarkan webhook
app.post('/api/webhooks/register', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL webhook diperlukan' });
  }
  
  try {
    new URL(url); // Validasi URL
  } catch (error) {
    return res.status(400).json({ error: 'URL tidak valid' });
  }
  
  const webhookId = crypto.randomBytes(16).toString('hex');
  const secretKey = generateSecretKey();
  
  webhooks.set(webhookId, {
    id: webhookId,
    url,
    secretKey,
    createdAt: new Date()
  });
  
  res.status(201).json({
    id: webhookId,
    secretKey,
    message: 'Webhook berhasil didaftarkan'
  });
});

// Fungsi untuk mengirim notifikasi dengan retry mechanism
const sendWebhookNotification = async (webhookId, eventData, attempt = 1) => {
  const webhook = webhooks.get(webhookId);
  if (!webhook) {
    console.error(`Webhook dengan ID ${webhookId} tidak ditemukan`);
    return;
  }
  
  const { url, secretKey } = webhook;
  
  try {
    // Enkripsi data
    const encryptedPayload = encryptData(eventData, secretKey);
    
    // Generate signature
    const signature = generateSignature(encryptedPayload, secretKey);
    
    // Kirim notifikasi
    const response = await axios.post(url, encryptedPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-ID': webhookId
      }
    });
    
    console.log(`Notifikasi berhasil dikirim ke ${url}, status: ${response.status}`);
    return true;
  } catch (error) {
    console.error(`Gagal mengirim notifikasi ke ${url}, percobaan ${attempt}:`);
    
    // Retry mechanism dengan exponential backoff
    if (attempt < 3) {
      const delay = Math.pow(2, attempt) * 5 * 60 * 500; // 5, 10, 15 menit
      console.log(`Menjadwalkan retry dalam ${delay/60000} menit...`);
      
      await setTimeout(delay);
      return sendWebhookNotification(webhookId, eventData, attempt + 1);
    }
    
    console.error(`Gagal mengirim notifikasi setelah 3 percobaan ke ${url}`);
    return false;
  }
};

// Endpoint untuk menerima perubahan status pemesanan (dipanggil oleh sistem internal)
app.post('/api/events', async (req, res) => {
  const { bookingId, status, timestamp } = req.body;
  
  if (!bookingId || !status || !timestamp) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }
  
  // Validasi status
  const validStatuses = ['dibayar', 'dibatalkan', 'dikonfirmasi', 'pending'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status tidak valid' });
  }
  
  // Kirim notifikasi ke semua webhook yang terdaftar
  const eventData = {
    bookingId,
    status,
    timestamp,
    event: 'status_change'
  };
  
  const promises = [];
  for (const webhookId of webhooks.keys()) {
    promises.push(sendWebhookNotification(webhookId, eventData));
  }
  
  await Promise.allSettled(promises);
  
  res.status(202).json({ message: 'Notifikasi sedang diproses' });
});

// Endpoint untuk menghapus webhook
app.delete('/api/webhooks/:id', (req, res) => {
  const { id } = req.params;
  
  if (!webhooks.has(id)) {
    return res.status(404).json({ error: 'Webhook tidak ditemukan' });
  }
  
  webhooks.delete(id);
  res.status(200).json({ message: 'Webhook berhasil dihapus' });
});

// Endpoint untuk melihat semua webhook yang terdaftar
app.get('/api/webhooks', (req, res) => {
  const webhookList = Array.from(webhooks.values()).map(webhook => ({
    id: webhook.id,
    url: webhook.url,
    createdAt: webhook.createdAt
  }));
  
  res.status(200).json(webhookList);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook API berjalan di port ${PORT}`);
});