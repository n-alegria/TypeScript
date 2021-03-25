/*
Realizar una funcion que reciba como parámetro un número y que retorne
el cubo del mismo.

Nota: La función retornará el cubo del parámetro ingresado. Realizar
una función que invoque a esta última y permita mostrar por consola
el resultado.
*/
function Cubo(numero) {
    return Math.pow(numero, 3);
}
function MostrarCubo(cubo) {
    console.log(Cubo(cubo));
}
MostrarCubo(4);
