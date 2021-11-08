<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$_PUT = json_decode(file_get_contents('php://input'), true);
$profil = new UpdateKnowledgeUser($_PUT["id"],$_PUT['idUser'],$_PUT["name"],$_PUT["description"],$_PUT["nivel"],$_PUT["state"]);
$profil->Put($_GET['id']);

class UpdateKnowledgeUser extends genericMethod
{
    private $id;
    private $idUser;
    private $name;
    private $description;
    private $nivel;
    private $state;

    public function __construct($id, $idUser, $name, $description, $nivel, $state)
    {
        $this->id = $id;
        $this->idUser = $idUser;
        $this->name = $name;
        $this->description = $description;
        $this->nivel = $nivel;
        $this->state = $state;
    }

    public function Put($_id)
    {
        $cnn = Connection();
        $this->ValidateParameter('title', $this->name, STRING);

        $result = mysqli_query($cnn, "update knowlageusers set name ='$this->name',
                                                description='$this->description', nivel=$this->nivel
                                                where id =" . $_id . " and idUser=" . $this->idUser);
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "El conocimiento fue modificado con exito");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "El conocimiento no fue modificado con exito");
        }
    }
}