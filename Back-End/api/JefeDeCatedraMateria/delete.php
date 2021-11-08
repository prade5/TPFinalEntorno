<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

class ResultJefeCatedra {
    public $result;
    public $message;
}

$cnn = Connection();

$response = new ResultJefeCatedra();

$id = json_decode(file_get_contents('php://input'), true);

$id = ((int)$id);

if(!$id)
{
    return http_response_code(400);
}

$result = mysqli_query($cnn,"update jefedecatedra_materia set state = 2 where Id =".$id);

if($result){
    $response->result = 'Ok';
    $response->message="El jefe de catedra fue eliminado con exito";
}
else{
    $response->result = 'Error';
    $response->message="El jefe de catedra no fue eliminado con exito";
}

echo json_encode($response);