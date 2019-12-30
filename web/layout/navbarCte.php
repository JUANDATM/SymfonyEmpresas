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
        </ul>
    </div>
</nav>