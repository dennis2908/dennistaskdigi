<?php

session_start();

define('secKey', 'dejdanajklnejenajknekjrneakrnrekerj');  

function createOtp() {
    $otp = '';
    for ($i = 0; $i < 5; $i++) {
        $otp .= mt_rand(0, 9); // Generates a random digit
    }
    return $otp;
}

function verifyOtp($userInputOtp) {
    if (!isset($_SESSION['otp']) || !isset($_SESSION['otp_exp'])) {
        return "OTP not found or expired.";
    }

    if (time() > $_SESSION['otp_exp']) {
        unset($_SESSION['otp']);
        unset($_SESSION['otp_exp']);
        return "OTP expired.";
    }

    if ($userInputOtp === $_SESSION['otp']) {
        unset($_SESSION['otp']);
        unset($_SESSION['otp_exp']);
        return "OTP is verified";
    } else {
        return "OTP is wrong";
    }
}

function createToken($name) {
   
    $payload = ['name' => $name, 'iat' => time()];
    $payload_json = json_encode($payload);
    $base64_payload = base64_encode($payload_json);
    $signature = hash_hmac('sha256', $base64_payload, secKey);
    $token = $base64_payload . '.' . $signature;
    return $token;
}

function decodeToken($token) {

    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        return false;
    }

    list($base64_payload, $signature) = $parts;
    $expected_signature = hash_hmac('sha256', $base64_payload, secKey);

    if (!hash_equals($expected_signature, $signature)) {
        return false; 
    }

    $payload_json = base64_decode($base64_payload);
    $payload = json_decode($payload_json, true);

    return $payload;
}

$head = getallheaders();

if(!empty($_POST['otp_input']) && !empty($_POST['my_name']))
{
    

if(!empty($head['Authorization']))
{
    if ($head['Authorization']) {
    $payload = decodeToken($head['Authorization']);
    if ($payload) {
        if($_POST['my_name']==$payload['name']){
             $userInputOtp = $_POST['otp_input']; // Example
             $verificationResult = verifyOtp($userInputOtp);
             echo $verificationResult;
        }
        else 
            echo "token is invalid";
    } else {
        echo "token is invalid";
    }
    } else {
        echo "Authorization is missing";
    }
}
 else {
        echo "Authorization is missing";
    }

}
elseif(!empty($_POST['set_token_name']))
{

$token = createToken($_POST['set_token_name']);
echo "Token: " . $token;
}
else 
{
$createOtp = createOtp();
echo "Created OTP: " . $createOtp;


$_SESSION['otp'] = $createOtp;
$_SESSION['otp_exp'] = time() + (15 * 60);

}

?>