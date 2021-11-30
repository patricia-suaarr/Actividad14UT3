var map;

var latitud = 41.67097948393865;
var longitud = -3.6769259916763985;
function inicio()
{

map = new google.maps.Map(
    document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(latitud,longitud),//latitud,longitud),//
       // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
    zoom: 18, // zoom del mapa
    draggableCursor: 'auto', // forma del cursor
    draggingCursor: 'crosshair',
    mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
});
}
inicio();
VisualizarMarcador();

function VisualizarMarcador(){
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://www.informaticasc.com/daw_2122/CiudadI/php/PatriciaSualdea/latitudlongitud.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
    var datosLeidos = ajaxrequest.responseText;
    var lista= new Array();
    lista= JSON.parse(datosLeidos);
    console.log(lista);
    
    for (i=0;i<lista.length;i++){

        console.log("entra");
        var icono2 = {
            url: "imagenes/Logop.png", // url
            scaledSize: new google.maps.Size(25, 25), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        var latlog= new google.maps.LatLng(lista[i].Latitud, lista[i].Longitud);
        let latitud=lista[i].Latitud;
        let longitud=lista[i].Longitud;


        marker2 = new google.maps.Marker({
            position: latlog,
            icon: icono2,
            map: map,
            nombre: 'Pepino'
        });

        marker2.addListener("click", function(){

            document.getElementById("cLatitud").value = latitud;

            document.getElementById("cLongitud").value = longitud;

    });
    }
}
};
ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajaxrequest.send();      

}
//CAMBIAR ICONO CUANDO PULSAMOS VARIOS

let icono1 = {
    url: "imagenes/lupa.jpg",
    scaledSize: new google.maps.Size(25, 25),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
};

let marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(latitud, longitud),
    icon: icono1,
    map: map,
    nombre: 'pepino'
});

//---------------ARRAY DE IMAGENES-------------
var aimagenes = new Array();
aimagenes[0] = "imagenes/Logop.png"
aimagenes[3] = "imagenes/curso.png"
aimagenes[1] = "imagenes/Logo.jpg"
aimagenes[2] = "imagenes/bandera.png"
 
let dibujaVarios = document.getElementById("CambiarImagen");

let intervalo;

dibujaVarios.addEventListener("click", function () {
     intervalo = setInterval(mostrar ,  3000)
 i=0;
}, false);


//MOSTRAMOS EL MARCADOR CON IMAGENES DIFERENTES
function mostrar(){   


console.log(i);
            icono1 = {
                url: aimagenes[i], // url
                scaledSize: new google.maps.Size(25, 25), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
    
            marker1 = new google.maps.Marker({
                position: new google.maps.LatLng(latitud, longitud),
                icon: icono1,
                map: map,
                nombre: 'Pepino'
            });
        i++;
            if(i==4){
                window.clearInterval(intervalo)
            }

}


//----------------TRAZADO----------
var trazarRecinto=document.getElementById("trazarRecinto");
trazarRecinto.addEventListener("click",Trazar,false);

function Trazar() {

    var arrayMarcadores= new Array();

    console.log(arrayMarcadores.push(marker1));
    arrayMarcadores.push(marker1);

    var tipo_trazo;
    var colortrazado ="blue";

    cRecinto = ""
    var posiciones = "[";

 	//Genera un string de objetos  google.maps.LatLng con todos los marcadores
	// que se han guardado en murallas
    for (i = 0; i < arrayMarcadores.length; i++) {
        posiciones = posiciones + "new google.maps.LatLng" + arrayMarcadores[i] + ",";
        cRecinto = cRecinto+ arrayMarcadores[i] + ",";
    }
    posiciones = posiciones.substr(0, posiciones.length - 1);

    if (tipo_trazo == "recinto") {
        posiciones = posiciones + ",new google.maps.LatLng" + arrayMarcadores[0] + "]";
    }
    else { posiciones = posiciones + "]"; }
    //alert("POSICIONES " + posiciones);
    if (arrayMarcadores.length> 0) {
        var polygon = "new google.maps.Polyline({" +
            "path:" + posiciones + "," +
            "strokeColor:'" + colortrazado + "'," +
            "strokeOpacity: 2," +
            "strokeWeight: 1.3," +
            "geodesic: true})";

        eval(polygon).setMap(map);
    }
}

//-------------MEDIR DISTANCIAS----------

var medir=document.getElementById("medir");
medir.addEventListener("click",Mideme,false);
function Mideme(inicial,final)
{    
    api=(inicial+"").split(",");
        
    apf=final.split(",");
       
    var posicionInicial = new google.maps.LatLng(api[0],api[1]);//  
    var posicionFinal = new google.maps.LatLng(apf[0],apf[1]);// eval(pf));//

    var angulo = google.maps.geometry.spherical.computeHeading( posicionInicial,posicionFinal);

    var distancia = google.maps.geometry.spherical.computeDistanceBetween( posicionInicial,posicionFinal);

    console.log(posicionFinal);
    console.log(posicionInicial);

  return distancia;     

	}

//PONER UN MARCADOR CUANDO HACEMOS CLIC EN EL MAPA
google.maps.event.addListener(map, 'click', function (event) {
    datolatitud_longitud = event.latLng.toString();
    var fileName = "./imagenes/Logo.png";
    var icono = {
        url: "./imagenes/logo.png", // url
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    marker = new google.maps.Marker({
        position: event.latLng,
        icon: icono,
        map: map,
        nombre: 'Pepino'
    });
    google.maps.event.addListener(marker, 'click', function() {
    //  alert("Click en marcador " + this.nombre+latitud_longitud.value);
});
//enviaLL(lineaAutobus,datolatitud_longitud);
leeDireccion(event.latLng);
});



// Obtiene la longitud y la latitud correspondiente al clic
// y copia los datos en cajas de texto. Tambien obtiene la
// dirección del lugar donde hacemos clic
/*function leeDireccion( latlng) {
    geocoder = new google.maps.Geocoder();
    if (latlng != null) {
        //    address = latlng;
        //    geocoder.getLocations(latlng, MuestraDireccion);
           
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //https://developers.google.com/maps/documentation/javascript/geocoding?hl=es
                    //  alert(results[1].formatted_address);
                    //  alert(results[0].formatted_address);
                    MuestraDireccion(latlng,results[0].formatted_address)
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });                   
      
    }
}
*/
//--------MOSTRAR DIRECCION---------------
/*function MuestraDireccion(latlng,cDireccion) {
 
    cDireccion.value= cDireccion;
       
        cLatitud.value=latlng.lat();
        cLongitud.value=latlng.lng();
    }
*/

//Leer la dirección postal de la latidu y longitud obtenidas
function leeDireccion(latlng) {
    geocoder = new google.maps.Geocoder();
    if (latlng != null) {
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                MuestraDireccion(latlng, results[0].formatted_address)
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
    }
}
    
function MuestraDireccion(latlng, direccion) {
//Muestra la dirección obtenida en un elemento html de la página
    cDireccion.value = direccion;
    cLatitud.value=latlng.lat();
    cLongitud.value=latlng.lng();
}