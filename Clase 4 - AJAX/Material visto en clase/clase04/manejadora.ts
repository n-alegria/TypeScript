namespace Test{

    //CREO UNA INSTANCIA DE XMLHTTPREQUEST
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    export function Ajax():void {

        //METODO; URL; ASINCRONICO?
        xhttp.open("GET", "BACKEND/ajax_test.php", true);

        //ENVIO DE LA PETICION
        xhttp.send();

        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            
            console.log(xhttp.readyState + " - " + xhttp.status);
            
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
            }
        };

    }

    //ENVIO PETICION CON PARAMETROS POR METODO GET
    export function AjaxGET(): void{

        //METODO; URL + PARAMETROS; ASINCRONICO?
        xhttp.open("GET", "BACKEND/ajax_test.php?valor="+Math.random()*100, true);

        //ENVIO DE LA PETICION
        xhttp.send();

        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
            }
        };	
    }
    //ENVIO PETICION CON PARAMETROS POR METODO POST
    export function AjaxPOST():void {
        
        //METODO; URL; ASINCRONICO?
        xhttp.open("POST", "BACKEND/ajax_test.php", true);

        //SETEO EL ENCABEZADO DE LA PETICION	
        xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        
        //ENVIO DE LA PETICION CON LOS PARAMETROS
        xhttp.send("valor="+Math.random()*100);

        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
            }
        };
    }

    export function ActualizarGET():void {
        
        //METODO; URL + PARAMETROS; ASINCRONICO?
        xhttp.open("GET", "BACKEND/ajax_test.php?valor="+Math.random()*100, true);

        //ENVIO DE LA PETICION
        xhttp.send();

        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            AdministrarRespuesta();
        }
    }

    export function ActualizarPOST():void {

        //METODO; URL; ASINCRONICO?
        xhttp.open("POST", "BACKEND/ajax_test.php", true);
        
        //SETEO EL ENCABEZADO DE LA PETICION	
        xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        
        //ENVIO DE LA PETICION CON LOS PARAMETROS
        xhttp.send("valor="+Math.random()*100);

        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            AdministrarRespuesta();
        };
    }

    function AdministrarRespuesta():void {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //LA RESPUESTA SE GUARDA EN UN ELEMENTO HTML
            (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = xhttp.responseText;
        }

    }
}