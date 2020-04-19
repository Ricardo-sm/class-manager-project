<?php require_once('../functions/sql.php') ?>

<?php 
    if ($_POST != []) {
        if ($_POST['action'] == 'signin') {
            $username = $_POST['username'];
            $mail = $_POST['mail'];
            $password = $_POST['password'];
            $hasPass = password_hash($password, PASSWORD_BCRYPT);

            if (strlen($password) >= 8) {
                if (SQL::repeatedMail($mail)) {
                    echo SQL::signIn($username, $mail, $hasPass);
                } else {
                    $response = array('response' => 'repeated');
                    echo json_encode($response);
                }
            } else {
                $response = array('response' => 'password');
                echo json_encode($response);
            }
        }
        if ($_POST['action'] == 'login') {
            $mail = $_POST['mail'];
            $password = $_POST['password'];

            echo SQL::logIn($mail, $password);
        }
        if ($_POST['action'] == 'add-class') {
            session_start();
            $idTeacher = $_SESSION['id'];
            $className = $_POST['class-name'];

            if (SQL::repeatedClassName($className)) {
                echo SQL::addClass($className, $idTeacher);
            } else {
                $response = array('response' => 'repeated');
                echo json_encode($response);
            }
        }
    }

    if ($_GET != []) {
        if ($_GET['action'] == 'delete') {
            $idClass = $_GET['id-class'];

            echo SQL::deleteClass($idClass);
        }
    }
?>