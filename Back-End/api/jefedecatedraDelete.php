<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


$cnn = mysqli_connect(
    'localhost',
    'id17865809_root',
    'TpFinalEntornoAdmin2021#',
    'id17865809_tpfinalentorno'
);

$_id = json_decode(file_get_contents('php://input'), true);

$id = ((int)$_id);

if(!$id)
{
    return http_response_code(400);
}

// Delete.

$sql = "Delete From `jefedecatedra_materia`  where `Id` = '{$id}' LIMIT 1";

if(mysqli_query($cnn, $sql))
{
    return http_response_code(204);
}
else
{
    return http_response_code(422);
}