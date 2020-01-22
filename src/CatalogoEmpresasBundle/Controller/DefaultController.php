<?php

namespace CatalogoEmpresasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CatalogoEmpresasBundle\Model\CatalogoEmpresasModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
<<<<<<< HEAD
use ControlAccesoBundle\Model\Profile;
=======
>>>>>>> 116593c06251cedd921571a2d6e2ddf15cc819a9


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

<<<<<<< HEAD
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
=======
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

    
>>>>>>> 116593c06251cedd921571a2d6e2ddf15cc819a9
}
