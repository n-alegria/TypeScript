function AdministrarValidaciones(){

}

function ValidarCamposVacios(idcampo : string) : boolean{
    let retorno : boolean = false;
    let campo : any = (<HTMLInputElement>document.getElementById(idcampo)).value;
    if(campo !== null || campo.lenght !== 0){
         retorno = true;
    }
    return retorno;
}

function ValidarRangoNumerico(campo : number, minimo : number, maximo : number) : boolean{
    let retorno = false;
    if(campo >= minimo && campo <= maximo)
        retorno = true;
    return retorno;
}

function ValidarCombo(idCombo : string, sexoContrario : string) : boolean{
    // Retorna 'true' si NO coincide o 'false' caso contrario
    let retorno : boolean = true;
    let sexo : any = (<HTMLInputElement>document.getElementById(idCombo)).value;
    if(sexo === sexoContrario)
        retorno = false;
    return retorno;
}

function ObtenerTurnoSeleccionado() : string{
    let retorno : string = "";
    // Retorna un 'array' con los valores del grupo de radioButtons
    // Debo recorrerlos y verificar que el 'checked' este activo
    let turno : any = (document.getElementsByName("rdoTurno"));
    for (let index = 0; index < turno.length; index++) {
        if(turno[index].checked){
            retorno = turno[index];
        }
    }
    return retorno;
}

function ObtenerSueldoMaximo(turnoElegido : string) : number{
    let sueldo : number = 0;
    switch (turnoElegido){
        case "Mañana":
            sueldo = 20000;
            break;
        case "Tarde":
            sueldo = 18500;
            break;
        case "Noche":
            sueldo = 25000;
            break;
    }
    return sueldo;
}
