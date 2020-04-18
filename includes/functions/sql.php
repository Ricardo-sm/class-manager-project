<?php require_once('connection.php') ?>

<?php 
    class SQL {
        public static function signIn (&$username, &$mail, &$password) {
            try {
                $connection = Connector::getConnection();
                $stmt = $connection->prepare('INSERT INTO teacher(username, mail, pass) VALUES (?,?,?)');
                $stmt->execute(array($username, $mail, $password));

                if ($stmt->rowCount() == 1) {
                    $response = array(
                        'response' => 'success',
                        'mail' => $mail,
                        'id' => $connection->lastInsertId()
                    );
                    return json_encode($response);
                } else {
                    $response = array(
                        'response' => 'error'
                    );
                    return json_encode($response);
                }
            } catch (\Throwable $th) {
                $response = array(
                    'response' => $th->getMessage()
                );
                return json_encode($response);
            }
        }

        public static function logIn (&$mail, &$password) {
            try {
                $connection = Connector::getConnection();
                $stmt = $connection->prepare('SELECT * FROM teacher WHERE mail=?');
                $stmt->execute(array($mail));
                $rs = $stmt->fetch();

                if ($rs) {
                    if (password_verify($password, $rs['pass'])) {
                        session_start();
                        $_SESSION['mail'] = $rs['mail'];
                        $_SESSION['username'] = $rs['username'];
                        $_SESSION['id'] = $rs['id'];
                        $_SESSION['logged'] = true;

                        $response = array(
                            'response' => 'success',
                            'mail' => $rs['mail'],
                            'id' => $rs['id']
                        );
                        return json_encode($response);
                    } else {
                        $response = array(
                            'response' => 'incorrect data'
                        );
                        return json_encode($response);
                    }
                } else {
                    $response = array(
                        'response' => 'incorrect data'
                    );
                    return json_encode($response);
                }
            } catch (\Throwable $th) {
                $response = array(
                    'response' => $th->getMessage()
                );
                return json_encode($response);
            }
        }

        public static function repeatedMail ($mail) {
            try {
                $connection = Connector::getConnection();
                $stmt = $connection->prepare('SELECT count(id) FROM teacher WHERE  mail=?');
                $stmt->execute(array($mail));
                $rs = $stmt->fetch();

                if ($rs['count(id)'] == 0) {
                    return true;
                } else {
                    return false;
                }
            } catch (\Throwable $th) {
                echo 'Error: ' . $th->getMessage();
                return false;
            }
        }
    }
?>