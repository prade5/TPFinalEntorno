<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

$cnn = Connection();
$users = mysqli_query($cnn,"select * from subjects where state = 1 ORDER BY id DESC");
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
    $userList[] = $reg;
}

$finalList = json_encode($userList);
echo $finalList;