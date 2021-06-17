<?php  
    require("../Config/cors.php");
    include_once("../Services/perfiluserService.php");
   
    switch($_SERVER['REQUEST_METHOD']){
        case'GET':
            if(isset($_GET['id'])){
                ProfilUser::GetById($_GET['id']);
            }
            else{
                ProfilUser::Get();
            }
        break;
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $profil = new ProfilUser($_POST["id"],$_POST['idUser'],$_POST["title"],$_POST["instagram"],$_POST['twitter'],$_POST['facebook'],$_POST['website'],$_POST['gitHub'],$_POST['workplace'],$_POST["state"]);         
            $profil->Post();
        break;
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $profil = new ProfilUser($_PUT["id"],$_PUT['idUser'],$_PUT["title"],$_PUT["instagram"],$_PUT['twitter'],$_PUT['facebook'],$_PUT['website'],$_PUT['gitHub'],$_PUT['workplace'],$_PUT["state"]);  
            $profil->Put($_GET['id']);       
        break;
        case'DELETE':
            ProfilUser::Delete($_GET['id']);
        break;
    }
?>