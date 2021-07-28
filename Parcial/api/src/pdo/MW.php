<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as ResponseMW;

require_once 'autentificadora.php';

class MW
{
    // (método de instancia) verifique que el token sea válido.
    // Recibe el JWT → token (en el header) a ser verificado.
    // Retorna un JSON con el mensaje de error correspondiente (y status 403), en caso de no
    // ser válido.
    // Caso contrario, pasar al siguiente callable.
    public function VerificarToken(Request $request, RequestHandler $handler) : ResponseMW
    {
        $token = $request->getHeader('token')[0];
        $retorno = new stdClass();
        $retorno->mensaje = 'No se paso ni el correo ni la clave';

        $responseMW = new ResponseMW(403);

        $tokenVerificado = Autentificadora::VerificarJWT($token); 
        if($tokenVerificado->verificado)
        {
            $response = $handler->handle($request);
            $responseMW->withStatus($response->getStatusCode());
            $responseMW->getBody()->write((string)$response->getBody());
            $retorno->status = 200;
            return $responseMW;
        }
        else
        {
            $retorno->mensaje = $tokenVerificado->mensaje;
        }

        $responseMW->getBody()->write(json_encode($retorno));
        return $responseMW;
    }

}

?>