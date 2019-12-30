<?php

namespace UsuariosBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class UsuariosModel {

    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();
    }
    public function getUsuarios(){
        $result = $this->SQLModel->selectFromTable('Usuario');
        
        return $result;
    }
}
