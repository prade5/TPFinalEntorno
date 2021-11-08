<?php
    require("../../Config/cors.php");
    include_once("../../Config/db.php");
    include_once('../../middleware/genericMethod.php');

    $cnn = Connection();

    $idComp = ($_GET['idComp'] !== null && (int)$_GET['idComp'] > 0)? mysqli_real_escape_string($cnn, (int)$_GET['idComp']) : false;

    if(!$idComp)
    {
        return http_response_code(400);
    }

    $users = mysqli_query($cnn," select a.id, a.idUser, a.idCompetition, CONCAT(u.firstName ,' - ', u.lastName) as fullName, a.state,
                                                p.name as position, a.applicantDate, a.merit, s.name as subject, c.creationDate, c.finalDate 
                                        from applicants a inner join competitions c on c.id = a.idCompetition 
                                        inner join subjects s on s.id = c.idSubject
                                        inner join positions p on p.id = c.idPosition
                                        inner join users u on a.idUser = u.id
                                        where a.state != 3");

    if($idComp != 0)
        $users = $users + " and c.id = ".$idComp;

    $userList = [];

    while($reg = mysqli_fetch_array($users, MYSQLI_ASSOC)){
        $userList[] = $reg;
    }

    $finalList = json_encode($userList);

    echo $finalList;