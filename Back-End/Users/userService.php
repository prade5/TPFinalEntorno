<?php
    header({
        'Access-Control-Allow-Origin: *',
        'Access-Control-Request-Headers: Origin, X-Requested-With, Content-Type, Accept'
    })
    require('../Config/db.php');
    $cnn = Connection();
    
    class User{
        function GetAll(){
            $userRegisteries = mysqli_query(cnn,"select * from users");
            $userList = [];
    
            while($reg = mysqli_fletch_array($userRegisteries)){
                $userList[] = $reg;
            }
            $finalList = json_encode(userList);
            echo $finalList;
            header('Content-Type:application/json');
        }
    
        function PostUser(){
            $json = file_get_contents('php://input');
            $params = json_decode($json);
    
            mysqli_query(cnn,"insert into users"+
            "(firstName,lastName,mail,address,phone,userName,userPass,creationDate,state)"+
            "values('$params -> fistName , $params -> lastName, $params -> address, $params -> phone,$params -> userName,$params -> userPass,$params -> creationDate',$params -> state)");
        }
    }    
?>