<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');
include_once('../middleware/mail.php');

header('method: POST');

class ResultUser {
    public $result;
    public $message;
}

class UpdateUserStatus extends genericMethod
{
    private $id;

    public function __construct($id)
    {
        #region initial
        $this->id = $id;
        #endregion
    }

    public function updateUser()
    {
        $cnn = Connection();

        if($this->id == null)
        {
            return http_response_code(430);
        }

        $response = new ResultUser();

        $result = mysqli_query($cnn,"update users set isActivate = true where id =".$this->id);

        if($result){
            $response->result = 'Ok';
            $response->message="El usuario fue confirmado con éxito. Puede cerrar la pantalla.";
        }
        else{
            $response->result = 'Error';
            $response->message="No se pudo realizar la confirmación";
        }

        echo $response->message;
    }
}

$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$url_components = parse_url($url);

parse_str($url_components['query'], $params);

$id = $params['confirmuser'];

$userRegister = new UpdateUserStatus($id);

$userRegister->updateUser();