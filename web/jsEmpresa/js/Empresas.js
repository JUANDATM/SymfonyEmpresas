// Inicializa el NavBar
Dropzone.autoDiscover = false;
var myDropzone;
var table = "null";
var tr = null;
$(document).ready(function() {
    table = $('#empresas-table').DataTable();
    validateForm();
    $('.sidenav').sidenav();
    $("#empresamodal").modal();
    $("#PreviewImagen").modal();
    $('#empresas-guardar').on("click", function() {
        //document.getElementById('empresa-form').reset();
        $('#empresa-form').submit();
    });
    //insertarEmpresa();
    //actualizarEmpresa();
});
$('#empresa-nuevo').on("click", function() {
    $("#empresamodal").modal({ dismissible: false }).modal('open');
    insertarEmpresa();
});
$(document).on("click", '.edit', function() {
    $tr = $(this).closest('tr');
    tr = $tr;
    var IdEmpresa = $(this).attr("id-edit");
    pintarDatos(IdEmpresa);
    $("#empresas-guardar").attr("IdEmpresa", IdEmpresa);
    $("#empresamodal").modal({ dismissible: false }).modal('open');
    actualizarEmpresa(IdEmpresa);
});
//sirve para editar los servicio

$(document).on("click", '.delete', function() {
    var IdEmpresa = $(this).attr("id-record");
    $("#EliminarSiNo").modal({ dismissible: false }).modal('open');
    $("#Aceptar").attr("IdEmpresa", IdEmpresa);
});

$(document).on("click", '#Aceptar', function() {
    $tr = $(this).closest('tr');
    tr = $tr;
    var IdEmpresa = $(this).attr("IdEmpresa");
    table.row($tr).remove().draw();
    eliminarEmpresa(IdEmpresa);
});

$('#Cerrar').on("click", function() {
    $("#EliminarSiNo").modal('close');
});

$('#cancelar').on("click", function() {
    $("#empresamodal").modal('close');
    reset();
});

$('#cancelar').on("click", function() {
    $("#empresamodal").modal('close');
    reset();
});

