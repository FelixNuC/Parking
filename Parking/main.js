//****************VARIABLES*****************/
var matrizadmins = [
    {"id":"12345678A","pass":"12345678A"},
]
var clientes = [
    {"dni":"22222222A","nombre":"Paco","apellido1":"Paquez","apellido2":"Paquerias","telefono":"661234567","mail":"pacopaquezpaquerias@gmail.com","numerocoches":"1"}
]
var coches = [
    {"matricula":"0000BBB","marca":"Honda", "modelo":"Civic", "dniCliente":"22222222A", "aparcado":false}
]
const plazasmaximas = 400;
var plazasactuales = 0;
var matricula;
var marca;
var modelo;
var nombre;
var apellido1;
var apellido2;
var telefono;
var mail;
var dni;
var encontrado=false;
var patternmatricula = /^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}/;
var patternnombre= /^[a-zA-Z ]+$/;
var patterntelefono = /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;
var patternmail = /[\w]+@{1}[\w]+\.[a-z]{2,3}/;
var patterndni = /^[XYZ]?\d{5,8}[A-Z]$/;
//***************FUNCIONES****************/
function verificaradmin(){
    idadmin=document.getElementById("id_in").value;
    passadmin=document.getElementById("pass_in").value;
    for ( i = 0; i < matrizadmins.length; i++) {
        if (idadmin==matrizadmins[i].id && passadmin == matrizadmins[i].pass) {
            alert("Credenciales correctas");
            mostrarcapahub();
        }
    }
}
function comprobaralta() {
matricula = document.getElementById("matricula_in").value;
marca = document.getElementById("marca_in").value;
modelo = document.getElementById("modelo_in").value;
dni = document.getElementById("dni_in").value;
nombre = document.getElementById("NombrePropietario_in").value;
apellido1 = document.getElementById("Apellido1_in").value;
apellido2 = document.getElementById("Apellido2_in").value;
telefono = document.getElementById("telefono_in").value;
mail = document.getElementById("mail_in").value;
if (patternmatricula.test(matricula)) {
        for (let i = 0; i < coches.length; i++) {
            if (matricula==coches[i].matricula) {
                alert("Esa matricula ya existe, porfavor introduzca otra matricula");
                document.getElementById("matricula_in").value="";
                document.getElementById("matricula_in").focus;
                i=coches.length;
            }
        }
    if (patterndni.test(dni)) {
        for (let i = 0; i < clientes.length; i++) {
            if (dni == clientes[i].dni) {
                alert("Ese Cliente ya existe, porfavor introduzca otra Dni");
                document.getElementById("dni_in").value="";
                document.getElementById("dni_in").focus;
                i=clientes.length;
            }
        }
        if (patternnombre.test(nombre)) {
            if (patternnombre.test(apellido1)) {
                if (patternnombre.test(apellido2)) {
                    if (patterntelefono.test(telefono)) {
                        if (patternmail.test(mail)) {
                            let nuevocliente = new Object();
                                nuevocliente.dni= dni;
                                nuevocliente.nombre = nombre;
                                nuevocliente.apellido1 = apellido1;
                                nuevocliente.apellido2 = apellido2;
                                nuevocliente.telefono=telefono;
                                nuevocliente.mail=mail;
                                clientes.push(nuevocliente);
                            let nuevocoche = new Object();
                                nuevocoche.dniCliente = dni;
                                nuevocoche.matricula=matricula;
                                nuevocoche.marca=marca;
                                nuevocoche.modelo=modelo;
                                nuevocoche.aparcado=false;
                                coches.push(nuevocoche);
                                alert("dado de alta correctramente");
                        }else{
                            alert("Mail incorrecto");
                        }
                    }else{
                        alert("telefono incorrecto");
                    }
                }else{
                    alert("apellido2 incorrecto");
                }
            }else{
                alert("apellido1 incorrecto");
            }
        }else{
            alert("nombre incorrecto");
        }
    }else{
        alert("dni incorrecto");
    }
}else{
    alert("matricula incorrecto");
}
}
function dardealtacochenuevo(){
alert("alerta");
dninuevo = document.getElementById("dni_ind").value;
matricula = document.getElementById("matricula_ind").value;
marca = document.getElementById("marca_ind").value;
modelo = document.getElementById("modelo_ind").value;
var cochenuevo = new Object();
// cochenuevo.matricula=
cochenuevo.matricula= matricula;
cochenuevo.dniCliente= dninuevo;
cochenuevo.marca= marca;
cochenuevo.modelo= modelo ;
alert ("El nuevo coche con matricula" + cochenuevo.matricula);
coches.push(cochenuevo);
}
function bajas () {
    dniparabajas = document.getElementById("dni_innn").value;
    if (patterndni.test(dniparabajas)) {
        for (let i = 0; i < clientes.length; i++) {
            if (dniparabajas == clientes[i].dni) {
                opcion= confirm("Desea dar de baja a este cliente? seran eliminados todos los datos relacionados");
                if (opcion) {
                    for (let i = 0; i < coches.length; i++) {
                        if (coches[i].dniCliente==dniparabajas) {
                            coches.splice(i,1)
                        }
                    }
                    for (let i = 0; i < clientes.length; i++) {
                        if (clientes[i].dni==dniparabajas) {
                            clientes.splice(i,1);
                        }
                    alert("El cliente y sus datos relacionados han sido dados de baja");
                
                    }
                }
                i=clientes.length;
            }
        }
}else{
    alert("Has introducido mal el dni, porfavor introduzcalo de nuevo");
    document.getElementById("dni_innn").value="";
    document.getElementById("dni_innn").focus;
}
}
function entradas(){
matricula = document.getElementById("matricula_inn").value;
dni = document.getElementById("dni_inn").value;
if (patternmatricula.test(matricula)) {
    if (patterndni.test(dni)) {
        for (let i = 0; i < coches.length; i++) {
            if (coches[i].matricula==matricula && coches[i].aparcado == false) {
               coches[i].aparcado = true;
               alert("Coche aparcado");
               plazasactuales++;
               i = coches.length;
            }else if (coches[i].matricula==matricula && coches[i].aparcado==true) {
                alert("El coche esta dentro");
                i = coches.length;
            }else if (coches[i].matricula!=matricula ) {
                for (let k = 0; k < clientes.length; k++) {
                    if (clientes[k].dni == dni) {
                        encontrado=true;
                        k=clientes.length;
                        let opcion = confirm("desea dar de alta un nuevo coche");
                        var nuevodni = dni; 

                        mostrardardealtanuevocoche();
                    }else{
                        encontrado=false;
                    }
                }
                    if (!encontrado) {
                        alert("No es un cliente nuestro")
                        let opcion = confirm("desea darse de alta como nuevo cliente?");
                        mostrarcapaaltas();
                        i = coches.length;
                    }
            }
        }
    }else{
        alert("Has introducido mal el DNI")
    }
}else{
    alert("Has introducido mal la matricula")
}
}
function salidas() {
    matricula = document.getElementById("matricula_innnn").value;
    for (let i = 0; i < coches.length; i++) {
      if (coches[i].matricula==matricula) {
        coches[i].aparcado=false;
        plazasactuales--;
        alert("Has sacado el coche " + coches[i].matricula);
      }
    }
}
//******************CAPAS**************/
function mostrardardealtanuevocoche(){
    document.getElementById('capaloging').style.visibility = "hidden";
    document.getElementById('capahub').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "hidden";
    document.getElementById("capaentrada").style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "hidden";
    document.getElementById("capasalidas").style.visibility = "hidden";
    document.getElementById("capaaltacoche").style.visibility = "visible";
}
function mostrarcapaaltas() {
    document.getElementById('capaloging').style.visibility = "hidden";
    document.getElementById('capahub').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "visible";
    document.getElementById("capaentrada").style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "hidden";
    document.getElementById("capasalidas").style.visibility = "hidden";
    document.getElementById("capaaltacoche").style.visibility = "hidden";
}
function mostrarcapalogin(){
    document.getElementById('capaloging').style.visibility = "visible";
    document.getElementById('capahub').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "hidden";
    document.getElementById("capaentrada").style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "hidden";
    document.getElementById("capasalidas").style.visibility = "hidden";
    document.getElementById("capaaltacoche").style.visibility = "hidden";

}
function mostrarcapahub() {
    document.getElementById("contador").innerHTML="<h1>" + plazasactuales +"</h1>";
    let plazasresultado= plazasmaximas - plazasactuales;
    document.getElementById("contadorLibres").innerHTML="<h1>" + (plazasresultado) +"</h1>";
    document.getElementById('capaloging').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "hidden";
    document.getElementById('capahub').style.visibility = "visible";
    document.getElementById("capaentrada").style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "hidden";
    document.getElementById("capasalidas").style.visibility = "hidden";
    document.getElementById("capaaltacoche").style.visibility = "hidden";
}
function mostrarcapaaltas() {
    document.getElementById('capaloging').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "visible";
    document.getElementById('capahub').style.visibility = "hidden";
    document.getElementById("capaentrada").style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "hidden";
    document.getElementById("capasalidas").style.visibility = "hidden";
    document.getElementById("capaaltacoche").style.visibility = "hidden";   
}
function mostrarcapaentradas() {
    document.getElementById("capaentrada").style.visibility = "visible";
    document.getElementById('capaloging').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "hidden";
    document.getElementById('capahub').style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "hidden";
    document.getElementById("capasalidas").style.visibility = "hidden";
    document.getElementById("capaaltacoche").style.visibility = "hidden";
    if (plazasactuales>=plazasmaximas) {
        alert("No quedan plazas libres");
        alert("Vuelva mas tarde");
        mostrarcapahub();
    }
}
function mostrarcapabajas() {
    document.getElementById("capaentrada").style.visibility = "hidden";
    document.getElementById('capaloging').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "hidden";
    document.getElementById('capahub').style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "visible";
    document.getElementById("capasalidas").style.visibility = "hidden";
    document.getElementById("capaaltacoche").style.visibility = "hidden";
}
function mostrarcapasalidas() {
    document.getElementById("capaentrada").style.visibility = "hidden";
    document.getElementById('capaloging').style.visibility = "hidden";
    document.getElementById('capaaltas').style.visibility = "hidden";
    document.getElementById('capahub').style.visibility = "hidden";
    document.getElementById("capabajas").style.visibility = "hidden";
    document.getElementById("capasalidas").style.visibility = "visible";
    document.getElementById("capaaltacoche").style.visibility = "hidden";
}
//**************LLAMADAS***********/
//mostrarcapahub();
//mostrardardealtanuevocoche()
mostrarcapalogin();