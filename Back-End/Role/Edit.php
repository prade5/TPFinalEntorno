<?php 

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require("../Config/db.php");
    $cnn = Connection();

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    class Result{}
    $response = new Result();
    $result = false;
    if($params->name === ''){
        $response ->result = 'error';
        $response->message="Ingrese el nombre";      
    }
    else{
        $result = mysqli_query($cnn,"update Roles set name ='$params->name',
                                             description='$params->description'
                                             where id =$params->id");
        if($result){
            $response ->result = 'Ok';
            $response->message="El permiso fue modificado con exito";
        }
        else{
            $response ->result = 'Error';
            $response->message="El permiso no fue modificado con exito";
        }
    }  
    // header('Content-Type:application/json');    
    echo json_encode($response);
?>