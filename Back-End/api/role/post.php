<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$_POST= json_decode(file_get_contents('php://input'), true);
$role = new PostRole($_POST["id"],$_POST['name'],$_POST["description"],$_POST["creationDate"],$_POST["state"]);
$role->Post();

class PostRole extends genericMethod
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

    public function Post()
    {
        $cnn = Connection();
        $this->ValidateParameter('name', $this->name, STRING);
        $this->checkNonerepeat('roles', 'name', $this->name);

        $result = mysqli_query($cnn, "insert into Roles (name,description,state) values('$this->name' , '$this->description',1)");
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "El permiso fue guardado con exito");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "El permiso no fue guardado con exito");
        }
    }
}
