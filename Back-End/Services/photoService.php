<?php
    class Photo{
       
        public function __construct (){         
        }

        //method     
        public static function Get(){             
            $data = file_get_contents("../Data/photo.json");
            $products = json_decode($data, true);
            echo json_encode($products);
        }             
    }
?>