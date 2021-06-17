<?php  
    require("../Config/cors.php");
    include_once("../Services/perfilphotoservice.php");
   
    switch($_SERVER['REQUEST_METHOD']){
        case'GET':
            if(isset($_GET['id'])){
                PerfilPhoto::GetById($_GET['id']);
            }
            else{
                PerfilPhoto::Get();
            }
        break;        
    }
?>