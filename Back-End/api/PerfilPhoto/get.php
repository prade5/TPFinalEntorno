<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');


$data = file_get_contents("../Data/perfil.json");
$products = json_decode($data, true);
$sum = 0;
echo("[");
foreach ($products as $value)
{
    $sum = $sum + 1;
    $image = file_get_contents($value["url"]);
    $img = 'data:image/jpg;base64,'.base64_encode($image);
    $miArray = array("id"=>$value["id"],"url"=>$img);
    echo json_encode($miArray);
    if ($sum < count($products)) {
        echo(",");
    }

}
echo("]");