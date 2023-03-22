<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
$email = $_POST['email'];

$query = "SELECT * FROM `registrations` WHERE email='$email'";
$res = mysqli_query($con, $query);
if ($res) {
    $fetch = mysqli_fetch_assoc($res);
    $name =  $fetch['names'];
    $person_id = $fetch['person_id'];

    if ($fetch) {
        echo $name;
    }
} else {
    echo "0";
}
