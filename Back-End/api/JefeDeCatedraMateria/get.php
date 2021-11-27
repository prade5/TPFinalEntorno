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
    $select = "jm.state = 1 ";
}
else{
    $select = "jm.state = 1 and jm.IdJefeDeCatedra = $idUser";
}

$perfil = mysqli_query($cnn,"SELECT jm.Id, s.name, s.img, CONCAT(u.firstName, ' ', u.lastName) AS nombre, jm.State 
    FROM `jefedecatedra_materia` jm 
    INNER JOIN `subjects` s on jm.IdSubject = s.id 
    INNER JOIN `users` u ON jm.IdJefeDeCatedra = u.id WHERE ".$select);

$perfilList = [];

while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
    $perfilList[] = $reg;
}

$finalList = json_encode($perfilList);
echo $finalList;