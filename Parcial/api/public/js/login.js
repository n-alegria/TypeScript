"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var APIREST = "http://api/";
$(function () {
    $("#btnEnviar").on("click", function (e) {
        Login(e);
    });
});
function Login(e) {
    e.preventDefault();
    var correo = $("#txtCorreo").val();
    var clave = $("#txtClave").val();
    var dato = {
        correo: correo,
        clave: clave
    };
    $.ajax({
        type: 'POST',
        url: APIREST + "login",
        dataType: "json",
        data: { "user": JSON.stringify(dato) },
        async: true
    })
        .done(function (resultado) {
        var mensaje = 'Usuario válido!';
        if (resultado.exito) {
            $("#listados").html(resultado);
        }
        else {
            $("#listados").html(resultado);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.stringify(jqXHR.responseText);
        $("#listados").html(retorno);
    });
}
//# sourceMappingURL=login.js.map