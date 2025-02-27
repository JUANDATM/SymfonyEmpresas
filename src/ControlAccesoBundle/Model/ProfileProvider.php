<?php

namespace ControlAccesoBundle\Model;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;
use ControlAccesoBundle\Model\LoginModel;

class ProfileProvider implements UserProviderInterface {
    private $LoginModel, $container;
    
    public function __construct( ContainerInterface $container = null) {
        $this->container = $container;
        $this->LoginModel = new LoginModel();
    }

    public function loadUserByUsername($username = "none") {
        // make a call to your webservice here
        if ($username == "" || $username == "*") {
            $username = "_none_username";
            throw new UsernameNotFoundException(sprintf('Username "%s" does not exist.', $username));
        }
    
        $request = Request::createFromGlobals();
        $_id_Visitante = $request->get('_port');
        
        $session = $this->container->get('session');
        $session->getFlashBag()->add('TMP_port', $_id_Visitante);
        $session->getFlashBag()->add('TMP_pr', $request->get('_pr'));
        
        $Args = Array('CorreoUsuario' => "'" . $username . "'");
        $userData = $this->LoginModel->getUsuarios($Args);
        $visitor = array();
        $email = $request->get('_username');
        $pass = sha1($request->get('_password') . '*;7/SjqjVjIsI*');
        
        if (COUNT($userData) > 1) {
            if ($pass != "") {
                foreach ($userData as $key => $value) {
                    if ($value['CorreoUsuario'] == $email && $value['PasswordUsuario'] == $pass && $value['IdUsuario'] == $_id_Visitante) {
                        $visitor = $value;
                        break;
                    }
                }
                
            } else {
                $email = $_SESSION['_sf2_attributes']['MM_Email'];
                $nombre = $_SESSION['_sf2_attributes']['MM_Nombre'];

                foreach ($userData as $key => $value) {
                    if ($value['CorreoUsuario'] == $email && $value['NombreUsuario'] == $nombre &&  $value['IdUsuario'] == $_id_Visitante) {
                        $visitor = $value;
                        break;
                    }
                }
            }
        } else {
            $visitor = $userData[0];
        }
        // pretend it returns an array on success, false if there is no user
        if ($visitor) {
            $username = $visitor['CorreoUsuario'];
            $password = $visitor['PasswordUsuario'];
            $salt = '*;7/SjqjVjIsI*';
            $roles = array('ROLE_USER','ROLE_ADMIN');
            $user = new Profile($username, $password, $salt, $roles);
            $user->setData($visitor);
            return $user;
        }
        throw new UsernameNotFoundException(sprintf('Username "%s" does not exist.', $username));
    }

    public function refreshUser(UserInterface $user) {
        if (!$user instanceof Profile) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }
        return $user;
    }

    public function supportsClass($class) {
        return $class === 'ControlAccesoBundle\Model\Profile';
    }
}