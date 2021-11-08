<?php
    include_once("../../Config/db.php");
    include_once('../../middleware/genericMethod.php');
    include_once('../../Config/constant.php');
    include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$_PUT = json_decode(file_get_contents('php://input'), true);

$idComp = ($_PUT['idComp'] !== null && (int)$_PUT['idComp'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['idComp']) : false;

if(!$idComp)
{
    return http_response_code(400);
}

$idUser = ($_PUT['idUser'] !== null && (int)$_PUT['idUser'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['idUser']) : false;

if(!$idUser)
{
    return http_response_code(400);
}

try{
    $cnn = Connection();

    $vSql = "update competitions set winner = 1
                        where id ='$idComp' AND  idUser = '$idUser' ";

    $result =  mysqli_query($cnn, $vSql) or die (mysqli_error($cnn));

    if($result){
        $this->ReturnReponse(SUCCESS_RESPONSE, "El ganador del concurso fue declarado con exito.");
    }
    else{
        $this->ReturnReponse(ERROR_RESPONSE, "El ganador del concurso no fue declarado con exito.");
    }
}
catch(Exception $e){
    $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
}