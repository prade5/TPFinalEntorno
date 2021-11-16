<?php
include_once("../Config/cors.php");
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Securitypass.php');

class PostSubject extends genericMethod
{
    private $id;
    private $idUser;
    private $name;
    private $description;
    private $img;
    private $creationDate;
    private $finalDate;
    private $state;

    public function __construct($id, $idUser, $name, $description, $img, $creationDate, $finalDate, $state)
    {
        #region initial
        $this->id = $id;
        $this->idUser = $idUser;
        $this->name = $name;
        $this->description = $description;
        $this->img = $img;
        $this->creationDate = $creationDate;
        $this->finalDate = $finalDate;
        $this->state = $state;
        #endregion
    }

    public function Post()
    {
        try {
            $cnn = Connection();

            $this->ValidateParameter('nombre', $this->name, STRING);
            $this->checkNonerepeat('subjects', 'name', $this->name, "Ya existio una materia con ese nombre : '$this->name'");

            $result = mysqli_query($cnn, "insert into subjects (name, description, state, idUser, img) 
                values('$this->name' , '$this->description' , 1 , $this->idUser, '$this->img')");
            if ($result) {
                $this->ReturnReponse(SUCCESS_RESPONSE, "La materia fue guardada con exito.");
            } else {
                $this->ReturnReponse(ERROR_RESPONSE, "La materia no fue guardada con exito.");
            }
        } catch (\Exception $e) {
            $this->throwError(REQUEST_NOT_VALID, $e->getMessage());
        }
    }
}

$_POST= json_decode(file_get_contents('php://input'), true);
$subject = new PostSubject($_POST["id"],$_POST['idUser'],$_POST["name"],$_POST["description"],$_POST["img"],"","",$_POST["state"]);
$subject->Post();
