// Inicializa el NavBar
var table = "null";
$(document).ready(function() {
    table = $('#usuarios-table').DataTable();
    validateForm();
    $('.sidenav').sidenav();
    $("#usuariomodal").modal();

});

$('#usuario-nuevo').on("click", function() {
    $("#usuariomodal").modal({ dismissible: false }).modal('open');
});
$('.delete').on("click", function() {
    var IdUsuario = $(this).attr("id-record");
    eliminarUsuario(IdUsuario);
});

$('#cancelar').on("click", function() {
    $("#usuariomodal").modal('close');
    reset();
});


$('#usuarios-guardar').on("click", function() {
    $('#usuarioform').submit();
    insertarUsuario();

});


function validateForm() {
    $('#usuarioform').validate({
        rules: {
            nombre: { required: true, minlength: 4, maxlength: 220 },
            correo: { required: true, email: true },
            password: { required: true, minlength: 7, maxlength: 50 },
            domicilio: { required: true, minlength: 7, maxlength: 250 },
            rol: { required: true, minlength: 1, maxlength: 10 },

        },
        messages: {
            nombre: { required: "Este campo es OBLIGATORIO", minlength: "El minimo de caracteres son 4", maxlength: "Maximo de caracteres sobrepasado" },
            correo: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            password: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 7 caracteres", maxlength: "No puedes ingresar más de 50 caracteres" },
            domicilio: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 7 caracteres", maxlength: "No puedes ingresar más de 250 caracteres" },
            rol: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 1 caracteres", maxlength: "No puedes ingresar más de 10 caracteres" },

        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function(error, element) {
            error.insertAfter(element)
        },
        submitHandler: function(form) {
            var post = $('#usuarioform').serialize();
            insertarUsuario(post);

        }
    });

}

function reset() {
    $("#nombre").val('');
    $("#correo").val('');
    $("#password").val('');
    $("#domicilio").val('');
    $("#rol").val('');
    $("#nombre").focus();
};

function eliminarUsuario(IdUsuario) {
    $.ajax({
        type: "delete",
        url: urlEliminar,
        dataType: 'json',
        data: { IdUsuario },
        success: function(respuesta) {
            if (respuesta['status']) {
                M.toast({ html: 'Registro Eliminado con Exito', classes: 'rounded', displayLength: 4000 });
            } else {
                M.toast({ html: 'Error al Eliminar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}

function insertarUsuario(post) {
    $.ajax({
        type: "POST",
        url: urlInsertarUsuario,
        dataType: 'json',
        data: post,
        success: function(respuesta) {
            if (respuesta['status']) {
                reset();
                $("#usuariomodal").modal('close');
            } else {
                M.toast({ html: 'Error al Registrar ', classes: 'rounded', displayLength: 4000 });
            }
        }

    });
}