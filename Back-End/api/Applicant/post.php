<?php
    require("../../Config/cors.php");
    include_once("../../Config/db.php");
    include_once('../../middleware/genericMethod.php');

    $_POST= json_decode(file_get_contents('php://input'), true);

    $applicantPost = new ApplicantPost($_POST["id"],$_POST['idUser'],$_POST["idCompetition"],$_POST["applicantDate"],$_POST["merit"],$_POST["state"]);

    $applicantPost->Post();

    class ApplicantPost extends genericMethod
    {
        private $id;
        private $idUser;
        private $idCompetition;
        private $applicantDate;
        private $state;
        private $merit;

        public function __construct($id, $idUser, $idCompetition, $applicantDate, $state, $merit)
        {
            $this->id = $id;
            $this->idUser = $idUser;
            $this->idCompetition = $idCompetition;
            $this->applicantDate = $applicantDate;
            $this->state = $state;
            $this->merit = $merit;
        }

        public function Post(){
            try{
                $cnn = Connection();
                $this->ValidateRolePostulation($this->idUser);
                $this->checkNonerepeat2('applicants', 'idCompetition', $this->idCompetition, 'idUser', $this->idUser, "Ya esta aplicado(a) para ese concurso");

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
    }