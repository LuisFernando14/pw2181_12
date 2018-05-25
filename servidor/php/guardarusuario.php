<?php
	include 'conexiones.php';
	function guardarUsuario() {
		$usuario = GetSQLValueString($_POST["usuario"], "text");
		$nombre = GetSQLValueString($_POST["nombre"], "text");
		$clave = GetSQLValueString(md5($_POST["clave"]), "text");
		//Conectarnos al servidor de base de datos
		$con = conecta();
		//$consulta = "SELECT usuario from usuarios where usuario = '".$usuario."' limit 1";
		$consulta = sprintf("SELECT * FROM usuarios WHERE usuario = %s", $usuario);
		$resConsulta = mysqli_query($con, $consulta);
		$respuesta = false;
		$nombre = "";
		$clave = "";
		$consultaGuarda = "";
		if(mysqli_num_rows($resConsulta) > 0) {
			$respuesta = true;
			$consultaGuarda = sprintf("UPDATE usuarios SET nombre = %s, clave = %s WHERE usuario = %s", $nombre, $clave, $usuario);
		} else {
			$consultaGuarda = sprintf("INSERT INTO usuarios VALUES(default, %s, %s, %s)", $usuario, $nombre, $clave);
		}
		mysqli_query($con, $consultaGuarda);
		if(mysqli_affected_rows() > 0) {
			$respuesta = true;
		}
		$salidaJSON = array('respuesta' => $respuesta);
		print(json_encode($salidaJSON));
	}
	$opc = $_POST["opc"];
	switch ($opc) {
		case 'guardarUsuario':
			guardarUsuario();
			break;
		
		default:
			# code...
			break;
	}
?>