<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type');
  include('conexionBd.php');

$contenido=$_POST["Envio"];
  $contenido= str_replace("\\","", $contenido);    
  $array=explode(",",$contenido);
$sql = "SELECT * FROM IOT_SualdeaA ORDER BY Id ".$contenido." LIMIT 1";

$resultado = mysqli_query($connect,$sql);
while($row=mysqli_fetch_assoc($resultado)){
$output[]=$row;
}
print(json_encode($output));
$connect->close();

?>