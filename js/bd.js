var bGrabar=document.getElementById("grabarRegistro");
var bSiguiente=document.getElementById("siguiente");
var bAnterior=document.getElementById("anterior");
var bPrimero=document.getElementById("primero");
var bUltimo=document.getElementById("ultimo");
var bBorrar=document.getElementById("borrar");
var bModificar=document.getElementById("modificar");

bGrabar.addEventListener("click",grabar,false);
bSiguiente.addEventListener("click", siguiente, false);
bAnterior.addEventListener("click", anterior, false);
bPrimero.addEventListener("click",primero,false);
bUltimo.addEventListener("click", ultimo, false);
bBorrar.addEventListener("click", borrar, false);
bModificar.addEventListener("click", modificar, false);

//funciona
function grabar(){
    grabarRegistro=true;
    nuevo=true;
    //'"' + "IdVecino" + '":' + '"' + IdVecino.value + '",'
    
    //dividir la fecha para que sea dd-mm-aaaa en vez de aaaa-mm-dd como en my sql 
    cfc= cFecha.value.split("-");
    cFecha.value=cfc[2]+"-"+cfc[1]+"-"+cfc[0];

    var datosElementoUrbano = '"' + "Tipo" + '":' + '"' + cTipo.value + '",'
        + '"' + "Cantidad" + '":' + '"' + cCantidad.value + '",'
        + '"' + "Hora" + '":' + '"' + cHora.value + '",'
        + '"' + "Fecha" + '":' + '"' + cFecha.value + '",'
        + '"' + "Latitud" + '":' + '"' + cLatitud.value + '",'
        + '"' + "Longitud" + '":' + '"' + cLongitud.value + '",'
        + '"' + "Direccion" + '":' + '"' + cDireccion.value + '",'
        + '"' + "Descripcion" + '":' + '"' + cDescripcion.value + '"';
            
alert(datosElementoUrbano);
//realizamos conexiones asincronas creando un objeto de la clase XMLHttpRequest
    var ajaxrequest = new XMLHttpRequest();
    //en la variable jdatoselemento guardanmos todos los elementos    
            var jdatoselemento = "{" + datosElementoUrbano + "}";
    //variable con los datos a enviar
    //"todo" es lo que estara en el post de la base de datos
            var envio = "Todo=" + jdatoselemento;

            ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/grabarElementoUrbano.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
            console.log("Datos Recibidos  :" + datosLeidos);
        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //alert(envio)
  //se envian los datos 
    ajaxrequest.send(envio);
}

//funciona
function siguiente(){
    moverSiguiente=true;
    nuevo=true;
    
    if (cId.value == "") {
        cId.value = 0;
    }
    var condicion = ">";
    var jdatoselemento = cId.value + "," + condicion;
    let envio = "Envio=" + jdatoselemento;
    var ajaxrequest = new XMLHttpRequest();
    //en la variable jdatoselemento guardanmos todos los elementos    
            
    //variable con los datos a enviar
    //"todo" es lo que estara en el post de la base de datos
    
    ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/cambiarSiguienteAnterior.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosRecibidos = ajaxrequest.responseText.split(",");
            mostrar_consulta(datosRecibidos)
            alert(datosRecibidos);
        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}
//funciona
function anterior(){
    moverSiguiente=true;
    nuevo=true;
    
    if (cId.value == "") {
        cId.value = 1;
    }
    var condicion = "<";
    var jdatoselemento = cId.value + "," + condicion;
    let envio = "Envio=" + jdatoselemento;
    var ajaxrequest = new XMLHttpRequest();
    
    ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/cambiarSiguienteAnterior.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosRecibidos = ajaxrequest.responseText.split(",");
            mostrar_consulta(datosRecibidos)
            alert(datosRecibidos);
        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}
// no funciona
function borrar(){
    
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/borrarElementosUrbanos.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
            console.log(datosLeidos);
            primero();
        }
    };
    
    let id=cId.value;
    let envio='Envio='+id;

    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);             
}

function modificar(){
   
    let id=cId.value;
    var datosElementoUrbano = id+','+ cTipo.value +','+ cCantidad.value +','
    + cHora.value + ','+ cFecha.value +','+ cLatitud.value +','+ cLongitud.value +','+ cDireccion.value +','+ cDescripcion.value;

    var envio = "Envio=" + datosElementoUrbano;
    var ajaxrequest = new XMLHttpRequest();

            ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/modificarElementoUrbano.php", true);
            ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajaxrequest.onreadystatechange = function ()
            {
                //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
                if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
                    var datosLeidos = ajaxrequest.responseText;
                    datos_consulta=datosLeidos;
                    console.log(datos_consulta);
                    
                }
            };
            //ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajaxrequest.send(envio);    
            primero(); 
}
function primero(){
    
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/primeroElementosUrbanos.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
           mostrar_consulta(datosLeidos);
           console.log("Datos Recibidos  :" + datosLeidos);
        }
    };
    let jdatoselemento="ASC"
    let envio = "Envio=" + jdatoselemento;
    alert(envio);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);   
}
function ultimo(){
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/ultimoElementoUrbano.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
            mostrar_consulta(datosLeidos);
            console.log("Datos Recibidos  :" + datosLeidos);
        }
    };
    let jdatoselemento="DESC"
    let envio = "Envio=" + jdatoselemento;
    alert(envio);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);     
}
function mostrar_consulta(datosLeidos){
    var lista= new Array();
    lista= JSON.parse(datosLeidos);
    alert(lista);
    if (lista!=null){
        visualizar(lista[0]);
    }else{
        alert("no hay mas registros");
    }
}
function visualizar(registro){
    cId.value= registro.Id;
    cTipo.value= registro.Tipo;
    cCantidad.value=registro.Cantidad;
    cHora.value= registro.Hora;
    cFecha.value= registro.Fecha;
    cLatitud.value= registro.Latitud;
    cLongitud.value= registro.Longitud;
    cDireccion.value=registro.Direccion;
    cDescripcion.value=registro.Descripcion;
}


