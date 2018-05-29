<?php

include 'conexiones.php';

function listado () {
	$respuesta = false;
	$con = conecta();
	$consulta = sprintf('SELECT * FROM usuarios ORDER BY nombre');
	$resConsulta = mysqli_query($con, $consulta);
	$tabla = "";
	if(mysqli_num_rows($resConsulta) > 0) {
		$respuesta = true;
		$tabla.="<thead>";
		$tabla.="<tr>";
		$tabla.="<th>No.</th><th>Usuario</th><th>Nombre</th>";
		$tabla.="</tr>";
		$tabla.="</thead>";
		$tabla.="<tbody>";
		$cuenta = 0;
		while($registros = mysqli_fetch_array($resConsulta)) {
			$cuenta = $cuenta + 1;
			$tabla.="<tr>";
			$tabla.="<td>".$cuenta."</td>";
			$tabla.="<td>".$registros["usuario"]."</txd>";
			$tabla.="<td>".$registros["nombre"]."</td>";
			$tabla.="<tr>";
		}
		$tabla.="</tbody>";
	}
	$salidaJSON = array('respuesta' => $respuesta, 'tabla' => $tabla);
	print json_encode($salidaJSON);
}

$opc = $_POST["opc"];
	switch ($opc) {
		case 'listado':
			listado();
			break;
		
		default:
			# code...
			break;
	}

?>
