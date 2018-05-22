<?php 
	
	function conecta() {
		//servidor, usuario, contrasenia y base de datos
		$con = mysqli_connect("127.0.0.1", "root", "", "pw218112");
		return $con;
	}
?>