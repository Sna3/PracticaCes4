window.onload = iniciarevento;
var refmembers;
var datostablaheroe;
var refheroesmodificar;
var formheroes;

class hero {
  constructor(name = '', age = 0, secretIdentity = '', powers = '', weakness = '' ) {
    this.name = name;
    this.age = age;
    this.secretIdentity = secretIdentity;
    this.powers = powers;
	this.weakness = weakness;
  }
  
}


function inicializar(){
	refmembers = firebase.database().ref().child("members");
	datostablaheroe = document.getElementById("datostabla");
	mostrarheroes();
}
function mostrarheroes(){
	refmembers.on("value", function(snap){
		var datos = snap.val();
		var filasamostrar = "";
		for(var key in datos)
		{
			filasamostrar += "<tr>"+
								"<td>"+datos[key].id +"</td>"+
								"<td>"+datos[key].name +"</td>"+
								"<td>"+datos[key].age +"</td>"+
								"<td>"+datos[key].secretIdentity +"</td>"+
								"<td>"+datos[key].powers +"</td>"+
								"<td>"+datos[key].weakness +"</td>"+
								"<td>"+
									'<button class = "btn btn-default editar" data-heroe="'+key+'">'+
										'<span class="glyphicon glyphicon-pencil"></spaan></td>'+
									'</button>'+
								"</td>"	+
							"</tr>";	
		}
		datostablaheroe.innerHTML = filasamostrar;
		if(filasamostrar != "")
		{
			var elementoseditables  = document.getElementsByClassName("editar");
			for(i=0; i<elementoseditables.length; i++)
			{
				elementoseditables[i].addEventListener("click", editarHeroe, false);
			}
		}
		
	});
}
function editarHeroe(){
	var keyheroes = this.getAttribute("data-heroe");
	refheroesmodificar = refmembers.child(keyheroes);
	refheroesmodificar.once("value", function(snap){
		var datos = snap.val();
		document.getElementById("id").value = datos.id;
		document.getElementById("name").value = datos.name;
		document.getElementById("age").value = datos.age;
		document.getElementById("secretIdentity").value = datos.secretIdentity;
		document.getElementById("powers").value = datos.powers;
		document.getElementById("weakness").value = datos.weakness;
		
	});
	
}
function iniciarevento()
{
	formheroes = document.getElementById("heroes-mios");
	formheroes.addEventListener("submit", modificar, false);
}
function modificar(event)
{
	
	alert("holu");
	event.preventDefault();
	refheroesmodificar.update({
		id: event.target.id.value,
		name: event.target.name.value,
		age: event.target.age.value,
		secretIdentity: event.target.secretIdentity.value,
		powers: event.target.powers.value,
		weakness: event.target.weakness.value
		
	});
	
	
}