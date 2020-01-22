<?php

namespace CatalogoEmpresasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CatalogoEmpresasBundle\Model\CatalogoEmpresasModel;


class DefaultController extends Controller
{
      
    protected $CatalogoEmpresasModel;

    public function __construct() {
        $this->CatalogoEmpresasModel = new CatalogoEmpresasModel();
    }
    public function CatalogoEmpresasAction(){ 
        $profile = $this->getUser();
        if($profile != ''){
            $user = $profile->getData();
            $content['user'] = $user;
        }
             
        $result = $this->CatalogoEmpresasModel->getCatalogoEmpresas();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;

        return $this->render('CatalogoEmpresasBundle:CatalogoEmpresas:CatalogoEmpresas.html.twig', array('content' => $content));
    }

    public function CatalogoVistasAction(){   
        $profile = $this->getUser();
        $user = $profile->getData();
        $result = $this->CatalogoEmpresasModel->getEmpresaVista();
        $vistas = $result['data'];

        $content['vistas'] = $vistas;
        $content['user'] = $user;
        return $this->render('CatalogoEmpresasBundle:CatalogoEmpresas:CatalogoVistas.html.twig', array('content' => $content));

    }
}
