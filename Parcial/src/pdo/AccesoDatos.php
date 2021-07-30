<?php
class AccesoDatos
{
    private static $_objetoAccesoDatos;
    private $_objetoPDO;
 
    private function __construct()
    {
        try {
 
            $usuario='root';
            $clave='';

            $this->_objetoPDO = new PDO('mysql:host=localhost;dbname=administracion_bd;charset=utf8', $usuario, $clave);
 
        } catch (PDOException $e) {
 
            print "Error!!!<br/>" . $e->getMessage();
 
            die();
        }
    }
 
    public function RetornarConsulta($sql)
    {
        return $this->_objetoPDO->prepare($sql);
    }
 
    public static function DameUnObjetoAcceso()//singleton
    {
        if (!isset(self::$_objetoAccesoDatos)) {       
            self::$_objetoAccesoDatos = new AccesoDatos(); 
        }
 
        return self::$_objetoAccesoDatos;        
    }
 
    // Evita que el objeto se pueda clonar
    public function __clone()
    {
        trigger_error('La clonaci&oacute;n de este objeto no est&aacute; permitida!!!', E_USER_ERROR);
    }

    public static function UltimoID()
    {
        $cursor = self::DameUnObjetoAcceso()->RetornarConsulta('SELECT id FROM autos ORDER BY id DESC LIMIT 1');
        $cursor->execute();
        $id = $cursor->fetch()['id'];
        return $id;
    }
}
