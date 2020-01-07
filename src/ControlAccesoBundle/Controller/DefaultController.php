<?php

namespace ControlAccesoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use ControlAccesoBundle\Model\ControlAccesoModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    protected $ControlModel;

    public function __construct() {
        $this->ControlAccesoModel = new ControlAccesoModel();
    }
    public function loginUsuarioAction(){   
        
        return $this->render('ControlAccesoBundle:Acceso:loginUsuario.html.twig');
    }
}
