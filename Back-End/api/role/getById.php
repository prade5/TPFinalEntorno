<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

$cnn = Connection();

$id = $_GET['id'];

if($id == null)
{
    return http_response_code(400);
}

$cnn = Connection();
$userRegisteries = mysqli_query($cnn,"select * from roles where state = 1 and id =".$id);
$userList = "";

while($reg = mysqli_fetch_array($userRegisteries,MYSQLI_ASSOC)){
    $userList = $reg;
}
$finalList = json_encode($userList);
echo $finalList;