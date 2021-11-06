<?php
function Connection(){
    $conn = mysqli_connect(
        'localhost',
        'id17865809_root',
        'TpFinalEntornoAdmin2021#',
        'id17865809_tpfinalentorno'
    );

    echo 'hola mundo';
    return $conn;
}
?>
