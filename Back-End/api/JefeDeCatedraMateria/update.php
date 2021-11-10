<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

class UpdateJefedeCatedraMateria extends genericMethod
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

    public function Put($_id){
        $cnn = Connection();
        $this->ValidateParameter('IdJefeDeCatedra', $this->IdJefeDeCatedra, INTEGER);
        $this->ValidateParameter('IdSubject', $this->IdSubject, INTEGER);

        $result = mysqli_query($cnn,"update jefedecatedra_materia set IdJefeDeCatedra ='$this->IdJefeDeCatedra',
                                                IdSubject='$this->IdSubject' where Id =".$_id);
        if($result){
            $this->ReturnReponse(SUCCESS_RESPONSE, "El jefe de catedra fue modificado con exito");
        }
        else{
            $this->ReturnReponse(ERROR_RESPONSE, "El jefe de catedra no fue modificado con exito");
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$jefecatedra = new UpdateJefedeCatedraMateria($_PUT["Id"],$_PUT['IdJefeDeCatedra'],$_PUT["IdSubject"],$_PUT["state"]);

$jefecatedra->Put($_GET['id']);
