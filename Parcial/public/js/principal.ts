/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const API : string = "http://api/";

$(function(){
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
    .done(function (resultado: any) {
    if (resultado.exito) {
        console.log(resultado.listado);
        MostrarPerfiles(resultado.listado);
    }
    })
    .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
    let respuesta = JSON.parse(jqXHR.responseText);      
    console.log(respuesta.mensaje,"alert-danger");
    });
}

function MostrarPerfiles(datos : any){
    let estado = '';
    let tabla = `<table class='table table-dark'> 
    <thead>
        <tr>
            <td>ID</td>
            <td>DESCRIPCION</td>
            <td>ESTADO</td>
        </tr>
    </thead>
    <tbody>`;
    datos.forEach((item :any) => {
        switch(item.estado)
        {
        case "1":
            estado = "Activo";
            break;
        case "0":
            estado = "Inactivo";
            break;
        }
        let json = JSON.stringify(item);
        tabla += `<tr>
                <td>${item.id}</td>
                <td>${item.descripcion}</td>
                <td>${estado}</td>
        </tr>`;
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
    .done(function (resultado: any) {
    if (resultado.exito) {
        console.log(resultado.listado);
        MostrarUsuarios(resultado.listado);
    }
    })
    .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
    let respuesta = JSON.parse(jqXHR.responseText);      
    console.log(respuesta.mensaje,"alert-danger");
    });
}

function ArmarAlerta(mensaje: string, tipo: string = "success"): string {
    let alerta: string = '<div id="alert_' + tipo + '" class="alert alert-' + tipo + ' alert-dismissable" role="alert">';
    alerta += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    alerta += '<span class="text-justify text-left">' + mensaje + ' </span></div>';

    return alerta;
}

/* #region  Tabla de autos(general) */
function MostrarUsuarios(datos: any): void {

    let tabla: string = tablaUsuarios(datos);
    $("#derecha").html(tabla);

    $('[data-action="eliminar"]').on('click', function (e) {

        let obj_auto_string = $("#btnEliminar").attr("data-obj_usuario") as string;
        let obj_auto = JSON.parse(obj_auto_string);
        let id = parseInt(obj_auto.id)
       
        let token = localStorage.getItem("token");
        if (confirm("Desea eliminar?")) {
            $.ajax({
                type: 'DELETE',
                url: API + 'usuarios',
                dataType: "json",
                data: JSON.stringify({"id_usuario": id }),
                headers: {"token": token},
                async: true
            }).done(function (resultado: any) {
                if(resultado.exito){
                    ObtenerUsuarios();
                }
                else{
                    let alerta: string = ArmarAlerta(resultado.mensaje, 'danger');
                    $("#derecha").html('');
                    $("#derecha").html(alerta);
                }
            }).fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
                console.log(jqXHR.responseText);
            });
        }
    });
    $('[data-action="modificar"]').on('click', function (e) {

        let obj_usuario_string = $("#btnModificar").attr("data-obj_usuario") as string;
        let obj_usuario = JSON.parse(obj_usuario_string);
        console.log(obj_usuario);
        let token = localStorage.getItem("token");
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
function tablaUsuarios(resultado: any): string {
    let tabla = ""
    tabla = `<table class="table">
    <thead>
    <tr>
        <th scope="col">ID</th>
        <th scope="col">Correo</th>
        <th scope="col">Clave</th>
        <th scope="col">nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Eliminar</th>
    </tr>
    </thead>
    <tbody>`;

    resultado.forEach(item => {
        tabla += `<tr>
        <td>${item.id}</td>
        <td>${item.correo}</td>
        <td>${item.clave}</td>
        <td>${item.nombre}</td>
        <td>${item.apellido}</td>
        <td>
            <a href='#' class='btn btn-danger' data-action='eliminar' data-obj_usuario='${JSON.stringify(item)}'title='Eliminar'
           id="btnEliminar"><i class='bi bi-x-circle'></i>Eliminar</a>
        </td>
        <td>
            <a href='#' class='btn btn-success' data-action='modificar' data-obj_usuario='${JSON.stringify(item)}'title='Modificar'
            data-toggle='modal' data-target='#ventana_modal_usuario' id="btnModificar" ><i class='bi bi-pencil'></i>Modificar</a>
        </td>
    </tr>`;
    });

    tabla += `</tbody>
    </table>`;

    return tabla;
}
/* #endregion */

function ModificarModal(){
    let id = $("#txtId").val();
    let nombre = $("#txtNombre").val();
    let apellido = $("#txtApellido").val();
    let correo = $("#txtCorreo").val();
    let clave = $("#txtClave").val();
    let id_perfil = $("#cmbPerfil").val();
    let foto = $("#foto").prop("files")[0];

    let dato : any = {
        "id" : id,
        "correo":correo,
        "clave":clave,
        "nombre":nombre,
        "apellido":apellido,
        "id_perfil":id_perfil,
    };

    let form = new FormData();
    let usuario = JSON.stringify(dato);
    form.append("usuario",usuario);
    form.append("foto",foto);

    let token = localStorage.getItem('token');
    $.ajax({
        type: 'POST',
        url: API + "usuarios/",
        dataType: "json",
        data: form,
        headers: {token : token},
        async: true,
        contentType: false,
        processData: false
    }).done(function (resultado: any) {
        if(resultado.exito){
            $('#ventana_modal_usuario').trigger('focus');
            ObtenerUsuarios();
        }
        else{
            let alerta: string = ArmarAlerta(resultado.mensaje, 'danger');
            $("#derecha").html('');
            $("#derecha").html(alerta);
        }
    }).fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
        console.log(jqXHR.responseText);
    });
}