<?php

namespace CatalogoEmpresasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CatalogoEmpresasBundle\Model\CatalogoEmpresasModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use ControlAccesoBundle\Model\Profile;

class DefaultController extends Controller
{
    protected $CatalogoEmpresasModel;

    public function __construct() {
        $this->CatalogoEmpresasModel = new CatalogoEmpresasModel();
    }

    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
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

    public function InsertarVistaAction(Request $request){
        $profile = $this->getUser();
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            if ($profile == null) {
                $post = $request->request->all();
                $data = array(
                    "IdEmpresa"=> "'" . $post["IdEmpresa"] . "'"
                   );
            }else{
                $user = $profile->getData();
                $content['user'] = $user;
                if ($content['user']['TipoUsuario'] == "ROLE_ADMIN") {
                    $result['message']="Visita de administrador";
                }else{
                    $post = $request->request->all();
                   
                    $data = array(
                        "IdEmpresa"=> "'" . $post["IdEmpresa"] . "'",
                        "IdUsuario"=> "'" . $content['user']['IdUsuario'] . "'"
                    );
                }
            }
       $result = $this->CatalogoEmpresasModel->InsertarVista($data);
        if ($result['status']) {
            $result['data'] = $post;
            $result['status'] = TRUE;
            $result['message']="Eliminado con exito";
        }else{
            $result['status'] = FALSE;
            $result['message']="ERRORRRR";
        }
        return $this->jsonResponse($result);
        }
    }
}
