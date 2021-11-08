<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

$cnn = Connection();

$id = ($_GET['confirmuser'] !== null && (int)$_GET['confirmuser'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['confirmuser']) : false;

if(!$id)
{
    return http_response_code(400);
}

$response = new Result();
$result = mysqli_query($cnn,"update users set isActivate = true where id =".$id);

if($result){
    $response->result = 'Ok';
    $response->message="El usuario fue confirmado con exito";
}
else{
    $response->result = 'Error';
    $response->message="No se pudo realizar la confirmación";
}
echo json_encode($response);