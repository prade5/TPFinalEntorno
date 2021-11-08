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

$cnn = Connection();
$user = mysqli_query($cnn,"select u.* from users u inner join applicants a on u.id = a.idUser where u.state = 1 and a.idCompetition =".$id." and a.state = 3");
$userSingle = "";

while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
    $userSingle = $reg;
}
$single = json_encode($userSingle);
echo $single;