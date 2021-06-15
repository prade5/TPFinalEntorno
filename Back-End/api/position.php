<?php
    require("../Config/cors.php");
    include_once("../Services/positionService.php");

    switch($_SERVER['REQUEST_METHOD']){
        case'GET':
            if(isset($_GET['id'])){
                Position::GetById($_GET['id']);
            }
            else{
                Position::Get();
            }
        break;
    }
?>
