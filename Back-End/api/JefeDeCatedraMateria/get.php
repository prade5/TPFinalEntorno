<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

$idUser = $_GET['idUser'];

$cnn = Connection();

$select ="";
if($idUser == 0){
    $select = "jcm.state = 1 ";
}
else{
    $select = "jcm.state = 1 and jcm.IdJefeDeCatedra = $idUser";
}

$perfil = mysqli_query($cnn,"select jcm.id, jcm.IdJefeDeCatedra, jcm.IdSubject , sub.name, sub.img, 
            rol.name as position from jefedecatedra_materia jcm inner join subjects sub on jcm.IdSubject = sub.id 
            inner join  users urs on jcm.IdJefeDeCatedra = urs.id inner join roles rol on rol.id = urs.idRole 
            where $select ORDER BY jcm.id DESC");

$perfilList = [];

while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
    $perfilList[] = $reg;
}

$finalList = json_encode($perfilList);
echo $finalList;