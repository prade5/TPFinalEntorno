<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../middleware/JWT.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$_PUT = json_decode(file_get_contents('php://input'), true);

$cnn = Connection();

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['id']) : false;

if(!$id) {
    return http_response_code(400);
}

$auth = new AuthUpdate($id,$_PUT["userName"],$_PUT["userPass"],$_PUT["newUserPass"],$_PUT["confirmPass"]);

$auth->ChangePassword($id);

class AuthUpdate extends genericMethod
{
    private $id;
    private $userName;
    private $userPass;
    private $newUserPass;
    private $confirmPass;

    public function __construct($id, $userName, $userPass, $newUserPass = "", $confirmPass = "")
    {
        #region initial
        $this->id = $id;
        $this->userName = $userName;
        $this->userPass = $userPass;
        $this->newUserPass = $newUserPass;
        $this->confirmPass = $confirmPass;
        #endregion
    }

    public function ChangePassword($id){
        $cnn = Connection();

        if($this->userPass == ""){
            echo json_encode(['response' => ['status' => 301, "message" => "Ingresa la contraseña."]]);
            exit;
        }
        if($this->newUserPass == ""){
            echo json_encode(['response' => ['status' => 301, "message" => "Ingresa la nueva contraseña."]]);
            exit;
        }
        if($this->confirmPass == ""){
            echo json_encode(['response' => ['status' => 301, "message" => "Confirma la nueva contraseña."]]);
            exit;
        }
        if($this->newUserPass != $this->confirmPass){
            echo json_encode(['response' => ['status' => 301, "message" => "La nueva contraseña es diferente de la confirmación"]]);
            exit;
        }
        $this->CheckPassWord($this->newUserPass);

        $result = mysqli_query($cnn,"update users set userPass ='$this->newUserPass'
                                    where id =".$id);
        if($result){
            echo json_encode(['response' => ['status' => SUCCESS_RESPONSE, "message" => "La contraseña fue modificada con exito."]]);
        }
        else{
            echo json_encode(['response' => ['status' => SUCCESS_RESPONSE, "message" => "NO se pudo modificar la contraseña."]]);
        }
        exit;
    }
}