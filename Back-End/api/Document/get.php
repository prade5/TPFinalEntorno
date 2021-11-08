<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();
$userRegisters = mysqli_query($cnn,"select * from documenttype where state = 1 ORDER BY id DESC");
$userList = [];

while($reg = mysqli_fetch_array($userRegisters,MYSQLI_ASSOC)){
    $userList[] = $reg;
}

$finalList = json_encode($userList);
echo $finalList;