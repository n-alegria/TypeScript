/*
Crear una funcion que realice el calculo factorial del numero 
que recibe como parámetro.

Nota: Utlizar console.log()
*/

function Factorial(numero: number): void {
    var factorial: number = 1;
    for (var i: number = 2; i <= numero; i++) {
        factorial = factorial * i;
    }
    console.log(factorial);
}

Factorial(4);