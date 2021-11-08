<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$_POST= json_decode(file_get_contents('php://input'), true);

$competition = new CompetitionPost(0 ,$_POST['idUser'],$_POST["idSubject"],$_POST["description"],$_POST["creationDate"],$_POST["finalDate"],$_POST["state"],$_POST["idPosition"]);

$competition->Post();

class CompetitionPost extends genericMethod
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

    public function Post()
    {
        try {
            $cnn = Connection();
            $this->ValidateParameter('idSubject', $this->idSubject, INTEGER);
            $this->ValidateParameter('idUser', $this->idUser, INTEGER);
            $this->ValidateParameter('idPosition', $this->idPosition, INTEGER);
            $this->ValidateParameter('state', $this->state, INTEGER);
            $this->ValidateParameter('creationDate', $this->creationDate, STRING);
            $this->ValidateParameter('creationDate', $this->finalDate, STRING);

            $vSql = "INSERT INTO competitions (idSubject, description, creationDate, finalDate, state, idUser, idPosition) VALUES ($this->idSubject, '$this->description', '$this->creationDate', '$this->finalDate', 1, $this->idUser, $this->idPosition)";

            $result = mysqli_query($cnn, $vSql);

            if ($result) {
                $this->ReturnReponse(SUCCESS_RESPONSE, "El concurso fue guardado con exito.");
            } else {
                $this->ReturnReponse(ERROR_RESPONSE, "El concurso no fue guardado con exito.");
            }
        } catch (\Exception $e) {
            $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
        }
    }
}
