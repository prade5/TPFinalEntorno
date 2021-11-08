<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

$cnn = Connection();
$users = mysqli_query($cnn,"select usr.id, usr.firstName, usr.lastName, usr.mail from users usr inner join roles rol on usr.idRole = rol.id where usr.state = 1 and rol.id = 73 ORDER BY usr.id DESC");
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
    $userList[] = $reg;
}

$finalList = json_encode($userList);
echo $finalList;