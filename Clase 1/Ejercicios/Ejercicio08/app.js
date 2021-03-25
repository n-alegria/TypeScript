/*
Crear una funcion que realice el calculo factorial del numero
que recibe como parámetro.

Nota: Utlizar console.log()
*/
function Factorial(numero) {
    var factorial = 1;
    for (var i = 2; i <= numero; i++) {
        factorial = factorial * i;
    }
    console.log(factorial);
}
Factorial(4);
