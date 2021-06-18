<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    
    class Result{}
    class KowlageUser extends genericMethod{
        private $id;
        private $idUser;
        private $name;
        private $description;
        private $nivel;
        private $state;

        public function __construct ($id, $idUser, $name, $description, $nivel, $state){
            $this->id = $id;
            $this->idUser = $idUser;
            $this->name = $name;            
            $this->description = $description; 
            $this->nivel = $nivel;
            $this->state = $state;
        }
        
        //method     
        public static function Get($idUser){
            $cnn = Connection();
            $perfil = mysqli_query($cnn,"select * from knowlageusers where state = 1 and idUser =".$idUser ." ORDER BY id DESC");
            $perfilList = [];

            while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
                $perfilList[] = $reg;
            }

            $finalList = json_encode($perfilList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $perfil = mysqli_query($cnn,"select * from knowlageusers where state = 1 and idUser =".$_id);
            $userList = "";

            while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
                $userList = $reg;
            }
            $finalList = json_encode($userList);
            echo $finalList;
        }
        public function Post(){
            $cnn = Connection();
            $this->ValidateParameter('title', $this->name, STRING);
           
            $result = mysqli_query($cnn,"insert into knowlageusers (name, description, state, idUser, nivel) 
            values('$this->name', '$this->description', 1, $this->idUser, $this->nivel)");
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El conocimiento fue guardado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El conocimiento no fue guardado con exito");
            }    
        }
        public function Put($_id){
            $cnn = Connection();
            $this->ValidateParameter('title', $this->title, STRING);

            $result = mysqli_query($cnn,"update knowlageusers set name ='$this->name',
                                                description='$this->description', nivel=$this->nivel
                                                where id =".$_id ." and idUser=".$this->idUser);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El conocimiento fue modificado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El conocimiento no fue modificado con exito");
            }
        }
        public static function Delete($_id){ 
            $cnn = Connection(); 
            $response = new Result();        
            $result = mysqli_query($cnn,"update knowlageusers set state = 2 where id =".$idrole);
           
            if($result){
                $response->result = 'Ok';
                $response->message="El conocimiento fue eliminado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="El conocimiento no fue eliminado con exito";
            }  
            
            echo json_encode($response);          
        }      
    }
?>