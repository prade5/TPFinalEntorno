<?php
include_once("../../Config/db.php");
include_once('../../middleware/genericMethod.php');
include_once('../../Config/constant.php');
include_once('../../Helpers/Security/Securitypass.php');

$idUser = $_GET['idUser'];

$cnn = Connection();

$select ="";
if($idUser == 0){
    $select = "app.state = 1";
}
else{
    $select = "app.state = 1 and app.idUser = $idUser";
}
$users = mysqli_query($cnn,"select app.id, app.idUser, app.idCompetition, CONCAT(urs.firstName ,' - ', urs.lastName) as fullName, app.state,
                                        sub.img, pos.name as position, app.applicantDate, app.merit, sub.name as subject, comp.creationDate, comp.finalDate 
                                        from applicants app inner join users urs on app.idUser = urs.id 
                                        inner join competitions comp on app.idCompetition = comp.id
                                        inner join subjects sub on comp.idSubject = sub.id inner join positions pos on comp.idPosition = pos.id
                                        where $select ORDER BY app.id DESC");
$userList = [];

while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
    $userList[] = $reg;
}

$finalList = json_encode($userList);
echo $finalList;