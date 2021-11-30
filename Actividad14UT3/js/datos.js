let cajaChequeo=null;

function  elementoSeleccionado(caja){
    console.log(caja.id);
    cajaChequeo=caja.id;
    
}

function eevaluaPatron(){
    console.log("cajaCheque"+cajaChequeo);
    //ID
    if (cajaChequeo=="cId"){
        let patron = /^[0-9]+$/;
        let resultado = patron.test(cId.value);
        console.log("Resultado Chequeo:"+resultado);
        if (!resultado){
            document.getElementById("cId").style.color="red";
            document.getElementById("cId").focus();
        }else{
            document.getElementById("cId").style.color="black";
        }
    }
    //TIPO
    if(cajaChequeo=="cTipo"){
        /* /w es lo mismo que [a-zA-Z0-9]/ */
        //var patron = /^[a-zA-Záéíóú]+$/;
        //Temperatura, Luminosidad, Caudal, Viento, Contaminacion(CO2), Posicion GPS
        let patron =/^Temperatura$|^Luminosidad$|^Caudal$|^Viento$|^Contaminacion$|^Posicion GPS$/;
        let resultado = patron.test(cTipo.value);
        console.log("Resultado Chequeo:"+resultado);
        if (!resultado){
            document.getElementById("cTipo").style.color="red";
            document.getElementById("cTipo").focus();
        }else{
            document.getElementById("cTipo").style.color="black";
        }
    }

    //CANTIDAD
    if(cajaChequeo=="cCantidad"){
        //var patron = /^[a-zA-Z0-9áéíóú]+$/;
        let patron =/^[0-9]+$/;
        let resultado = patron.test(cCantidad.value);
        console.log("Resultado Chequeo:"+resultado);
        if (!resultado){
            document.getElementById("cCantidad").style.color="red";
            document.getElementById("cCantidad").focus();
        }else{
            document.getElementById("cCantidad").style.color="black";
        }
    }
    //HORA
    if(cajaChequeo=="cHora"){
        let patron = /^[0-9]{2}[:][0-9]{2}$/;
        let resultado = patron.test(cHora.value);
        console.log("Resultado Chequeo:"+resultado);
        if (!resultado){
            document.getElementById("cHora").style.color="red";
            document.getElementById("cHora").focus();
        }else{
            document.getElementById("cHora").style.color="black";
        }
    }
    //FECHA
    if(cajaChequeo=="cFecha"){
        let patron =/^[0-9]{2}[-][0-9]{2}[-][0-9]{4}$/; 
        let resultado = patron.test(cFecha.value);
        console.log("Resultado Chequeo:"+resultado);
        if (!resultado){
            document.getElementById("cFecha").style.color="red";
            document.getElementById("cFecha").focus();
        }else{
            document.getElementById("cFecha").style.color="black";
        }
    }
    //Latitud
    if(cajaChequeo=="cLatitud"){
        let patron = /^[0-9.]*$/; 
        let resultado = patron.test(cLatitud.value);
        console.log("Resultado Chequeo:"+resultado);
        if (!resultado){
            document.getElementById("cLatitud").style.color="red";
            document.getElementById("cLatitud").focus();
        }else{
            document.getElementById("cLatitud").style.color="black";
        }
    }

    //Longitud
    if(cajaChequeo=="cLongitud"){
        let patron = /^[-][0-9.]*$/; 
        let resultado = patron.test(cLongitud.value);
        console.log("Resultado Chequeo:"+resultado);
        if (!resultado){
            document.getElementById("cLongitud").style.color="red";
            document.getElementById("cLongitud").focus();
        }else{
            document.getElementById("cLongitud").style.color="black";
        }
    }

    //DIRECCION 
    if(cajaChequeo=="cDireccion"){
        let patron =/(?=^.{1,150}$)[a-zA-Z0-9áéíóú]+/
        let resultado =patron.test(cDireccion.value);
        console.log("Resltado Chequeo:"+resultado )
        if(!resultado){
           document.getElementById("cDireccion").style.color="red"
           document.getElementById("cDireccion").focus()
        }else{
            document.getElementById("cDireccion").style.color="black"
        }    
    }

    //DESCRIPCION 
    if(cajaChequeo=="cDescripcion"){
        let patron =/(?=^.{1,300}$)[a-zA-Z0-9áéíóú]+/
        let resultado =patron.test(cDescripcion.value);
        console.log("Resltado Chequeo:"+resultado )
        if(!resultado){
           document.getElementById("cDescripcion").style.color="red"
           document.getElementById("cDescripcion").focus()
        }else{
            document.getElementById("cDescripcion").style.color="black"
        }    
    }
}


