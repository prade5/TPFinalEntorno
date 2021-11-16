<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

$cnn = Connection();

$id = $_GET['id'];

if($id == null)
{
    return http_response_code(400);
}

$perfil = mysqli_query($cnn,"select * from jefedecatedra_materia jcm inner join subjects sub on jcm.idSubject = sub.id
                                         inner join users usr on jcm.IdJefeDeCatedra = usr.id where jcm.state = 1 and jcm.Id =".$id);
$userList = "";

while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
    $userList = $reg;
}
$finalList = json_encode($userList);
echo $finalList;