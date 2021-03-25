/*
Guardar su nombre y apellido en dos variables distintas. Dichas
variables seran pasadas como parámetro de la funcion
MostrarNombreApellido, que mostrará el apellido en mayuscula y
el nombre solo con la primera letra en mayúsculas y el resto
en minúsculas.
El nombre y el apellido se mostrarán separados por una coma (,).

Nota: Utilizar console.log()
*/
var nombre = 'lautaro';
var apellido = 'alegria';
var MostrarNombreApellido = function (firstName, lastName) {
    console.log(lastName.toUpperCase() + ", " + firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase());
};
MostrarNombreApellido(nombre, apellido);
