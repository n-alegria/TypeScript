/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const APIREST : string = "http://api/";

$(function(){
    $("#btnEnviar").on("click",function(e:Event){
        Login(e);
    });
});

function Login(e:Event):void{

    e.preventDefault();

    let correo = $("#txtCorreo").val();
    let clave = $("#txtClave").val();
    let dato : any = {
        correo : correo,
        clave : clave
    };    
    $.ajax({
        type: 'POST',
        url: APIREST + "login",
        dataType: "json",
        data: {"user":JSON.stringify(dato)},
        async: true
    })
    .done(function (resultado : any){
        let mensaje:string = 'Usuario válido!';
        if(resultado.exito){
            $("#listados").html(resultado);
        }else{
            $("#listados").html(resultado);
        }
    }).fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.stringify(jqXHR.responseText);
        $("#listados").html(retorno);
    });

    
}

