"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var API = 'http://api/';
$(function () {
    $("#btnEnviarLogin").on("click", function (e) {
        Login(e);
    });
    $("#btnRegistro").on("click", function () {
        $(location).attr('href', API + 'registro');
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
        url: API + "login",
        dataType: "json",
        data: { "user": JSON.stringify(dato) },
        async: true
    })
        .done(function (resultado) {
        if (resultado.exito) {
            localStorage.setItem("token", resultado.jwt);
            $(location).attr("href", API + 'principal');
        }
        else if (!resultado.exito) {
            $(".alert").removeClass("d-none").addClass("d-flex");
            $(".alert p").html(resultado.mensaje);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var datos = (jqXHR.responseText);
        console.log(datos);
    });
    $(".close").on('click', function () {
        $(".alert").removeClass("d-flex").addClass("d-none");
    });
}
//# sourceMappingURL=login.js.map