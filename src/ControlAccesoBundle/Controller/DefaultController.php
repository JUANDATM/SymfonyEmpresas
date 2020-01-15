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

    public function loginUsuarioAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
          $post = $request->request->all();    
            $data = array(
                "CorreoUsuario"=> "'" . $post["usuario"] . "'",
                "PasswordUsuario"=> "'" . $post["contra"] . "'"
            );
            /*print_r($data);
            die();*/
            $result = $this->LoginModel->getUsuarios($data);
            /*print_r($result);
            die();*/
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
        $data_Usuarios = array(
            "NombreUsuario" => "'" . $post["nombre"] . "'",
            "CorreoUsuario" =>"'". $post["correo"]."'",
            "PasswordUsuario" =>"'". $post["password"]."'",
            "DomicilioUsuario" => "'".$post["domicilio"]."'",
            "TipoUsuario" => "'".$post["rol"]."'",
        );

        $result_Usuarios = $this->LoginModel->insertarLoginUsuarios($data_Usuarios);
        return $this->jsonResponse($result_Usuarios);

    }
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
