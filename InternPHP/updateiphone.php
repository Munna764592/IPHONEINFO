<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
$sno = $_POST['sno'];
$available = $_POST['available'];
$price = $_POST['price'];
$value = $_POST['value'];
if($available != ""){
$update = "update iphonedata set available='$available' where sno='$sno'";
$qup = mysqli_query($con, $update);

if($qup){
    echo "1";
}else{
    echo "0";
}
}
if($price != ""){
  $update = "update iphonedata set price='$price' where sno='$sno'";
$qup = mysqli_query($con, $update);

if($qup){
    echo "1";
}else{
    echo "0";
}  
}
if($value != ""){
     $update = "update iphonedata set value='$value' where sno='$sno'";
$qup = mysqli_query($con, $update);

if($qup){
    echo "1";
}else{
    echo "0";
}  
}