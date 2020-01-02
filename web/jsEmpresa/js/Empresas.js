// Inicializa el NavBar
$(document).ready(function() {
    validateForm();
    $('.sidenav').sidenav();
    $("#empresamodal").modal();
    $('#empresas-guardar').on("click", function() {
        //document.getElementById('empresa-form').reset();
        $('#empresa-form').submit();
    });
});
$('#empresa-nuevo').on("click", function() {
    $("#empresamodal").modal({ dismissible: false }).modal('open');
});
$('#editar').on("click", function() {
    document.getElementById('empresa-form').reset();
    $('#empresa-form').submit();
});

$(document).on("click", '.eliminar', function() {
    var id = $(this).attr("id-record");
    deleteData(id);
});

function validateForm() {
    $('#empresa-form').validate({
        rules: {
            nombre: { required: true, minlength: 4, maxlength: 220 },
            direccion: { required: true, minlength: 4, maxlength: 220 },
            telefono: { required: true, number: true, minlength: 7, maxlength: 10 },
            correo: { required: true, email: true },
            descripcion: { required: true, minlength: 4, maxlength: 250 },
        },
        messages: {
            nombre: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            direccion: { required: "No se puede dejar el campo vacio", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            telefono: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 10 caracteres" },
            descripcion: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 250 caracteres" },
            correo: { required: "No puedes dejar este campo vacion", email: "Este campo debe de ser un correo electronico" },
        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function(error, element) {
            error.insertAfter(element)
        },
        submitHandler: function(form) {
            var post = $("#" + form.id).serialize();
            insertarEmpresa(post);
        }
    });

}
// Envia los datos del formulario de registro a la base de datos
function insertarEmpresa(post) {
    $.ajax({
        type: "post",
        url: urlInsertar,
        dataType: 'json',
        data: post,
        success: function(respuesta) {
            if (respuesta['status']) {
                $("#nombre").val($("#nombre").val());
                M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                reset();
                $("#empresamodal").modal('close');
                $("#nombre").focus();
            } else {
                M.toast({ html: 'Error al Registrar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}
// Clic del boton circular Agregar Registro Nuevo formulario modal
function reset() {
    $("#nombre").val('');
    $("#direccion").val('');
    $("#telefono").val('');
    $("#descripcion").val('');
    $("#correo").val('');
    $("#nombre").focus();
};