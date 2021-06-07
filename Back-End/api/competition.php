<?php  
    require("../Config/cors.php");
    include_once("../Services/competitionService.php");
   
    switch($_SERVER['REQUEST_METHOD']){       
        case'GET':
            if(isset($_GET['id'])){
                Competition::GetById($_GET['id']);
            }
            else{
                Competition::Get();
            }
        break;
        //Create role
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);            
            $competition = new Competition($_POST["id"],$_POST['idUser'],$_POST["idSubject"],$_POST["description"],$_POST["creationDate"],$_POST["finalDate"],$_POST["state"]);         
            $competition->Post();
        break;
        //Update 
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $competition = new Competition($_PUT["id"],$_PUT['idUser'],$_PUT["idSubject"],$_PUT["description"],"","",0);  
            $competition->Put($_GET['id']);       
        break;
        //Delete role
        case'DELETE':
            Competition::Delete($_GET['id']);
        break;
    }
?>