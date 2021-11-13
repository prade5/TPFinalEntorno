<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

class UserResult {
    public $result;
    public $message;
    public $status;
}

class UpdateUserRole extends genericMethod
{
    private $id;
    private $idRole;
    private $state;

    public function __construct($id, $idRole, $state)
    {
        #region initial
        $this->id = $id;
        $this->idRole = $idRole;
        $this->state = $state;
        #endregion
    }

    public static function UpdateUserRole($id, $idRole)
    {
        $response = new UserResult();
        try {
            $cnn = Connection();
            $result = mysqli_query($cnn, "update users set idRole =".$idRole." where id =".$id);
            if ($result) {
                $response->status = SUCCESS_RESPONSE;
                $response->message = "El rol del usuario fue cambiado con exito.";
            } else {
                $response->status = SUCCESS_RESPONSE;
                $response->message = "El  rol del usuario no fue cambiado con exito.";
            }
            echo json_encode($response);
        } catch (\Exception $e) {
            $response->status = SUCCESS_RESPONSE;
            $response->message = $e->getMessage();
            echo json_encode($response);
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$user = new UpdateUserRole($_PUT["id"],$_PUT['idRole'],$_PUT["state"]);

$user->UpdateUserRole($_PUT['id'],$_PUT['idRole']);
