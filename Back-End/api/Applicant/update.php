<?php
    require("../../Config/cors.php");
    include_once("../../Config/db.php");

    $cnn = Connection();

    $_PUT = json_decode(file_get_contents('php://input'), true);

    $applicant = new ApplicantUpdate($_PUT["id"],$_PUT['idUser'],$_PUT["idCompetition"],$_PUT["applicantDate"],$_PUT["state"],$_PUT["merit"]);

    $id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['id']) : false;

    if(!$id)
    {
        return http_response_code(400);
    }

    $applicant->Put($id);

    class ApplicantUpdate extends genericMethod
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

        public function Put($id){
            $cnn = Connection();
            $result = mysqli_query($cnn,"update applicants set merit=$this->merit
                                    where id =".$id);
            if($result){
                $this->ReturnReponse(SUCCESS_RESPONSE, "La postulación fue modificada con exito.");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "La postulación no fue modificada con exito.");
            }
        }
    }
