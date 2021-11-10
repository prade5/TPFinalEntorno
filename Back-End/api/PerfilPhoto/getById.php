<?php
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

$data = file_get_contents("../../Data/perfil.json");

$products = json_decode($data, true);

$sum = 0;

$photo = array_filter( $products, function( $e ) use(&$id) {
    if($e['id'] == $id){
        $miArrayunq = array("id"=>$e["id"],"url"=>$e["url"]);
        return $e;
    }
});

$check = count($photo);
if($check == 0){
    return null;
}

foreach ($photo as $value)
{
    $image = file_get_contents($value["url"]);
    $img = 'data:image/jpg;base64,'.base64_encode($image);
    $miArray = array("id"=>$value["id"],"url"=>$img);
    echo json_encode($miArray);
}