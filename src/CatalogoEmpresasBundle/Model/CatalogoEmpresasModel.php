<?php

namespace CatalogoEmpresasBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class CatalogoEmpresasModel {

    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();
    }
    public function getCatalogoEmpresas(){
        $result = $this->SQLModel->selectFromTable('Empresas');
        
        return $result;
    }
}
