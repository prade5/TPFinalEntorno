<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');


class UpdateEvaluation extends genericMethod
{
    private $idUser;
    private $idCompetition;

    public function __construct($idUser, $idCompetition)
    {
        #region initial
        $this->idUser = $idUser;
        $this->idCompetition = $idCompetition;
        #endregion
    }

    public function YouWin(){
        try{
            $cnn = Connection();
            $vSql = "update applicants set state = 3 where idUser=$this->idUser and idCompetition=$this->idCompetition";

            $result =  mysqli_query($cnn, $vSql);

            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El ganador del concurso fue declarado.");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El ganador no fue declarado.");
            }
        }
        catch(\Exception $e){
            $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$evaluation = new UpdateEvaluation($_PUT["idUser"],$_PUT['idCompetition']);

$evaluation->YouWin();