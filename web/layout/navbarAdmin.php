<?php 
    if(!isset($_SESSION))
    session_start();
?>
<ul id="dropdown1" class="dropdown-content">
    <li><a href="empresas.php">Empresas</a></li>
    <li><a href="usuarios.php">Usuarios</a></li>
</ul>
<nav>
    <div class="nav-wrapper grey darken-4">
        <ul class="right hide-on-med-and-down">
            <li><a href="index.php"> <i class="fas fa-home"></i> Inicio </a></li>
            <?php if(!isset($_SESSION["rol"])){
                    echo'<li><a href="login.php"><i class="fas fa-sign-in-alt"></i> Login  </a></li>';
                } 
                else{
                    echo'<li><a href="salir.php"><i class="fas fa-sign-out-alt"></i> Logout  </a></li>';
                }
                ?>
            <li><a class="dropdown-trigger" data-target="dropdown1"> <i class="fas fa-caret-down blue-text"></i>
                    Categoria </a></li>
        </ul>
    </div>
</nav>