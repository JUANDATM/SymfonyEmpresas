<?php

namespace UsuariosBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use UsuariosBundle\Model\UsuariosModel;

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
}
