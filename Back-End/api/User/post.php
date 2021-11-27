<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../PhpMailer/Exception.php';
require '../PhpMailer/PHPMailer.php';
require '../PhpMailer/SMTP.php';

class PostUser extends genericMethod
{
    private $id;
    private $idRole;
    private $idDocumentType;
    private $firstName;
    private $lastName;
    private $mail;
    private $docNumber;
    private $address;
    private $phone;
    private $userName;
    private $userPass;
    private $creationDate;
    private $finalDate;
    private $state;

    public function __construct($id, $idRole, $firstName, $lastName, $mail, $address, $phone, $userName, $userPass, $idDocumentType, $docNumber, $creationDate, $finalDate, $state)
    {
        #region initial
        $this->id = $id;
        $this->idRole = 74;
        $this->idDocumentType = $idDocumentType;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->mail = $mail;
        $this->docNumber = $docNumber;
        $this->address = $address;
        $this->phone = $phone;
        $this->userName = $userName;
        $this->userPass = $userPass;
        $this->creationDate = $creationDate;
        $this->finalDate = $finalDate;
        $this->state = $state;
        #endregion
    }

    public function SendMail($to, $messages)
    {
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->SMTPDebug = 2; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
        $mail->Host = "smtp.gmail.com"; // use $mail->Host = gethostbyname('smtp.gmail.com'); // if your network does not support SMTP over IPv6
        $mail->Port = 587; // TLS only
        $mail->SMTPSecure = 'tls'; // ssl is deprecated
        $mail->SMTPAuth = true;
        $mail->Username = 'tpfinalentorno@gmail.com'; // email
        $mail->Password = '2021tpfinalentorno2012'; // password
        $mail->setFrom('tpfinalentorno@gmail.com', 'tpfinalentorno@gmail.com'); // From email and name
        $mail->addAddress($to, 'Querido Usuario'); // to email and name
        $mail->Subject = 'Confirmar Usuario';
        $mail->msgHTML($messages); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,
        $mail->AltBody = 'HTML messaging not supported'; // If html emails is not supported by the receiver, show this body
        // $mail->addAttachment('http://i.imgur.com/MNrJ1aj.png');  //Attach an image file
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        $mail->send();
    }

    public function Post()
    {
        try {
            $cnn = Connection();

            $this->ValidateParameter('role', $this->idRole, INTEGER);
            $this->ValidateParameter('nombre', $this->firstName, STRING);
            $this->ValidateParameter('apellido', $this->lastName, STRING);
            $this->ValidateParameter('mail', $this->mail, STRING);

            $this->ValidateParameter('address', $this->address, STRING);
            $this->ValidateParameter('teléfono', $this->phone, STRING);

            $this->ValidateParameter('Documento', $this->idDocumentType, INTEGER);
            $this->ValidateParameter('Nro Documento', $this->docNumber, STRING);

            $this->ValidateParameter('nombre usuario', $this->userName, STRING);
            $this->ValidateParameter('contraseña', $this->userPass, STRING);

            $this->Validate_Email($this->mail);
            $this->checkNonerepeat('users', 'mail', $this->mail, "Ya existio un usuario con ese mail : '$this->mail'");
            $this->checkNonerepeat('users', 'userName', $this->userName, "Ya existio un usuario con ese nombre : '$this->userName'");

            // $this->checkmailNonerepeat($this->mail);
            $this->ValidatePassWord($this->userPass);
            $this->ValidateUser($this->userPass);

            $pass = Security::Encrypt($this->userPass);

            ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE);

            $result = mysqli_query($cnn, "insert into users (idRole, idDocumentType, firstName, lastName, docNumber, mail, address, phone, userName, userPass, state, isActivate) 
                values('$this->idRole','$this->idDocumentType' , '$this->firstName' , '$this->lastName','$this->docNumber' , '$this->mail' , '$this->address', '$this->phone' , '$this->userName', '$pass', 1, false)");
            if ($result) {
                $id = $cnn->insert_id;
                $message = $this->MessageRegister("$this->firstName" . "-" . "$this->lastName", "$this->userName", "$this->userPass", "$id");
                $this->SendMail($this->mail, $message);

                if(ob_get_contents()){
                    ob_clean();
                }

                $this->ReturnReponse(SUCCESS_RESPONSE, "El usuario fue guardado con exito y recibira un correo de confirmacion su cuenta via mail.");
            } else {
                $this->ReturnReponse(ERROR_RESPONSE, "El usuario no fue guardado con exito.");
            }
        } catch (\Exception $e) {
            $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
        }
    }

    public static function MessageRegister($full_name, $username, $password, $id){
        $baseLink ="https://tpfinalentornos.000webhostapp.com/Back-End/api/User/confirmRegister.php?confirmuser=".$id;

//        Para la version deployada
//        $baseLink ="https://tpfinalentornos.000webhostapp.com/Back-End/api/User/confirmRegister.php?confirmuser=".$id;

        return '<div>
            <div style="text-align: left; margin-top: 25px;"><img src="'.PHOTOHEADER.'"  alt="cabecera"/></div>
            <div style="text-align: left; margin-left: 25px; margin-top: 10px;"><br/>Bienvenido <strong>'.$full_name.' </strong> al sistema de concurso. <br/><br/> Gracias por registrar al sistema de concurso <strong>UTN Frro&copy;</strong>.<br/>Para continuar, confirme su cuenta haciendo <a href='.$baseLink.'>click aqui</a></div>
            <div style="text-align: left;margin-top: 25px;width: 100%;"><br />Una vez que confirme la cuenta, puede iniciar sesión con sus datos: <br />- Nombre usuario: '.$username.' <br />- Contraseña: '.$password.' <br /><br />Gracias. <br />Equipos <strong>UTN Frro&copy;</strong>.</div>
            </div>';
    }
}

$_POST= json_decode(file_get_contents('php://input'), true);

$user = new PostUser($_POST["id"],$_POST['idRole'],$_POST["firstName"],$_POST["lastName"],$_POST["mail"],$_POST["address"],$_POST["phone"],$_POST["userName"],$_POST["userPass"],$_POST["idDocumentType"],$_POST["docNumber"],"","",$_POST["state"]);

$user->Post();
