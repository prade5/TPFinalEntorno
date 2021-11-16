<?php
    require("../Config/cors.php");
    include_once("../Config/db.php");

    $cnn = Connection();

    $_id = $_GET['id'];

    if($_id == null)
    {
        return http_response_code(400);
    }

    $user = mysqli_query($cnn,"select * from applicants where state = 1 and id =".$_id);

    $userSingle = "";

    while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
        $userSingle = $reg;
    }

    $single = json_encode($userSingle);

    echo $single;
