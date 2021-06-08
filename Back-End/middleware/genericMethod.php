<?php
    include_once('../Config/constant.php');
    include_once("../Config/db.php");
    // require("../Config/cors.php");
    class genericMethod{
        protected $request;
        protected $serviceName;
        protected $param;

        public function __construct(){           
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
		public function checkNonerepeat($tableme, $fieldname, $filter, $message = ''){
			$cnn = Connection();
            $checkRoleNonerepeat = mysqli_query($cnn,"select * from ".$tableme ." where state = 1 && " .$fieldname ." = '$filter'");
            $userList = [];
            while($reg = mysqli_fetch_array($checkRoleNonerepeat)){
                $userList = $reg;
            }
            $check = count($userList);
            if($check === 0){
                return true;
            }                   
			$this->throwError(USER_ALREADY_EXIST, $message);
        }
		
        public function Validate_Email($mail){
           $result = filter_var($mail, FILTER_VALIDATE_EMAIL);
            if ($result == false ) {
                $this->ThrowError(E_MAIL_ALREADY_EXIST, "Esta dirección de correo '$mail' no es valida");
            }
            return true;
            
        }

        public function ThrowError($code, $msg){
            header("Content-Type: application/json; charset=UTF-8");
            $errormsg = json_encode(['response'=>['status'=>$code, 'message'=>$msg]]);
            echo $errormsg;
            exit;
        }

        public function ReturnReponse($code, $data){
            header("content-type: application/json");
			$response = json_encode(['response' => ['status' => $code, "message" => $data]]);
			echo $response; 
            exit;
        }

        public function ValidatePassWord($pass){
            if(strlen($pass) < 6){
                $this->ThrowError(ERROR_NONE_VALID, "La clave debe tener al menos 6 caracteres");               
            }
            if(strlen($pass) > 50){
                $this->ThrowError(ERROR_NONE_VALID, "La clave no puede tener más de 50 caracteres");
            }
            if (!preg_match('`[a-z]`',$pass)){
                $this->ThrowError(ERROR_NONE_VALID, "La clave debe tener al menos una letra minúscula");
            }
            if (!preg_match('`[A-Z]`',$pass)){
                $this->ThrowError(ERROR_NONE_VALID, "La clave debe tener al menos una letra mayúscula");
            }
            if (!preg_match('`[0-9]`',$pass)){
                $this->ThrowError(ERROR_NONE_VALID, "La clave debe tener al menos un caracter numérico");
            }
            return true;
        }

        public function ValidateUser($user){
            if(strlen($user) < 6){
                $this->ThrowError(ERROR_NONE_VALID, "El usuario debe tener al menos 6 caracteres");               
            }
            if(strlen($user) > 50){
                $this->ThrowError(ERROR_NONE_VALID, "El usuario no puede tener más de 50 caracteres");
            }
            return true;
        }
        
		public function ReturnToken($code, $data){
            header("content-type: application/json");
			$response = json_encode(['response' => ['status' => $code, "token" => $data]]);
			echo $response; 
            exit;
        }
        /**
	    * Get hearder Authorization
	    * */
	    public function GetAuthorizationHeader(){
	        $headers = null;
	        if (isset($_SERVER['Authorization'])) {
	            $headers = trim($_SERVER["Authorization"]);
	        }
	        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
	            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
	        } elseif (function_exists('apache_request_headers')) {
	            $requestHeaders = apache_request_headers();
	            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
	            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
	            if (isset($requestHeaders['Authorization'])) {
	                $headers = trim($requestHeaders['Authorization']);
	            }
	        }
	        return $headers;
	    }
	    /**
	     * get access token from header
	     * */
	    public function GetBearerToken() {
	        $headers = $this->GetAuthorizationHeader();
	        // HEADER: Get the access token from the header
	        if (!empty($headers)) {
	            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
	                return $matches[1];
	            }
	        }
	        $this->throwError( ATHORIZATION_HEADER_NOT_FOUND, 'Access Token Not found');
	    }
    }
?>