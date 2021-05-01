<?php
    class messageHelper{
        public function __construct(){
            $handler = fopen('php://input','r');
            $request = stream_get_contents($handler);
            echo $request;
        }

        public function ValidateRequest(){}

        public function ProcessApi(){}

        public function ValidateParameter($fielName, $value, $datatype, $required){}

        public function ThrowError($code, $msg){}

        public function ReturnReponse(){}
    }
?>