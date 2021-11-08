<?php

include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$idUser = ($_GET['idUser'] !== null && (int)$_GET['idUser'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['idUser']) : false;

if(!$idUser)
{
    return http_response_code(400);
}


$cnn = Connection();
$perfil = mysqli_query($cnn,"select * from knowlageusers where state = 1 and idUser =".$idUser ." ORDER BY id DESC");
$perfilList = [];

while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
    $perfilList[] = $reg;
}

$finalList = json_encode($perfilList);
echo $finalList;