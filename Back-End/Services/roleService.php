<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    
    class Result{}
    class Role extends genericMethod{
        private $id;
        private $name;
        private $description;
        private $creationDate;
        private $state;

        public function __construct ($id,$name,$description,$creationDate,$state){
            $this->id = $id;
            $this->name = $name;
            $this->description = $description;
            
            $this->creationDate = $creationDate;
            $this->state = $state;
        }
        
        //method     
        public static function Get(){
            $cnn = Connection();
            $userRegisteries = mysqli_query($cnn,"select * from roles where state = 1 ORDER BY id DESC");
            $userList = [];

            while($reg = mysqli_fetch_array($userRegisteries,MYSQLI_ASSOC)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $userRegisteries = mysqli_query($cnn,"select * from roles where state = 1 and id =".$_id);
            $userList = "";

            while($reg = mysqli_fetch_array($userRegisteries,MYSQLI_ASSOC)){
                $userList = $reg;
            }
            $finalList = json_encode($userList);
            echo $finalList;
        }
        public function Post(){
            $cnn = Connection();
            $this->ValidateParameter('name', $this->name, STRING);
            $this->checkNonerepeat('roles', 'name', $this->name);
           
            $result = mysqli_query($cnn,"insert into Roles (name,description,state) values('$this->name' , '$this->description',1)");
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El permiso fue guardado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El permiso no fue guardado con exito");
            }    
        }
        public function Put($idrole){
            $cnn = Connection();
            $this->ValidateParameter('nombre', $this->name, STRING);

            $result = mysqli_query($cnn,"update Roles set name ='$this->name',
                                                description='$this->description'
                                                where id =".$idrole);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El permiso fue modificado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El permiso no fue modificado con exito");
            }
        }
        public static function Delete($idrole){ 
            $cnn = Connection(); 
            $response = new Result();        
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
    }
?>