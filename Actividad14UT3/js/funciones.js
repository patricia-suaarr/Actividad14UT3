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
     direccionMapa.innerHTML = direccion;
}