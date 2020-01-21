<?php

namespace UsuariosBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use UsuariosBundle\Model\UsuariosModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    protected $UsuariosModel;

    public function __construct() {
        $this->UsuariosModel = new UsuariosModel();
    }

    public function adminUsuariosAction(){   
        $profile = $this->getUser();
        $user = $profile->getData();

        $result = $this->UsuariosModel->getUsuarios();
        $usuarios = $result['data'];
        $content['usuario'] = $usuarios;
        $content['user'] = $user;

        return $this->render('UsuariosBundle:Usuarios:adminUsuarios.html.twig', array('content' => $content));

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
        
         $result_Usuarios = $this->UsuariosModel->insertarUsuarios($data_Usuarios);
         $post['IdUsuario']=$result_Usuarios["data"][0]['IdUsuario'];
        
        
         if ($result_Usuarios['status']) {
         
            
            $result['status']=true;
            $result['data']=$post;

        } else {
            $result_Usuarios['status'] = FALSE;
            $result_Usuarios['error'] = "Error";
        }
        return $this->jsonResponse($result);

    }
    public function actualizarUsuarioAction(Request $request){   
        $post = $request->request->all();
       
        $data_Usuarios = array(
            
            "NombreUsuario" => "'" . $post["nombre"] . "'",
            "CorreoUsuario" =>"'". $post["correo"]."'",
            "PasswordUsuario" =>"'". $post["password"]."'",
            "DomicilioUsuario" => "'".$post["domicilio"]."'",
            "TipoUsuario" => "'".$post["rol"]."'",
        );
       
        
        $where=array("IdUsuario" => "'".$post["IdUsuario"]."'");
      
   
         $result_Usuarios = $this->UsuariosModel->actualizarUsuarios($data_Usuarios,$where);
        // $post['IdUsuario']=$result_Usuarios["data"][0]['IdUsuario'];
        
        
         if ($result_Usuarios['status']) {
         
            
            $result['status']=true;
            $result['data']=$post;

        } else {
            $result_Usuarios['status'] = FALSE;
            $result_Usuarios['error'] = "Error";
        }
        return $this->jsonResponse($result);

    }

    public function EliminarUsuarioAction(Request $request){   
        
        $post =$request->request->all();
        $result = $this->UsuariosModel->eliminarUsuarios($post);

        if ($result['status']) {
            $result['data'] = $post;
            $result['status'] = TRUE;
            $result['message'] = "Elimidado con exito";
        } else {
            $result['status'] = FALSE;
            $result['error'] = "Error";
        }
        return $this->jsonResponse($result);
    }
    
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
