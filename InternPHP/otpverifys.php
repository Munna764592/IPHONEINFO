<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
$otp = $_POST['otp'];
$email = $_POST['email'];

$query = "SELECT * FROM `registrations` WHERE email='$email'";
$res = mysqli_query($con, $query);
if ($res) {
    $fetch = mysqli_fetch_assoc($res);
    $otpver = $fetch['otp'];

    if ($otpver === $otp) {
        echo "1";
    } else {
        echo "0";
    }
} else {
    echo "0";
}
