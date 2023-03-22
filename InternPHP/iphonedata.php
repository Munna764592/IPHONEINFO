<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
$query = "select * from iphonedata";
$res = mysqli_query($con, $query);
if ($res) {
    // $get = mysqli_fetch_assoc($res);
    $get= mysqli_fetch_all($res, MYSQLI_ASSOC);

    $data = json_encode($get);
    echo $data;
}