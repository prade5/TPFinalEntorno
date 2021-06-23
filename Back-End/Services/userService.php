<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    include_once('../Helpers/Security/Securitypass.php');
    include_once('../middleware/mail.php');
    
    class Result{}
    class User extends genericMethod{
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

        public function __construct ($id, $idRole,$firstName, $lastName, $mail, $address, $phone, $userName, $userPass,$idDocumentType,$docNumber, $creationDate, $finalDate, $state){
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

        //method     
        public static function Get(){             
            $cnn = Connection();
            $users = mysqli_query($cnn,"select * from users where state = 1 ORDER BY id DESC");
            $userList = [];

            while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }

        public static function GetAllJefeCatedra(){             
            $cnn = Connection();
            $users = mysqli_query($cnn,"select usr.id, usr.firstName, usr.lastName, usr.mail from users usr inner join roles rol on usr.idRole = rol.id where usr.state = 1 and rol.id = 73 ORDER BY usr.id DESC");
            $userList = [];

            while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }

        public static function GetById($_id){
            $cnn = Connection();
            $user = mysqli_query($cnn,"select * from users where state = 1 and id =".$_id);
            $usersingle = "";

            while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
                $usersingle = $reg;
            }
            $single = json_encode($usersingle);
            echo $single;
        }
        public function Post(){
            try{
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
    
                $result = mysqli_query($cnn,"insert into users (idRole, idDocumentType, firstName, lastName, docNumber, mail, address, phone, userName, userPass,state,isActivate) 
                values('$this->idRole','$this->idDocumentType' , '$this->firstName' , '$this->lastName','$this->docNumber' , '$this->mail' , '$this->address', '$this->phone' , '$this->userName', '$pass',1, false)");
                if($result){
                    $id = $cnn->insert_id;
                    $message = Send::MessageRegister($this->firstName."-".$this->lastName,$this->userName,$this->userPass, $id);
                    Send::SendMailGoogle($message, $this->mail, MAILREGISTER);
                    $this->ReturnReponse(SUCCESS_RESPONSE, "El usuario fue guardado con exito.");
                }
                else{
                    $this->ReturnReponse(ERROR_RESPONSE, "El usuario no fue guardado con exito.");
                }
            }
            catch(\Exception $e){
                $this->throwError(REQUEST_NOT_VALID, $e->getMessage()); 
            }  
        }

        public function Put($id){
            $cnn = Connection();
            $this->ValidateParameter('role', $this->idRole, INTEGER);
            $this->ValidateParameter('nombre', $this->firstName, STRING);
            $this->ValidateParameter('apellido', $this->lastName, STRING);
            $this->ValidateParameter('mail', $this->mail, STRING);

            $this->ValidateParameter('address', $this->address, STRING);
            $this->ValidateParameter('teléfono', $this->phone, STRING);
                
            $this->ValidateParameter('Documento', $this->idDocumentType, INTEGER);
            $this->ValidateParameter('Nro Documento', $this->docNumber, STRING);
           
            $result = mysqli_query($cnn,"update users set firstName ='$this->firstName',
                                    idDocumentType='$this->idDocumentType', docNumber='$this->docNumber', 
                                    lastName='$this->lastName', mail='$this->mail', 
                                    address='$this->address', phone='$this->phone'
                                    where id =".$id);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El usuario fue modificado con exito.");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El usuario no fue modificado con exito.");
            }    
        }
        public static function Delete($id){ 
            $cnn = Connection();   
            $response = new Result();
            $result = mysqli_query($cnn,"update users set state = 2 where id =".$id);

            if($result){
                $response->result = 'Ok';
                $response->message="El usuario fue eliminado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="El usuario no fue eliminado con exito";
            }
            echo json_encode($response);
        }

        public static function ConfirmRegister($id){ 
            $cnn = Connection();   
            $response = new Result();
            $result = mysqli_query($cnn,"update users set isActivate = true where id =".$id);

            if($result){
                $response->result = 'Ok';
                $response->message="El usuario fue confirmado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="No se pudo realizar la confirmación";
            }
            echo json_encode($response);
        }           
    }
?>