<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class PostProfilUser extends genericMethod
{
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

    public function __construct($id, $idUser, $title, $instagram, $twitter, $facebook, $website, $gitHub, $workplace, $img, $state)
    {
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

    public function Post()
    {
        $cnn = Connection();
        $this->ValidateParameter('title', $this->title, STRING);

        $result = mysqli_query($cnn, "insert into profilusers (idUser, title, instagram, twitter, facebook, website, gitHub, workplace, state, img) 
            values($this->idUser, '$this->title', '$this->instagram', '$this->twitter', '$this->facebook', '$this->website', '$this->gitHub', '$this->workplace', 1 , '$this->img')");
        if ($result) {
            $this->ReturnReponse(SUCCESS_RESPONSE, "El perfil fue guardado con éxito");
        } else {
            $this->ReturnReponse(ERROR_RESPONSE, "El perfil no fue guardado con éxito");
        }
    }
}

$_POST= json_decode(file_get_contents('php://input'), true);

$profil = new PostProfilUser($_POST["id"],$_POST['idUser'],$_POST["title"],$_POST["instagram"],$_POST['twitter'],$_POST['facebook'],$_POST['website'],$_POST['gitHub'],$_POST['workplace'],$_POST['img'],$_POST["state"]);

$profil->Post();
