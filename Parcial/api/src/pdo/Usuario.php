<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once 'AccesoDatos.php';
require_once 'autentificadora.php';

class Usuario{
    public $id;
    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $foto;
    public $id_perfil;

    public function __construct($id=null, $correo=null, $clave=null, $nombre=null, $apellido=null, $foto=null, $id_perfil=null)
    {
        $this->id = $id;
        $this->correo=$correo;
        $this->clave=$clave;
        $this->nombre=$nombre;
        $this->apellido=$apellido;
        $this->id_perfil=$id_perfil;
        $this->foto=$foto;
    }

    // A nivel de ruta (/usuario):
    // (POST) Alta de usuarios. Se agregará un nuevo registro en la tabla usuarios *.
    // Se envía un JSON → usuario (correo, clave, nombre, apellido, foto y id_perfil **) y foto.
    // La foto se guardará en ./src/fotos, con el siguiente formato: id_apellido.extension.
    // Ejemplo: ./src/fotos/24_perez.jpg
    // * ID auto-incremental. ** 1,- propietario, 2,- encargado, 3.- empleado.
    // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
    public function AltaUsuario(Request $request, Response $response, array $args) : Response
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "Error al agregar usuario.";
        $retorno->status = 418;

        $json = json_decode($request->getParsedBody()['usuario']);
        $foto = $request->getUploadedFiles()['foto'];
        $nombreFoto = $foto->getClientFilename();

        $extension = pathinfo($nombreFoto, PATHINFO_EXTENSION);
        
        // Obtengo el ultimo ID + 1
        foreach(self::TraerTodosUsuarios()->listado as $item)
        {
            $id = $item->id;
        }
        $id += 1;
        
        //Destino final de la foto
        $destino = "../src/fotos/" . $id . '_' . $json->apellido . '.' . $extension;
        
        $usuario = new Usuario(null, $json->correo, $json->clave, $json->nombre, $json->apellido, $destino, $json->id_perfil);
        $retornoAgregado = Usuario::AgregarUsuarioBD($usuario);
        if($retornoAgregado->exito)
        {
            $retorno->exito = $retornoAgregado->exito;
            $retorno->mensaje = $retornoAgregado->mensaje;
            $retorno->status = 200;
            $foto->moveTo($destino);
        }
        else
        {
            $retorno->mensaje = $retornoAgregado->mensaje;
        }

