/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const APIREST : string = "http://api/";

$(function(){
    $("#btnEnviarLogin").on("click",function(e:Event){
        Login(e);
    });
    $("#btnRegistro").on("click", function(){
        $(location).attr('href', APIREST + 'registro');
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
        url: APIREST + "login",
        dataType: "json",
        data: {"user":JSON.stringify(dato)},
        async: true
    })
    .done(function (resultado : any){
        
        if(resultado.exito){
            localStorage.setItem("token", resultado.jwt);
            $(location).attr("href", APIREST + 'principal');
        }
        else if(!resultado.exito){
            $(".alert").removeClass("d-none").addClass("d-flex");
            $(".alert p").html(resultado.mensaje);
        }
    }).fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
        let datos = JSON.parse(jqXHR.responseText);
        alert(datos.exito);
    });

    $(".close").on('click', function(){
        $(".alert").removeClass("d-flex").addClass("d-none");
    });
    
}

