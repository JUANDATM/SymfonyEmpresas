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
        $("#imagen").val('');
        $("#visitas").val('');
        $("#empresamodal").modal('open');
        $("#nombre").focus();
        route = "/empresas/new";

    });
    // clic del boton de guardar
    $('#empresas-guardar').on("click", function() {
        event.preventDefault()
        document.getElementById('empresa-form').reset();
        $('#empresa-form').submit();
        route = "/empresas/new";
    });
    $('#productos-form').on('submit', function(e) {
        e.preventDefault();
        add(table);
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
function add(table) {
    $.ajax({
        type: "post",
        url: route,
        data: {
            'data': {
                'nombre_empresa': $('#nombre').val(),
                'direccion': $('#direccion').val(),
                'telefono': $('#telefono').val(),
                'pdescripcion': $('#descripcion').val(),
                'imagen': $('#imagen').val(),
                'visitas': $('#visitas').val(),
            }
        },
        dataType: "json",
        success: function(response) {
            if (response.id == null) {
                alert('La empresa ya existe, intenta otra.');
            } else {
                if (route.includes("edit")) {
                    table.row(temp_row).remove().draw();
                }
                addRow(response, table, false);
                $('#empresas-modal').modal('hide');
            }
        }
    });
}

function remove(id) {
    $.ajax({
        type: "delete",
        url: "/empresas/" + id,
        success: function(response) {
            if (response.is_deleted) {

            }
        }
    });
}

function addRow(data, table, updated) {
    let row = table.row.add([
        data.id,
        data.nombre_empresa,
        data.direccion,
        data.telefono,
        data.descripcion,
        data.imagen,
        data.visitas,
        '<td><button type="button" class="btn btn-warning edit">Editar</button> <button type="button" class="btn btn-danger delete">Eliminar</button></td>'
    ]).draw().node();
}