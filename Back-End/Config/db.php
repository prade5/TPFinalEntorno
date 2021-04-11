<?php
    function Connection(){
        $conn = mysqli_connect(
            'localhost',
            'root',
            '',
            'tpfinalentorno'
        );
        return $conn;
    }
   
?>