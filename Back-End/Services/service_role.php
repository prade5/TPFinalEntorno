<?php

    class Result{};
    class Role{
        private $id;
        private $name;
        private $description;
        private $creationDate;
        private $state;

        public function __construct ($id,$name,$description,$creationDate,$state){
            $this->id = $id;
            $this->name = $name;
            $this->description = $description;
            
            $this->creationDate = $creationDate;
            $this->state = $state;
        }
        // Get
        public function getId(){
            return $this->id;
        }
         /**
         * Set the value of id
         * 
         * @return self
         */
        public function setId($id){
            $this->id = $id;
            return $this;
        }

        public function getName(){
            return $this->name;
        }        
           /**
         * Set the value of name
         * 
         * @return self
         */
        public function setName($name){
            $this->name = $name;
            return $this;
        }
        public function getDescription(){
            return $this->description;
        }
        /**
       * Set the value of desacription
       * 
       * @return self
       */
      public function setDescription($description){
          $this->description = $description;
          return $this;
      }
        
        public function getCreationDate(){
            return $this->creationDate;
        } 
        /**
       * Set the value of creation date
       * 
       * @return self
       */
        public function setCreationDate($creationDate){
            $this->creationDate = $creationDate;
            return $this;
        }        
        public function getState(){
            return $this->state;
        } 
        /**
       * Set the value of state
       * 
       * @return self
       */
        public function setState($state){
            $this->state = $state;
            return $this;
        }
        //method     
        public static function Get(){
            require("../Config/db.php");
            $cnn = connect();
            $userRegisteries = mysqli_query($cnn,"select * from roles where state = 1 ORDER BY id DESC");
            $userList = [];

            while($reg = mysqli_fetch_array($userRegisteries)){
                $userList[] = $reg;
            }

            $finalList = json_encode($userList);
            echo $finalList;
        }
        public static function GetById($_id){
            require("../Config/db.php");
            $cnn = Connection();
            $userRegisteries = mysqli_query($cnn,"select * from roles where state = 1 and id =".$_id);
            $userList = "";

            while($reg = mysqli_fetch_array($userRegisteries)){
                $userList = $reg;
            }
            $finalList = json_encode($userList);
            echo $finalList;
        }
        public function Post(){
            require("../Config/db.php");
            $cnn = Connection();
            $response = new Result();
            $result = false;
            if($this->name === ''){
                $response->result = 'error';
                $response->message="Ingrese el nombre";      
            }
            else{
                $result = mysqli_query($cnn,"insert into Roles (name,description,state) values('$this->name' , '$this->description',1)");
                if($result){
                    $response->result = 'Ok';
                    $response->message="El permiso fue guardado con exito";
                }
                else{
                    $response->result = 'Error';
                    $response->message="El permiso no fue guardado con exito";
                }
            }     
            echo json_encode($response);
        }
        public function Put($idrole){
            require("../Config/db.php");
            $cnn = Connection();
            $response = new Result();
            $result = false;
            if($this->name === ''){
                $response->result = 'error';
                $response->message="Ingrese el nombre";      
            }
            else{
                $result = mysqli_query($cnn,"update Roles set name ='$this->name',
                                                    description='$this->description'
                                                    where id =".$idrole);
                if($result){
                    $response->result = 'Ok';
                    $response->message="El permiso fue modificado con exito";
                }
                else{
                    $response->result = 'Error';
                    $response->message="El permiso no fue modificado con exito";
                }
            }     
            echo json_encode($response);
        }
        public static function Delete($idrole){ 
            require("../Config/db.php");
            $cnn = Connection();   
            $response = new Result();
            $result = false;

            $result = mysqli_query($cnn,"update Roles set state = 2 where id =".$idrole);
            if($result){
                $response->result = 'Ok';
                $response->message="El permiso fue eliminado con exito";
            }
            else{
                $response->result = 'Error';
                $response->message="El permiso no fue eliminado con exito";
            }
            echo json_encode($response);
        }        
    }
?>