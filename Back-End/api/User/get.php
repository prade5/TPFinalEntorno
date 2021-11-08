<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

$cnn = Connection();
$users = mysqli_query($cnn,"select user.id, user.idRole, user.mail, user.address, user.phone, user.userName, user.userPass,
            user.creationDate, user.finalDate, user.state, user.idDocumentType, user.docNumber, user.isActivate, user.firstName, user.lastName, 
            rol.name as position from users user inner join roles rol on user.idRole = rol.id where user.state = 1 ORDER BY user.id DESC");
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
    $userList[] = $reg;
}

$finalList = json_encode($userList);
echo $finalList;
