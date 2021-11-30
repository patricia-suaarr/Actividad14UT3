<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBd.php');
$contenido = $_POST['Envio']; 
$contenido= str_replace("\\","", $contenido);
$tmpArray=explode(",",$contenido);

	if ($connect->connect_errno) {
		echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	} else {									
		$query = "UPDATE IOT_GeteR SET Tipo = $tmpArray[1], 
		Cantidad = $tmpArray[2], 
		Hora = $tmpArray[3], 
		Fecha = $tmpArray[4], 
		Latitud = $tmpArray[5],
		Longitud = $tmpArray[6],
		Direccion = $tmpArray[7],
		Descripcion = $tmpArray[8]
		WHERE Id = $tmpArray[0]";
		$resultado = mysqli_query($connect,$query);
		echo "Registro modificado correctamente ".$query ;
		$connect->close();
	}
?>