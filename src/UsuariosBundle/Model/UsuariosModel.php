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
        if (!($result['status'] && count($result['data']) > 0)) {
            return $result;
        }
        foreach ($result['data'] as $value) {
            $data[$value['IdUsuario']] = $value;
        }
        $result["data"] = $data;
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
    public function actualizarUsuarios($data,$where){
        // $where=array('IdEmpresa'='IdEmpresa');
         $result = $this->SQLModel->updateFromTable('Usuario',$data,$where);
       
         return $result;
     }
}
