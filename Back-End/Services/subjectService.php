<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    include_once('../Helpers/Security/Securitypass.php');
    class Result{}
    class Subject extends genericMethod{
        private $id;
        private $idUser;
        private $name;
        private $description;        
        private $img;
        private $creationDate;
        private $finalDate;
        private $state;

        public function __construct ($id, $idUser,$name, $description, $img, $creationDate, $finalDate, $state){
            #region initial
            $this->id = $id;
            $this->idUser = $idUser;
            $this->name = $name;
            $this->description = $description;
            $this->img = $img;
            $this->creationDate = $creationDate;
            $this->finalDate = $finalDate;
            $this->state = $state;
            #endregion
        }

        //method     
        public static function Get(){             
            $cnn = Connection();
            $users = mysqli_query($cnn,"select * from subjects where state = 1 ORDER BY id DESC");
            $userList = [];

            while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $user = mysqli_query($cnn,"select * from subjects where state = 1 and id =".$_id);
            $usersingle = "";

            while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
                $usersingle = $reg;
            }
            $single = json_encode($usersingle);
            echo $single;
        }

        public static function GetByUserId($Id){
            $cnn = Connection();

            $query = "select s.* from subjects s inner join jefedecatedra_materia jm on s.id = jm.IdSubject where s.state = 1 and jm.state = 1 and jm.IdJefeDeCatedra =".$Id;

            $users = mysqli_query($cnn,$query);
            $userList = [];

            while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }

        public function Post(){
            try{
                $cnn = Connection();

                $this->ValidateParameter('nombre', $this->name, STRING);  
                $this->checkNonerepeat('subjects', 'name', $this->name, "Ya existio una materia con ese nombre : '$this->name'");
                
                $result = mysqli_query($cnn,"insert into subjects (name, description, state, idUser, img) 
                values('$this->name' , '$this->description' , 1 , $this->idUser, '$this->img')");
                if($result){
                    $this->ReturnReponse(SUCCESS_RESPONSE, "La materia fue guardada con exito.");
                }
                else{
                    $this->ReturnReponse(ERROR_RESPONSE, "La materia no fue guardada con exito.");
                }
            }
            catch(\Exception $e){
                $this->throwError(REQUEST_NOT_VALID, $e->getMessage()); 
            }  
        }

        public function Put($id){
            $cnn = Connection();
            $this->ValidateParameter('nombre', $this->name, STRING); 
           
            $result = mysqli_query($cnn,"update subjects set name ='$this->name',
                                    description='$this->description', idUser='$this->idUser', img='$this->img'
                                    where id =".$id);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "La materia fue modificada con exito.");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "La materia no fue modificada con exito.");
            }    
        }
        public static function Delete($id){ 
            $cnn = Connection();   
            $response = new Result();
            $result = mysqli_query($cnn,"update subjects set state = 2 where id =".$id);

            if($result){
                $response->result = 'Ok';
                $response->message="La materia fue eliminada con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="La materia no fue eliminada con exito";
            }
            echo json_encode($response);
        }         
    }
?>