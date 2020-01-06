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
        $tmp = $_FILES['archivo']["tmp_name"];
        $tmp = file_get_contents($tmp);
        $base64 = base64_encode($tmp);
        $data_Empresas = array(
            "NombreEmpresa" => "'" . $post["nombre"] . "'",
            "DireccionEmpresa" =>"'". $post["direccion"]."'",
            "DescripcionEmpresa" =>"'". $post["descripcion"]."'",
            "TelefonoEmpresa" => "'".$post["telefono"]."'",
            "CorreoEmpresa" => "'".$post["correo"]."'",
        );
        $result_Empresas = $this->EmpresaModel->insertarEmpresas($data_Empresas);
        if ($result_Empresas['status']) {
            $data_img = array(
                "IdEmpresa" => $result_Empresas["data"][0]["IdEmpresa"] ,
                "FormatoImagen" =>"'".  $_FILES['archivo']["type"]."'",
                "RutaImagen" =>"'".$base64."'",
            );
            $result = $this->EmpresaModel->insertImagen($data_img);
            $result['status']=true;
            $result['data']=$post;
        } else {
            $result_Empresas['status'] = FALSE;
            $result_Empresas['error'] = "Error";
        }
        return $this->jsonResponse($result);
    }
    public function EliminarEmpresaAction(Request $request){   
        $post =$request->request->all();
        $result = $this->EmpresaModel->eliminarEmpresas($post);
        if ($result['status']) {
            $result['data'] = $post;
            $result['status'] = TRUE;
            $result['message'] = "Elimidado con exito";
        } else {
            $result['status'] = FALSE;
            $result['error'] = "Error";
        }
        return $this->jsonResponse($result);
    }
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
