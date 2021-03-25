/*
Definir una funcion que determine si la cadena de texto que se le pasa
como parámetro es un palíndromo, es decir, si se lee de la misma forma
desde la izquierda y desde la derecha.
Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
*/


// function Palíndromo(oracion: string): void {
//     oracion = oracion.toLocaleLowerCase();
//     oracion = oracion.replace(/\s/g, "");
//     var bandera: boolean = false;
//     var i: number = 0;
//     for (var j: number = (oracion.length - 1); j >= (oracion.length / 2); j--) {
//         //console.log(oracion.charAt(i) + oracion.charAt(j));
//         if (oracion.charAt(i) == oracion.charAt(j)) {

//         }
//         else {
//             bandera = true;
//             break;
//         }
//         i++;
//     }
//     if (bandera) {
//         console.log("Es un palíndromo");
//     }
//     else {
//         console.log("NO es un palíndromo");
//     }

// }

let palindromo = (cadena: string) :void =>{
    cadena = cadena.toLowerCase().replace(/\s/g, "");
    let cadenaInversa: string = cadena.split("").reverse().join("");
    let bandera: boolean = true;
    for (let index = 0; index < cadena.length; index++) {
        if(cadena[index] != cadenaInversa[index])
            bandera = false;
            break;
    }
    if(bandera){
        console.log("Es palindromo");
    }
    else{
        console.log("No es palindromo");
    }
}

palindromo("paap");
palindromo("larutanosaportootropasonatural");
palindromo("xd");

palindromo("Larutanosaportootropasonatural");
palindromo("La ruta nos aporto otro paso natural");