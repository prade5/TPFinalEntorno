<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class PostKnowledgeUser extends genericMethod
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

    public function Post()
    {
        $cnn = Connection();
        $this->ValidateParameter('title', $this->name, STRING);

        $result = mysqli_query($cnn, "insert into knowlageusers (name, description, state, idUser, nivel) 
            values('$this->name', '$this->description', 1, $this->idUser, $this->nivel)");
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "El conocimiento fue guardado con exito");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "El conocimiento no fue guardado con exito");
        }
    }
}

$_POST= json_decode(file_get_contents('php://input'), true);

$profil = new PostKnowledgeUser($_POST["id"],$_POST['idUser'],$_POST["name"],$_POST["description"],$_POST["nivel"],$_POST["state"]);

$profil->Post();
