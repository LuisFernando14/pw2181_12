$(document).ready(function () {
	var aceptar = function() {
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();

		var parametros = "opc=validaentrada"+
						 "&usuario="+usuario+
						 "&clave="+clave+
						 "&aleatorio="+Math.random();
		$.ajax({
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/validaentrada.php",
			data: parametros,
			success: function(response) {
				if(response.respuesta) {
					alert("Bienvenido");
					$('#secInicio').hide("slow");
					$('#frmUsuarios').show('slow');
					$("#txtNombreUsuario").focus();
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log(xhr);
				alert('Error al iniciar sesión');
			}
		});
	}

	var buscarUsuario = function() {
		var usuario = $('#txtNombreUsuario').val();
		var parametros = "opc=buscarUsuario"+
						 "&usuario="+usuario+
						 "&aleatorio="+Math.random();
		if(usuario != "") {
			$.ajax({
				cache: false,
				type: "POST",
				dataType: "json",
				url: "php/buscarusuario.php",
				data: parametros,
				success: function(response) {
					if(response.respuesta) {
						$("#txtNombre").val(response.nombre);
						$("#txtClaveUsuario").val(response.clave);
					} else {
						$('#txtNombre').focus();
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(xhr);
					alert('Error al iniciar sesión');
				}
			});
		}
	}

	var guardar = function () {
		var usuario = $("#txtNombreUsuario").val();
		var nombre = $("#txtNombre").val();
		var clave = $("#txtClaveUsuario").val();
		var parametros = "opc=guardarUsuario"+
						 "&usuario="+usuario+
						 "&nombre="+nombre+
						 "clave="+clave+
						 "&aleatorio="+Math.random();
		if(usuario != "" && nombre != "" && clave != "") {
			$.ajax({
				cache: false,
				type: "POST",
				dataType: "json",
				url: "php/guardarusuario.php",
				data: parametros,
				success: function(response) {
					if(response.respuesta) {
						alert("Datos guardados correctamente");
					} else {
						alert("Ha ocurrido un error al guardar");
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(xhr);
					alert('Error al iniciar sesión');
				}
			});
		} else {
			alert('Le faltan campos, compa');
		}
	}

	var teclaNombreUsuario = function(tecla) {
		if(tecla.which == 13) {
			buscarUsuario();
		}
	}


	$('#btnAceptar').click(function () {
		aceptar();
	});
	$('#btnGuardar').click(function () {
		guardar();
	});

	$('#txtNombreUsuario').on("keypress", teclaNombreUsuario);








});