$(document).on("click", '.more', function() {
    var IdEmpresa = $(this).attr("IdEmpresa");
    $.ajax({
        type: "post",
        url: InserVista,
        dataType: "json",
        data: { IdEmpresa },
        success: function(respuesta) {
            if (respuesta["status"]) {
                //table.remove().draw();
                M.toast({ html: 'Visita Registrada', classes: 'rounded', displayLength: 4000 });

            } else {
                M.toast({ html: 'ERROR AL REGISTRAR VISITA,ASEGURESE DE NO SER UN ADMINISTRADOR', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
});

function pintarDatos(IdEmpresa) {
    $("#IdEmpresa").val(IdEmpresa);
    $("#nombre").val(Empresas[IdEmpresa]["NombreEmpresa"]).next().addClass("active");
    $("#direccion").val(Empresas[IdEmpresa]["DireccionEmpresa"]).next().addClass("active");
    $("#telefono").val(Empresas[IdEmpresa]["TelefonoEmpresa"]).next().addClass("active");
    $("#correo").val(Empresas[IdEmpresa]["CorreoEmpresa"]).next().addClass("active");
    $("#descripcion").val(Empresas[IdEmpresa]["DescripcionEmpresa"]).next().addClass("active");
    $("#addfile").val('data:' + Empresas[IdEmpresa]["FormatoImagen"] + ';base64,' + Empresas[IdEmpresa]["RutaImagen"]).next().addClass("active");
    var divrow = $('<div/>', {
        'class': 'row img'
    }).appendTo('#empresa-form');
    var divcol = $('<div/>', {
        'class': 'col s3'
    }).appendTo(divrow);
    var divimg = $('<img/>', {
        'class': '',
        'src': 'data:' + Empresas[IdEmpresa]["FormatoImagen"] + ';base64,' + Empresas[IdEmpresa]["RutaImagen"],
        'width': '200',
        'height': '100'
    }).appendTo(divrow);
    $("#IdEmpresa").val(IdEmpresa);
}

function validateForm() {
    $('#empresa-form').validate({
        rules: {
            nombre: {
                required: {
                    depends: function() {
                        if ($("#nombre").val().trim().length == 0) {
                            $("#nombre").val('');
                        }
                        return true;
                    }
                },
                minlength: 4,
                maxlength: 250
            },
            direccion: {
                required: {
                    depends: function() {
                        if ($("#direccion").val().trim().length == 0) {
                            $("#direccion").val('');
                        }
                        return true;
                    }
                },
                minlength: 4,
                maxlength: 250
            },
            telefono: {
                required: {
                    depends: function() {
                        if ($("#telefono").val().trim().length == 0) {
                            $("#telefono").val('');
                        }
                        return true;
                    }
                },
                minlength: 4,
                maxlength: 250
            },
            correo: {
                required: {
                    depends: function() {
                        if ($("#correo").val().trim().length == 0) {
                            $("#correo").val('');
                        }
                        return true;
                    }
                },
                email: true,
                minlength: 4,
                maxlength: 250
            },
            descripcion: {
                required: {
                    depends: function() {
                        if ($("#descripcion").val().trim().length == 0) {
                            $("#descripcion").val('');
                        }
                        return true;
                    }
                },
                minlength: 4,
                maxlength: 250
            },
            addfile: { required: true },
        },
        messages: {
            nombre: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            direccion: { required: "No se puede dejar el campo vacio", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            telefono: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 7 caracteres", maxlength: "No puedes ingresar más de 10 caracteres" },
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

function reset() {
    $("#nombre").val('');
    $("#direccion").val('');
    $("#telefono").val('');
    $("#descripcion").val('');
    $("#correo").val('');
    myDropzone.removeAllFiles(true);
    $('.img').hide();
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
                var action = "delete";
                var base64 = "";
                setRow(respuesta.data, base64, action);
            } else {
                M.toast({ html: 'Se actualizo con exito', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}

function actualizarEmpresa(IdEmpresa) {
    //Dropzone class
    pdf = $(".add-file").dropzone({
        url: urlActualizar,
        paramName: "archivo",
        maxFilesize: 5, //MB
        maxFiles: 1,
        method: "post",
        uploadMultiple: false,
        previewsContainer: false,
        dictFileTooBig: "Error, el archivo no debe superar los 10MB",
        dictInvalidFileType: "Error, tipo de formato no aceptado",
        acceptedFiles: ".jpeg, .png , .jpg",
        autoProcessQueue: false,
        data: { IdEmpresa },
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
                // post = post + "&IdEmpresa=" + ;
                $.each(data, function(key, el) {
                    formData.append(el.name, el.value);
                });
            });
            this.on("success", function(file) {
                var res = JSON.parse(file.xhr.response);
                var base64 = file.dataURL;
                var data = res.data;
                if (res.status) {
                    M.toast({ html: 'Se actualizo con exito', classes: 'rounded', displayLength: 4000 });
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
        maxFiles: 1,
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

function setRow(data, base64, action) {
    Empresas[data.IdEmpresa] = data;
    if (action === 'insert') {
        var row = table.row.add([
            data.IdEmpresa,
            data.nombre,
            data.direccion,
            data.telefono,
            data.correo,
            data.descripcion,
            "<img src='" + base64 + "' width='200px' height='100px' ></img>",
            "<a  id='editar' name='editar'  id-edit='" + data.IdEmpresa + "' data-nom='" + data.nombre + "' data-dir='" + data.direccion + "' data-descrip='" + data.descripcion + "' data-tel='" + data.telefono + "' data-corr='" + data.corr + "' class='edit btn btn-warning'><i class='material-icons'>create</i></a>" +
            "<a  id='eliminar' name='eliminar' id-record='" + data.IdEmpresa + "'  class='delete btn btn-danger'><i class='material-icons'>delete_sweep</i></a>"
        ]).draw().node();
    }
    if (action === 'update') {
        table.row('#' + data.IdEmpresa).remove().draw();
        var row = table.row.add([
            data.IdEmpresa,
            data.nombre,
            data.direccion,
            data.telefono,
            data.correo,
            data.descripcion,
            "<img src='" + base64 + "' width='200px' height='100px' ></img>",
            "<a  id='editar' name='editar'  id-edit='" + data.IdEmpresa + "' data-nom='" + data.nombre + "' data-dir='" + data.direccion + "' data-descrip='" + data.descripcion + "' data-tel='" + data.telefono + "' data-corr='" + data.corr + "' class='edit btn btn-warning'><i class='material-icons'>create</i></a>" +
            "<a  id='eliminar' name='eliminar' id-record='" + data.IdEmpresa + "'  class='delete btn btn-danger'><i class='material-icons'>delete_sweep</i></a>"
        ]).draw().node();
        $(row).attr('id', data.IdEmpresa);
    }
    if (action === 'delete') {
        Empresas[data.IdEmpresa] = data;
        table.row('#' + data.IdEmpresa).remove().draw();
    }
}