let cajas=document.querySelectorAll("form input")


//funcion flecha
cajas.forEach( caja => {
    // caja.addEventListener('focus',()=>{
    caja.addEventListener('keydown',()=>{
        elementoSeleccionado(caja)
    });
    
});

cajas.forEach( caja => {
    //caja.addEventListener('blur',()=>{
    caja.addEventListener('keyup',()=>{
        eevaluaPatron()
    });
    
});


//para la tabla
var datos = new Array();

var contador = 0; 
var pos = 0;

var bTabla=document.getElementById("tabla");
bTabla.addEventListener("click", tabla, false);



function datosUrbanos(cId, cLatitud, cLongitud, cDireccion, cTipo) {
    this.cId = cId;
    this.cLatitud = cLatitud;
    this.cLongitud = cLongitud;
    this.cDireccion = cDireccion;
    this.cTipo = cTipo;

    this.guarda = guardadatos;

}

function guardadatos() {
    alert(this.cId);
    datos[contador] = this;
    contador = contador + 1;
    pos = contador;
}
     //IMPRIMIR TABLA
function tabla() {
    document.getElementById("cabecera").innerHTML= '<tr><td style="height: 25px">ID</td>'+
    '<td style="height: 25px">Latitud</td>'+
    '<td style="height: 25px">Longitud</td>'+
    '<td style="height: 25px;">Direccion</td>'+
    '<td style="height: 25px">Tipo</td>'+
    '</tr>';
    
    //Obtengo la tabla y cuerpo
        var tabla = document.getElementById("tabla");
        var cuerpo = document.getElementById("cuerpo");
    // var da = new datosUrbanos();
    
       alert(datos[0]);
        for (i = 0; i < datos.length; i++) {
            alert("entra")
            //Creo un libro vacio
           
            var da = datos[i];
            //Creo objetos, tr, p, td
            linea = document.createElement("tr");


           // NO SE NECESITA parrafo = document.createElement("p");
            dato = document.createTextNode(da.cId);
            alert(da.cId);
            Columna = document.createElement("td");
            //
            
            Columna.appendChild(dato);
            //Al tr añado la columna
            linea.appendChild(Columna);

            parrafo = document.createElement("p");
            dato = document.createTextNode(da.cLatitud);
            Columna = document.createElement("td");
            //Cambiar el color de las letras
            Columna.style="colo:red";
            Columna.appendChild(dato);
            linea.appendChild(Columna)


            parrafo = document.createElement("p");
            dato = document.createTextNode(da.cLongitud);
            Columna = document.createElement("td");
            Columna.appendChild(dato);
            linea.appendChild(Columna)
             
            parrafo = document.createElement("p");
            dato = document.createTextNode(da.cDireccion);
            Columna = document.createElement("td");
            Columna.appendChild(dato);
            linea.appendChild(Columna)

            parrafo = document.createElement("p");
            dato = document.createTextNode(da.cTipo);
            Columna = document.createElement("td");
            Columna.appendChild(dato);
            linea.appendChild(Columna)

            cuerpo.appendChild(linea);
        }
        
        tabla.appendChild(cuerpo);
    }


