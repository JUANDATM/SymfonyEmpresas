<?php

namespace EmpresaBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use EmpresaBundle\Model\EmpresaModel;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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
    public function InsertarEmpresaAction(Request $request){   
        
        $post =$request->request->all();
        print_r($post);
        die('x_x');
        $result = $this->EmpresaModel->getEmpresas();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;
        return $this->render('EmpresaBundle:Empresas:adminEmpresas.html.twig', array('content' => $content));

    }
    
}
