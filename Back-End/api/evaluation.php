<?php
require("../Config/cors.php");
include_once("../Services/evaluationService.php");

switch($_SERVER['REQUEST_METHOD']){
    case'GET':
        if(isset($_GET['id'])){
            Evaluation::GetTheWinner($_GET['id']);
        }
        break;
    //Create
    case'PUT':
        $_PUT = json_decode(file_get_contents('php://input'), true);
        $evaluation = new Evaluation($_PUT["idUser"],$_PUT['idCompetition']);
        $evaluation->YouWin();
        break;
    //Update
}
?>
