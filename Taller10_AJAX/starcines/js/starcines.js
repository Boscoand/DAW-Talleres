var http_request2 = false;

function makeRequest2(url) {


    http_request2 = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request2 = new XMLHttpRequest();
        if (http_request2.overrideMimeType) {
            http_request2.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request2 = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request2 = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request2) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request2.onreadystatechange = alertContents2;
    http_request2.open('GET', url, true);
    http_request2.send(null);

}

function alertContents2() {
    if (http_request2.readyState == 4) {
        console.log(http_request2.status);
        if (http_request2.status == 200) {
            var texto = document.getElementById('footer-content');
            texto.appendChild(document.createTextNode(http_request2.responseText));
            console.log(http_request2.responseText)
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

// window.onload = function() {
//     var link = document.getElementById('disponibilidad');
//     makeRequest2('data/footer.txt');   
// }

// 

var http_request = false;

function makeRequest(url) {

    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('application/json');
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
        if (http_request.status == 200) {
            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML
            Utilice JSON.parse() para convertir la respuesta en un objeto
            */
            let respuesta = JSON.parse(http_request.response)
            var cont = 0;

            for (item in respuesta) { 

                var tbody = document.getElementById("cuerpotabla-peliculas")
                var fila = document.createElement("tr")
                fila.setAttribute("id", item);
                fila.addEventListener("mouseover", function(){
                    
                    var element = document.getElementById("tmp");
                    if(element!=null)
                      element.outerHTML = "";
                    // delete element;                    

                    makeRequest1('data/puestos.xml', this.getAttribute("id"));
                    // console.log(this.getAttribute("id"));

                });

                tbody.appendChild(fila)
                
                var newNumero = document.createElement("th")
                fila.appendChild(newNumero)
                newNumero.appendChild(document.createTextNode(cont))

                var newHora = document.createElement("td")
                fila.appendChild(newHora)
                newHora.appendChild(document.createTextNode(respuesta[item].hora))

                var newDimension = document.createElement("td")
                fila.appendChild(newDimension)
                newDimension.appendChild(document.createTextNode(respuesta[item].tipo))

                var newIdioma = document.createElement("td")
                fila.appendChild(newIdioma)
                newIdioma.appendChild(document.createTextNode(respuesta[item].idioma))

               cont+=1

                if ((cont%2)==0)
                    fila.setAttribute('style', "background-color: gray;")
            }
            
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    makeRequest('data/horarios.json');
    makeRequest2('data/footer.txt');   

    var disponibilidad = document.getElementById('disponibilidad');
    disponibilidad.setAttribute("style", "visibility: visible;");

    document.getElementById("boton").addEventListener("click", function(){
        window.location.href = "https://es.wikipedia.org/wiki/Asesinato_en_el_Orient_Express"
    })
}

// disponibilidad

var http_request_ = false;

function makeRequest1(url, indice) {
    // console.log("indice",indice)
    http_request_ = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request_ = new XMLHttpRequest();
        if (http_request_.overrideMimeType) {
            http_request_.overrideMimeType('text/xml');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request_ = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request_ = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request_) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    
    http_request_.onreadystatechange = function(){
                            if (http_request_.readyState == 4) {
                                if (http_request_.status == 200) {
                                    
                                    let xml = http_request_.responseXML;
                                    // console.log(xml);
                                    let funcion = xml.getElementsByTagName("funcion");

                                    for(var i=0; i < funcion.length; i++){
                                        nombre = funcion[i].getElementsByTagName("nombre")[0].firstChild.nodeValue
                                        
                                        if(nombre == indice){
                                            fila = funcion[i].getElementsByTagName("filas")[0].getElementsByTagName("fila")

                                            var tbody = document.getElementById("cuerpotabla-disponibilidad")
                                            var container = document.createElement("div")
                                            container.setAttribute("id", "tmp")
                                            tbody.appendChild(container);

                                            for(var j=0; j < fila.length; j++){
                                                var fila1 = document.createElement("tr")
                                                container.appendChild(fila1)

                                                var newPuestos = document.createElement("td")
                                                fila1.appendChild(newPuestos)
                                                newPuestos.appendChild(document.createTextNode(fila[j].firstChild.nodeValue))

                                                var newFila = document.createElement("td")
                                                fila1.appendChild(newFila)
                                                newFila.appendChild(document.createTextNode(fila[j].getAttribute("puestos")))
                                            }
                                        }
                                    }
                                } else {
                                    alert('Hubo problemas con la petición.');
                                }
                            }
    };

    http_request_.open('GET', url, true);
    http_request_.send(null);

}

function cargarHorario(indice) {
    if (http_request_.readyState == 4) {
        if (http_request_.status == 200) {
            
            let xml = http_request_.responseXML;
            // console.log(xml);
            let funcion = xml.getElementsByTagName("nombre");

            for(var indice=0; indice < funcion.length; indice++){
                console.log(funcion[indice].firstChild.nodeValue);
            }

        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}



