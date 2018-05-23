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
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log(xhr);
				alert('Error al iniciar sesión');
			}
		});
	}

	$('#btnAceptar').click(function () {
		aceptar();
	});
});