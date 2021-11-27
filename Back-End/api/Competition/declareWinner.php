<?php
    include_once("../Config/cors.php");
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    include_once('../Helpers/Securitypass.php');

$cnn = Connection();

$_PUT = json_decode(file_get_contents('php://input'), true);

$idComp = $_PUT['idComp'];

if($idComp == null)
{
    return http_response_code(400);
}

$idUser = $_PUT['idUser'];

if($idUser == null)
{
    return http_response_code(400);
}

try{
    $cnn = Connection();

    $vSql = "update competitions set winner = 1
                        where id ='$idComp' AND  idUser = '$idUser' ";

    $result =  mysqli_query($cnn, $vSql) or die (mysqli_error($cnn));

    if($result){
        $this->ReturnReponse(SUCCESS_RESPONSE, "Se declaró el ganador del concurso con éxito.");
    }
    else{
        $this->ReturnReponse(ERROR_RESPONSE, "El ganador del concurso no fue declarado con éxito.");
    }
}
catch(Exception $e){
    $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
}