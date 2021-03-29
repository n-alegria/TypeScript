/*
Realizar una funcion que reciba un numero y muestre (por consola) un
mensaje como el siguiente:
El numero 5 es impar, siendo 5 el numero recibido como parametro.
*/

function Ejercicio (numero : number){
    if(numero % 2 == 0){
        console.log(`El numero ${numero} es par.`);
    }
    else{
        console.log(`El numero ${numero} es impar.`);
    }
}

Ejercicio(5);