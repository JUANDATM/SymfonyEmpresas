<?php

namespace ControlAccesoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use ControlAccesoBundle\Model\LoginModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use ControlAccesoBundle\Model\Profile;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class DefaultController extends Controller
{
    protected $LoginModel;
    
    public function __construct() {
        $this->LoginModel = new LoginModel();
    }

    public function loginUsuarioAction(Request $request){
        $session = $request->getSession();

        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();   
            $data = array(
                "CorreoUsuario"=> "'" . $post["usuario"] . "'",
                "PasswordUsuario"=> "'" . $post["contra"] . "'"
            );
            
            $result = $this->LoginModel->getUsuarios($data);
            /*print_r($result);
            die();*/
            $aux = $result["data"][0]['TipoUsuario'];
            /*print_r($aux);
            die();*/

            //TipoUsuario : ROLE_USER para viewer ..... ROLE_ADMIN

            $login = false;

            if ($result['data']==null) {
                $result['status'] = FALSE;
                $result['message']="ERROR";
            }
            if ($aux=="ROLE_ADMIN") {
                    $result['status']= 1;
                    $result['message']="Administrador";
                    $login = true;
            }
            if($aux=="ROLE_USER"){
                    $result['status']= 2;
                    $result['message']="Usuario";
                    $login = true;
            }

        if($login){
                /* Creamos el objeto Profile con los datos presentados por el formulario */
                $roles = array($aux);
                /*print_r($roles);
                die();*/
                $profile = new Profile($result['data'][0]['CorreoUsuario'], $result['data'][0]['PasswordUsuario'], '*;7/SjqjVjIsI*', $roles);
                $profile->setData($result['data'][0]);
                // Creamos el token
                $token = new UsernamePasswordToken($profile, $profile->getPassword(), 'main', $profile->getRoles());

                $this->container->get('security.token_storage')->setToken($token);
                // Creamos e iniciamos la sesión
                /*print_r($token);
                die();*/
                $session->set('_security_main', serialize($token));

        }        
        
        
        return $this->jsonResponse($result);
        }
        return $this->render('ControlAccesoBundle:Acceso:loginUsuario.html.twig');
    }

    public function InsertarUsuarioAction(Request $request){   
        $post = $request->request->all();

        $data_Usuarios = array(
            "NombreUsuario" => "'" . $post["nombre"] . "'",
            "CorreoUsuario" =>"'". $post["correo"]."'",
            "PasswordUsuario" =>"'".$post["password"] ."'",
            "DomicilioUsuario" => "'".$post["domicilio"]."'",
            "TipoUsuario" => "'".$post["rol"]."'",
        );
        /*if($data_Usuarios["CorreoUsuario"]!=$data_Usuarios["CorreoUsuario"]){
            $result_Usuarios['status'] = TRUE;
            $result_Usuarios['message']="BIEN";
            
        }
        if($data_Usuarios["CorreoUsuario"]==$data_Usuarios["CorreoUsuario"]){
            $result_Usuarios['status'] = FALSE;
            $result_Usuarios['message']="ERROR";
        }*/
        $result_Usuarios = $this->LoginModel->insertarLoginUsuarios($data_Usuarios); 
        return $this->jsonResponse($result_Usuarios);

    }
    public function logoutAction(Request $request) {
        $session = $request->getSession();
        $lang = $session->get('lang');
        date_default_timezone_set('America/Mexico_City');
        /* Actualizamos el Status del log de Control de Session a 0 = Inactiva */
        $data_log['Status'] = 0;
        $data_log['FechaHoraTermino'] = date("Y-m-d h:i:s");
        $this->get('ixpo_log')->updateLoginLog($data_log);
        /* Redirige sino lo manda al login en modo produccion */
        $url = $this->generateUrl('login', array('lang' => $lang));
        //clear the token, cancel session and redirect
        $this->container->get('security.token_storage')->setToken(null);
        $this->get('session')->invalidate();
        $session->clear();
        $session->migrate();
        return $this->redirect($url);
    }

    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
