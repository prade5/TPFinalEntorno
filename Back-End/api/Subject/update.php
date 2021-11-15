<?php
include_once("../../Config/cors.php");
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

class UpdateSubject extends genericMethod
{
    private $id;
    private $idUser;
    private $name;
    private $description;
    private $img;
    private $creationDate;
    private $finalDate;
    private $state;

    public function __construct($id, $idUser, $name, $description, $img, $creationDate, $finalDate, $state)
    {
        #region initial
        $this->id = $id;
        $this->idUser = $idUser;
        $this->name = $name;
        $this->description = $description;
        $this->img = $img;
        $this->creationDate = $creationDate;
        $this->finalDate = $finalDate;
        $this->state = $state;
        #endregion
    }

    public function Put($id)
    {
        $cnn = Connection();
        $this->ValidateParameter('nombre', $this->name, STRING);

        $result = mysqli_query($cnn, "update subjects set name ='$this->name',
                                    description='$this->description', idUser='$this->idUser', img='$this->img'
                                    where id =" . $id);
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "La materia fue modificada con exito.");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "La materia no fue modificada con exito.");
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$subject = new UpdateSubject($_PUT["id"],$_PUT['idUser'],$_PUT["name"],$_PUT["description"],$_PUT["img"],"","",1);

$subject->Put($_GET['id']);
