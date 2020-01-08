// Inicializa el NavBar
Dropzone.autoDiscover = false;
var myDropzone;
var table = "null";
var tr = null;
$(document).ready(function () {
    table = $('#empresas-table').DataTable();
    validateForm();
    $('.sidenav').sidenav();
    $("#empresamodal").modal();
    $('#empresas-guardar').on("click", function () {
        //document.getElementById('empresa-form').reset();
        $('#empresa-form').submit();
    });
    //insertarEmpresa();
    //actualizarEmpresa();
});
$('#empresa-nuevo').on("click", function () {
    $("#empresamodal").modal({ dismissible: false }).modal('open');
    insertarEmpresa();
});
$('.edit').on("click", function () {
    var IdEmpresa = $(this).attr("id-edit");
    pintarDatos(IdEmpresa);
    $("#empresas-guardar").attr("IdEmpresa", IdEmpresa);
    $("#empresamodal").modal({ dismissible: false }).modal('open');
    actualizarEmpresa(IdEmpresa);
});



//sirve para editar los servicios
$(document).on('click', '#editar', function () {
    $("#empresamodal").modal({ dismissible: false }).modal('open');
});



$('.delete').on("click", function () {
    $tr = $(this).closest('tr');
    tr = $tr;
    var IdEmpresa = $(this).attr("id-record");
    table.row($tr).remove().draw();
    eliminarEmpresa(IdEmpresa);
});

$('#cancelar').on("click", function () {
    $("#empresamodal").modal('close');
    reset();

});

function pintarDatos(IdEmpresa) {
    $("#nombre").val(Empresas[IdEmpresa]["NombreEmpresa"]).next().addClass("active");
    $("#direccion").val(Empresas[IdEmpresa]["DireccionEmpresa"]).next().addClass("active");
    $("#telefono").val(Empresas[IdEmpresa]["TelefonoEmpresa"]).next().addClass("active");
    $("#correo").val(Empresas[IdEmpresa]["CorreoEmpresa"]).next().addClass("active");
    $("#descripcion").val(Empresas[IdEmpresa]["DescripcionEmpresa"]).next().addClass("active");
    $("#IdEmpresa").val(IdEmpresa);
}

