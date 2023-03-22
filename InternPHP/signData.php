<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
// $con = new mysqli('localhost', 'root', 'root', 'iphone-info-users');
$names = $_POST['name'];
$email = $_POST['email'];
$id = $_POST['id'];
$otp_str = str_shuffle("0123456789");
$otp = substr($otp_str, 0, 5);

$query = "SELECT * FROM `registrations` WHERE email='$email'";
$email_find = mysqli_query($con, $query);
if ($email_find) {
    $email_count = mysqli_num_rows($email_find);

    if ($email_count > 0) {
        echo "3";
    } else {
        $sql = "INSERT INTO registrations(names,email,person_id,otp) VALUES ('$names','$email','$id','$otp')";
        $res = mysqli_query($con, $sql);
        if ($res) {
            echo "1";
        } else {
            echo "0";
        }
    }
} else {
    die(mysqli_connect_error());
}
