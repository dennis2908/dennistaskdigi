<?php
// Konfigurasi
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('SECRET_KEY', 'my-dsds-sdsds'); // Ganti dengan secret key Anda
define('DEFAULT_COMPRESSION', 60);

// Buat direktori upload jika belum ada
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0777, true);
}

// Fungsi untuk verifikasi HMAC
function verifyHMAC($payload, $receivedHash) {
    $computedHash = hash_hmac('sha512', $payload, SECRET_KEY);
    return hash_equals($computedHash, $receivedHash);
}

// Fungsi untuk mengunduh gambar dari URL
function downloadImage($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $data = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Gagal mengunduh gambar. HTTP Code: $httpCode");
    }
    
    return $data;
}

// Fungsi untuk mengonversi gambar ke WEBP
function convertToWebp($imageData, $compression) {
    // Coba dengan GD
    $image = imagecreatefromstring($imageData);
    if ($image) {
        $filename = UPLOAD_DIR . uniqid() . '.webp';
        imagewebp($image, $filename, $compression);
        imagedestroy($image);
        return $filename;
    }
    
    // Jika GD gagal, coba dengan Imagick jika tersedia
    if (extension_loaded('imagick')) {
        try {
            $image = new Imagick();
            $image->readImageBlob($imageData);
            $image->setImageFormat('WEBP');
            $image->setImageCompressionQuality($compression);
            $filename = UPLOAD_DIR . uniqid() . '.webp';
            $image->writeImage($filename);
            $image->clear();
            return $filename;
        } catch (ImagickException $e) {
            throw new Exception("Konversi gagal: " . $e->getMessage());
        }
    }
    
    throw new Exception("Format gambar tidak didukung atau konversi gagal");
}

// Handle request
try {
    // Ambil header
    $headers = getallheaders();
    $authHeader = isset($headers['X-Auth']) ? $headers['X-Auth'] : '';
    
    // Ambil body
    $jsonPayload = file_get_contents('php://input');
    $data = json_decode($jsonPayload);
    
    // Verifikasi HMAC
    if (empty($authHeader) || !verifyHMAC($jsonPayload, $authHeader)) {
        throw new Exception("Autentikasi gagal");
    }
    
    // Validasi input
    if (empty($data->url_gambar)) {
        throw new Exception("URL gambar tidak boleh kosong");
    }
    
    $compression = isset($data->persentase_kompresi) ? 
                   (int)$data->persentase_kompresi : 
                   DEFAULT_COMPRESSION;
    
    if ($compression < 1 || $compression > 100) {
        throw new Exception("Persentase kompresi harus antara 1-100");
    }
    
    // Proses gambar
    $imageData = downloadImage($data->url_gambar);
    $webpPath = convertToWebp($imageData, $compression);
    
    // Siapkan response
    $response = [
        'url_webp' => str_replace(__DIR__, '', $webpPath),
        'ukuran_webp' => filesize($webpPath),
        'status' => true,
        'message' => 'Konversi berhasil'
    ];
    
    http_response_code(200);
    echo json_encode($response);
    
} catch (Exception $e) {
    // Handle error
    $response = [
        'url_webp' => null,
        'ukuran_webp' => 0,
        'status' => false,
        'message' => $e->getMessage()
    ];
    
    http_response_code(400);
    echo json_encode($response);
}
?>