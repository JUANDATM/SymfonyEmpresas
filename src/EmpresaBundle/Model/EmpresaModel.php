<?php

namespace EmpresaBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class EmpresaModel {

    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();
    }
    public function getEmpresas(){
        $result = $this->SQLModel->selectFromTable('Empresa');
        
        return $result;
    }
    public function insertEmpresas($data){
        $result = $this->SQLModel->insertIntoTable('Empresa',$data,'IdEmpresa');

        return $result;
    }
}
