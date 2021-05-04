<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    
    class Role{
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
            $userRegisteries = mysqli_query($cnn,"select * from users where state = 1 ORDER BY id DESC");
            $userList = [];

            while($reg = mysqli_fetch_array($userRegisteries)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $userRegisteries = mysqli_query($cnn,"select * from users where state = 1 and id =".$_id);
            $userList = "";

            while($reg = mysqli_fetch_array($userRegisteries)){
                $userList = $reg;
            }
            $finalList = json_encode($userList);
            echo $finalList;
        }
        public function Post(){
            $cnn = Connection();
            
            if($this->idRole === ''){
                $response->result = 'error';
                $response->message="Debe seleccionar un role";      
            }
            else if($this->firstName === ''){
                $response->result = 'error';
                $response->message="Ingrese el nombre";      
            }
            else if($this->lastName === ''){
                $response->result = 'error';
                $response->message="Ingrese el apellido";      
            }
            else if($this->mail === ''){
                $response->result = 'error';
                $response->message="Ingrese el correo electronico";      
            }
            else if($this->address === ''){
                $response->result = 'error';
                $response->message="Ingrese la direccion";      
            }
            else if($this->mail === ''){
                $response->result = 'error';
                $response->message="Ingrese el telefono";      
            }
            else if($this->userName === ''){
                $response->result = 'error';
                $response->message="Ingrese el nombre del usuario";      
            }
            else if($this->userPass === ''){
                $response->result = 'error';
                $response->message="Ingrese la contraseña del usuario";      
            }
            else if($this->checkuserNonerepeat() === false){
                $response->result = 'error';
                $response->message="Ya existio un usuario con ese nombre";      
            }
            else if($this->checkmailNonerepeat() === false){
                $response->result = 'error';
                $response->message="Ya existio un usuario con ese correo electronico";      
            }
            else{
                $result = mysqli_query($cnn,"insert into users (idRole,firstName, lastName, mail, address, phone, userName, userPass,state) 
                values('$this->idRole' , '$this->firstName' , '$this->lastName' , '$this->mail' , '$this->address', '$this->phone' , '$this->userName', '$this->userPass',1)");
                if($result){
                    $response->result = 'Ok';
                    $response->message="El usuario fue guardado con exito";
                }
                else{
                    $response->result = 'Error';
                    $response->message="El usuario no fue guardado con exito";
                }
            }     
            echo json_encode($response);
        }

        public function Put($idrole){
            $cnn = Connection();
            $response = new Result();
            $result = false;
            if($this->name === ''){
                $response->result = 'error';
                $response->message="Ingrese el nombre";      
            }
            else{
                $result = mysqli_query($cnn,"update Roles set name ='$this->name',
                                                    description='$this->description'
                                                    where id =".$idrole);
                if($result){
                    $response->result = 'Ok';
                    $response->message="El permiso fue modificado con exito";
                }
                else{
                    $response->result = 'Error';
                    $response->message="El permiso no fue modificado con exito";
                }
            }     
            echo json_encode($response);
        }
        public static function Delete($idrole){ 
            $cnn = Connection();   
            $response = new Result();
            $result = false;

            $result = mysqli_query($cnn,"update Roles set state = 2 where id =".$idrole);
            if($result){
                $response->result = 'Ok';
                $response->message="El permiso fue eliminado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="El permiso no fue eliminado con exito";
            }
            echo json_encode($response);
        }  
        
        #region Private method
        
        private function checkuserNonerepeat(){
            $checkuserNonerepeat = mysqli_query($cnn,"select * from users where userName =".$this->userName);
            $userList = "";
            while($reg = mysqli_fetch_array($checkuserNonerepeat)){
                $userList = $reg;
            }
            $check = json_encode(count($userList));
            if($check == 0)
                return true;
            retur false;
        }
        private function checkmailNonerepeat(){
            $checkmailNonerepeat = mysqli_query($cnn,"select * from users where emal =".$this->emal);
            $userList = "";
            while($reg = mysqli_fetch_array($checkuserNonerepeat)){
                $userList = $reg;
            }
            $check = json_encode(count($userList));
            if($check == 0)
                return true;
            retur false;
        }
        #endregion
    }
?>