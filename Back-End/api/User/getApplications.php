<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');
include_once('../middleware/mail.php');

$cnn = Connection();

$id = $_GET['id'];

if($id == null)
{
    return http_response_code(400);
}

$applications = mysqli_query($cnn,"SELECT a.*, c.finalDate, p.name, s.name as 'materia' FROM `applicants` a 
    INNER JOIN `competitions` c on a.idCompetition = c.id 
    INNER JOIN `positions` p on c.idPosition = p.id 
    INNER JOIN `subjects` s on c.idSubject = s.id WHERE a.idUser =".$id);

$userApplications = [];

while($reg = mysqli_fetch_array($applications,MYSQLI_ASSOC)){
    $userApplications[] = $reg;
}

$finalList = json_encode($userApplications);
echo $finalList;