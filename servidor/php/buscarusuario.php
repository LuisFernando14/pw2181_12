<?php
	
	include 'conexiones.php';

	function buscarusuario() {
		$usuario = $_POST["usuario"];
		//Conectarnos al servidor de base de datos
		$con = conecta();
		$consulta = "SELECT nombre, clave from usuarios where usuario = '".$usuario."' limit 1";
		$resConsulta = mysqli_query($con, $consulta);
		$respuesta = false;
		$nombre = "";
		$clave = "";
		if(mysqli_num_rows($resConsulta) > 0) {
			while($regConsulta = mysqli_fetch_array($resConsulta)) {
				$nombre = $regConsulta["nombre"];
				$clave = $regConsulta["clave"];
			}
		}
		$salidaJSON = array('respuesta' => $respuesta,
							'nombre' => $nombre,
							'clave' => $clave);
		print json_encode($salidaJSON);
	}
	

	$opc = $_POST["opc"];
	switch ($opc) {
		case 'buscarUsuario':
			buscarusuario();
			break;
		
		default:
			# code...
			break;
	}
?>