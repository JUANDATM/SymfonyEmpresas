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
        $user = $profile->getData();
         
        $result = $this->CatalogoEmpresasModel->getCatalogoEmpresas();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;
        $content['user'] = $user;

        return $this->render('CatalogoEmpresasBundle:CatalogoEmpresas:CatalogoEmpresas.html.twig', array('content' => $content));

    }
}
