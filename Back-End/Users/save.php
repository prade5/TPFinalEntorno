<?php 
   header(
    'Access-Control-Allow-Origin: *',
    'Access-Control-Request-Headers: Origin, X-Requested-With, Content-Type, Accept'
    );
    require('../Config/db.php');
    $cnn = Connection();
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    mysqli_query(cnn,"insert into users"+
    "(firstName,lastName,mail,address,phone,userName,userPass,creationDate,state)"+
    "values('$params -> fistName , $params -> lastName, $params -> address, $params -> phone,$params -> userName,$params -> userPass,$params -> creationDate',$params -> state)");
?>