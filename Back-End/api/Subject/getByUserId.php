<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$id = $_GET['idu'];

if($id == null)
{
    return http_response_code(400);
}

$query = "select s.* from subjects s inner join jefedecatedra_materia jm on s.id = jm.IdSubject where s.state = 1 and jm.state = 1 and jm.IdJefeDeCatedra =".$id;

$users = mysqli_query($cnn,$query);
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
    $userList[] = $reg;
}

$finalList = json_encode($userList);
echo $finalList;