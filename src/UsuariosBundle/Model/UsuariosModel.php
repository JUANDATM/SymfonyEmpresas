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
    public function insertarUsuarios($data){
        $result = $this->SQLModel->insertIntoTable('Usuario',$data,'IdUsuario');
        return $result;
    }
    public function eliminarUsuarios($post){
        $result = $this->SQLModel->deleteFromTable('Usuario',$post);
        return $result;
    }
}
