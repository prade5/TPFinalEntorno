<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class ResultRole {
    public $result;
    public $message;
}

$cnn = Connection();

$response = new ResultRole();

$id = json_decode(file_get_contents('php://input'), true);

$id = ((int)$id);

if($id == null)
{
    return http_response_code(400);
}

$result = mysqli_query($cnn,"update Roles set state = 2 where id =".$id);

if($result){
    $response->result = 'Ok';
    $response->message="El permiso fue eliminado con exito";
}
else{
    $response->result = 'Error';
    $response->message="El permiso no fue eliminado con exito";
}

echo json_encode($response);