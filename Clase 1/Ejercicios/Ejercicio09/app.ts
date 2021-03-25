/*
Realizar una funcion que solicite (por medio de un parametro) un numero.
Si el numero es positivo, se mostrara el factorial de ese numero, caso
contrario se mostrara el cubo de dicho numero.

Nota: Realizar la funcion que determina el factorial de un numero y
la que calcula el cubo de un numero.
*/

let factorial : Function = function Factorial(numero: number): number {
    var factorial: number = 1;
    for (var i: number = 2; i <= numero; i++) {
        factorial = factorial * i;
    }
    return (factorial);
}

let cubo : Function = function Cubo(numero: number): number{
    return Math.pow(numero, 3);
}

function NumeroMagico(numero: number): void{
    if(numero > 0){
        console.log(factorial(numero));
    }
    else{
        console.log(cubo(numero));
    }
}

NumeroMagico(4);
NumeroMagico(-4);