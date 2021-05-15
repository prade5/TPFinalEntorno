<?php  
    require("../Config/cors.php");
    include_once("../Services/userService.php");
   
    switch($_SERVER['REQUEST_METHOD']){       
        case'GET':
            if(isset($_GET['id'])){
              User::GetById($_GET['id']);
            }
            else{
                User::Get();
            }
        break;
        //Create role
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            // echo json_encode($_POST);
            // exit;
            $user = new User($_POST["id"],$_POST['idRole'],$_POST["firstName"],$_POST["lastName"],$_POST["mail"],$_POST["address"],$_POST["phone"],$_POST["userName"],$_POST["userPass"],$_POST["creationDate"],$_POST["finalDate"],$_POST["state"]);         
            $user->Post();
        break;
        //Update role
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $role = new Role($_PUT["id"],$_PUT['name'],$_PUT["description"],$_PUT["creationDate"],$_PUT["state"]);  
            $role->Put($_GET['id']);       
        break;
        //Delete role
        case'DELETE':
            Role::Delete($_GET['id']);
        break;
    }
?>