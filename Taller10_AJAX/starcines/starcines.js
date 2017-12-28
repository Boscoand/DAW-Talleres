
/*
- Listener: Al terminar la carga de la página

Agregar la redirección el contenido a wikipedia: https://es.wikipedia.org/wiki/Asesinato_en_el_Orient_Express
al evento click del botón "Ver página de wikipedia"
*/

/*
- Listener: Al terminar la carga de la página

Agregar el contenido del archivo horarios.js
*/

/*
- Como atributo de una etiqueta

Al pasar el mouse sobre el contenido, 
mostrar la cantidad de puestos disponibles 
en el archivo puestos.xml

Cambiar la visibilidad de la tabla 
*/

var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}




function alertContents() {
    if (http_request.readyState == 4) {
        console.log(http_request.status);
        if (http_request.status == 200) {

            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML
            Utilice JSON.parse() para convertir la respuesta en un objeto
            */
            
            console.log(http_request);

            var texto = document.getElementById('footer-content');
            texto.appendChild(document.createTextNode(http_request.responseText));
            
           
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('disponibilidad');
    makeRequest('data/footer.txt');
   
}



