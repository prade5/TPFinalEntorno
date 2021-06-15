<?php  
    require("../Config/cors.php");
    include_once("../Services/subjectService.php");
   
    switch($_SERVER['REQUEST_METHOD']){       
        case'GET':
            if(isset($_GET['id'])){
                Subject::GetById($_GET['id']);
            }
            else{
                Subject::Get();
            }
        break;
        //Create role
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);            
            $subject = new Subject($_POST["id"],$_POST['idUser'],$_POST["name"],$_POST["description"],$_POST["img"],"","",$_POST["state"]);         
            $subject->Post();
        break;
        //Update role
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $subject = new Subject($_PUT["id"],$_PUT['idUser'],$_PUT["name"],$_PUT["description"],$_PUT["img"],"","",1);  
            $subject->Put($_GET['id']);       
        break;
        //Delete role
        case'DELETE':
            Subject::Delete($_GET['id']);
        break;
    }
?>