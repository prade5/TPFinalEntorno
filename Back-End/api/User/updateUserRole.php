<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');
include_once('../../middleware/mail.php');


class UpdateUserRole extends genericMethod
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

    public static function UpdateUserRole($id, $idRole)
    {
        $response = new UserResult();
        try {
            $cnn = Connection();
            $result = mysqli_query($cnn, "update users set idRole =" . $idRole . " where id =" . $id);
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

$user = new UpdateUserRole($_PUT["id"],$_PUT['idRole'],$_PUT["firstName"],$_PUT["lastName"],$_PUT["mail"],$_PUT["address"],$_PUT["phone"],"","",$_PUT["idDocumentType"],$_PUT["docNumber"],"","",0);

$user->UpdateUserRole($_GET['id'],$_PUT['idRole']);

class UserResult {
    public $result;
    public $message;
    public $status;
}
