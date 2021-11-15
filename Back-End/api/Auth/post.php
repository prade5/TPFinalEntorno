<?php
include_once("../../Config/cors.php");
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../middleware/JWT.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

class AuthPost extends genericMethod
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

    //method
    public function Login()
    {
        try {
            $cnn = Connection();

            $passencrypt = Security::Encrypt($this->userPass);

            $users = mysqli_query($cnn, "select u.id as idUser, u.idRole, r.name as role, u.isActivate from users u inner join roles r on u.idRole = r.id where (userName ='$this->userName'  OR mail ='$this->userName') AND userPass='$passencrypt'");
            $userLogin = "";
            while ($reg = mysqli_fetch_array($users, MYSQLI_ASSOC)) {
                $userLogin = $reg;
            }

            if ($userLogin != "") {
                if ($userLogin['isActivate'] == "0") {
                    $this->ReturnReponse(ERROR_RESPONSE, "Falta la confirmación para esa cuenta");
                } else {
                    $paylod = [
                        'iat' => time(),
                        'iss' => 'localhost',
                        'exp' => time() + (24 * 3600),
                        'userId' => $userLogin['idUser'],
                        'idRole' => $userLogin['idRole'],
                        'role' => $userLogin['role'],
                        'isActivate' => $userLogin['isActivate']
                    ];
                    $token = JWT::encode($paylod, SECRET_KEY);
                    $data = ['jwt' => $token, 'role' => $userLogin['role']];
                    $this->ReturnReponse(SUCCESS_RESPONSE, $data);
                }

            } else {
                $this->ReturnReponse(ERROR_RESPONSE, "Usuario y/o contraseña incorrecto." . $this->userPass);
            }
        } catch (\Exception $e) {
            $this->ReturnReponse(ERROR_RESPONSE, $e->getMessage());
        }
    }
}


$_login = json_decode(file_get_contents('php://input'), true);

$auth = new AuthPost(0, $_login['userName'], $_login["userPass"]);

$auth->Login();
