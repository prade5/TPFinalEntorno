<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$idSubject = ($_GET['jcmadmin'] !== null && (int)$_GET['jcmadmin'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['jcmadmin']) : false;

if(!$idSubject)
{
    return http_response_code(400);
}

$cnn = Connection();

$perfil = mysqli_query($cnn,"select jcm.id, jcm.IdJefeDeCatedra, jcm.IdSubject , sub.name, sub.img, 
            urs.firstName, urs.lastName, urs.id as idUser from jefedecatedra_materia jcm inner join subjects sub on jcm.IdSubject = sub.id 
            inner join  users urs on jcm.IdJefeDeCatedra = urs.id
            where jcm.state = 1 and jcm.idSubject = $idSubject ORDER BY jcm.id DESC");

$perfilList = [];

while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
    $perfilList[] = $reg;
}

$finalList = json_encode($perfilList);
echo $finalList;