        $newResponse = $response->withStatus(200);
        // $newResponse = $response->withStatus($retorno->status);
        $newResponse->getBody()->write(json_encode($retorno));

        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    private static function AgregarUsuarioBD($usuario)
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se pudo agregar en la base de datos';
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta('INSERT INTO usuarios (correo, clave, nombre, apellido, foto, id_perfil)
                                            VALUES (:correo, :clave, :nombre, :apellido, :foto, :id_perfil)');
            $cursor->bindParam(':correo', $usuario->correo, PDO::PARAM_STR);
            $cursor->bindParam(':clave', $usuario->clave, PDO::PARAM_STR);
            $cursor->bindParam(':nombre', $usuario->nombre, PDO::PARAM_STR);            
            $cursor->bindParam(':apellido', $usuario->apellido, PDO::PARAM_STR);
            $cursor->bindParam(':foto', $usuario->foto, PDO::PARAM_STR);
            $cursor->bindParam(':id_perfil', $usuario->id_perfil, PDO::PARAM_INT);            
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

    // A nivel de aplicación:
    // (GET) Listado de usuarios. Mostrará el listado completo de los usuarios (array JSON).
    // Retorna un JSON (éxito: true/false; mensaje: string; dato: stringJSON; status: 200/424)
    public function ListadoUsuarios(Request $request, Response $response, array $args) : Response
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se pudo obtener el listado desde la base de datos';
        $retorno->status = 409;
        $retorno->listado = null;

        $retornoListado = Usuario::TraerTodosUsuarios();
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

    private static function TraerTodosUsuarios()
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se pudo obtener el listado desde la base de datos';
        $retorno->status = 409;
        $retorno->listado = array();
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta('SELECT * FROM usuarios');
            $cursor->execute();
            if($cursor->rowCount())
            {
                $array = $cursor->fetchAll(PDO::FETCH_OBJ);
                foreach($array as $item)
                {
                    $usuario = new Usuario($item->id, $item->correo, $item->clave, $item->nombre, $item->apellido, $item->foto, $item->id_perfil);
                    array_push($retorno->listado, $usuario);
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

    // A nivel de ruta (/login):
    // (POST) Se envía un JSON → user (correo y clave) y retorna un JSON (éxito: true/false; jwt: JWT
    // (con todos los datos del usuario, a excepción de la clave) / null; status: 200/403)
    public function Login(Request $request, Response $response, array $args) : Response
    {
        $json = json_decode($request->getParsedBody()['user']);

        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = '';
        $retorno->status = 403;
        $retorno->jwt = null;

        // $datos = Autentificadora::VerificarJWT($params);
        $usuarioVerificado = Usuario::VerificarUsuario($json);
        if($usuarioVerificado->usuario != null)
        {
            $retorno->exito = true;
            $retorno->status = $usuarioVerificado->status;
            $retorno->mensaje = $usuarioVerificado->mensaje;
            $usuarioAuxiliar = $usuarioVerificado->usuario[0];
        
            $auxiliar = new stdClass();
            $auxiliar->id = $usuarioAuxiliar->id;
            $auxiliar->correo = $usuarioAuxiliar->correo;
            $auxiliar->nombre = $usuarioAuxiliar->nombre;
            $auxiliar->apellido = $usuarioAuxiliar->apellido;
            $auxiliar->foto = $usuarioAuxiliar->foto;
            $auxiliar->id_perfil = $usuarioAuxiliar->id_perfil;

            $retorno->jwt = Autentificadora::CrearJWT($auxiliar);
        }
        else
        {
            $retorno->status = 200;
            $retorno->mensaje = $usuarioVerificado->mensaje;
        }

        $newResponse = $response->withStatus($retorno->status);
        $newResponse->getBody()->write(json_encode($retorno));

        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    public static function VerificarUsuario($json)
    {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se pudo verificar el usuario';
        $retorno->status = 409;
        $retorno->usuario = null;
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta('SELECT * FROM usuarios WHERE correo = :correo AND clave = :clave');
            $cursor->bindParam(':correo', $json->correo, PDO::PARAM_STR);
            $cursor->bindParam(':clave', $json->clave, PDO::PARAM_STR);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $retorno->exito = true;
                $retorno->mensaje = 'Usuario verificado';
                $retorno->status = 200;
                $retorno->usuario = $cursor->fetchAll(PDO::FETCH_OBJ);
            }
        }
        catch(PDOException $e){
            $retorno->mensaje = "Error: {$e->getMessage()}";
        }
        finally{
            return $retorno;
        }
        
    }

    // (GET) Se envía el JWT → token (en el header) y se verifica. En caso exitoso, retorna un JSON
    // con éxito (true/false) y status (200/403).
    public function VerificarJWT(Request $request, Response $response, array $args) : Response
    {
        $encabezado = $request->getHeader('token')[0];
        $retorno = new stdClass();
        $retorno->exito = false;
        $status = 403;

        $verificar = Autentificadora::VerificarJWT($encabezado);
        if($verificar->verificado){
            $status = 200;
            $retorno->exito = true;
        }
       
        $newResponse = $response->withStatus($status);
        $newResponse->getBody()->write(json_encode($retorno));
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    // (DELETE) Borrado de usuarios por ID.
    // Recibe el ID del perfil a ser borrado (id_usuario, en el raw) más el JWT → token (en el header).
    // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
    public function BorrarUsuario(Request $request, Response $response, array $args) : Response
    {
        $id = json_decode($request->getBody())->id_usuario;
        
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "Error al eliminar el usuario.";
        $retorno->status = 418;

        $usuarioAux = Usuario::ObtenerUsuario($id);
        $retornoBorrado = Usuario::EliminarUsuariolBD($id);
        $usuarioAuxiliar = $usuarioAux->usuario[0];
        if($retornoBorrado->exito)
        {
            $retorno->exito = $retornoBorrado->exito;
            $retorno->mensaje = $retornoBorrado->mensaje;
            $retorno->status = 200;
            unlink($usuarioAuxiliar->foto);
            
        }
        else
        {
            $retorno->mensaje = $retornoBorrado->mensaje;
        }

        $newResponse = $response->withStatus($retorno->status);
        $newResponse->getBody()->write(json_encode($retorno));
        
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    private static function EliminarUsuariolBD($id)
    {
        $retorno = new stdClass();
        $retorno->mensaje = 'No se pudo eliminar';
        $retorno->exito = false;
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta("DELETE FROM usuarios WHERE id = :id");
            $cursor->bindParam(':id', $id, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $retorno->mensaje = 'Se elimino con exito';
                $retorno->exito = true;
            }
            else
            {
                $retorno->mensaje = 'No existe usuario con el id indicado';
            }
        }
        catch(PDOException $e)
        {
            $retorno->mensaje = 'Error: ' . $e->getMessage();
        }
        return $retorno;
    }

    private static function ObtenerUsuario($id)
    {
        $retorno = new stdClass();
        $retorno->mensaje = 'No se pudo obtener';
        $retorno->usuario = null;
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            $cursor = $pdo->RetornarConsulta("SELECT * FROM usuarios WHERE id = :id");
            $cursor->bindParam(':id', $id, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $retorno->usuario = $cursor->fetchAll(PDO::FETCH_OBJ);
            }
        }
        catch(PDOException $e)
        {
            $retorno->mensaje = 'Error: ' . $e->getMessage();
        }
        return $retorno;
    }

    // (POST) Modificar los perfiles por ID.
    // Recibe el JSON del usuario a ser modificado → usuario (id, correo, clave, nombre,
    // apellido y id_perfil, en el raw), la foto y el JWT → token (en el header).
    // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
    public static function ModificarUsuario(Request $request, Response $response, array $args) : Response
    {
        // Token por header - id y json por raw
        // $token = $request->getHeader('token')[0];
        $json = json_decode($request->getParsedBody()['usuario']);
        
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "Error al modificar el usuario.";
        $retorno->status = 418;

        $foto = $request->getUploadedFiles()['foto'];
        $nombreFoto = $foto->getClientFilename();

        $extension = pathinfo($nombreFoto, PATHINFO_EXTENSION);
 
        //Destino final de la foto
        $destino = "../src/fotos/" . $json->id . '_' . $json->apellido . '.' . $extension;
        $json->foto = $destino;

        $retornoBorrado = Usuario::ModificarUsuarioBD($json);
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

    public static function ModificarUsuarioBD($json)
    {
        $retorno = new stdClass();
        $retorno->mensaje = 'No se pudo modificar';
        $retorno->exito = false;
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            
            $cursor = $pdo->RetornarConsulta("UPDATE usuarios SET correo=:correo, clave=:clave, nombre=:nombre, apellido=:apellido, id_perfil=:id_perfil, foto=:foto WHERE id = :id");
            $cursor->bindParam(':correo', $json->correo, PDO::PARAM_STR);
            $cursor->bindParam(':clave', $json->clave, PDO::PARAM_STR);
            $cursor->bindParam(':nombre', $json->nombre, PDO::PARAM_STR);            
            $cursor->bindParam(':apellido', $json->apellido, PDO::PARAM_STR);
            $cursor->bindParam(':id_perfil', $json->id_perfil, PDO::PARAM_INT);
            $cursor->bindParam(':foto', $json->foto, PDO::PARAM_STR);
            $cursor->bindParam(':id', $json->id, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $retorno->mensaje = 'Se modifico con exito';
                $retorno->exito = true;
            }
            else
            {
                $retorno->mensaje = 'No existe usuario con el id indicado';
            }
        }
        catch(PDOException $e)
        {
            $retorno->mensaje = 'Error: ' . $e->getMessage();
        }
        return $retorno;
    }

    // A nivel de ruta (/pdf):
    // (GET) Listado en formato .pdf.
    // Se envía el JWT → token (en el header) y mostrará:
    // *-Encabezado (apellido y nombre del alumno a la izquierda y número de página a la
    // derecha)
    // *-Cuerpo (Título del listado, listado completo de los usuarios con su respectiva foto)
    // *-Pie de página (fecha actual, centrada).
    // NOTA: El archivo .pdf contendrá clave, si el perfil es empleado, será el apellido del usuario logueado y
    // si es distinto de empleado será el correo del usuario logueado.
    public static function CrearPDF(Request $request, Response $response, array $args) : Response
    {
        $token = $request->getHeader('token')[0];
        $retornoPayload = Autentificadora::ObtenerPayLoad($token);
        $datosUsuario = $retornoPayload->payload->data;

        $retornoDescripcion = Usuario::ObtenerPerfil($datosUsuario->id_perfil);

        $mpdf = new \Mpdf\Mpdf(['orientation' => 'P', 
                        'pagenumPrefix' => 'Página nro. ',
                        'pagenumSuffix' => ' - ',
                        'nbpgPrefix' => ' de ',
                        'nbpgSuffix' => ' páginas']);

        $password = null;
        if($retornoDescripcion == 'empleado'){
            $password = $datosUsuario->apellido;
        }
        else{
            $password = $datosUsuario->correo;
        }
        $mpdf->SetProtection(array('print'), $password, 'MyPassword');

        $mpdf->setHeader(ucfirst($datosUsuario->apellido) . " " . ucfirst($datosUsuario->nombre) ."||{PAGENO}{nbpg}");
        $mpdf->setFooter('|{DATE d/m/Y}|');

        $listadoUsuarios = Usuario::TraerTodosUsuarios();

        $grilla = '<table class="table" border="1" align="center">
                    <thead>
                        <tr>
                            <th>Correo</th>
                            <th>Clave</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>ID Perfil</th>
                            <th>Foto</th>
                        </tr> 
                    </thead>';   	

        foreach ($listadoUsuarios->listado as $usuario){
            $grilla .= "<tr>
                            <td>".$usuario->correo."</td>
                            <td>".$usuario->clave."</td>
                            <td>".$usuario->nombre."</td>
                            <td>".$usuario->apellido."</td>
                            <td>".$usuario->id_perfil."</td>
                            <td><img src='".$usuario->foto."' width='100px' height='100px'/></td>
                        </tr>";
        }

        $grilla .= '</table>';

        $mpdf->WriteHTML("<h3>Listado de usuarios</h3>");
        $mpdf->WriteHTML("<br>");

        $mpdf->WriteHTML($grilla);



        $mpdf->Output('mi_pdf.pdf', 'D');

        $newResponse = $response->withStatus(200);
        $newResponse->getBody()->write('si');
        
        return $newResponse->withHeader('Content-Type' , 'application/json');
    }


    private static function ObtenerPerfil($id)
    {
        $retorno = new stdClass();
        $retorno->mensaje = 'No se pudo obtener';
        $retorno->exito = false;
        try{
            $pdo = AccesoDatos::DameUnObjetoAcceso();
            
            $cursor = $pdo->RetornarConsulta("SELECT * FROM perfiles WHERE perfiles.id = :id");
            $cursor->bindParam(':id', $id, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount())
            {
                $auxiliar = $cursor->fetch(PDO::FETCH_ASSOC);
                $retorno->mensaje = $auxiliar;
                $retorno->exito = true;
            }
            else
            {
                $retorno->mensaje = 'No existe usuario con el id indicado';
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