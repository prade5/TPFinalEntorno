<?php  
    require("../Config/cors.php");
    include_once("../Services/photoService.php");
   
    switch($_SERVER['REQUEST_METHOD']){
        case'GET':
            if(isset($_GET['id'])){
                Photo::GetById($_GET['id']);
            }
            else{
                Photo::Get();
            }
        break;        
    }
?>