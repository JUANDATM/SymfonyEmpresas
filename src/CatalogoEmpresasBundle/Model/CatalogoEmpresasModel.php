<?php

namespace CatalogoEmpresasBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class CatalogoEmpresasModel {

    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();
    }
    public function getCatalogoEmpresas(){
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
}
