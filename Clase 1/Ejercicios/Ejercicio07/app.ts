/*
Se necesita mostrar por consola los primeros 20 numeros primos.
Para ello realizar una funcion.

Nota: Utilizar console.log()
*/

function Primos(): void {
    var contador: number = 0;
    var i: number = 1;
    for (var j: number = 1; j < 20; j++) { //recorre los 20 numeros
        contador = 0;
        for (i = 1; i <= j; i++) { //hace todas las divisiones del numero j
            if (j % i == 0) {   //si la division es justa se suma al contador 
                contador++;
            }
            if (j == i) {
                if (contador == 2) { //solo divisible por dos, en ese caso es primo
                    console.log(i);
                }
            }
        }

    }
}

Primos();