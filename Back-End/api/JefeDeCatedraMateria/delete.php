<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class ResultJefeCatedra {
    public $result;
    public $message;
}

$cnn = Connection();

$response = new ResultJefeCatedra();

$id = json_decode(file_get_contents('php://input'), true);

$id = ((int)$id);

if($id == null)
{
    return http_response_code(400);
}

$result = mysqli_query($cnn,"update jefedecatedra_materia set state = 2 where Id =".$id);

if($result){
    $response->result = 'Ok';
    $response->message="El jefe de cátedra fue eliminado con éxito";
}
else{
    $response->result = 'Error';
    $response->message="El jefe de cátedra no fue eliminado con éxito";
}

echo json_encode($response);