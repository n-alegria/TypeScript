/*
Definir una funcion que determine si la cadena de texto que se le pasa
como parámetro es un palíndromo, es decir, si se lee de la misma forma
desde la izquierda y desde la derecha.
Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
*/

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