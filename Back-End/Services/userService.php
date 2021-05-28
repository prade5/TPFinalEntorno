<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    include_once('../Helpers/Security/Securitypass.php');
    
    class User extends genericMethod{
        private $id;
        private $idRole;
        private $firstName;
        private $lastName;
        private $mail;
        private $address;
        private $phone;
        private $userName;
        private $userPass;
        private $creationDate;
        private $finalDate;
        private $state;

        public function __construct ($id, $idRole,$firstName, $lastName, $mail, $address, $phone, $userName, $userPass, $creationDate, $finalDate, $state){
            #region initial
            $this->id = $id;
            $this->idRole = $idRole;
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->mail = $mail;
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
                $this->ValidateParameter('nombre usuario', $this->userName, STRING);
                $this->ValidateParameter('contraseña', $this->userPass, STRING);
                
                $this->Validate_Email($this->mail);
                $this->checkNonerepeat('users', 'mail', $this->mail, "Ya existio un usuario con ese mail : '$this->mail'");
                $this->checkNonerepeat('users', 'userName', $this->userName, "Ya existio un usuario con ese nombre : '$this->userName'");
                
                // $this->checkmailNonerepeat($this->mail);
                $this->ValidatePassWord($this->userPass);
    
                $pass = Security::Encrypt($this->userPass); 
    
                $result = mysqli_query($cnn,"insert into users (idRole,firstName, lastName, mail, address, phone, userName, userPass,state) 
                values('$this->idRole' , '$this->firstName' , '$this->lastName' , '$this->mail' , '$this->address', '$this->phone' , '$this->userName', '$pass',1)");
                if($result){
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
           
            $result = mysqli_query($cnn,"update users set firstName ='$this->firstName',
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
    }
?>