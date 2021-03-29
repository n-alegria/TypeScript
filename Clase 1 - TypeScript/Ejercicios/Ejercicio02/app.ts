/*
02) Cree una aplicacion que muestre, a través de un Array, los nombres
de los meses de un año y el numero al que ese mes corresponde.
Utilizar una estructura repetitiva para escribir en la consola (console.log()).
*/

var meses: Array<string>  = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
for (let index = 0; index < meses.length; index++) {
    console.log(`${index+1} - ${meses[index]}`);
}