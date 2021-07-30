/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const API = 'http://api/';

$(function(){
    $("#btnEnviarLogin").on("click",function(e:Event){
        Login(e);
    });
    $("#btnRegistro").on("click", function(){
        $(location).attr('href', API + 'registro');
    });
});

function Login(e:Event):void{

    e.preventDefault();

    let correo = $("#txtCorreoLogin").val();
    let clave = $("#txtClaveLogin").val();
    let dato : any = {
        correo : correo,
        clave : clave
    };    
    $.ajax({
        type: 'POST',
        url: API + "login",
        dataType: "json",
        data: {"user":JSON.stringify(dato)},
        async: true
    })
    .done(function (resultado : any){
        
        if(resultado.exito){
            localStorage.setItem("token", resultado.jwt);
            $(location).attr("href", API + 'principal');
        }
        else if(!resultado.exito){
            $(".alert").removeClass("d-none").addClass("d-flex");
            $(".alert p").html(resultado.mensaje);
        }
    }).fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
        let datos = (jqXHR.responseText);
        console.log(datos);
    });

    $(".close").on('click', function(){
        $(".alert").removeClass("d-flex").addClass("d-none");
    });
}
