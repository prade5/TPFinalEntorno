<?php
    include_once('../middleware/genericMethod.php');
    class PerfilPhoto extends genericMethod{
       
        public function __construct (){         
        }

        //method     
        public static function Get(){             
            $data = file_get_contents("../Data/perfil.json");
            $products = json_decode($data, true);
            $sum = 0;
            echo("[");
            foreach ($products as $value)
            {   
                $sum = $sum + 1;
                $image = file_get_contents($value["url"]);
                $img = 'data:image/jpg;base64,'.base64_encode($image);
                $miArray = array("id"=>$value["id"],"url"=>$img);
               echo json_encode($miArray);
               if ($sum < count($products)) {
                echo(",");
              }
              
            }
            echo("]");
        } 
        
        public static function GetById($id){             
            $data = file_get_contents("../Data/perfil.json");
            $products = json_decode($data, true);
            $sum = 0;
            $photo = array_filter( $products, function( $e ) use(&$id) {
                if($e['id'] == $id){
                    $miArrayunq = array("id"=>$e["id"],"url"=>$e["url"]);
                    return $e;
                }
            });

            $check = count($photo);
            if($check == 0){
                return null;
            }
            
            foreach ($photo as $value)
            {   
                $image = file_get_contents($value["url"]);
                $img = 'data:image/jpg;base64,'.base64_encode($image);
                $miArray = array("id"=>$value["id"],"url"=>$img);
               echo json_encode($miArray);              
            }
        } 
    }
?>