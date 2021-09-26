<?php  
    require("../Config/cors.php");
    include_once("../Services/applicantService.php");
   
    switch($_SERVER['REQUEST_METHOD']){       
        case'GET':
            if(isset($_GET['id'])){
                Applicant::GetById($_GET['id']);
            }
            else{   
                $idUser = empty($_GET['idUser']) == 0 ? $_GET['idUser'] : 0;  
                Applicant::Get($idUser);
            }
        break;
        //Create 
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);            
            $applicant = new Applicant($_POST["id"],$_POST['idUser'],$_POST["idCompetition"],$_POST["applicantDate"],$_POST["state"]);
            $applicant->Post();
        break;
        //Update 
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $applicant = new Applicant($_PUT["id"],$_PUT['idUser'],$_PUT["idCompetition"],$_PUT["applicantDate"],$_PUT["state"],$_PUT["merit"]);
            $applicant->Put($_GET['id']);       
        break;
        //Delete 
        case'DELETE':
            Applicant::Delete($_GET['id']);
        break;
    }
?>