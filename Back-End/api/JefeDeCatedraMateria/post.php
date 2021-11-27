<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class PostJefedeCatedraMateria extends genericMethod
{
    private $Id;
    private $IdJefeDeCatedra;
    private $IdSubject;
    private $state;

    public function __construct($Id, $IdJefeDeCatedra, $IdSubject, $state)
    {
        $this->Id = $Id;
        $this->IdJefeDeCatedra = $IdJefeDeCatedra;
        $this->IdSubject = $IdSubject;
        $this->state = $state;
    }

    public function Post()
    {
        $cnn = Connection();
        $this->ValidateParameter('IdJefeDeCatedra', $this->IdJefeDeCatedra, INTEGER);
        $this->ValidateParameter('IdSubject', $this->IdSubject, INTEGER);

        $result = mysqli_query($cnn, "insert into jefedecatedra_materia (IdJefeDeCatedra, IdSubject, State) 
                values($this->IdJefeDeCatedra, $this->IdSubject, 1)");
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "El jefe de cátedra  fue guardado con éxito");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "El jefe de cátedra no fue guardado con éxito");
        }
    }
}

$_POST= json_decode(file_get_contents('php://input'), true);

$jefecatedra = new PostJefedeCatedraMateria($_POST["Id"],$_POST['IdJefeDeCatedra'],$_POST["IdSubject"],$_POST["state"]);

$jefecatedra->Post();

