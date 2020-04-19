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
        <div class="wave"></div>
        <div class="wave-2"></div>

        <main class="main-content">
            <div class="classes">
                <div class="class">
                    <div class="name">
                        <h5>Class Name</h5>
                    </div>
                    
                    <p>
                        Duis sapien enim, scelerisque vitae rhoncus eu, venenatis a nulla.
                        Nunc convallis, quam eu tempor pulvinar, lacus arcu aliquam est, 
                        non rhoncus nisi lacus sed mi. Donec malesuada, quam in mollis
                        sodales, metus arcu sollicitudin nisi.
                    </p>
                </div>
            </div>
        </main>

    </div>

    <div id="modal" class="modal">
        <div>
            <h1>Add New Class</h1>

            <div class="class-box">
                <form class="new-class">
                    <div class="field">
                        <i class="fas fa-school"></i>
                        <input type="text" name="class-name" id="class-name" placeholder="Class Name">
                    </div>
                    <div class="field send">
                        <input type="hidden" name="add-class" id="add-class" value="add-class">
                        <input type="submit" class="btn btn-send" value="Create">
                    </div>
                </form>
            </div>
        </div>
    </div>

<?php include_once('includes/templates/footer.php'); ?>