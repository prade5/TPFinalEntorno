<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../Config/constant.php');
    include_once('../Helpers/Security/Securitypass.php');
    class Result{}
    class Competition extends genericMethod{
        private $id;
        private $idUser;
        private $idSubject;
        private $description;
        private $creationDate;
        private $finalDate;
        private $state;
        private $idPosition;

        public function __construct ($id, $idUser,$idSubject, $description, $creationDate, $finalDate, $state, $idPosition){
            #region initial
            $this->id = $id;
            $this->idUser = $idUser;
            $this->idSubject = $idSubject;
            $this->description = $description;
            $this->creationDate = $creationDate;
            $this->finalDate = $finalDate;
            $this->state = $state;
            $this->idPosition = $idPosition;
            #endregion
        }

        //method     
        public static function Get(){             
            $cnn = Connection();
            $query = "select comp.*, sub.name as materia, sub.img, pos.name as puesto from competitions comp inner join subjects sub on comp.idSubject = sub.id  inner join positions pos on comp.idPosition = pos.id where comp.state = 1 and pos.state = 1 ORDER BY comp.id DESC";
            $users = mysqli_query($cnn,$query);
            $userList = [];

            while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }
        public static function GetById($_id){
            $cnn = Connection();
            $user = mysqli_query($cnn,"select * from competitions where state = 1 and id =".$_id);
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

                $this->ValidateParameter('idSubject', $this->idSubject, INTEGER);
//                $this->checkNonerepeat('competitions', 'idSubject', $this->idSubject, "Ya tiene un concurso vigente para esa materia");

                $vSql = "INSERT INTO competitions (idSubject, description, creationDate, finalDate, state, idUser, idPosition) VALUES ($this->idSubject, '$this->description', '$this->creationDate', '$this->finalDate', '1', $this->idUser, $this->idPosition)";

                $result =  mysqli_query($cnn, $vSql) or die (mysqli_error($cnn));

                if($result){
                    $this->ReturnReponse(SUCCESS_RESPONSE, "El concurso fue guardado con exito.");
                }
                else{
                    $this->ReturnReponse(ERROR_RESPONSE, "El concurso no fue guardado con exito.");
                }
            }
            catch(\Exception $e){
                $this->throwError(REQUEST_NOT_VALID, $e->getMessage()); 
            }  
        }

        public function Put($id){
            try{
                $cnn = Connection();
                $this->ValidateParameter('idSubject', $this->idSubject, INTEGER);

                $vSql = " update competitions set idSubject = $this->idSubject,
                                        description='$this->description', creationDate='$this->creationDate', finalDate='$this->finalDate',
                                            idUser= $this->idUser,  idPosition= $this->idPosition
                                        where id = $id ";

                $result =  mysqli_query($cnn, $vSql) or die (mysqli_error($cnn));

    //            $result = mysqli_query($cnn,"update competitions set idSubject = $this->idSubject,
    //                                    description='$this->description', creationDate='$this->creationDate', finalDate='$this->finalDate',
    //                                        idUser= $this->idUser,  idPosition= $this->idPosition
    //                                    where id =".$id);
                if($result){
                    $this->ReturnReponse(SUCCESS_RESPONSE, "El concurso fue modificado con exito.");
                }
                else{
                    $this->ReturnReponse(ERROR_RESPONSE, "El concurso no fue modificado con exito.");
                }
            }
            catch(\Exception $e){
                $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
            }
        }
        public static function Delete($id){ 
            $cnn = Connection();   
            $response = new Result();
            $result = mysqli_query($cnn,"update competitions set state = 2 where id =".$id);

            if($result){
                $response->result = 'Ok';
                $response->message="El concurso fue eliminado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="El concurso no fue eliminado con exito";
            }
            echo json_encode($response);
        }         
    }
?>