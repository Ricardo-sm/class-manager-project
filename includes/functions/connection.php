<?php
    class Connector {
        public static function getConnection() {
            $dsn = "mysql:host=localhost;dbname=classroom;charset=utf8mb4";
            $options = [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ];
             try {
                 $pdo = new PDO($dsn, 'root', '', $options);
                 return $pdo;
             } catch (\Throwable $th) {
                 error_log($th->getMessage());
                 exit('Something weird happened');
             }
        }
    }
?>