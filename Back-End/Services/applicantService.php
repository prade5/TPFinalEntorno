<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    include_once('../Helpers/Security/Securitypass.php');
    class Result{}
    class Applicant extends genericMethod{
        private $id;
        private $idUser;
        private $idCompetition;
        private $applicantDate;
        private $state;

        public function __construct ($id, $idUser,$idCompetition, $applicantDate, $state){
            #region initial
            $this->id = $id;
            $this->idUser = $idUser;
            $this->idCompetition = $idCompetition;
            $this->applicantDate = $applicantDate;
            $this->state = $state;
            #endregion
        }

        //method     
        public static function Get(){             
            $cnn = Connection();
            $users = mysqli_query($cnn,"select * from applicants app inner join where state = 1 ORDER BY id DESC");
            $userList = [];

            while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $user = mysqli_query($cnn,"select * from applicants where state = 1 and id =".$_id);
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
                $this->checkNonerepeat('applicants', 'idCompetition', $this->idCompetition, "Ya esta aplicado(a) para ese concurso");
                
                $result = mysqli_query($cnn,"insert into applicants (idUser,idCompetition,applicantDate, state) 
                values($this->idUser , $this->idCompetition  , '$this->applicantDate', 1)");
                if($result){
                    $this->ReturnReponse(SUCCESS_RESPONSE, "La postulación fue guardada con exito.");
                }
                else{
                    $this->ReturnReponse(ERROR_RESPONSE, "La postulación no fue guardada con exito.");
                }
            }
            catch(\Exception $e){
                $this->throwError(REQUEST_NOT_VALID, $e->getMessage()); 
            }  
        }

        public function Put($id){
            $cnn = Connection();           
            $result = mysqli_query($cnn,"update applicants set idCompetition =$this->idCompetition,
                                    applicantDate='$this->applicantDate', idUser=$this->idUser
                                    where id =".$id);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "La postulación fue modificada con exito.");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "La postulación no fue modificada con exito.");
            }    
        }
        public static function Delete($id){ 
            $cnn = Connection();   
            $response = new Result();
            $result = mysqli_query($cnn,"update applicants set state = 2 where id =".$id);

            if($result){
                $response->result = 'Ok';
                $response->message="La postulación fue eliminada con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="La postulación no fue eliminada con exito";
            }
            echo json_encode($response);
        }         
    }
?>