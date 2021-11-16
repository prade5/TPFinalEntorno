<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class SubjectResult {
    public $result;
    public $message;
}

$cnn = Connection();

$response = new SubjectResult();

$id = json_decode(file_get_contents('php://input'), true);

$id = ((int)$id);

if($id == null)
{
    return http_response_code(400);
}

$result = mysqli_query($cnn,"update subjects set state = 2 where id =".$id);

if($result){
    $response->result = 'Ok';
    $response->message="La materia fue eliminada con exito";
}
else{
    $response->result = 'Error';
    $response->message="La materia no fue eliminada con exito";
}
echo json_encode($response);