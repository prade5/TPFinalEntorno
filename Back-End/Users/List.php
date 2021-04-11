<?php 
    // header('Access-Control-Allow-Origin', '*');
    // header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    // header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require("../Config/db.php");
    $cnn = Connection();

    $userRegisteries = mysqli_query($cnn,"select * from users");
    $userList = [];

    while($reg = mysqli_fetch_array($userRegisteries)){
        $userList[] = $reg;
    }
    $finalList = json_encode($userList);
    echo $finalList;
    header('Content-Type:application/json');
?>
