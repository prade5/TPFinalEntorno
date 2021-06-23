<?php
    include_once("../Config/db.php");
    include_once('../middleware/genericMethod.php');
    include_once('../middleware/JWT.php');
    include_once('../Config/constant.php');
    include_once('../Helpers/Security/Securitypass.php');
    
    class Auth extends genericMethod{
        private $id;  
        private $userName;
        private $userPass;

        public function __construct ($id, $userName, $userPass){
            #region initial
            $this->id = $id;           
            $this->userName = $userName;
            $this->userPass = $userPass;
            #endregion
        }

        //method  
        public function Login(){
            try{
                $cnn = Connection();
                
                $passencrypt = Security::Encrypt($this->userPass);                
               
                $users = mysqli_query($cnn,"select u.id as idUser, u.idRole, r.name as role, u.isActivate from users u inner join roles r on u.idRole = r.id where (userName ='$this->userName'  OR mail ='$this->userName') AND userPass='$passencrypt'");
                $userlogin = ""; 
                while($reg = mysqli_fetch_array($users,MYSQLI_ASSOC)){
                    $userlogin = $reg;
                }   
                
                if($userlogin != ""){
                    if($userlogin['isActivate'] ==  "0"){
                        $this->ReturnReponse(ERROR_RESPONSE, "Falta la confirmación para esa cuenta");                
                    }
                    else{
                        $paylod = [
                            'iat' => time(),
                            'iss' => 'localhost',
                            'exp' => time() + (24*3600),
                            'userId' => $userlogin['idUser'],
                            'idRole' => $userlogin['idRole'],
                            'role' => $userlogin['role'],
                            'isActivate'=>$userlogin['isActivate']
                        ];
                        $token = JWT::encode($paylod, SECRET_KEY);   
                        $data = ['jwt' => $token, 'role' =>$userlogin['role']];
                        $this->ReturnReponse(SUCCESS_RESPONSE, $data); 
                    }              
                   
                }
                else{
                    $this->ReturnReponse(ERROR_RESPONSE, "Usuario y/o contraseña incorrecto.".$this->userPass);                  
                }  
            } catch (\Exception $e) {
                $this->ReturnReponse(ERROR_RESPONSE, $e->getMessage());
            }
        }

        public static function ChangePassword($id, $userPass){
            $cnn = Connection();
            
            if($userPass == ""){
                echo json_encode(['response' => ['status' => 301, "message" => "Ingresa la contraseña."]]);
                exit;
            }     
            $result = mysqli_query($cnn,"update users set userPass ='$userPass'
                                    where id =".$id);
            if($result){
                echo json_encode(['response' => ['status' => SUCCESS_RESPONSE, "message" => "La contraseña fue modificada con exito."]]);
                exit;
            }
            else{
                echo json_encode(['response' => ['status' => SUCCESS_RESPONSE, "message" => "NO se pudo modificar la contraseña."]]);
                exit;
            }    
        }  
    }
?>