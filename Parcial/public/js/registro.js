"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var API = 'http://api/';
$(function () {
    $("#btnRegistro").on("click", function (e) {
        e.preventDefault();
        var token = localStorage.getItem("token");
        var nombre = $("#txtNombre").val();
        var apellido = $("#txtApellido").val();
        var correo = $("#txtCorreo").val();
        var clave = $("#txtClave").val();
        var id_perfil = $("#cmbPerfil").val();
        var foto = $("#foto").prop("files")[0];
        var dato = {
            "correo": correo,
            "clave": clave,
            "nombre": nombre,
            "apellido": apellido,
            "id_perfil": id_perfil,
        };
        var form = new FormData();
        var usuario = JSON.stringify(dato);
        form.append("usuario", usuario);
        form.append("foto", foto);
        $.ajax({
            type: 'POST',
            url: API + "usuario",
            dataType: "json",
            data: form,
            headers: { token: token },
            async: true,
            contentType: false,
            processData: false
        })
            .done(function (resultado) {
            if (resultado.exito) {
                localStorage.setItem("token", resultado.jwt);
                $(location).attr("href", API + 'principal');
            }
            else {
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
    });
});
//# sourceMappingURL=registro.js.map