/*
Un número de Smith es un número entero tal que la suma de sus dígitos es igual a la
suma de los dígitos de los números restantes tras la factorización en primos (la
factorización debe estar escrita sin exponentes, repitiendo los números todas las veces
necesarias). Por ejemplo, 378 = 2 × 3 × 3 × 3 × 7 es un número de Smith en base 10,
porque 3 + 7 + 8 = 2 + 3 + 3 + 3 + 7. Por definición, se deben contar los dígitos de los
factores. Por ejemplo, 22 en base 10 es 2 × 11, y se deben contar los tres dígitos: 2, 1,
1. Por lo tanto 22 es un número de Smith porque 2 + 2 = 2 + 1 + 1

Nota: Utilice tres funciones, una realiza la comparación, otra descompone el numero en
sus factores primos y suma los coeficientes, y la última función suma cada termino.
*/

function numeroPrimo(numeroPrimos:number):void
{
   var numeroPrimoAux = numeroPrimos;
    var cadena:string ="";
    
   for(var i = 2;i <= numeroPrimos; i++)
   {
       while(numeroPrimos%i == 0)
       {
           console.log(numeroPrimos + " | " + i + " \n");
           numeroPrimos/=i;
           cadena+=i;
       }

   }
  console.log("La cadena de numeros primos:"+cadena+"\n");
  var auxNum:number=0;
  var sumador:number=0;
   for(var j = 0; j<cadena.length;j++)
   {
       auxNum = parseInt(cadena[j]);
       console.log(auxNum + "\n");
       sumador +=auxNum;
   }
   console.log("Los numeros primos sumados: "+ sumador + "\n");

   var cadenaNumero:string;
   cadenaNumero = numeroPrimoAux.toString();
   var auxNumeroDelNumero:number = 0;
   var sumadorDos = 0;
   for(var k = 0; k<cadenaNumero.length;k++)
   {
       auxNumeroDelNumero = parseInt(cadenaNumero[k]);
       console.log(auxNumeroDelNumero + "\n");
       sumadorDos +=auxNumeroDelNumero;
   }
   console.log(sumadorDos);

   if(sumador == sumadorDos)
   {
       console.log("El numero ingresado ("+numeroPrimoAux+") es un numero de Smith.");
   }
   else
   {
       console.log("El numero ingresado ("+numeroPrimoAux+") NO es un numero de Smith.");
   }
}

var numero : Function = numeroPrimo;
numero(377);
