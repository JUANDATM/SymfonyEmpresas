<?php

namespace CatalogoEmpresasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CatalogoEmpresasBundle\Model\CatalogoEmpresasModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


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

    //insertar en tabla empresavista de usuarios 
    public function InsertarEmpresaVistaAction(Request $request){   
        $post = $request->request->all();
        $data_EmpresaVista = array(
            "IdEmpresa" => "'" . $post["IdEmpresa"] . "'",
            "IdUsuario" =>"'". $post["IdUsuario"]."'",
            "Fecha" =>"'". md5($post["password"]) ."'",
        );
        
         $result_EmpresaVista = $this->CatalogoEmpresasModel->InsertEmpresaVista($data_EmpresaVista);
         $post['IdEmpresa']=$result_EmpresaVista["data"][0]['IdEmpresa'];
        
        
         if ($result_EmpresaVista['status']) {
         
            
            $result['status']=true;
            $result['data']=$post;

        } else {
            $result_EmpresaVista['status'] = FALSE;
            $result_EmpresaVista['error'] = "Error";
        }
        return $this->jsonResponse($result);

    }
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
