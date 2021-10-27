<?php
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Security/Securitypass.php');
class Result{}
class Evaluation extends genericMethod{
    private $idUser;
    private $idCompetition;

    public function __construct ($idUser, $idCompetition){
        #region initial
        $this->idUser = $idUser;
        $this->idCompetition = $idCompetition;
        #endregion
    }

    public function YouWin(){
        try{
            $cnn = Connection();
            $vSql = "update applicants set state = 3 where idUser=$this->idUser and idCompetition=$this->idCompetition";

            $result =  mysqli_query($cnn, $vSql);

            if($result){
                // $this->everyoneElseLoses();
                // $this->updateCompetition();
                $this->ReturnReponse(SUCCESS_RESPONSE, "El ganador del concurso fue declarado.");
            }
            else{
                $this->ReturnReponse(ERROR_RESPONSE, "El ganador no fue declarado.");
            }
        }
        catch(\Exception $e){
            $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
        }
    }

    private function everyoneElseLoses()
    {
        $cnn = Connection();
        $sql = "update applicants set state = 2 where idCompetition=$this->idCompetition and idUser !=$this->idUser";
        mysqli_query($cnn, $sql);
    }

    private function updateCompetition(){
        $cnn = Connection();
        $sql = "update competitions set state = 3 where id=$this->idCompetition";
        mysqli_query($cnn,$sql);
    }

    public static function GetTheWinner($_id){
        $cnn = Connection();
        $user = mysqli_query($cnn,"select u.* from users u inner join applicants a on u.id = a.idUser where u.state = 1 and a.idCompetition =".$_id." and a.state = 3");
        $usersingle = "";

        while($reg = mysqli_fetch_array($user,MYSQLI_ASSOC)){
            $usersingle = $reg;
        }
        $single = json_encode($usersingle);
        echo $single;
    }
}
?>
