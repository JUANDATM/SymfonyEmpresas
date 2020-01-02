<?php

namespace EmpresaBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class EmpresaModel {

    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();
    }
    public function getEmpresas(){
        $fields = ' SELECT ';
        $fields .= ' e."IdEmpresa",';
        $fields .= ' e."NombreEmpresa",';
        $fields .= ' e."DireccionEmpresa",';
        $fields .= ' e."DescripcionEmpresa",';
        $fields .= ' e."TelefonoEmpresa", ';
        $fields .= ' e."CorreoEmpresa", ';
        $fields .= ' i."IdEmpresa",';
        $fields .= ' i."FormatoImagen",';
        $fields .= ' i."RutaImagen" ';
        $fields .= ' FROM "EMPRESAS"."Empresa" e ';
        $fields .= ' INNER JOIN "EMPRESAS"."Imagenes" i on  ';
        $fields .= ' e."IdEmpresa" = i."IdEmpresa" ';
        $result = $this->SQLModel->executeQuery($fields);

        if (!($result['status'] && count($result['data']) > 0)) {
            return $result;
        }
        foreach ($result['data'] as $value) {
            $data[$value['IdEmpresa']] = $value;
        }
        $result["data"] = $data;
        return $result;
    }
    public function insertarEmpresas($data){
        $result = $this->SQLModel->insertIntoTable('Empresa',$data,'IdEmpresa');

        return $result;
    }
    public function eliminarEmpresas($post){
        $result = $this->SQLModel->deleteFromTable('Empresa',$post);

        return $result;
    }

    public function insertImagen($post){
        $result = $this->SQLModel->InsertintoTable('Imagenes',$post);

        return $result;
    }
}


