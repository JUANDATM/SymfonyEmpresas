<?php

namespace ControlAccesoBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class LoginModel {

    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();
    }
    public function insertarLoginUsuarios($data){
        $result = $this->SQLModel->insertIntoTable('Usuario',$data,'IdUsuario');
        return $result;
    }
}