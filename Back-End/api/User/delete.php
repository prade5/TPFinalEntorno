<?php
include_once("../../Config/cors.php");
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

class deleteUser extends genericMethod
{
    private $id;

    public function __construct($id)
    {
        #region initial
        $this->id = $id;
        #endregion
    }

    public function DeleteUser($id)
    {
        $cnn = Connection();

        $result = mysqli_query($cnn,"update users set state = 2 where id =".$this->id);

        if($result){
            $this->ReturnReponse(SUCCESS_RESPONSE, "El usuario fue borrado con exito.");
        }
        else{
            $this->ReturnReponse(ERROR_RESPONSE, "El usuario no fue borrado con exito.");
        }
    }
}

$id = json_decode(file_get_contents('php://input'), true);

$id = ((int)$id);

$userDelete = new deleteUser($id);

$userDelete->DeleteUser();
