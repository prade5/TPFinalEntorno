<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$id = $_GET['id'];

if($id == null)
{
    return http_response_code(400);
}

$perfil = mysqli_query($cnn,"select * from knowlageusers where state = 1 and (idUser ='$id'  OR id ='$id')");
$userList = "";

while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
    $userList = $reg;
}
$finalList = json_encode($userList);
echo $finalList;