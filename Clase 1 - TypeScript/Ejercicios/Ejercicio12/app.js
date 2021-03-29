/*
Crear una funcion que reciba como unico parametro una cadena que contenga el dia, mes y año
de nacimiento de una persona (con formato dd-mm-yyyy). La funcion mostrara por consola
a que signo corresponde dicha fecha de nacimiento.

Nota: Para descomponer la fecha recibida como parametro utilice la funcion split().
*/
var signo = function (fecha) {
    var cadena = fecha.split("-");
    var dia = Number(cadena[0]);
    var mes = Number(cadena[1]);
    if ((dia >= 21 && mes == 3) || (dia <= 19 && mes == 4)) {
        console.log("Aries");
    }
    else if ((dia == 20) && (mes == 4 || mes == 5)) {
        console.log("Tauro");
    }
    else if ((dia >= 21 && mes == 5) || (dia <= 20 && mes == 6)) {
        console.log("Geminis");
    }
    else if ((dia >= 21 && mes == 6) || (dia <= 22 && mes == 7)) {
        console.log("Cancer");
    }
    else if ((dia >= 23 && mes == 7) || (dia <= 22 && mes == 8)) {
        console.log("Leo");
    }
    else if ((dia >= 23 && mes == 8) || (dia <= 22 && mes == 9)) {
        console.log("Virgo");
    }
    else if ((dia >= 23 && mes == 9) || (dia <= 22 && mes == 10)) {
        console.log("Libra");
    }
    else if ((dia >= 23 && mes == 10) || (dia <= 21 && mes == 11)) {
        console.log("Escorpio");
    }
    else if ((dia >= 22 && mes == 11) || (dia <= 21 && mes == 12)) {
        console.log("Sagitario");
    }
    else if ((dia >= 22 && mes == 12) || (dia <= 19 && mes == 1)) {
        console.log("Capricornio");
    }
    else if ((dia >= 20 && mes == 1) || (dia <= 18 && mes == 2)) {
        console.log("Acuario");
    }
    else if ((dia >= 19 && mes == 2) || (dia <= 20 && mes == 3)) {
        console.log("Piscis");
    }
};
signo("22-3-2000");
signo("18-4-2000");
signo("20-5-2000");
signo("01-04-2000");
signo("09-12-2020");
signo("05-08-2020");
