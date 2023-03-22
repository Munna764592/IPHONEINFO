<?php
$username = "root";
$password = "root";
$server = "localhost";
$db = "iphone-info-users";

$con = mysqli_connect($server, $username, $password, $db);

$db = mysqli_select_db($con, $db);

if ($con) {
    // echo "Connection Successful";
} else {

    die("no connection" . mysqli_connect_error());
}