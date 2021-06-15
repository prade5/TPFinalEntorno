<?php
    include_once('../middleware/genericMethod.php');
    class Photo extends genericMethod{
       
        public function __construct (){         
        }

        //method     
        public static function Get(){             
            $data = file_get_contents("../Data/photo.json");
            $products = json_decode($data, true);
            $sum = 0;
            echo("[");
            foreach ($products as $value)
            {   
                $sum = $sum + 1;
                $image = file_get_contents($value["url"]);
                $imgbinary = 'data:image/jpg;base64,'.base64_encode($image);
                $miArray = array("name"=>$value["name"], "url"=>$imgbinary );
               echo json_encode($miArray);
               if ($sum < count($products)) {
                echo(",");
              }
              
            }
            echo("]");
        }             
    }
?>