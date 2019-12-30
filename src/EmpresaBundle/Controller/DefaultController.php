<?php

namespace EmpresaBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('EmpresaBundle:Default:index.html.twig');
    }

    public function adminEmpresasAction()
    {
        return $this->render('EmpresaBundle:Empresas:adminEmpresas.html.twig');
    }

    public function adminUsuariosAction()
    {
        return $this->render('EmpresaBundle:Empresas:adminUsuarios.html.twig');
    }
}
