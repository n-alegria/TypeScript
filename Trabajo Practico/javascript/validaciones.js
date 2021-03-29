function AdministrarValidaciones() {
}
function ValidarCamposVacios(idcampo) {
    var retorno = false;
    var campo = document.getElementById(idcampo).value;
    if (campo !== null || campo.lenght !== 0) {
        retorno = true;
    }
    return retorno;
}
function ValidarRangoNumerico(campo, minimo, maximo) {
    var retorno = false;
    if (campo >= minimo && campo <= maximo)
        retorno = true;
    return retorno;
}
function ValidarCombo(idCombo, sexoContrario) {
    // Retorna 'true' si NO coincide o 'false' caso contrario
    var retorno = true;
    var sexo = document.getElementById(idCombo).value;
    if (sexo === sexoContrario)
        retorno = false;
    return retorno;
}
function ObtenerTurnoSeleccionado() {
    var retorno = "";
    // Retorna un 'array' con los valores del grupo de radioButtons
    // Debo recorrerlos y verificar que el 'checked' este activo
    var turno = (document.getElementsByName("rdoTurno"));
    for (var index = 0; index < turno.length; index++) {
        if (turno[index].checked) {
            retorno = turno[index];
        }
    }
    return retorno;
}
function ObtenerSueldoMaximo(turnoElegido) {
    var sueldo = 0;
    switch (turnoElegido) {
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
