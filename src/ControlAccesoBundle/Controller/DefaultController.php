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
/* SESIONES DE USUARIOS */
/* public function LogearAction(Request $request) {
    if ($request->getMethod() == 'POST') {
        $post = $request->request->all();
        $res = $this->DefaultModel->select($post);
        if ($res['status']) {
            session_destroy();
            if (count($res['data']) > 0) {
                session_start();
                $idUsuario = $_SESSION['idUsuario'] = $res['data'][0]['idUsuario'];
                $Correo = $_SESSION['Correo'] = $res['data'][0]['Correo'];
                $TipoUsuario = $_SESSION['TipoUsuario'] = $res['data'][0]['TipoUsuario'];
                $idTipoUsuario = $_SESSION['idTipoUsuario'] = $res['data'][0]['idTipoUsuario'];

                return new JsonResponse(array('status' => TRUE,
                    'data' => $res['data'][0]));
                
                
            } else {
                //false de usuario no encontrado
                return new JsonResponse(array('status' => FALSE,
                    'data' => 'no coincide'));
            }
        }

        return new JsonResponse(array('status' => FALSE,
            'data' => 'vacio'));
    }
} */
/* FINAL SESIONES DE USUARIOS */

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
            $user = $result["data"][0];
            $aux = $result["data"][0]['TipoUsuario'];
            
            /*print_r($aux);
            die();*/

            //TipoUsuario : ROLE_USER para viewer ..... ROLE_ADMIN

            $login = false;

            if ($result['data']==null) {
                $result['status'] = FALSE;
                $result['message']="ERROR";
            }
            if ($aux=="admin") {
                    $result['status']= 1;
                    $result['message']="Administrador";
                    $login = true;
            }
            if($aux=="usuario"){
                    $result['status']= 2;
                    $result['message']="Usuario";
                    $login = true;
            }

        if($login){
                /* Creamos el objeto Profile con los datos presentados por el formulario */
                $roles = array($aux);
                /*print_r($roles);
                die();*/
                $profile = new Profile($data['CorreoUsuario'], $data['PasswordUsuario'], '*;7/SjqjVjIsI*', $roles);
                $profile->setData($data);
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
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
