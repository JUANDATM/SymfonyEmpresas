$(document).ready(function () {
    validateForm();
    $('.sidenav').sidenav();
    ("#usuariomodal").modal();
    $('#usuarios-guardar').on("click", function () {
        //document.getElementById('empresa-form').reset();
        $('#usuarioform').submit();
    });
    insertarLoginUsuario();
});

$("#un_lock").on("click", function () {
    $('#frm-acceso').submit();
});

$('#usuario-nuevo').on("click", function () {
    $("#usuariomodal").modal({ dismissible: false }).modal('open');
});

$('#cancelar').on("click", function () {
    $("#usuariomodal").modal('close');
    reset();
});

function validateForm() {
    $('#frm-acceso').validate({
        rules: {
            usuario: { required: true, email: true, minlength: 4, maxlength: 120 },
            contra: { required: true, minlength: 4, maxlength: 32 },
        },
        messages: {
            usuario: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 120 caracteres" },
            contra: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 32 caracteres" },
        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function (error, element) {
            error.insertAfter(element)
        },
        submitHandler: function (form) {
            var postacceso = $('#frm-acceso').serialize();
            validarAcceso(postacceso);
        }
    });
    $('#usuarioform').validate({
        rules: {
            nombre: { required: true, minlength: 4, maxlength: 220 },
            correo: { required: true, email: true },
            password: { required: true, minlength: 7, maxlength: 50 },
            domicilio: { required: true, minlength: 7, maxlength: 250 },
            //rol: { required: true, minlength: 1, maxlength: 10 },

        },
        messages: {
            nombre: { required: "Este campo es OBLIGATORIO", minlength: "El minimo de caracteres son 4", maxlength: "Maximo de caracteres sobrepasado" },
            correo: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            password: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 7 caracteres", maxlength: "No puedes ingresar más de 50 caracteres" },
            domicilio: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 7 caracteres", maxlength: "No puedes ingresar más de 250 caracteres" },
            //rol: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 1 caracteres", maxlength: "No puedes ingresar más de 10 caracteres" },

        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function (error, element) {
            error.insertAfter(element)
        },
        submitHandler: function (form) {
            var post = $('#usuarioform').serialize();
            insertarLoginUsuario(post);
        }
    });
}

function insertarLoginUsuario(post) {
    $.ajax({
        type: "post",
        url: urlInsertar,
        dataType: 'json',
        data: post,
        success: function (respuesta) {
            if (respuesta['status']) {
                $("#nombre").val($("#nombre").val());
                M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                reset();
                $("#usuariomodal").modal('close');
                $("#nombre").focus();
            } else {
                M.toast({ html: 'Error al Registrar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}
function validarAcceso(postacceso){
    $.ajax({
        type: "post",
        url: urlValidacion,
        dataType: 'json',
        data: postacceso,
        success: function(respuesta){
            if (respuesta['status']==1){
                M.toast({html: 'Acceso Permitido', classes: 'rounded blue lighten-2'});
                window.location.href='http://localhost:8000/CatalogoEmpresas'
            }
            else{
               M.toast({html: 'Acceso No Permitido', classes: 'rounded blue lighten-2'});
            }
        } 
    });
  }
function reset() {
    $("#nombre").val('');
    $("#correo").val('');
    $("#password").val('');
    $("#domicilio").val('');
    //$("#rol").val('');
    $("#nombre").focus();
};