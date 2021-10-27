<?php  
    require("../Config/cors.php");
    include_once("../Services/competitionService.php");
   
    switch($_SERVER['REQUEST_METHOD']){       
        case'GET':
            if(isset($_GET['id'])){
                Competition::GetById($_GET['id']);
            }
            else{
                if (isset($_GET['idu'])) {
                    Competition::GetByUserId($_GET['idu']);
                } 
                else if(isset($_GET['iduser'])){
                    Competition::GetAllPostulation($_GET['iduser']);
                }
                else {
                    Competition::Get($_GET['isAdmin'],$_GET['idAdmin']);
                }
            }
        break;
        //Create role
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);            
            $competition = new Competition(0 ,$_POST['idUser'],$_POST["idSubject"],$_POST["description"],$_POST["creationDate"],$_POST["finalDate"],$_POST["state"],$_POST["idPosition"]);
            $competition->Post();
        break;
        //Update 
        case'PUT':
            if(isset($_GET['idComp']) && isset($_GET['idUser'])){
                $_PUT = json_decode(file_get_contents('php://input'), true);
                $competition->DeclareWinner($_PUT['idComp'],$_PUT['idUser']);
            }else{
                $_PUT = json_decode(file_get_contents('php://input'), true);
                $competition = new Competition($_PUT["id"],$_PUT['idUser'],$_PUT["idSubject"],$_PUT["description"],$_PUT["creationDate"],$_PUT["finalDate"],$_PUT["state"],$_PUT["idPosition"]);
                $competition->Put($_PUT['id']);
            }
        break;
        //Delete role
        case'DELETE':
            Competition::Delete($_GET['id']);
        break;
    }
?>