<?php
include_once("../../Config/cors.php");
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$id = $_GET['id'];

if($id == null)
{
    return http_response_code(400);
}

$data = file_get_contents("../../Data/photo.json");
$products = json_decode($data, true);
$sum = 0;
echo("[");
foreach ($products as $value)
{
    $sum = $sum + 1;
    $image = file_get_contents($value["url"]);
    $imgbinary = 'data:image/jpg;base64,'.base64_encode($image);
    $miArray = array("name"=>$value["name"], "url"=>$imgbinary );
    echo json_encode($miArray);
    if ($sum < count($products)) {
        echo(",");
    }

}
echo("]");
