<?php
include_once("../../Config/cors.php");
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();
$positions = mysqli_query($cnn, "select * from positions where state = 1 ORDER BY id DESC");
$positionsList = [];

while ($reg = mysqli_fetch_array($positions, MYSQLI_ASSOC)) {
    $positionsList[] = $reg;
}

$finalList = json_encode($positionsList);
echo $finalList;