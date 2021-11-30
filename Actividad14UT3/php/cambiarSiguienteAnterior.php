<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type');
  include('conexionBd.php');

  $contenido=$_POST['Envio'];
    $contenido= str_replace("\\","", $contenido);    
    $array=explode(",",$contenido);
 
 $condicion=$array[1];
 $id = $array[0];
 $sql="";
 //Siguiente
if($condicion==">"){
  $sql= "SELECT * FROM IOT_SualdeaA WHERE id $condicion $id LIMIT 1";
}else{
//anterior
$sql= "SELECT * FROM IOT_SualdeaA WHERE id $condicion $id  ORDER BY id  DESC LIMIT 1";
}
//$sql= "SELECT * FROM vecinos WHERE idVecino  >  1 Limit 1";
$resultado = mysqli_query($connect,$sql);
while($row=mysqli_fetch_assoc($resultado)){
$output[]=$row;
}
print(json_encode($output));
$connect->close();

?>
