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
$position = mysqli_query($cnn, "select * from positions where state = 1 and id =" . $id);
$positionSingle = "";

while ($reg = mysqli_fetch_array($position, MYSQLI_ASSOC)) {
    $positionSingle = $reg;
}
$single = json_encode($positionSingle);
echo $single;