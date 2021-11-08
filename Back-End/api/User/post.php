<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');

$_POST= json_decode(file_get_contents('php://input'), true);
$user = new PostUser($_POST["id"],$_POST['idRole'],$_POST["firstName"],$_POST["lastName"],$_POST["mail"],$_POST["address"],$_POST["phone"],$_POST["userName"],$_POST["userPass"],$_POST["idDocumentType"],$_POST["docNumber"],"","",$_POST["state"]);
$user->Post();

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
        $this->idRole = $idRole;
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

            $result = mysqli_query($cnn, "insert into users (idRole, idDocumentType, firstName, lastName, docNumber, mail, address, phone, userName, userPass,state,isActivate) 
                values('$this->idRole','$this->idDocumentType' , '$this->firstName' , '$this->lastName','$this->docNumber' , '$this->mail' , '$this->address', '$this->phone' , '$this->userName', '$pass',1, false)");
            if ($result) {
                $id = $cnn->insert_id;
                $message = Send::MessageRegister($this->firstName . "-" . $this->lastName, $this->userName, $this->userPass, $id);
                Send::SendMailGoogle($message, $this->mail, MAILREGISTER);
                $this->ReturnReponse(SUCCESS_RESPONSE, "El usuario fue guardado con exito y recibira un correo de confirmacion su cuenta via mail.");
            } else {
                $this->ReturnReponse(ERROR_RESPONSE, "El usuario no fue guardado con exito.");
            }
        } catch (\Exception $e) {
            $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
        }
    }
}
