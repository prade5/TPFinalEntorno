<?php
include_once('../PhpMailer/PHPMailerAutoload.php');
include_once('../Config/constant.php');

    class Send{
        public function __construct(){           
        }

        public static function SendMailGoogle($message, $to, $subject){
            //Create a new PHPMailer instance
            $mail = new PHPMailer();
            $mail->IsSMTP();
            
            //Configuracion servidor mail
            $mail->From = "tpfinalentorno@gmail.com"; //remitente
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls'; //seguridad
            $mail->Host = "smtp.gmail.com"; // servidor smtp
            $mail->Port = 587; //puerto
            $mail->Username ='tpfinalentorno@gmail.com'; //nombre usuario
            $mail->Password = '2021tpfinalentorno2012'; //contraseña
            $mail->isHTML(true);
            $mail->CharSet = "utf-8";

            $mail->setFrom('tpfinalentorno@gmail.com', 'Sistema de concurso');
            $mail->AddAddress($to);
            $mail->Subject = $subject;
            
            $mail->Body = $message;

            $return = $mail->Send();
            return $return;
        }

        public static function MessageRegister($full_name, $username, $password, $id){
            $baseLink ="https://tpfinalentornos.000webhostapp.com/Back-End/api/User/confirmRegister.php?confirmuser=".$id;

//            Para la version deployada
//            $baseLink ="https://tpfinalentornos.000webhostapp.com/Back-End/api/User/confirmRegister.php?confirmuser=".$id;

            $message  ='<div>
            <div style="text-align: left; margin-top: 25px;"><img src="'.PHOTOHEADER.'"  alt="cabecera"/></div>
            <div style="text-align: left; margin-left: 25px; margin-top: 10px;"><br/>Bienvenido <strong>'.$full_name.' </strong> al sistema de concurso. <br/><br/> Gracias por registrar al sistema de concurso <strong>UTN Frro&copy;</strong>.<br/>Para continuar, confirme su cuenta haciendo clic en el bot&oacute;n de abajo:</div>
            <div style="text-align: left; margin-left: 230px;"><br/><a href='.$baseLink.'><img src="http://i.imgur.com/MNrJ1aj.png" alt="imagen" /></a></div>
            <div style="text-align: left;margin-top: 25px;width: 100%;">Si no ve la imagen, por favor, <a href='.$baseLink.'>click aqui</a> <br /><br />Una vez que confirme la cuenta, puede iniciar sesión con sus datos: <br />- Nombre usuario: '.$username.' <br />- Contraseña: '.$password.' <br /><br />Gracias. <br />Equipos <strong>UTN Frro&copy;</strong>.</div>
            </div>'; 
            return $message;
        }

        public static function MessageApplicant($full_name, $link, $subject, $position, $jcm){

//            Para la version deployada
//            $baseLink ="https://tpfinalentornos.000webhostapp.com/Back-End/api/".$link;

            $baseLink ="https://tpfinalentornos.000webhostapp.com/Back-End/api/".$link;

            $message  =
            '<div>
                <div style="text-align: left; margin-top: 25px;">
                    <img src="'.PHOTOHEADER.'" alt="cabecera"/>
                </div>
                <div style="text-align: left; margin-left: 25px; margin-top: 10px;">
                    <br/>Bienvenido <strong>'.$full_name.' </strong> 
                    al sistema de concurso. <br/><br/> 
                    Ha sido postulado(a) al concuso de la materia '.$subject.' 
                    .<br/>Abajo viene los detalles de ese concurso:<br/>
                    -<strong>Materia</strong>:'.$subject.' <br/>
                    -<strong>Puesto</strong>:'.$position.' <br/>
                    -<strong>Jefe de catedra</strong>:'.$jcm.'<br/>
                </div>
                <div style="text-align: left;margin-top: 25px;width: 100%;">
                    Si desees eliminar los postulacion al concurso , 
                    <a href='.$baseLink.'>click aqui</a> <br/><br/>
                    Una vez que lo elimina no va a poder a participar en el concurso. <br/>
                    Gracias. <br />Equipos <strong>UTN Frro&copy;</strong>.
                </div>
            </div>'; 
            return $message;
        }
    }
?>