function validateForm() {
    $('#empresa-form').validate({
        rules: {
            nombre: { required: true, minlength: 4, maxlength: 220 },
            direccion: { required: true, minlength: 4, maxlength: 220 },
            telefono: { required: true, number: true, minlength: 7, maxlength: 10 },
            correo: { required: true, email: true },
            descripcion: { required: true, minlength: 4, maxlength: 250 },
            addfile: { required: true },

        },
        messages: {
            nombre: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            direccion: { required: "No se puede dejar el campo vacio", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            telefono: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 10 caracteres" },
            descripcion: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 250 caracteres" },
            correo: { required: "No puedes dejar este campo vacion", email: "Este campo debe de ser un correo electronico" },
            addfile: { required: "Favor de agregar una imagen" },

        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function (error, element) {
            error.insertAfter(element)
        },
        submitHandler: function (form) {
            myDropzone.processQueue();
        }
    });

}
// Envia los datos del formulario de registro a la base de datos


// Limpia los campos al cerrar la modal
function reset() {
    $("#nombre").val('');
    $("#direccion").val('');
    $("#telefono").val('');
    $("#descripcion").val('');
    $("#correo").val('');
    $("#nombre").focus();
};

function setRow(data, base64, action) {
    if (action === 'insert') {
        var row = table.row.add([
            data.IdEmpresa,
            data.nombre,
            data.direccion,
            data.telefono,
            data.correo,
            data.descripcion,
            "<img src='" + base64 + "' width='200' height='100' ></img>",
            "<a id='editar' name='editar'  id-edit='" + data.IdEmpresa + "' class='edit btn btn-warning'><i class='material-icons'>create</i></a>" +
            "<a id='eliminar' name='eliminar' id-record='" + data.IdEmpresa + "' class='delete btn btn-danger' ><i class='material-icons'>delete_sweep</i></a>"

        ]).draw().node();

    }
    if (action === 'update') {

        Empresas[data.IdEmpresa] = data;
        var row = table.row('#' + data.IdEmpresa).node();
        $(row).find('td:nth-child(1)').text(data.NombreEmpresa);
        $(row).find('td:nth-child(2)').text(data.DireccionEmpresa);
        $(row).find('td:nth-child(5)').text(data.DescripcionEmpresa);
        $(row).find('td:nth-child(4)').text(data.CorreoEmpresa);
        $(row).find('td:nth-child(3)').text(data.TelefonoEmpresa);
        $(row).find('td:nth-child(6)').text(data.RutaImagen);
    }
    if (action === 'delete') {
        Empresas[data.IdEmpresa] = data;
        table.row('#' + data.IdEmpresa).remove.draw();
    }

}

function eliminarEmpresa(IdEmpresa) {
    $.ajax({
        type: "delete",
        url: urlEliminar,
        dataType: 'json',
        data: { IdEmpresa },
        success: function (respuesta) {
            if (respuesta['status']) {
                M.toast({ html: 'Registro Eliminado con Exito', classes: 'rounded', displayLength: 4000 });
                var action = "delete";
                setRow(data, base64, action);
            } else {
                M.toast({ html: 'Error al Eliminar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}

function actualizarEmpresa(IdEmpresa) {
    //Dropzone class
    pdf = $(".add-file").dropzone({
        url: urlActualizar,
        paramName: "archivo",
        maxFilesize: 15, //MB
        maxFiles: 2,
        method: "post",
        uploadMultiple: false,
        previewsContainer: false,
        dictFileTooBig: "Error, el archivo no debe superar los 10MB",
        dictInvalidFileType: "Error, tipo de formato no aceptado",
        acceptedFiles: ".jpeg, .png , .jpg",
        autoProcessQueue: false,
        data: { IdEmpresa },
        error: function (file, errorMessage) {
            M.toast({ html: errorMessage, classes: 'rounded', displayLength: 4000 });

        },
        init: function () {
            myDropzone = this;
            $("#empresas-guardar").click(function (e) {
                $('#empresa-form').submit();

            });
            this.on("sending", function (file, xhr, formData) {
                var data = $('#empresa-form').serializeArray();
                // post = post + "&IdEmpresa=" + ;
                $.each(data, function (key, el) {
                    formData.append(el.name, el.value);
                });
            });
            this.on("success", function (file) {
                var res = JSON.parse(file.xhr.response);
                var base64 = file.dataURL;
                var data = res.data;
                if (res.status) {
                    M.toast({ html: 'Se actualizo con exitoso', classes: 'rounded', displayLength: 4000 });
                    var action = "update";
                    setRow(data, base64, action);
                    reset();
                    $("#empresamodal").modal('close');
                } else {
                    show_alert("warning", res.data);
                }

            });
        }

    });
}

function insertarEmpresa() {

    //Dropzone class
    pdf = $(".add-file").dropzone({
        url: urlInsertar,
        paramName: "archivo",
        maxFilesize: 15, //MB
        maxFiles: 2,
        method: "post",
        uploadMultiple: false,
        previewsContainer: false,
        dictFileTooBig: "Error, el archivo no debe superar los 10MB",
        dictInvalidFileType: "Error, tipo de formato no aceptado",
        acceptedFiles: ".jpeg, .png , .jpg",
        autoProcessQueue: false,
        error: function (file, errorMessage) {
            M.toast({ html: errorMessage, classes: 'rounded', displayLength: 4000 });

        },
        init: function () {
            myDropzone = this;
            $("#empresas-guardar").click(function (e) {
                $('#empresa-form').submit();

            });
            this.on("sending", function (file, xhr, formData) {
                var data = $('#empresa-form').serializeArray();
                $.each(data, function (key, el) {
                    formData.append(el.name, el.value);
                });
            });
            this.on("success", function (file) {
                var res = JSON.parse(file.xhr.response);
                var base64 = file.dataURL;
                var data = res.data;
                if (res.status) {
                    M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                    var action = "insert";
                    setRow(data, base64, action);
                    reset();
                    $("#empresamodal").modal('close');
                } else {
                    show_alert("warning", res.data);
                }

            });
        }

    });
}