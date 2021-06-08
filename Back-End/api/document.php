<?php  
    require("../Config/cors.php");
    include_once("../Services/documentService.php");
   
    switch($_SERVER['REQUEST_METHOD']){        
        case'GET':
            if(isset($_GET['id'])){
                Document::GetById($_GET['id']);
            }
            else{
                Document::Get();
            }
        break;
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $doc = new Document($_POST["id"],$_POST['name'],$_POST["description"],"",$_POST["state"]);         
            $doc->Post();
        break;
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $doc = new Document($_PUT["id"],$_PUT['name'],$_PUT["description"],"",0);  
            $doc->Put($_GET['id']);       
        break;
        case'DELETE':
            Document::Delete($_GET['id']);
        break;
    }
?>