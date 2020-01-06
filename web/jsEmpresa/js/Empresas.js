// Inicializa el NavBar
Dropzone.autoDiscover = false;
var myDropzone;
var table = "null";
$(document).ready(function() {
    table = $('#empresas-table').DataTable();
    validateForm();
    $('.sidenav').sidenav();
    $("#empresamodal").modal();
    $('#empresas-guardar').on("click", function() {
        //document.getElementById('empresa-form').reset();
        $('#empresa-form').submit();
    });
    insertarEmpresa();
});
$('#empresa-nuevo').on("click", function() {
    $("#empresamodal").modal({ dismissible: false }).modal('open');
});
$('#editar').on("click", function() {
    document.getElementById('empresa-form').reset();
    $('#empresa-form').submit();
});

$('.delete').on("click", function() {
    var IdEmpresa = $(this).attr("id-record");
    eliminarEmpresa(IdEmpresa);
});

$('#cancelar').on("click", function() {
    $("#empresamodal").modal('close');
    reset();

});

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
        errorPlacement: function(error, element) {
            error.insertAfter(element)
        },
        submitHandler: function(form) {
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

function eliminarEmpresa(IdEmpresa) {
    $.ajax({
        type: "delete",
        url: urlEliminar,
        dataType: 'json',
        data: { IdEmpresa },
        success: function(respuesta) {
            if (respuesta['status']) {
                M.toast({ html: 'Registro Eliminado con Exito', classes: 'rounded', displayLength: 4000 });
                reset();
                $("#empresamodal").modal('close');
            } else {
                M.toast({ html: 'Error al Eliminar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}

function setRow(data, base64) {
    var img = document.createElement("img");
    img.setAttribute('src', base64);
    img.setAttribute('width', "200px");
    img.setAttribute('height', "200px");
    var row = table.row.add([
        //data.IdEmpresa,
        data.nombre,
        data.direccion,
        data.descripcion,
        data.telefono,
        data.correo,
        img
    ]).draw().node();
}



function insertarEmpresa() {

    //Dropzone class
    pdf = $(".add-file").dropzone({
        url: urlInsertar,
        paramName: "archivo",
        maxFilesize: 15, //MB
        maxFiles: 10,
        method: "post",
        uploadMultiple: false,
        previewsContainer: false,
        dictFileTooBig: "Error, el archivo no debe superar los 10MB",
        dictInvalidFileType: "Error, tipo de formato no aceptado",
        acceptedFiles: ".jpeg, .png , .jpg",
        autoProcessQueue: false,
        error: function(file, errorMessage) {
            M.toast({ html: errorMessage, classes: 'rounded', displayLength: 4000 });

        },
        init: function() {
            myDropzone = this;
            $("#empresas-guardar").click(function(e) {
                $('#empresa-form').submit();

            });
            this.on("sending", function(file, xhr, formData) {
                var data = $('#empresa-form').serializeArray();
                $.each(data, function(key, el) {
                    formData.append(el.name, el.value);
                });
            });
            this.on("success", function(file) {
                var res = JSON.parse(file.xhr.response);
                var base64 = file.dataURL;
                var data = res.data;
                if (res.status) {
                    M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                    setRow(data, base64);
                    reset();
                    $("#empresamodal").modal('close');
                } else {
                    show_alert("warning", res.data);
                }

            });
        }

    });
}