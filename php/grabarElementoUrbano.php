<?php
//con esta cabecera con el * permitimos el acceso a cualquiera
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
//esto inclueye mas codigo php
include('conexionBd.php');

$contenido = $_POST['Todo'];
//le quitamos las llaves a la cadena  y lo cambiamos por un espacio vacio
$cadena= str_replace("{", "", $contenido);
$cadena2= str_replace("}","", $cadena);
$contenido= str_replace("\\","", $contenido);

//convierte el contenido en un array en formato json
$array = json_decode($contenido, true);

$cadena="";

$tmpArray = array();

foreach ($array as $dato){
	$tmpArray[]=$dato;
}

if ($connect->connect_errno) {
		echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else{											

		$query = "INSERT INTO IOT_SualdeaA VALUES (0,'$tmpArray[0]','$tmpArray[1]','$tmpArray[2]','$tmpArray[3]','$tmpArray[4]','$tmpArray[5]','$tmpArray[6]','$tmpArray[7],'$tmpArray[8],'$tmpArray[9])";

		//aqui se pasa la conexion y la consulta
		$resultado = mysqli_query($connect,$query);
		echo "Registro grabado correctamente ".$query ;

		$connect->close();

	}



?>