<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');


class UpdateProfileUser extends genericMethod {
    private $id;
    private $idUser;
    private $title;
    private $instagram;
    private $twitter;
    private $facebook;
    private $website;
    private $gitHub;
    private $workplace;
    private $img;
    private $state;

    public function __construct ($id,$idUser,$title,$instagram,$twitter,$facebook,$website,$gitHub,$workplace, $img,$state){
        $this->id = $id;
        $this->idUser = $idUser;
        $this->title = $title;
        $this->instagram = $instagram;
        $this->twitter = $twitter;
        $this->facebook = $facebook;
        $this->website = $website;
        $this->gitHub = $gitHub;
        $this->workplace = $workplace;
        $this->img = $img;
        $this->state = $state;
    }

    public function Put($_id){
        $cnn = Connection();
        $this->ValidateParameter('title', $this->title, STRING);

        $result = mysqli_query($cnn,"update profilusers set title ='$this->title', gitHub='$this->gitHub',
                                                instagram='$this->instagram',twitter='$this->twitter',
                                                facebook='$this->facebook',website='$this->website',
                                                workplace='$this->workplace', img='$this->img'
                                                where id =".$_id ." and idUser=".$this->idUser);
        if($result){
            $this->ReturnReponse(SUCCESS_RESPONSE, "El perfil fue modificado con éxito");
        }
        else{
            $this->ReturnReponse(ERROR_RESPONSE, "El perfil no fue modificado con éxito");
        }
    }
}

$_PUT = json_decode(file_get_contents('php://input'), true);

$profil = new UpdateProfileUser($_PUT["id"],$_PUT['idUser'],$_PUT["title"],$_PUT["instagram"],$_PUT['twitter'],$_PUT['facebook'],$_PUT['website'],$_PUT['gitHub'],$_PUT['workplace'],$_PUT['img'],$_PUT["state"]);

$profil->Put($_GET['id']);
