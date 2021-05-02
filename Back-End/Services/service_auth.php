<?php
    include_once('../Helpers/GenericMethod/genericMethod.php');
    include_once("../Config/db.php");
    require_once('../middleware/JWT.php');
    class auth extends genericMethod{
        private $dbConn;
        public function __construct(){
           parent::__construct();
           $db = new DbContext;
           $this->dbConn = $db->connect();
        }

        public function GenerateToken(){
           $username = $this->ValidateParameter('userName', $this->param['name'], STRING);
           $userpass = $this->ValidateParameter('userPass', $this->param['description'], STRING);
           try {
                $stmt = $this->dbConn->prepare("SELECT * FROM accounts WHERE username = :username AND userpass = :userpass");
                $stmt->bindParam(":username", $username);
                $stmt->bindParam(":userpass", $userpass);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if(!is_array($user)) {
                    $this->returnResponse(INVALID_USER_PASS, "Email or Password is incorrect.");
                }

                if( $user['active'] == 0 ) {
                    $this->returnResponse(USER_NOT_ACTIVE, "User is not activated. Please contact to admin.");
                }

                $paylod = [
                    'iat' => time(),
                    'iss' => 'localhost',
                    'exp' => time() + (15*60),
                    'userId' => $user['id']
                ];

                $token = JWT::encode($paylod, SECRETE_KEY);
                
                $data = ['token' => $token];
                $this->returnResponse(SUCCESS_RESPONSE, $data);
            } catch (Exception $e) {
                $this->throwError(JWT_PROCESSING_ERROR, $e->getMessage());
            }
        }
    }
?>