<?php
    require("../../Config/cors.php");
    include_once("../../Config/db.php");

    class ResultApp{
        public $result;
        public $message;
    }

    $cnn = Connection();

    $response = new ResultCompetition();

    $id = json_decode(file_get_contents('php://input'), true);

    $id = ((int)$id);

    if(!$id)
    {
        return http_response_code(400);
    }

    $result = mysqli_query($cnn,"update applicants set state = 2 where id =".$id);

    if($result){
        $response->result = 'Ok';
        $response->message="La postulación fue eliminada con exito";
    }
    else{
        $response->result = 'Error';
        $response->message="La postulación no fue eliminada con exito";
    }

    echo json_encode($response);