<?php

// Creacion de api
use Slim\Factory\AppFactory;
// Peticion y respuesta
use Slim\Psr7\Request;
use Slim\Psr7\Response;
// Grupos
use \Slim\Routing\RouteCollectorProxy;
// Twig
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/pdo/Usuario.php';
require_once __DIR__ . '/../src/pdo/Perfil.php';
require_once __DIR__ . '/../src/pdo/MW.php';

$app = AppFactory::create();

$twig = Twig::create('../src/views', ['cache' => false]);

$app->add(TwigMiddleware::create($app, $twig));

$app->get('/loginUsuarios', function(Request $request, Response $response, array $args){
    $view = Twig::fromRequest($request);
    return $view->render($response, 'login.html');
});

$app->get('/registro', function(Request $request, Response $response, array $args){
    $view = Twig::fromRequest($request);
    return $view->render($response, 'registro.html');
});



// Agregar un nuevo usuario
$app->post('/usuario', \Usuario::class . ':AltaUsuario')
->add(\MW::class . ':VerificarToken'); 

// listado de todos los usuarios
$app->get('[/]', \Usuario::class . ':ListadoUsuarios');

// Agregar un nuevo perfil
$app->post('[/]', \Perfil::class . ':AltaPerfil')
->add(\MW::class . ':VerificarToken');

// Listado de todos perfiles
$app->get('/perfil', \Perfil::class . ':ListadoPerfiles');

// Crear JWT
$app->post('/login', \Usuario::class . ':Login');
// Verificar JWT
$app->get('/login', \Usuario::class . ':VerificarJWT');

// Grupo Perfiles
$app->group('/perfiles', function (RouteCollectorProxy $group){
    $group->delete('[/]', \Perfil::class . ':BorrarPerfil');
    $group->put('[/]', \Perfil::class . ':ModificarPerfil'); 
})->add(\MW::class . ':VerificarToken');

// Grupo Usuarios
$app->group('/usuarios', function (RouteCollectorProxy $group){
    $group->delete('[/]', \Usuario::class . ':BorrarUsuario');
    $group->post('/', \Usuario::class . ':ModificarUsuario'); 
})->add(\MW::class . ':VerificarToken');;

// PDF
$app->get('/pdf', \Usuario::class . ':CrearPDF');

$app->run();

?>