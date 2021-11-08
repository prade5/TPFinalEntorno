<?php
    include_once("../../Config/db.php");
    include_once('../../middleware/genericMethod.php');
    include_once('../../Config/constant.php');
    include_once('../../Helpers/Security/Securitypass.php');

$cnn = Connection();

$id = ($_GET['iduser'] !== null && (int)$_GET['iduser'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['iduser']) : false;

if(!$id)
{
    return http_response_code(400);
}

$query = "select comp.*, sub.name as materia, sub.img, pos.name as puesto from competitions comp inner join subjects sub on comp.idSubject = sub.id  inner join positions pos on comp.idPosition = pos.id where (comp.state = 1 or comp.state = 3) and pos.state = 1 ORDER BY comp.id DESC";
$users = mysqli_query($cnn,$query);
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
    $userList[] = $reg;
}
$sum = 0;
echo("[");
foreach ($userList as $value)
{
    $sum = $sum + 1;
    $IsPostulate = genericMethod::ChechIsPostulate($id, $value["id"]);

    $miArray = array(
        "creationDate"=>$value["creationDate"],
        "description"=>$value["description"],
        "finalDate"=>$value["finalDate"],
        "id"=>$value["id"],
        "idPosition"=>$value["idPosition"],
        "idSubject"=>$value["idSubject"],
        "idUser"=>$value["idUser"],
        "img"=>$value["img"],
        "materia"=>$value["materia"],
        "puesto"=>$value["puesto"],
        "state"=>$value["state"],
        "isPostulate"=>$IsPostulate
    );
    echo json_encode($miArray);


    if ($sum < count($userList)) {
        echo(",");
    }
}
echo("]");