var table = "null";
var tr = null;
$(document).ready(function() {
    table = $('#usuarios-table').DataTable();
    validateForm();
    $('.sidenav').sidenav();
    $("#usuariomodal").modal();
    $('#usuarios-guardar').on("click", function() {
        $('#usuarioform').submit();
    });
});
$(document).on("click", ".edit", function() {
    $tr = $(this).closest('tr');
    tr = $tr;
    var IdUsuario = $(this).attr("id-edit");
    pintarDatos(IdUsuario);
    $("#usuarios-guardar").attr("IdUsuario", IdUsuario);
    $("#usuariomodal").modal({ dismissible: false }).modal('open');
    action = "update";
    table.row($tr).node().draw();
});
$('#usuario-nuevo').on("click", function() {
    $("#usuariomodal").modal({ dismissible: false }).modal('open');
    action = "insert";
});
$(document).on("click", '.delete', function() {
    var IdUsuario = $(this).attr("id-record");
    $("#EliminarSiNo").modal({ dismissible: false }).modal('open');
    $("#Aceptar").attr("IdUsuario", IdUsuario);
});
$('#Aceptar').on("click", function() {
    $tr = $(this).closest('tr');
    tr = $tr;
    var IdUsuario = $(this).attr("IdUsuario");
    table.row($tr).remove().draw();
    eliminarUsuario(IdUsuario);
});
$('#Cerrar').on("click", function() {
    $("#EliminarSiNo").modal('close');
});
$('#cancelar').on("click", function() {
    $("#usuariomodal").modal('close');
    reset();
});

function pintarDatos(IdUsuario) {
    $("#IdUsuario").val(IdUsuario);
    $("#nombre").val(Usuario[IdUsuario]["NombreUsuario"]);
    $("#correo").val(Usuario[IdUsuario]["CorreoUsuario"]);
    $("#password").val(Usuario[IdUsuario]["PasswordUsuario"]);
    $("#domicilio").val(Usuario[IdUsuario]["DomicilioUsuario"]);
    $("#rol").val(Usuario[IdUsuario]["TipoUsuario"]);
    $("#usuarioform input[type='text'], textarea").removeClass('valid').next().addClass('active');
}

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
            if (action === "insert") {
                insertarUsuario(post);
            }
            if (action === "update") {
                post + "&idUsuario=" + $("#usuarios-guardar").attr("IdUsuario");
                actualizarUsuario(post);
            }
        }
    });
}

function eliminarUsuario(IdUsuario) {
    $.ajax({
        type: "delete",
        url: urlEliminar,
        dataType: 'json',
        data: { IdUsuario },
        success: function(respuesta) {
            if (respuesta['status']) {
                M.toast({ html: 'Registro Eliminado con Exito', classes: 'rounded', displayLength: 4000 });
                var action = "delete";
                setRow(respuesta.data, action);
            } else {
                M.toast({ html: 'Error al Eliminar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}

function insertarUsuario(post) {
    $.ajax({
        type: "post",
        url: urlInsertar,
        dataType: 'json',
        data: post,

        success: function(respuesta) {
            if (respuesta['status']) {
                Usuario[respuesta.data.IdUsuario] = respuesta.data;
                M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                // Usuario[respuesta.data.IdUsuario] = respuesta.data;
                var data = respuesta.data;
                var action = "insert";
                setRow(data, action);
                reset();
                $("#usuariomodal").modal('close');
            } else {
                M.toast({ html: 'Error al Registrar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}

function actualizarUsuario(post) {
    $.ajax({
        type: "post",
        url: urlActualizar,
        dataType: 'json',
        data: post,
        success: function(respuesta) {
            if (respuesta['status']) {
                $("#nombre").val($("#nombre").val());
                M.toast({ html: 'Se actualizo con exito', classes: 'rounded', displayLength: 4000 });
                var data = respuesta;
                var action = "update";
                setRow(respuesta.data, action);
                $("#usuariomodal").modal('close');
                reset();
            } else {
                M.toast({ html: 'Error al actualizar ', classes: 'rounded', displayLength: 4000 });
            }
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

function setRow(data, action) {
    if (action === 'insert') {
        var row = table.row.add([
            data.IdUsuario,
            data.nombre,
            data.correo,
            data.password,
            data.domicilio,
            data.rol,
            "<a id='editar' name='editar'  id-edit='" + data.IdUsuario + "'  id-nombre='" + data.nombre + "'  id-correo='" + data.correo + "'  id-password='" + data.password + "' id-domicilio='" + data.domicilio + "' id-rol='" + data.rol + "'  class='edit btn btn-warning'  ><i class='material-icons'>create</i></a>" +
            "<a id='eliminar' name='eliminar' id-record='" + data.IdUsuario + "'  class='delete btn btn-danger'  ><i class='material-icons'>delete_sweep</i></a>"
        ]).draw().node();
        $(row).attr('id', data.IdUsuario);
    }
    if (action === 'update') {
        table.row('#' + data.IdUsuario).remove().draw();
        var row = table.row.add([
            data.IdUsuario,
            data.nombre,
            data.correo,
            data.password,
            data.domicilio,
            data.rol,
            "<a id='editar' name='editar'  id-edit='" + data.IdUsuario + "'  id-nombre='" + data.nombre + "'  id-correo='" + data.correo + "'  id-password='" + data.password + "' id-domicilio='" + data.domicilio + "' id-rol='" + data.rol + "'  class='edit btn btn-warning'  ><i class='material-icons'>create</i></a>" +
            "<a id='eliminar' name='eliminar' id-record='" + data.IdUsuario + "'  class='delete btn btn-danger'  ><i class='material-icons'>delete_sweep</i></a>"
        ]).draw().node();
        $(row).attr('id', data.IdUsuario);
    }
    if (action === 'delete') {
        Usuario[data.IdUsuario] = data;
        table.row('#' + data.IdUsuario).remove().draw();
    }
}