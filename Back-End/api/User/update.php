<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');
include_once('../middleware/mail.php');


class UpdateUser extends genericMethod
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

    public function Put($id)
    {
        $cnn = Connection();
        $this->ValidateParameter('role', $this->idRole, INTEGER);
        $this->ValidateParameter('nombre', $this->firstName, STRING);
        $this->ValidateParameter('apellido', $this->lastName, STRING);
        $this->ValidateParameter('mail', $this->mail, STRING);

        $this->ValidateParameter('address', $this->address, STRING);
        $this->ValidateParameter('teléfono', $this->phone, STRING);

        $this->ValidateParameter('Documento', $this->idDocumentType, INTEGER);
        $this->ValidateParameter('Nro Documento', $this->docNumber, STRING);

        $result = mysqli_query($cnn, "update users set firstName ='$this->firstName',
                                    idDocumentType='$this->idDocumentType', docNumber='$this->docNumber', 
                                    lastName='$this->lastName', mail='$this->mail', 
                                    address='$this->address', phone='$this->phone'
                                    where id =" . $id);
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "El usuario fue modificado con éxito.");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "El usuario no fue modificado con éxito.");
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$user = new UpdateUser($_PUT["id"],$_PUT['idRole'],$_PUT["firstName"],$_PUT["lastName"],$_PUT["mail"],$_PUT["address"],$_PUT["phone"],"","",$_PUT["idDocumentType"],$_PUT["docNumber"],"","",0);

$user->Put($_GET['id']);

