    
function Saludar():void {

    let nombre : any = (<HTMLInputElement> document.getElementById("txtNombre"));

    alert("Hola " + nombre);
}
