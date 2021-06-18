<?php  
    require("../Config/cors.php");
    include_once("../Services/knowlageuserService.php");
   
    switch($_SERVER['REQUEST_METHOD']){
        case'GET':
            if(isset($_GET['id'])){
                KowlageUser::GetById($_GET['id']);
            }
            else{
                KowlageUser::Get($_GET['idUser']);
            }
        break;
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $profil = new KowlageUser($_POST["id"],$_POST['idUser'],$_POST["name"],$_POST["description"],$_POST["nivel"],$_POST["state"]);         
            $profil->Post();
        break;
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $profil = new KowlageUser($_PUT["id"],$_PUT['idUser'],$_PUT["name"],$_PUT["description"],$_PUT["nivel"],$_PUT["state"]);  
            $profil->Put($_GET['id']);       
        break;
        case'DELETE':
            KowlageUser::Delete($_GET['id']);
        break;
    }
?>