<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

class UpdateDocument extends genericMethod
{
    private $id;
    private $name;
    private $description;
    private $creationDate;
    private $state;

    public function __construct($id, $name, $description, $creationDate, $state)
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;

        $this->creationDate = $creationDate;
        $this->state = $state;
    }

    public function Put($idrole){
        $cnn = Connection();
        $this->ValidateParameter('nombre', $this->name, STRING);

        $result = mysqli_query($cnn,"update documenttype set name ='$this->name',
                                                description='$this->description'
                                                where id =".$idrole);
        if($result){
            $this->ReturnReponse(SUCCESS_RESPONSE, "El documento fue modificado con exito");
        }
        else{
            $this->ReturnReponse(ERROR_RESPONSE, "El documento no fue modificado con exito");
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$doc = new UpdateDocument($_PUT["id"],$_PUT['name'],$_PUT["description"],"",0);

$doc->Put($_GET['id']);
