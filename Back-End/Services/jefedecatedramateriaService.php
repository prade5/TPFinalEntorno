<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    
    class Result{}
    class JefedeCatedraMateria extends genericMethod{
        private $Id;
        private $IdJefeDeCatedra;
        private $IdSubject;
        private $state;

        public function __construct ($Id, $IdJefeDeCatedra, $IdSubject, $state){
            $this->id = $id;
            $this->IdJefeDeCatedra = $IdJefeDeCatedra;
            $this->IdSubject = $IdSubject;  
            $this->state = $state;
        }
        
        //method     
        public static function Get($_idUser){
            $cnn = Connection(); 
            
            $select ="";
            if($_idUser == 0){
                $select = "jcm.state = 1 and pos.id = 1";
            }
            else{
                $select = "jcm.state = 1 and pos.id = 1 and jcm.IdJefeDeCatedra = $_idUser";
            }

            $perfil = mysqli_query($cnn,"select jcm.id, jcm.IdJefeDeCatedra, jcm.IdSubject , sub.name, sub.img, 
            pos.name as position from jefedecatedra_materia jcm inner join subjects sub on jcm.IdSubject = sub.id 
            inner join  users urs on jcm.IdJefeDeCatedra = urs.id inner join competitions comp on comp.IdSubject = sub.id
            inner join positions pos on comp.idPosition = pos.id where $select ORDER BY jcm.id DESC");

            $perfilList = [];

            while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
                $perfilList[] = $reg;
            }

            $finalList = json_encode($perfilList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $perfil = mysqli_query($cnn,"select * from jefedecatedra_materia where state = 1 and IdJefeDeCatedra =".$_id);
            $userList = "";

            while($reg = mysqli_fetch_array($perfil,MYSQLI_ASSOC)){
                $userList = $reg;
            }
            $finalList = json_encode($userList);
            echo $finalList;
        }
        public function Post(){
            $cnn = Connection();
            $this->ValidateParameter('IdJefeDeCatedra', $this->IdJefeDeCatedra, INTEGER);
            $this->ValidateParameter('IdSubject', $this->IdSubject, INTEGER);
           
            $result = mysqli_query($cnn,"insert into jefedecatedra_materia (IdJefeDeCatedra, IdSubject, state) 
            values('$this->IdJefeDeCatedra', '$this->IdSubject', 1)");
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El jefe de catedra  fue guardado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El jefe de catedra no fue guardado con exito");
            }    
        }
        public function Put($_id){
            $cnn = Connection();
            $this->ValidateParameter('title', $this->name, STRING);

            $result = mysqli_query($cnn,"update jefedecatedra_materia set IdJefeDeCatedra ='$this->IdJefeDeCatedra',
                                                IdSubject='$this->IdSubject' where id =".$_id);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "El jefe de catedra fue modificado con exito");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El jefe de catedra no fue modificado con exito");
            }
        }
        public static function Delete($_id){ 
            $cnn = Connection(); 
            $response = new Result();        
            $result = mysqli_query($cnn,"update jefedecatedra_materia set state = 2 where id =".$_id);
           
            if($result){
                $response->result = 'Ok';
                $response->message="El jefe de catedra fue eliminado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="El jefe de catedra no fue eliminado con exito";
            }  
            
            echo json_encode($response);          
        }      
    }
?>