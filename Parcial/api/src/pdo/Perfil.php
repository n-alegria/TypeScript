<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once 'AccesoDatos.php';

class Perfil{
    public $id;
    public $descripcion;
    public $estado;

    public function __construct($id=null, $descripcion=null, $estado=null)
    {
        $this->id = $id;
        $this->descripcion = $descripcion;
        $this->estado = $estado;
    }

    // A nivel de aplicación:
    // (POST) Alta de perfiles. Se agregará un nuevo registro en la tabla perfiles *.
    // Se envía un JSON → perfil (descripción y estado **).
    // * ID auto-incremental. ** 1 → Activo y 0 → Inactivo.
    // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
    public function AltaPerfil(Request $request, Response $response, array $args) : Response
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "Error al agregar el perfil.";
        $retorno->status = 418;

        $body = $request->getParsedBody();
        $jsonAuto = json_decode($body['perfil']);

        $perfil = new Perfil(null, $jsonAuto->descripcion, $jsonAuto->estado);
        
        $retornoAgregado = Perfil::AgregarPerfilBD($perfil);
        if($retornoAgregado->exito)
        {
            $retorno->exito = $retornoAgregado->exito;
            $retorno->mensaje = $retornoAgregado->mensaje;
            $retorno->status = 200;
        }

        $newResponse = $response->withStatus($retorno->status);
        $newResponse->getBody()->write(json_encode($retorno));

        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    private static function AgregarPerfilBD($perfil)
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se pudo agregar en la base de datos';
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta("INSERT INTO perfiles (descripcion, estado) 
                                            VALUES (:descripcion,:estado)");
            $cursor->bindParam(':descripcion', $perfil->descripcion, PDO::PARAM_STR);
            $cursor->bindParam(':estado', $perfil->estado, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $retorno->exito = true;
                $retorno->mensaje = 'Se agrego a la base de datos correctamente';
            }
        }
        catch(PDOException $e){
            $retorno->mensaje = "Error: {$e->getMessage()}";
        }
        return $retorno;
    }

    // A nivel de ruta (/perfil):
    // (GET) Listado de perfiles. Mostrará el listado completo de los perfiles (array JSON).
    // Retorna un JSON (éxito: true/false; mensaje: string; dato: stringJSON; status: 200/424)
    public function ListadoPerfiles(Request $request, Response $response, array $args) : Response
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se pudo obtener el listado desde la base de datos';
        $retorno->status = 409;
        $retorno->listado = null;

        $retornoListado = Perfil::TraerTodosPerfiles();
        if($retornoListado->exito)
        {
            $retorno->exito = $retornoListado->exito;
            $retorno->mensaje = $retornoListado->mensaje;
            $retorno->status = $retornoListado->status;
            $retorno->listado = $retornoListado->listado;
        }

        $newResponse = $response->withStatus($retornoListado->status);
        $newResponse->getBody()->write(json_encode($retorno));

        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    public static function TraerTodosPerfiles()
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se pudo obtener el listado desde la base de datos';
        $retorno->status = 409;
        $retorno->listado = array();
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta('SELECT * FROM perfiles');
            $cursor->execute();
            if($cursor->rowCount())
            {
                $array = $cursor->fetchAll(PDO::FETCH_OBJ);
                foreach($array as $item)
                {
                    $perfil = new Perfil($item->id, $item->descripcion, $item->estado);
                    array_push($retorno->listado, $perfil);
                }
                $retorno->exito = true;
                $retorno->status = 200;
                $retorno->mensaje = 'Se obtuvo el listado desde la base de datos correctamente';
            }
        }
        catch(PDOException $e){
            $retorno->mensaje = "Error: {$e->getMessage()}";
        }
        return $retorno;
    }


    // (DELETE) Borrado de perfiles por ID.
    // Recibe el ID del perfil a ser borrado (id_perfil, en el raw) más el JWT → token (en el
    // header).
    // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
    public function BorrarPerfil(Request $request, Response $response, array $args) : Response
    {
        $id = json_decode($request->getBody())->id_perfil;
        
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "Error al eliminar el perfil.";
        $retorno->status = 418;

        $retornoBorrado = Perfil::EliminarPerfilBD($id);
        if($retornoBorrado->exito)
        {
            $retorno->exito = $retornoBorrado->exito;
            $retorno->mensaje = $retornoBorrado->mensaje;
            $retorno->status = 200;
        }
        else
        {
            $retorno->mensaje = $retornoBorrado->mensaje;
        }

        $newResponse = $response->withStatus($retorno->status);
        $newResponse->getBody()->write(json_encode($retorno));
        
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    private static function EliminarPerfilBD($id)
    {
        $retorno = new stdClass();
        $retorno->mensaje = 'No se pudo eliminar';
        $retorno->exito = false;
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta("DELETE FROM perfiles WHERE id = :id");
            $cursor->bindParam(':id', $id, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $retorno->mensaje = 'Se elimino con exito';
                $retorno->exito = true;
            }
            else
            {
                $retorno->mensaje = 'No existe perfil con el id indicado';
            }
        }
        catch(PDOException $e)
        {
            $retorno->mensaje = 'Error: ' . $e->getMessage();
        }
        return $retorno;
    }

    // (PUT) Modificación de perfiles por ID.
    // Recibe el JSON del perfil a ser modificado → perfil (descripcion y estado), el ID →
    // id_perfil (id del perfil a ser modificado) (en el raw) y el JWT → token (en el header).
    // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
    public static function ModificarPerfil(Request $request, Response $response, array $args) : Response
    {
        // Token por header - id y json por raw
        $token = $request->getHeader('token')[0];
        $json = json_decode($request->getBody())->perfil;
        $id = json_decode($request->getBody())->id_perfil;
        
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "Error al modificar el perfil.";
        $retorno->status = 418;

        $retornoBorrado = Perfil::ModificarPerfilBD($json, $id);
        if($retornoBorrado->exito)
        {
            $retorno->exito = true;
            $retorno->mensaje = $retornoBorrado->mensaje;
            $retorno->status = 200;
        }
        else
        {
            $retorno->mensaje = $retornoBorrado->mensaje;
        }
        

        $newResponse = $response->withStatus($retorno->status);
        $newResponse->getBody()->write(json_encode($retorno));
        
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    public static function ModificarPerfilBD($json, $id)
    {
        $retorno = new stdClass();
        $retorno->mensaje = 'No se pudo modificar';
        $retorno->exito = false;
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            
            $cursor = $pdo->RetornarConsulta("UPDATE perfiles SET descripcion=:descripcion, estado=:estado WHERE id = :id");
            $cursor->bindParam(':descripcion', $json->descripcion, PDO::PARAM_STR);
            $cursor->bindParam(':estado', $json->estado, PDO::PARAM_INT);
            $cursor->bindParam(':id', $id, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $retorno->mensaje = 'Se modifico con exito';
                $retorno->exito = true;
            }
            else
            {
                $retorno->mensaje = 'No existe perfil con el id indicado';
            }
        }
        catch(PDOException $e)
        {
            $retorno->mensaje = 'Error: ' . $e->getMessage();
        }
        return $retorno;
    }

    
}

?>