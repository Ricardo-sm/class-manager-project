<?php 
    session_start();
    if (!isset($_SESSION['logged'])) {
        header('Location:account.php');
        exit();
    }
?>

<?php include_once('includes/templates/header.php'); ?>

    <div class="container w-sidebar">
        <?php include_once('includes/templates/sidebar.php') ?>

        <main class="main-content">
            <h1>Agregar Nueva Clase</h1>

            <div class="class-box">
                <form class="add-class">
                    <div class="field">
                        <label for="class-name">Nombre de Clase:</label>
                        <input type="text" name="class-name" id="class-name" placeholder="Nombre de Clase">
                    </div>
                    <div class="field send">
                        <input type="submit" class="btn btn-send" value="Crear Clase">
                    </div>
                </form>
            </div>
        </main>

    </div>

<?php include_once('includes/templates/footer.php'); ?>