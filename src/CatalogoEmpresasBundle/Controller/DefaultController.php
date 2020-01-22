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
    public function CatalogoEmpresasAction(){  
        $profile = $this->getUser();
        $user = $profile->getData();
         
        $result = $this->CatalogoEmpresasModel->getCatalogoEmpresas();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;
        $content['user'] = $user;

        return $this->render('CatalogoEmpresasBundle:CatalogoEmpresas:CatalogoEmpresas.html.twig', array('content' => $content));
    }

    public function CatalogoVistasAction(){   
        $result = $this->CatalogoEmpresasModel->getEmpresaVista();
        $vistas = $result['data'];

        $content['vistas'] = $vistas;
        
        return $this->render('CatalogoEmpresasBundle:CatalogoEmpresas:CatalogoVistas.html.twig', array('content' => $content));

    }

    //insertar en tabla empresavista de usuarios 
    public function InsertarEmpresaVistaAction(Request $request){   
        $post = $request->request->all();
        $result = $this->CatalogoEmpresasModel->getUsuarios($data);
        $aux = $result["data"][0]['TipoUsuario'];
        $profile = new Profile($result['data'][0]['CorreoUsuario'], $result['data'][0]['PasswordUsuario'], '*;7/SjqjVjIsI*', $roles);

        $data_EmpresaVista = array(
            "IdEmpresa" => "'" . $post["IdEmpresa"] . "'",
            "IdUsuario" =>"'". $post["IdUsuario"]."'",
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
    //usuarios
    public function adminUsuariosAction(){   
        $profile = $this->getUser();
        $user = $profile->getData();

        $result = $this->UsuariosModel->getUsuarios();
        $usuarios = $result['data'];
        $content['usuario'] = $usuarios;
        $content['user'] = $user;

        return $this->render('UsuariosBundle:Usuarios:adminUsuarios.html.twig', array('content' => $content));

    }
}
