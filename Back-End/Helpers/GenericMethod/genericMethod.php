<?php
    include_once('../Config/constant.php');
    // require("../Config/cors.php");
    class genericMethod{
        protected $request;
        protected $serviceName;
        protected $param;

        public function __construct(){
            if($_SERVER['REQUEST_METHOD'] !== 'POST'){
                $this->ThrowError(REQUEST_METHOD_NOT_VALID,'Peticion no valida');
            }
            $handler = fopen('php://input','r');
            $this->request = stream_get_contents($handler);
            $this->ValidateRequest();
        }

        public function ValidateRequest() {
            if($_SERVER['CONTENT_TYPE'] !== 'application/json'){
                $this->ThrowError(REQUEST_METHOD_NOT_VALID, 'Content type is not valid');
            }
            
            $data = json_decode($this->request, true);
            if(!isset($data['name']) || $data['name'] == ""){
                $this->ThrowError(API_NAME_REQUIRED, 'API name required.');
            }
            $this->serviceName = $data['name'];

            if(!is_array($data['param'])){
                $this->ThrowError(API_NAME_REQUIRED, 'API param name is required.');
            }
            $this->param = $data['param'];
        }

        public function ProcessApi(){           
            try {
                $api = new auth;                
				$rMethod = new reflectionMethod('auth', $this->serviceName);
				if(!method_exists($api, $this->serviceName)) {
					$this->throwError(API_DOST_NOT_EXIST, "API does not exist.");
				}
				$rMethod->invoke($api);
			} catch (Exception $e) {
				$this->throwError(API_DOST_NOT_EXIST, "API does not exist.");
			}
        }

        public function ValidateParameter($fieldName, $value, $dataType, $required = true){
            if($required == true && empty($value) == true){
                $this->throwError(VALIDATE_PARAMETER_REQUIRED, $fieldName . " parameter is required.");
            }
            switch ($dataType) {
				case BOOLEAN:
					if(!is_bool($value)) {
						$this->throwError(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName . '. It should be boolean.');
					}
					break;
				case INTEGER:
					if(!is_numeric($value)) {
						$this->throwError(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName . '. It should be numeric.');
					}
					break;

				case STRING:
					if(!is_string($value)) {
						$this->throwError(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName . '. It should be string.');
					}
					break;
				
				default:
					$this->throwError(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName);
					break;
			}

			return $value;
        }

        public function ThrowError($code, $msg){
            header("Content-Type: application/json; charset=UTF-8");
            $errormsg = json_encode(['error'=>['status'=>$code, 'message'=>$msg]]);
            echo $errormsg;
            exit;
        }

        public function ReturnReponse($code, $data){
            header("content-type: application/json");
			$response = json_encode(['resonse' => ['status' => $code, "result" => $data]]);
			echo $response; exit;
        }
    }
?>