"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var API = "http://test_api/";
$(function () {
    $("#listadoPerfiles").on("click", ObtenerPerfiles);
    $("#listadoUsuarios").on("click", ObtenerUsuarios);
});
/* GET -> perfil (listado con los perfiles) */
function ObtenerPerfiles() {
    $.ajax({
        method: "GET",
        url: API + "perfil",
        dataType: "json",
        data: {},
        async: true,
    })
        .done(function (resultado) {
        if (resultado.exito) {
            console.log(resultado.listado);
            MostrarPerfiles(resultado.listado);
        }
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        var respuesta = JSON.parse(jqXHR.responseText);
        console.log(respuesta.mensaje, "alert-danger");
    });
}
function MostrarPerfiles(datos) {
    var estado = '';
    var tabla = "<table class='table table-striped'> \n    <thead>\n        <tr>\n            <td>ID</td>\n            <td>DESCRIPCION</td>\n            <td>ESTADO</td>\n        </tr>\n    </thead>\n    <tbody>";
    datos.forEach(function (item) {
        switch (item.estado) {
            case "1":
                estado = "Activo";
                break;
            case "0":
                estado = "Inactivo";
                break;
        }
        var json = JSON.stringify(item);
        tabla += "<tr>\n                <td>" + item.id + "</td>\n                <td>" + item.descripcion + "</td>\n                <td>" + estado + "</td>\n        </tr>";
    });
    tabla += "</tbody></table>";
    $("#listados").html(tabla);
}
/* GET -> / (listado con los usuarios) */
function ObtenerUsuarios() {
    $.ajax({
        method: "GET",
        url: API,
        dataType: "json",
        data: {},
        async: true,
    })
        .done(function (resultado) {
        if (resultado.exito) {
            console.log(resultado.listado);
            MostrarUsuarios(resultado.listado);
        }
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        var respuesta = JSON.parse(jqXHR.responseText);
        console.log(respuesta.mensaje, "alert-danger");
    });
}
function MostrarUsuarios(datos) {
    var estado = '';
    var tabla = "<table class='table table-striped'> \n    <thead>\n        <tr>\n            <td>ID</td>\n            <td>Correo</td>\n            <td>Clave</td>\n            <td>Nombre</td>\n            <td>Apellido</td>\n            <td>Perfil</td>\n            <td>Foto</td>\n        </tr>\n    </thead>\n    <tbody>";
    datos.forEach(function (item) {
        var json = JSON.stringify(item);
        tabla += "<tr>\n                <td>" + item.id + "</td>\n                <td>" + item.correo + "</td>\n                <td>" + item.clave + "</td>\n                <td>" + item.nombre + "</td>\n                <td>" + item.apellido + "</td>\n                <td>" + item.id_perfil + "</td>\n                <td><img src=\"" + item.foto + "\" style='width: 50px; heigth: 50px'\"</td>\n        </tr>";
    });
    tabla += "</tbody></table>";
    $("#listados").html(tabla);
}
//# sourceMappingURL=manejadora.js.map