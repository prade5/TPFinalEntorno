<?php 

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require("../Config/db.php");
    $cnn = Connection();

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    $result = mysqli_query($cnn,"insert into Roles (name,description,state) values('$params->name' , '$params->description',1)");

    class Result{}

    $response = new Result();
    if($result){
        $response ->result = 'Ok';
        $response->message="El permiso fue guardado con exito";
    }
    else{
        $response ->result = 'Error';
        $response->message="El permiso no fue guardado con exito";
    }
   

    // header('Content-Type:application/json');
    
    echo json_encode($response);
?>
