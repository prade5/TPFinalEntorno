<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

$cnn = Connection();

$idSubject = $_GET['jcmadmin'];

if($idSubject == null)
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