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

$user = mysqli_query($cnn,"SELECT s.name as 'materia', p.name as 'puesto', c.creationDate as 'fechaInicio', c.finalDate as 'fechaFin', c.description 
FROM `competitions` c 
    INNER JOIN `subjects` s on c.idSubject = s.id 
    INNER JOIN `positions` p on c.idPosition = p.id 
WHERE c.id =".$id);

$userSingle = "";

while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
    $userSingle = $reg;
}
$single = json_encode($userSingle);
echo $single;