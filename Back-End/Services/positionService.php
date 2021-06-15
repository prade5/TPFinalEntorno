<?php
include_once("../Config/db.php");
include_once('../middleware/genericMethod.php');
include_once('../Config/constant.php');
include_once('../Helpers/Security/Securitypass.php');

class Result{}
class Position extends genericMethod
{
    private $id;
    private $name;
    private $description;
    private $state;

    public function __construct($id, $name, $description, $state)
    {
        #region initial
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->state = $state;
        #endregion
    }

    public static function Get()
    {
        $cnn = Connection();
        $positions = mysqli_query($cnn, "select * from positions where state = 1 ORDER BY id DESC");
        $positionsList = [];

        while ($reg = mysqli_fetch_array($positions, MYSQLI_ASSOC)) {
            $positionsList[] = $reg;
        }

        $finalList = json_encode($positionsList);
        echo $finalList;
    }

    public static function GetById($_id)
    {
        $cnn = Connection();
        $position = mysqli_query($cnn, "select * from positions where state = 1 and id =" . $_id);
        $positionSingle = "";

        while ($reg = mysqli_fetch_array($position, MYSQLI_ASSOC)) {
            $positionSingle = $reg;
        }
        $single = json_encode($positionSingle);
        echo $single;
    }
}
?>