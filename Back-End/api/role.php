<?php  
    require("../Config/cors.php");
    include_once("../Services/service_role.php");
   
    switch($_SERVER['REQUEST_METHOD']){
        //Get all and Get one role
        case'GET':
            if(isset($_GET['id'])){
              Role::GetById($_GET['id']);
            }
            else{
                Role::Get();
            }
        break;
        //Create role
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $role = new Role($_POST["id"],$_POST['name'],$_POST["description"],$_POST["creationDate"],$_POST["state"]);         
            $role->Post();
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