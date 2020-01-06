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
    public function indexAction()
    {
        return $this->render('UsuariosBundle:Default:index.html.twig');
    }

    public function adminUsuariosAction(){   
        $result = $this->UsuariosModel->getUsuarios();
        $usuarios = $result['data'];
        $content['usuario'] = $usuarios;

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
        
         $this->UsuariosModel->insertarUsuarios($data_Usuarios);
         return true;

    }

    public function EliminarUsuarioAction(Request $request){   
        
        $post =$request->request->all();
        $this->UsuariosModel->eliminarUsuarios($post);
        return true;
    }

}
