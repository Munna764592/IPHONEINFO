<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
$id = $_POST['person_id'];
$email = $_POST['email'];

$query = "SELECT * FROM `registrations` WHERE email='$email'";
$res = mysqli_query($con, $query);
$email_count = mysqli_num_rows($res);
if ($res && $email_count > 0) {
    $fetch = mysqli_fetch_assoc($res);
    if ($fetch['person_id'] === $id) {
        $otp_str = str_shuffle("0123456789");
        $otpup = substr($otp_str, 0, 5);
        $upotp = "update registrations set otp='$otpup' where email='$email'";
        $qupotp = mysqli_query($con, $upotp);

        if ($qupotp) {
            echo "1";
        }
    }
} else {
    echo "0";
}
