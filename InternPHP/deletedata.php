<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
$sno = $_POST['sno'];

$query  = "DELETE FROM iphonedata WHERE sno='$sno'";
$res = mysqli_query($con,$query);

if($res){
    echo "1";
}else{
    echo "0";
}