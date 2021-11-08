<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$_POST= json_decode(file_get_contents('php://input'), true);
$doc = new PostDocument($_POST["id"],$_POST['name'],$_POST["description"],"",$_POST["state"]);

$doc->Post();

class PostDocument extends genericMethod
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

    public function Post(){
        $cnn = Connection();
        $this->ValidateParameter('name', $this->name, STRING);
        $this->checkNonerepeat('documenttype', 'name', $this->name);

        $result = mysqli_query($cnn,"insert into documenttype (name,description,state) values('$this->name' , '$this->description',1)");
        if($result){
            $this->ReturnReponse(SUCCESS_RESPONSE, "El documento fue guardado con exito");
        }
        else{
            $this->ReturnReponse(ERROR_RESPONSE, "El documento no fue guardado con exito");
        }
    }

}