<?php
//Conección a la version deployada.
//function Connection(){
//    $conn = mysqli_connect(
//        'localhost',
//        'id17865809_root',
//        'TpFinalEntornoAdmin2021#',
//        'id17865809_tpfinalentorno'
//    );
//    return $conn;

function Connection(){
    $conn = mysqli_connect(
        'localhost',
        'root',
        '',
        'tpfinalentorno'
    );
    return $conn;
}

