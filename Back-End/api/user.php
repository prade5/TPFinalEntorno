<?php  
    require("../Config/cors.php");
    include_once("../Services/userService.php");
   
    switch($_SERVER['REQUEST_METHOD']){       
        case'GET':
            if(isset($_GET['id'])){
              User::GetById($_GET['id']);
            }
            else if(isset($_GET['jcm']) === 'true'){
                User::GetAllJefeCatedra();
            }
            else if(isset($_GET['confirmuser'])){
                User::ConfirmRegister($_GET['confirmuser']);
            }
            else{
                User::Get();
            }
        break;
        //Create role
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);            
            $user = new User($_POST["id"],$_POST['idRole'],$_POST["firstName"],$_POST["lastName"],$_POST["mail"],$_POST["address"],$_POST["phone"],$_POST["userName"],$_POST["userPass"],$_POST["idDocumentType"],$_POST["docNumber"],"","",$_POST["state"]);         
            $user->Post();
        break;
        //Update role
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            if(isset($_GET['changeRole'])){
                User::UpdateUserRole($_GET['changeRole'],$_PUT['idRole']);
            }
            else{                
            $user = new User($_PUT["id"],$_PUT['idRole'],$_PUT["firstName"],$_PUT["lastName"],$_PUT["mail"],$_PUT["address"],$_PUT["phone"],"","",$_PUT["idDocumentType"],$_PUT["docNumber"],"","",0);  
            $user->Put($_GET['id']); 
            }      
        break;
        //Delete role
        case'DELETE':
            User::Delete($_GET['id']);
        break;
    }
?>