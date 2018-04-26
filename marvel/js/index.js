$(document).ready(function () {

	var teclaPersonaje = function(tecla) {
		if(tecla.which == 13) { //enter
			buscar();
		}
	}

	var buscar = function () {
		var personaje = $("#txtPersonaje").val();
		var url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith=";
		var cantidadComics = 0;
		var cantidadHistorias = 0;
		var cantidadSeries = 0;
		var historias = 0;
		var series = 0;
		var comics = "";
		url = url + personaje;
		console.log(personaje);
		$.ajax({
			dataType : "json",
			url : url,
			success: function (response) {
				if(response.code = 200) {
					console.log(response);
					$("#foto").attr('src', response.data.results[0].thumbnail.path+"."+response.data.results[0].thumbnail.extension);
					$("#nombre").html(response.data.results[0].name);
					cantidadComics = response.data.results[0].comics.returned;
					cantidadSeries = response.data.results[0].series.returned;
					cantidadHistorias = response.data.results[0].stories.returned;
					for(var i = 0; i<cantidadComics; i++) {
						comics+=response.data.results[0].comics.items[i].name+"<br>";
					}
					$("#comics").html("Comics: <br> "+comics);
					for(var i = 0; i < cantidadSeries; i++) {
						series+=response.data.results[0].series.items[i].name+"<br>";
					}
					$("#series").html("Series: <br> "+series);
					for(var i = 0; i < cantidadHistorias; i++) {
						historias+=response.data.results[0].stories.items[i].name+"<br>";
					}
					$("#historias").html("Historias: <br> "+historias);
					
				}
			}
		});
	}

	$("#txtPersonaje").on('keypress', teclaPersonaje);
	$('#btnBuscar').on('click', buscar);
});