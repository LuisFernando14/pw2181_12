$(document).ready(function () {
    let aceptar = function () {
        let usuario = $("#txtUsuario").val();
        let clave = $("#txtClave").val();

        let parametros = "opc=validaentrada" +
            "&usuario=" + usuario +
            "&clave=" + clave +
            "&aleatorio=" + Math.random();
        $.ajax({
            cache: false,
            type: "POST",
            dataType: "json",
            url: "php/validaentrada.php",
            data: parametros,
            success: function (response) {
                if (response.respuesta) {
                    alert("Bienvenido");
                    $('#secInicio').hide("slow");
                    $('#frmUsuarios').show('slow');
                    $("#txtNombreUsuario").focus();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                alert('Error al iniciar sesión');
            }
        });
    };

    let buscarUsuario = function () {
        let usuario = $('#txtNombreUsuario').val();
        let parametros = "opc=buscarUsuario" +
            "&usuario=" + usuario +
            "&aleatorio=" + Math.random();
        if (usuario !== "") {
            $.ajax({
                cache: false,
                type: "POST",
                dataType: "json",
                url: "php/buscarusuario.php",
                data: parametros,
                success: function (response) {
                    if (response.respuesta) {
                        $("#txtNombre").val(response.nombre);
                        $("#txtClaveUsuario").val(response.clave);
                    } else {
                        $('#txtNombre').focus();
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr);
                    alert('Error al iniciar sesión');
                }
            });
        }
    };

    let guardar = function () {
        let usuario = $("#txtNombreUsuario").val();
        let nombre = $("#txtNombre").val();
        let clave = $("#txtClaveUsuario").val();
        let parametros = "opc=guardarUsuario" +
            "&usuario=" + usuario +
            "&nombre=" + nombre +
            "&clave=" + clave +
            "&aleatorio=" + Math.random();
        console.log(parametros);
        if (usuario !== "" && nombre !== "" && clave !== "") {
            $.ajax({
                cache: false,
                type: "POST",
                dataType: "json",
                url: "php/guardarusuario.php",
                data: parametros,
                success: function (response) {
                    if (response.respuesta) {
                        alert("Datos guardados correctamente");
                    } else {
                        alert("Ha ocurrido un error al guardar");
                        console.log(response);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr);
                    alert('Error grave al guardar los datos');
                }
            });
        } else {
            alert('Le faltan campos, compa');
        }
    };

    let teclaNombreUsuario = function (tecla) {
        if (tecla.which === 13) {
            buscarUsuario();
        }
    };

    let listado = function () {
        $('main > section').hide('slow');
        $('#frmListado').show('slow');
        let parametros = "opc=listado"+
                         "&aleatorio="+Math.random();
        $.ajax({
            cache: false,
            type: "POST",
            dataType: "json",
            url: "php/listado.php",
            data: parametros,
            success: function (response) {
                if (response.respuesta) {
                	$('#tblListado').append(response.tabla);
                } else {
                    alert("Ha ocurrido un error");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                alert('Error al iniciar sesión');
            }
        });
    };



    $('#btnAceptar').click(function () {
        aceptar();
    });
    $('#btnGuardar').click(function () {
        guardar();
    });
    $('#btnListado').click(function () {
        listado();
    });

    $('#txtNombreUsuario').on("keypress", teclaNombreUsuario);

});