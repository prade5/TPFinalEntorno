<?php
    function Connection(){
        $conn = mysqli_connect(
            'localhost',
            'root',
            '516euge94324590',
            'tpfinalentorno'
        );
      return $conn;
    }
?>