<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

$cnn = Connection();

$response = new UserResult();

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['id']) : false;

if(!$id)
{
    return http_response_code(400);
}

$result = mysqli_query($cnn,"update users set state = 2 where id =".$id);

if($result){
    $response->result = 'Ok';
    $response->message="El usuario fue eliminado con exito";
}
else{
    $response->result = 'Error';
    $response->message="El usuario no fue eliminado con exito";
}
echo json_encode($response);