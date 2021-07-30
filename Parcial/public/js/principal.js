"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var API = "http://api/";
$(function () {
    $("#perfiles").on("click", ObtenerPerfiles);
    $("#usuarios").on("click", ObtenerUsuarios);
    $("#Logout").on("click", function () {
        localStorage.removeItem("token");
        $(location).attr('href', API + "loginUsuarios");
    });
    $('#btnModificarUsuario').on('click', ModificarModal);
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
    var tabla = "<table class='table table-dark'> \n    <thead>\n        <tr>\n            <td>ID</td>\n            <td>DESCRIPCION</td>\n            <td>ESTADO</td>\n        </tr>\n    </thead>\n    <tbody>";
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
    $("#izquierda").html('');
    $("#izquierda").html(tabla);
}
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
function ArmarAlerta(mensaje, tipo) {
    if (tipo === void 0) { tipo = "success"; }
    var alerta = '<div id="alert_' + tipo + '" class="alert alert-' + tipo + ' alert-dismissable" role="alert">';
    alerta += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    alerta += '<span class="text-justify text-left">' + mensaje + ' </span></div>';
    return alerta;
}
/* #region  Tabla de autos(general) */
function MostrarUsuarios(datos) {
    var tabla = tablaUsuarios(datos);
    $("#derecha").html(tabla);
    $('[data-action="eliminar"]').on('click', function (e) {
        var obj_auto_string = $("#btnEliminar").attr("data-obj_usuario");
        var obj_auto = JSON.parse(obj_auto_string);
        var id = parseInt(obj_auto.id);
        var token = localStorage.getItem("token");
        if (confirm("Desea eliminar?")) {
            $.ajax({
                type: 'DELETE',
                url: API + 'usuarios',
                dataType: "json",
                data: JSON.stringify({ "id_usuario": id }),
                headers: { "token": token },
                async: true
            }).done(function (resultado) {
                if (resultado.exito) {
                    ObtenerUsuarios();
                }
                else {
                    var alerta = ArmarAlerta(resultado.mensaje, 'danger');
                    $("#derecha").html('');
                    $("#derecha").html(alerta);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
            });
        }
    });
    $('[data-action="modificar"]').on('click', function (e) {
        var obj_usuario_string = $("#btnModificar").attr("data-obj_usuario");
        var obj_usuario = JSON.parse(obj_usuario_string);
        console.log(obj_usuario);
        var token = localStorage.getItem("token");
        $('#txtId').val(parseInt(obj_usuario.id));
        $('#txtNombre').val(obj_usuario.nombre);
        $('#txtApellido').val(obj_usuario.apellido);
        $('#txtCorreo').val(obj_usuario.correo);
        $('#txtClave').val(obj_usuario.clave);
        $('#cmbPerfil').val();
    });
}
/* #endregion */
/* #region  Funcion que me arma la tabla de autos para propietarios */
function tablaUsuarios(resultado) {
    var tabla = "";
    tabla = "<table class=\"table\">\n    <thead>\n    <tr>\n        <th scope=\"col\">ID</th>\n        <th scope=\"col\">Correo</th>\n        <th scope=\"col\">Clave</th>\n        <th scope=\"col\">nombre</th>\n        <th scope=\"col\">Apellido</th>\n        <th scope=\"col\">Eliminar</th>\n    </tr>\n    </thead>\n    <tbody>";
    resultado.forEach(function (item) {
        tabla += "<tr>\n        <td>" + item.id + "</td>\n        <td>" + item.correo + "</td>\n        <td>" + item.clave + "</td>\n        <td>" + item.nombre + "</td>\n        <td>" + item.apellido + "</td>\n        <td>\n            <a href='#' class='btn btn-danger' data-action='eliminar' data-obj_usuario='" + JSON.stringify(item) + "'title='Eliminar'\n           id=\"btnEliminar\"><i class='bi bi-x-circle'></i>Eliminar</a>\n        </td>\n        <td>\n            <a href='#' class='btn btn-success' data-action='modificar' data-obj_usuario='" + JSON.stringify(item) + "'title='Modificar'\n            data-toggle='modal' data-target='#ventana_modal_usuario' id=\"btnModificar\" ><i class='bi bi-pencil'></i>Modificar</a>\n        </td>\n    </tr>";
    });
    tabla += "</tbody>\n    </table>";
    return tabla;
}
/* #endregion */
function ModificarModal() {
    var id = $("#txtId").val();
    var nombre = $("#txtNombre").val();
    var apellido = $("#txtApellido").val();
    var correo = $("#txtCorreo").val();
    var clave = $("#txtClave").val();
    var id_perfil = $("#cmbPerfil").val();
    var foto = $("#foto").prop("files")[0];
    var dato = {
        "id": id,
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
    var token = localStorage.getItem('token');
    $.ajax({
        type: 'POST',
        url: API + "usuarios/",
        dataType: "json",
        data: form,
        headers: { token: token },
        async: true,
        contentType: false,
        processData: false
    }).done(function (resultado) {
        if (resultado.exito) {
            $('#ventana_modal_usuario').trigger('focus');
            ObtenerUsuarios();
        }
        else {
            var alerta = ArmarAlerta(resultado.mensaje, 'danger');
            $("#derecha").html('');
            $("#derecha").html(alerta);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText);
    });
}
//# sourceMappingURL=principal.js.map