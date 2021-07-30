/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const API = 'http://api/';

$(function(){
    $("#btnRegistro").on("click",function(e:Event){
        e.preventDefault();
        let token = localStorage.getItem("token");
        let nombre = $("#txtNombre").val();
        let apellido = $("#txtApellido").val();
        let correo = $("#txtCorreo").val();
        let clave = $("#txtClave").val();
        let id_perfil = $("#cmbPerfil").val();
        let foto = $("#foto").prop("files")[0];

        let dato : any = {
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
    
        $.ajax({
            type: 'POST',
            url: API + "usuario",
            dataType: "json",
            data: form,
            headers: {token : token},
            async: true,
            contentType: false,
            processData: false
        })
        .done(function (resultado : any){
            if(resultado.exito){
                localStorage.setItem("token", resultado.jwt);
                $(location).attr("href", API + 'principal');
            }
            else{
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
    });
});
