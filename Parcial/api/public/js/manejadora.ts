/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const API : string = "http://test_api/";

$(function(){
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
    let tabla = `<table class='table table-striped'> 
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
function MostrarUsuarios(datos : any){
    let estado = '';
    let tabla = `<table class='table table-striped'> 
    <thead>
        <tr>
            <td>ID</td>
            <td>Correo</td>
            <td>Clave</td>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Perfil</td>
            <td>Foto</td>
        </tr>
    </thead>
    <tbody>`;
    datos.forEach((item :any) => {

        let json = JSON.stringify(item);
        tabla += `<tr>
                <td>${item.id}</td>
                <td>${item.correo}</td>
                <td>${item.clave}</td>
                <td>${item.nombre}</td>
                <td>${item.apellido}</td>
                <td>${item.id_perfil}</td>
                <td><img src="${item.foto}" style='width: 50px; heigth: 50px'"</td>
        </tr>`;
    });
    tabla += "</tbody></table>";
    $("#listados").html(tabla);
}