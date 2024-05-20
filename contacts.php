<?php

// smtp mail server
define('MAILHOST', "smtp.gmail.com");

// username
define('USERNAME', "");

// app-password
define('PASSWORD', "");

// address from which the email is sent
define('SEND_FROM', "");

// reply-to address
define('ADDRESS_TO', "");

// name from which the email is sent
define('SEND_FROM_NAME', "POS-Co website");

// reciver name
define('ADDRESS_TO_NAME', "POS-Co");


$fields = array('name' => 'Name', 'phone' => 'Phone', 'email' => 'Email', 'message' => 'Message'); 

$okMessage = 'Contact form successfully submitted. Thank you, we will get back to you soon!';

$errorMessage = 'There was an error while submitting the form. Please try again later';

/* name spaces */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

/* require path to PHPMailer classes */
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


try{

    $mail = new PHPMailer(true); // Passing `true` enables exceptions
    
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = MAILHOST;
    $mail->Username = USERNAME;
    $mail->Password = PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    
    // Sender and recipient settings
    $mail->setFrom(SEND_FROM, SEND_FROM_NAME);
    $mail->addAddress(ADDRESS_TO, ADDRESS_TO_NAME);
    $mail->addReplyTo($_POST["email"]);

    $emailTextHtml = "<h2>You have a new message from your contact form</h2></br>";
    $emailTextHtml .= "<table>";
    
    foreach ($_POST as $key => $value) {
        if (isset($fields[$key])) {
            $emailTextHtml .= "<tr><th style='text-align:start; vertical-align:baseline;'>$fields[$key]: </th><td style='text-align:start'>$value</td></tr>";
        }
    }
    $emailTextHtml .= "</table>";

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "POS-Co contact form";
    $mail->Body = $emailTextHtml;
    $mail->AltBody = $emailTextHtml;


    if(!$mail->send()) {        
        throw new \Exception('Something went wrong. Please, try again.' . $mail->ErrorInfo);
    } else {        
        $responseArray = array('type' => 'success', 'message' => $okMessage);
    }
}catch (\Exception $e)
{        
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
else {
    echo $responseArray['message'];
}

?>