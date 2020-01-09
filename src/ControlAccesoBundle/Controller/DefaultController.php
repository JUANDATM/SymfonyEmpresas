<?php

namespace ControlAccesoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use ControlAccesoBundle\Model\LoginModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    protected $UsuariosModel;

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
            $result = $this->LoginModel->getUsuarios($data);
            $aux = $result["data"][0]['TipoUsuario'];
            if ($result['data']==null) {
                $result['status'] = FALSE;
                $result['message']="ERROR";
            }else{ 
                if ($aux==1) {
                    $result['status']= 1;
                    $result['message']="ERROR";
                }else{
                    $result['status']= 2;
                    $result['message']="administrador";
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
