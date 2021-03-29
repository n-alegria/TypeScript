/*
Definir una funcion que muestre informacion sobre una cadena de texto
que se le pasa como argumento. A partir de la cadena que se le pasa,
la funcion determina si esa cadena esta formada sólo por mayúsculas,
solo por minúsculas o por una mezcla de ambas.
*/

function DefinirCadena(cadena: string): void{
    if(cadena == cadena.toUpperCase()){
        console.log("La cadena esta formada solo por mayusculas.");
    }
    else if(cadena == cadena.toLowerCase()){
        console.log("La cadena esta formada solo por minusculas.");
    }
    else{
        console.log("La cadena esta formada por una mezcla de ambas.");
    }
}

DefinirCadena('prueba');
DefinirCadena('pruEBa');
DefinirCadena('PRUEBA');