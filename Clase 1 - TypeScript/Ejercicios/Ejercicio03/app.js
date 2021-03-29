/*
Realizar una funcion que reciba un parámetro requerido de tipo numerico
y otro opcional de tipo cadena. Si el segundo parametro es recibido, se
mostrara tantas veces por consola, como indique el primer parámetro.
En caso de no recibir el segundo parámetro, se mostrara el valor inverso
del primer parámetro.
*/
function Ejercicio(numero, cadena) {
    if (cadena) {
        for (var index = 0; index < numero; index++) {
            console.log(cadena + "\n");
        }
    }
    else {
        console.log(numero * -1);
    }
}
Ejercicio(5);
