{% extends 'layout.html' %}

{% block content %}

<div class="container">
    <form method="">
    <div class="mb-3">
        <label for="txtCorreo" class="form-label">Correo</label>
        <input type="email" class="form-control" id="txtCorreo">
    </div>
    <div class="mb-3">
        <label for="txtClave" class="form-label">Clave</label>
        <input type="password" class="form-control" id="txtClave">
    </div>
    <button type="submit" class="btn btn-primary" id="btnEnviar">Enviar</button>
    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#modalRegistro">Quiero Registrarme!</button>
    </form>
    <button type="button" class="btn btn-primary" id="listadoPerfiles">Perfiles</button>
    <button type="button" class="btn btn-primary" id="listadoUsuarios">Usuarios</button>
    <div id="listados" style="width:300px;height:300px;background-color:lightblue;"></div>

    <div class="row">
        <label class="col-md-3"></label>
        <button class="btn btn-success col-md-5 col-xs-12" type="button" id="btnRegistrar" name="registro"
            data-toggle="modal" data-target="#myModal">Quiero Registrarme!</button>
    </div>

    <br>
    <!--alert de error-->
    <label class="col-md-2"></label>
    <div id="alertLogin" class="alert alert-warning col-md-8" role="alert" hidden>

    </div>

    <!--Modal-->
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">REGISTRO</h4>
                </div>
                <div class="modal-body">
                    <!-- Form Registro-->
                    <form method="POST" id="formRegistro" class="form-horizontal" role="form">

                        <div class="form-group">
                            <label class="col-md-2 control-label">Apellido:</label>
                            <div class="col-md-10 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input name="apellido" id="apellido" placeholder="Apellido" class="form-control"
                                        type="text">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">Nombre:</label>
                            <div class="col-md-10 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input name="nombre" id="nombre" placeholder="Nombre" class="form-control"
                                        type="text">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">E-mail:</label>
                            <div class="col-md-10 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                    <input name="correo" id="correo" placeholder="Correo" class="form-control"
                                        type="text">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">Perfil:</label>
                            <div class="col-md-10 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i
                                            class="glyphicon glyphicon-option-horizontal"></i></span>
                                    <select name="perfil" id="perfil" class="form-control">
                                        <option value="seleccione" selected>Seleccione</option>
                                        <option value="propietario">Propietario</option>
                                        <option value="encargado">Encargado</option>
                                        <option value="empleado">Empleado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">Foto:</label>
                            <div class="col-md-10 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-camera"></i></span>
                                    <input name="foto" id="foto" placeholder="Foto" class="form-control" type="file">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">Clave:</label>
                            <div class="col-md-10 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                    <input name="clave" id="clave" placeholder="Clave" class="form-control"
                                        type="password">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">Confirmar:</label>
                            <div class="col-md-10 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                    <input name="confirmar" id="confirmar" placeholder="Repita Clave"
                                        class="form-control" type="password">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-1"></div>
                            <button class="btn btn-info col-md-4" type="submit" id="enviarRegistro">Enviar</button>
                            <div class="col-md-2"></div>
                            <button class="btn btn-warning col-md-4" type="reset" id="limpiar">Limpiar</button>
                            <div class="col-md-1"></div>
                        </div>

                    </form>

                </div>
                <div id="alertRegister" class="alert alert-danger" role="alert" hidden></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</div>


{% endblock %}