<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');


class UpdateRole extends genericMethod
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

    public function Put($id)
    {
        $cnn = Connection();
        $this->ValidateParameter('nombre', $this->name, STRING);

        $result = mysqli_query($cnn, "update Roles set name ='$this->name',
                                                description='$this->description'
                                                where id =" . $id);
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "El permiso fue modificado con exito");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "El permiso no fue modificado con exito");
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$role = new UpdateRole($_PUT["id"],$_PUT['name'],$_PUT["description"],$_PUT["creationDate"],$_PUT["state"]);

$role->Put($_GET['id']);
