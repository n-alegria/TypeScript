{% extends 'registro.html' %}

{% block content %}
<div class="container">
    <div class="row col-lg-6 col-md-8 col-sm-10 m-auto pt-5">
        <h1 class="titulo pb-2">Registro</h1>
        <div class="w-100">
            <div class="p-3 rounded-5" style="background-color: lightgrey;">
                <form>
                    <div class="my-3">
                        <div class="d-flex">
                            <i class="fas fa-user p-1 mr-2 content-center rounded border controlador"></i>
                            <input type="text" placeholder="Nombre" class="form-control" name="txtNombre" id="txtNombre">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex">
                            <i class="fas fa-user p-1 mr-2 content-center rounded border controlador"></i>
                            <input type="text" placeholder="Apellido" class="form-control" name="txtApellido" id="txtApellido">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex">
                            <i class="fas fa-envelope p-1 mr-2 content-center rounded border controlador"></i>
                            <input type="email" class="form-control" placeholder="Correo" name="txtCorreo" id="txtCorreo">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex">
                            <i class="fas fa-key p-1 mr-2 content-center rounded border controlador"></i>
                            <input type="password" placeholder="Clave" class="form-control" name="txtClave" id="txtClave">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex">
                            <i class="fas fa-id-card p-1 mr-2 content-center rounded border controlador"></i>
                            <select name="cmbPerfil" id="cmbPerfil" class="form-control">
                                <option selected>Seleccionar perfil</option>
                                {% for perfil in listadoPerfiles %}
                                <option value="{{perfil.id}}">{{perfil.descripcion}}</option>
                                {% endfor %}
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex">
                            <i class="fas fa-camera p-1 mr-2 content-center rounded border controlador"></i>
                            <input type="file" class="form-control" name="foto" id="foto">
                        </div>
                    </div>
                    <!-- Alerta -->
                    <div class="alert alert-danger d-none" role="alert">
                        <p class="flex-grow-1"></p>
                        <i class="fas fa-times close" style="cursor: pointer"></i>
                    </div>
                    <!-- Fin alerta -->
                    <div class="row justify-content-around mt-5 mb-3">
                        <button type="submit" id="btnRegistro" class="col-4 btn btn-info">Enviar</button>
                        <button type="reset" class="col-4 btn btn-warning">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
{% endblock %}