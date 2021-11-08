<?php
    include_once("../../Config/db.php");
    include_once('../../middleware/genericMethod.php');
    include_once('../../Config/constant.php');
    include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['id']) : false;

if(!$id)
{
    return http_response_code(400);
}

$user = mysqli_query($cnn,"select comp.id, comp.idSubject, comp.description, comp.creationDate, comp.finalDate,
                                       comp.state, comp.idUser, comp.idPosition, comp.winner, sub.id as idsub, sub.description as subdescription, sub.name as subname, 
                                       pos.description as posdescription, pos.name as posname, usr.id as jcmid, usr.firstName, usr.lastName from competitions comp
                                       inner join subjects sub on comp.idSubject = sub.id inner join positions pos on comp.idPosition = pos.id
                                       inner join users usr on comp.idUser = usr.id  where comp.state = 1 and comp.id =".$id);

$userSingle = "";

while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
    $userSingle = $reg;
}
$single = json_encode($userSingle);
echo $single;
