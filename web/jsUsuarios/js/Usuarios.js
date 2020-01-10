var table = "null";
var tr = null;
$(document).ready(function() {
    table = $('#usuarios-table').DataTable();
    validateForm();
    $('.sidenav').sidenav();
    ("#usuariomodal").modal();
    $('#usuarios-guardar').on("click", function() {
        //document.getElementById('empresa-form').reset();
        $('#usuarioform').submit();
    });

});

//actualizarrrrrrrrrrrrr 

$(document).on("click", ".edit", function() {

    $tr = $(this).closest('tr');
    tr = $tr;
    var IdUsuario = $(this).attr("id-edit");
    pintarDatos(IdUsuario);
    $("#usuarios-guardar").attr("IdUsuario", IdUsuario);
    $("#usuariomodal").modal({ dismissible: false }).modal('open');
    //actualizarUsuario(post);
    action = "update";
    table.row($tr).node().draw();
});

$('#usuario-nuevo').on("click", function() {
    $("#usuariomodal").modal({ dismissible: false }).modal('open');
    action = "insert";
});


//proceso de eliminar registro
$('.delete').on("click", function() {
    /*  asegurar() */
    var IdUsuario = $(this).attr("id-record");
    /* eliminarUsuario(IdUsuario); */
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
//fin proceso de eliminar registro
$('#cancelar').on("click", function() {
    $("#usuariomodal").modal('close');
    reset();
});

function pintarDatos(IdUsuario) {
    $("#nombre").val(Usuario[IdUsuario]["NombreUsuario"]).next().addClass("active");
    $("#correo").val(Usuario[IdUsuario]["CorreoUsuario"]).next().addClass("active");
    $("#password").val(Usuario[IdUsuario]["PasswordUsuario"]).next().addClass("active");
    $("#domicilio").val(Usuario[IdUsuario]["DomicilioUsuario"]).next().addClass("active");
    $("#rol").val(Usuario[IdUsuario]["TipoUsuario"]).next().addClass("active");
    $("#IdUsuario").val(IdUsuario);
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

/*$tr = $(this).closet('tr');
tr = $tr;
var idusuario = $(this).attr("data-id");*/

function eliminarUsuario(IdUsuario) {
    $.ajax({
        type: "delete",
        url: urlEliminar,
        dataType: 'json',
        data: { IdUsuario },
        success: function(respuesta) {
            if (respuesta['status']) {

                //table.remove().draw();
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
                $("#nombre").val($("#nombre").val());


                M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                var data = respuesta.data;
                var action = "insert";
                setRow(data, action);
                reset();
                $("#usuariomodal").modal('close');
                $("#nombre").focus();
            } else {
                M.toast({ html: 'Error al Registrar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}
///////////////////actualizarrrrrrrrrr
function actualizarUsuario(post) {
    $.ajax({
        type: "post",
        url: urlActualizar,
        dataType: 'json',
        data: post,
        // data: { IdUsuario },
        // data: $('#usuarioform').serializeArray(),
        // data: { IdUsuario },
        success: function(respuesta) {
            //var data = $('#usuarioform').serializeArray();
            // var nose = data.respuesta;
            if (respuesta['status']) {
                $("#nombre").val($("#nombre").val());
                M.toast({ html: 'Se actualizo con exito', classes: 'rounded', displayLength: 4000 });
                var data = respuesta;
                var action = "update";
                setRow(respuesta.data, action);
                reset();
                $("#usuariomodal").modal('close');
                $("#nombre").focus();
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
            '<a id="editar" name="editar" id-edit="' + data.IdUsuario + '" class="edit btn btn-warning"><i class="material-icons">create</i></a>' +
            '<a id="eliminar" name="eliminar" id-record="' + data.IdUsuario + '" class="delete btn btn-danger" ><i class="material-icons">delete_sweep</i></a>'

        ]).draw().node();
        $(row).attr('id', data.IdUsuario);
    }
    if (action === 'update') {
        /*  Usuario[data.IdUsuario] = data;
         var row = table.row('#' + data.IdUsuario).node();
         $(row).find('td:nth-child(1)').text(data.NombreUsuario);
         $(row).find('td:nth-child(2)').text(data.CorreoUsuario);
         $(row).find('td:nth-child(3)').text(data.PasswordUsuario);
         $(row).find('td:nth-child(4)').text(data.DomicilioUsuario);
         $(row).find('td:nth-child(5)').text(data.TipoUsuario); */
        table.row('#' + data.IdUsuario).remove().draw();
        var row = table.row.add([
            data.IdUsuario,
            data.nombre,
            data.correo,
            data.password,
            data.domicilio,
            data.rol,

            '<a id="editar" name="editar" id-edit="' + data.IdUsuario + ' " class="edit btn btn-warning"><i class="material-icons">create</i></a>' +
            '<a id="eliminar" name="eliminar" id-record="' + data.IdUsuario + '" class="delete btn btn-danger" ><i class="material-icons">delete_sweep</i></a>'

        ]).draw().node();
        $(row).attr('id', data.IdUsuario);
    }
    if (action === 'delete') {
        Usuario[data.IdUsuario] = data;
        table.row('#' + data.IdUsuario).remove().draw();
    }
}