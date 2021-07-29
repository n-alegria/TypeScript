"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var APIREST = "http://api/";
$(function () {
    $("#btnEnviarLogin").on("click", function (e) {
        Login(e);
    });
    $("#btnRegistro").on("click", function () {
        $(location).attr('href', APIREST + 'registro');
    });
});
function Login(e) {
    e.preventDefault();
    var correo = $("#txtCorreoLogin").val();
    var clave = $("#txtClaveLogin").val();
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
        if (resultado.exito) {
            localStorage.setItem("token", resultado.jwt);
            $(location).attr("href", APIREST + 'principal');
        }
        else if (!resultado.exito) {
            $(".alert").removeClass("d-none").addClass("d-flex");
            $(".alert p").html(resultado.mensaje);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var datos = JSON.parse(jqXHR.responseText);
        alert(datos.exito);
    });
    $(".close").on('click', function () {
        $(".alert").removeClass("d-flex").addClass("d-none");
    });
}
//# sourceMappingURL=login.js.map