$(init);

function init() {
    // Inicializa el NavBar
    $(document).ready(function() {
        $('.sidenav').sidenav();
    });


    //Iniciliza la ventana Modal y la Validación
    $("#empresamodal").modal();
    // Clic del boton circular para validar correo y contraseña

    // Clic del boton circular Agregar Registro Nuevo formulario modal
    $("#empresa-nuevo").on("click", function() {
        $("#nombre").val('');
        $("#direccion").val('');
        $("#telefono").val('');
        $("#descripcion").val('');
        $("#empresamodal").modal('open');
        $("#nombre").focus();
        route = "/empresas/new";
    });
    // clic del boton de guardar
    $('#guardar').on("click", function() {
        document.getElementById('empresa-form').reset();
        $('#empresa-form').submit();
        route = "/producto/new";
    });
}

function validateForm() {
    $('#empresa-form').validate({
        rules: {
            nombre: { required: true, minlength: 4, maxlength: 220 },
            direccion: { required: true, minlength: 4, maxlength: 220 },
            telefono: { required: true, number: true, minlength: 7, maxlength: 13 },
            descripcion: { required: true, minlength: 4, maxlength: 250 },

        },
        messages: {
            nombre: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            direccion: { required: "No se puede dejar el campo vacio", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            telefono: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 13 caracteres" },
            descripcion: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 250 caracteres" },

        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function(error, element) {
            error.insertAfter(element)
        },
        submitHandler: function(form) {
            saveData();
        }
    });

}
// Envia los datos del formulario de registro a la base de datos
function saveData() {
    var sURL = "actRegistroGuarda.php";
    var parametros = 'corr=' + $("#corr").val() +
        '&nom=' + $("#nom").val() +
        '&tip=' + $("#tip").val() +
        '&pwd=' + $("#pwd").val();
    $.ajax({
        type: "post",
        url: sURL,
        dataType: 'json',
        data: parametros,
        success: function(respuesta) {
            if (respuesta['status']) {
                $("#correo").val($("#corr").val());
                M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                $("#modalRegistro").modal('close');
                $("#contra").focus();
            } else {
                M.toast({ html: 'Error al Registrar Usuario', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}