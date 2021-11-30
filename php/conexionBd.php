<?php

$host_name = "localhost";

$database = "s022045b_CiudadI";
//usuario 
$user_name = "s022045b_fer2122";
//contraseña
$password = "21Curso_22"; 

    $connect = mysqli_connect($host_name, $user_name, $password, $database);
    //si falla la conexion recivimos este fallo 
    if(mysqli_connect_errno()) {

		echo '<p>"Error: Fallo al conectarse a MySQL debido a: '.mysqli_connect_error().'</p>';

    }

?>

