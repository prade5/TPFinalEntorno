<?php  
    require("../Config/cors.php");
    include_once("../Services/jefedecatedramateriaService.php");
   
    switch($_SERVER['REQUEST_METHOD']){
        case'GET':
            if(isset($_GET['id'])){
                JefedeCatedraMateria::GetById($_GET['id']);
            }
            else{
                JefedeCatedraMateria::Get($_GET['idUser']);
            }
        break;
        case'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $jefecatedra = new JefedeCatedraMateria($_POST["Id"],$_POST['IdJefeDeCatedra'],$_POST["IdSubject"],$_POST["state"]);         
            $jefecatedra->Post();
        break;
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $jefecatedra = new JefedeCatedraMateria($_PUT["id"],$_PUT['IdJefeDeCatedra'],$_PUT["IdSubject"],$_PUT["state"]);  
            $jefecatedra->Put($_GET['id']);       
        break;
        case'DELETE':
            JefedeCatedraMateria::Delete($_GET['id']);
        break;
    }
?>