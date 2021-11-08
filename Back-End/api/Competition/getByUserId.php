<?php
    include_once("../../Config/db.php");
    include_once('../../middleware/genericMethod.php');
    include_once('../../Config/constant.php');
    include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$id = ($_GET['idu'] !== null && (int)$_GET['idu'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['idu']) : false;

if(!$id)
{
    return http_response_code(400);
}

$query = "select c.* from competitions c inner join jefedecatedra_materia jm on c.IdSubject = jm.IdSubject where jm.state = 1 and jm.IdJefeDeCatedra =".$id;

$users = mysqli_query($cnn,$query);
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
    $userList[] = $reg;
}

$finalList = json_encode($userList);
echo $finalList;