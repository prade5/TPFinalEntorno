<?php  
    require("../Config/cors.php");
    include_once("../Services/authService.php");
   
    switch($_SERVER['REQUEST_METHOD']){        
        case'POST':
            $_login = json_decode(file_get_contents('php://input'), true);
            $auth = new Auth(0, $_login['userName'], $_login["userPass"]);
            $auth->Login();
        break;
        case'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true); 
            Auth::ChangePassword($_GET['id'],$_PUT["userPass"] );       
        break;
    }
?>