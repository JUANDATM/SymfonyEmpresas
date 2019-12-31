<?php

namespace EmpresaBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use EmpresaBundle\Model\EmpresaModel;

class DefaultController extends Controller
{
    
    protected $EmpresasModel;

    public function __construct() {
        $this->EmpresaModel = new EmpresaModel();
    }
    public function adminEmpresasAction(){   
        $result = $this->EmpresaModel->getEmpresas();
        $empresas = $result['data'];


        $content['empresas'] = $empresas;

        return $this->render('EmpresaBundle:Empresas:adminEmpresas.html.twig', array('content' => $content));

    }
    
}
