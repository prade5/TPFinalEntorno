<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class ResultDocument {
    public $result;
    public $message;
}

$cnn = Connection();

$response = new ResultDocument();

$id = json_decode(file_get_contents('php://input'), true);

$id = ((int)$id);

if($id == null)
{
    return http_response_code(400);
}

$result = mysqli_query($cnn,"update documenttype set state = 2 where id =".$id);

if($result){
    $response->result = 'Ok';
    $response->message="El documento fue eliminado con éxito";
}
else{
    $response->result = 'Error';
    $response->message="El documento no fue eliminado con éxito";
}

echo json_encode($response);