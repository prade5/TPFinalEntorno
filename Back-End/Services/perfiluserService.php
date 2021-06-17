<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    
    class Result{}
    class ProfilUser extends genericMethod{
        private $id;
        private $idUser;
        private $title;
        private $instagram;
        private $twitter;	
        private $facebook;	
        private $website;	
        private $gitHub;	
        private $workplace;
        private $state;

        public function __construct ($id,$idUser,$title,$instagram,$twitter,$facebook,$website,$gitHub,$workplace,$state){
            $this->id = $id;
            $this->idUser = $idUser;
            $this->title = $title;            
            $this->instagram = $instagram;  
            $this->twitter = $twitter;  
            $this->facebook = $facebook;   
            $this->website = $website;  
            $this->gitHub = $gitHub; 
            $this->workplace = $workplace;
            $this->state = $state;
        }
        
        //method     
        public static function Get(){
            $cnn = Connection();
            $perfil = mysqli_query($cnn,"select * from profilusers where state = 1 ORDER BY id DESC");
            $perfilList = [];

            while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
                $perfilList[] = $reg;
            }

            $finalList = json_encode($perfilList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $perfil = mysqli_query($cnn,"select * from profilusers where state = 1 and idUser =".$_id);
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
           
            $result = mysqli_query($cnn,"insert into profilusers (idUser,title,instagram, twitter, facebook, website, gitHub, workplace,state) 
            values($this->idUser, '$this->title', '$this->instagram', '$this->twitter', '$this->facebook', '$this->website', '$this->workplace',1)");
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El perfil fue guardado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El perfil no fue guardado con exito");
            }    
        }
        public function Put($_id){
            $cnn = Connection();
            $this->ValidateParameter('title', $this->title, STRING);

            $result = mysqli_query($cnn,"update profilusers set title ='$this->title',
                                                instagram='$this->instagram',twitter='$this->twitter',
                                                facebook='$this->facebook',website='$this->website',
                                                workplace='$this->workplace'
                                                where id =".$_id ." and idUser=".$this->idUser);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El perfil fue modificado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El perfil no fue modificado con exito");
            }
        }
        public static function Delete($_id){ 
            $cnn = Connection(); 
            $response = new Result();        
            $result = mysqli_query($cnn,"update profilusers set state = 2 where id =".$idrole);
           
            if($result){
                $response->result = 'Ok';
                $response->message="El perfil fue eliminado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="El perfil no fue eliminado con exito";
            }  
            
            echo json_encode($response);          
        }      
    }
?>