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
        $result = $this->CatalogoEmpresasModel->getCatalogoEmpresas();
        $empresas = $result['data'];

        $content['empresas'] = $empresas;
        return $this->render('CatalogoEmpresasBundle:CatalogoEmpresas:CatalogoEmpresas.html.twig', array('content' => $content));
    }

    public function CatalogoVistasAction(){   
        $result = $this->CatalogoEmpresasModel->getEmpresaVista();
        $vistas = $result['data'];

        $content['vistas'] = $vistas;
        
        return $this->render('CatalogoEmpresasBundle:CatalogoEmpresas:CatalogoVistas.html.twig', array('content' => $content));

    }
}
