<?php
    include_once '../../Config/cors.php';
    include_once '../../Config/db.php';
    include_once '../../middleware/genericMethod.php';
    include_once '../../Config/constant.php';
    include_once '../../Helpers/Security/Securitypass.php';

$cnn = Connection();

$isAdmin= $_GET['isAdmin'];

$idAdmin= $_GET['idAdmin'];

if($idAdmin == null)
{
    return http_response_code(400);
}

$select ="";

if($isAdmin === "true"){
    $select = "comp.state = 1 or comp.state = 3";
}
else{
    $select = "(comp.state = 1 or comp.state = 3) and comp.idUser = $idAdmin";
}
$query = "select comp.*, sub.name as materia, sub.img, pos.name as puesto from competitions comp inner join subjects sub on comp.idSubject = sub.id  
            inner join positions pos on comp.idPosition = pos.id where $select and pos.state = 1 ORDER BY comp.finalDate DESC";
$users = mysqli_query($cnn,$query);
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){

    $today = date("Y-m-d");
    $today_dt = new DateTime($today);
    $expire_dt = new DateTime($reg["finalDate"]);

    $finalDatecompare = $expire_dt > $today_dt ? true : false;

    $miArray = array("id"=>$reg["id"],"idSubject"=>$reg["idSubject"],"description"=>$reg["description"],"isActive"=>$finalDatecompare,
        "creationDate"=>$reg["creationDate"],"finalDate"=>$reg["finalDate"],"state"=>$reg["state"],"idUser"=>$reg["idUser"],
        "idPosition"=>$reg["idPosition"],"materia"=>$reg["materia"],"puesto"=>$reg["puesto"],"img"=>$reg["img"]);

    $userList[] = $miArray;
}

$finalList = json_encode($userList);

echo $finalList;