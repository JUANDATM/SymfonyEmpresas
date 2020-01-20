<?php

namespace ControlAccesoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use ControlAccesoBundle\Model\LoginModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

    public function loginUsuarioAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();  
              
            $data = array(
                "CorreoUsuario"=> "'" . $post["usuario"] . "'",
                "PasswordUsuario"=> "'" . $post["contra"] . "'"
            );
           
            
            $result = $this->LoginModel->getUsuarios($data);
            /* print_r($result);
            die(); */
            $aux = $result["data"][0]['TipoUsuario'];
            
            /*print_r($aux);
            die();*/

            if ($result['data']==null) {
                $result['status'] = FALSE;
                $result['message']="ERROR";
            }else{ 
                if ($aux=="admin") {
                    $result['status']= 1;
                    $result['message']="Administrador";
                }
                if($aux=="usuario"){
                    $result['status']= 2;
                    $result['message']="Usuario";
                }
            }

            return $this->jsonResponse($result);
        }
        return $this->render('ControlAccesoBundle:Acceso:loginUsuario.html.twig');
    }

    public function InsertarUsuarioAction(Request $request){   
        $post = $request->request->all();
       // $encriptar = md5($post['Contraseña']);
        $data_Usuarios = array(
            "NombreUsuario" => "'" . $post["nombre"] . "'",
            "CorreoUsuario" =>"'". $post["correo"]."'",
            "PasswordUsuario" =>"'". md5($post["password"]) ."'",
            "DomicilioUsuario" => "'".$post["domicilio"]."'",
            "TipoUsuario" => "'".$post["rol"]."'",
        );
        /* print_r($data_Usuarios);
        die(); */

        $result_Usuarios = $this->LoginModel->insertarLoginUsuarios($data_Usuarios);
        return $this->jsonResponse($result_Usuarios);

    }
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
