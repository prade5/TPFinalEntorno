<?php
    include_once("../../Config/db.php");
    include_once('../../middleware/genericMethod.php');
    include_once('../../Config/constant.php');
    include_once('../../Helpers/Security/Securitypass.php');

$_PUT = json_decode(file_get_contents('php://input'), true);
$competition = new CompetitionUpdate($_PUT["id"],$_PUT['idUser'],$_PUT["idSubject"],$_PUT["description"],$_PUT["creationDate"],$_PUT["finalDate"],$_PUT["state"],$_PUT["idPosition"]);

$competition->Put($_PUT["id"]);

class CompetitionUpdate extends genericMethod
{
    private $id;
    private $idUser;
    private $idSubject;
    private $description;
    private $creationDate;
    private $finalDate;
    private $state;
    private $idPosition;

    public function __construct($id, $idUser, $idSubject, $description, $creationDate, $finalDate, $state, $idPosition)
    {
        #region initial
        $this->id = $id;
        $this->idUser = $idUser;
        $this->idSubject = $idSubject;
        $this->description = $description;
        $this->creationDate = $creationDate;
        $this->finalDate = $finalDate;
        $this->state = $state;
        $this->idPosition = $idPosition;
        #endregion
    }

    public function Put($id){
        try{
            $cnn = Connection();
            $this->ValidateParameter('idSubject', $this->idSubject, INTEGER);

            $vSql = " update competitions set idSubject = $this->idSubject,
                                        description='$this->description', creationDate='$this->creationDate', finalDate='$this->finalDate',
                                            idUser= $this->idUser,  idPosition= $this->idPosition
                                        where id = $id ";

            $result =  mysqli_query($cnn, $vSql);

            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El concurso fue modificado con exito.");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El concurso no fue modificado con exito.");
            }
        }
        catch(\Exception $e){
            $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
        }
    }
}