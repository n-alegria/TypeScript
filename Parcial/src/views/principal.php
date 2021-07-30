{% extends 'principal.html' %}

{% block content %}
<div class="container w-70" style="margin-top:30px">
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul id="main-nav" class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        Listados <b class="caret"></b>
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" id="usuarios">Usuarios</a>
                        <a class="dropdown-item" href="#" id="perfiles">Perfiles</a>
                    </div>
                </li>                   
                <li class="dropdown dropdown">
                    <a class="nav-link " href="#" id="altaAutos">
                    Alta Autos
                    </a>
                </li>
                <li class="dropdown dropdown">
                    <a class="nav-link " href="#" id="altaPerfil">
                    Alta Perfil
                    </a>
                </li>
                <li class="dropdown dropdown">
                    <a class="nav-link" href="#" id="pdf" >
                    CrearPDF
                    </a>
                </li>
                <li class="dropdown dropdown">
                    <a class="nav-link" href="#" id="Logout">
                    Logout
                    </a>
                </li>
            </ul>
        </div>        
    </nav>
    </div>
    <div class="container-fluid" style="margin-top: 150px;">
        <div class="row" id="divResultado">
            <div class="col-4 bg-danger d-block" style="height: auto;" id="izquierda">
                <h2>Izquierda</h2>
            </div>
            <div class= "col-8 bg-success d-block" style="height: auto;" id="derecha">
                <h2>Derecha</h2>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="ventana_modal_usuario" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modificar Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="my-3">
                        <div class="d-flex">
                            <i class="fas fa-user p-1 mr-2 content-center rounded border controlador"></i>
                            <input type="text" placeholder="ID" class="form-control" name="txtID" id="txtId" disabled>
                        </div>
                    </div>
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
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="btnModificarUsuario">Modificar</button>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}