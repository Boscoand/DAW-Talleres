/*Agregue los datos del director, fecha de estreno, género y clasificación*/
var director = document.getElementById('director')
var nombreDirector = document.createTextNode("Sidney Lumet")
director.appendChild(nombreDirector)
// director.setAttribute("", "")

var estreno = document.getElementById('estreno')
var nombreEstreno = document.createTextNode("estreno")
estreno.appendChild(nombreEstreno)

var genero = document.getElementById('genero')
var nombreGenero = document.createTextNode("genero")
genero.appendChild(nombreGenero)

/*Agregue la siguiente información en la tabla*/
horarios = {
	"funcion1": {"hora":"17:15", "tipo":"2D","idioma":"Español"},
	"funcion2": {"hora":"19:30", "tipo":"3D","idioma":"Inglés"},
	"funcion3": {"hora":"21:50", "tipo":"2D","idioma":"Español"}
}

/*Agregue las clases para convertir la tabla estilo cebra*/

var cont=1

for (item in horarios) { 

	var tbody = document.getElementById("cuerpotabla")
	var fila = document.createElement("tr")
	tbody.appendChild(fila)
	
	var newNumero = document.createElement("th")
	fila.appendChild(newNumero)
	newNumero.appendChild(document.createTextNode(cont))

	var newHora = document.createElement("td")
	fila.appendChild(newHora)
	newHora.appendChild(document.createTextNode(horarios[item].hora))

	var newDimension = document.createElement("td")
	fila.appendChild(newDimension)
	newDimension.appendChild(document.createTextNode(horarios[item].tipo))

	var newIdioma = document.createElement("td")
	fila.appendChild(newIdioma)
	newIdioma.appendChild(document.createTextNode(horarios[item].idioma))

	cont+=1

	if ((cont%2)==0)
		fila.setAttribute('style', "background-color: gray;")

}

/*Redireccionar el contenido a wikipedia: https://es.wikipedia.org/wiki/Asesinato_en_el_Orient_Express*/
document.getElementById("boton").addEventListener("click", function(){
	window.location.href = "https://es.wikipedia.org/wiki/Asesinato_en_el_Orient_Express"
})

// Agregue un pie de página con la siguiente información


mensajes = [
    { title: 'Copyright © 2015 StarCines.' },
    { title: 'Todos los Derechos Reservados. ' },
    { title: 'Av. Mariano Acosta y Fray Vacas Galindo ' },
    { title: '+593 6-250-5023 ' },
    { title: 'Ibarra - Ecuador ' }
]

var footer = document.createElement("footer")
document.getElementsByTagName('body')[0].appendChild(footer)

for (frases in mensajes) {
	var txt = document.createTextNode(mensajes[frases].title)
	var br = document.createElement("br")
	footer.appendChild(txt)
	footer.appendChild(br)
}
