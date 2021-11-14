<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

$cnn = Connection();

$id = $_GET['id'];

if($id == null)
{
    return http_response_code(400);
}

$user = mysqli_query($cnn,"select user.id, user.idRole, user.mail, user.address, user.phone, user.userName, user.userPass,
            user.creationDate, user.finalDate, user.state, user.idDocumentType, user.docNumber, user.isActivate, user.firstName, user.lastName, 
            rol.name as position from users user inner join roles rol on user.idRole = rol.id where user.id =".$id);
$usersingle = "";

while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
    $usersingle = $reg;
}
$single = json_encode($usersingle);
echo $single;