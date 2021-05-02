<?php
    require_once('../middleware/function.php');
    require_once("../Services/service_auth.php");
    $api = new auth;  
    $api->ProcessApi();  
?>