<?php
$input = json_decode(file_get_contents("php://input"), true);

// CORS and headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: text/plain");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    exit(0);
}

ini_set('display_errors', 1);
error_reporting(E_ALL);


include 'connect.php';
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;       
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function send_verifyemail($firstName, $email, $verify_token) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();                                          
        $mail->Host       = 'smtp.gmail.com';                 
        $mail->SMTPAuth   = true;                                  
        $mail->Username   = 'samarthguddad50@gmail.com';                  
        $mail->Password   = 'phnk dsyw khul xxcz';                               
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;           
        $mail->Port       = 465;

        $mail->setFrom('samarthguddad50@gmail.com', 'Samarth');
        $mail->addAddress($email);    
    
        $mail->isHTML(true);                                
        $mail->Subject = "Email verification for Kids Learning Portal";
        $email_template = "
            <h2>Welcome to Kids Learning Portal, $firstName!</h2>
            <h5>Please verify your email address by clicking the link below:</h5>
            <a href='http://localhost/kids_learning/verify-email.php?token=$verify_token'>Click here to verify</a>
        ";
        $mail->Body = $email_template;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}


if (isset($input['signUp'])) {
    $firstName = trim($input['fName']);
    $lastName = trim($input['lName']);
    $email = trim($input['email']);
    $password = password_hash($input['password'], PASSWORD_DEFAULT);
    $verify_token = md5(rand());

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Email Address Already Exists!"
        ]);
    } else {
        $stmt->close();

        $stmt = $conn->prepare("INSERT INTO users (firstName, lastName, email, password, verify_token) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstName, $lastName, $email, $password, $verify_token);

        if ($stmt->execute()) {
            if (send_verifyemail($firstName, $email, $verify_token)) {
                echo json_encode([
                    "status" => "success",
                    "message" => "Registration successful! Please check your email to verify your account."
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Registered, but failed to send verification email!"
                ]);
            }
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    }
}


if (isset($input['signIn'])) {
    $email = trim($input['email']);
    $password = $input['password'];

    $stmt = $conn->prepare("SELECT id,firstname,email,password,verify_status FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id,$firstname, $dbEmail, $hashedPassword, $verifyStatus);
        $stmt->fetch();

        if ($verifyStatus == 0) {
            echo json_encode(["status" => "error", "message" => "Please verify your email before logging in!!"]);
        } else {
            if (password_verify($password, $hashedPassword)) {
                $_SESSION['email'] = $dbEmail;
                $_SESSION['firstName'] = $firstname;
                echo json_encode([
                    "status" => "success",
                    "message" => "Successfully Logged In!!!",
                    "firstName" => $firstname,
                    "email" => $dbEmail
                ]);
            } else {
                echo json_encode(["status" => "error", "message" => "Incorrect Email or Password"]);
            }
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect Email or Password"]);
    }

    $stmt->close();
}

$conn->close();
?>
