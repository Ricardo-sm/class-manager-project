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
            <h1>Add New Class</h1>

            <div class="class-box">
                <form class="new-class">
                    <div class="field">
                        <i class="fas fa-school"></i>
                        <input type="text" name="class-name" id="class-name" placeholder="Class Name">
                    </div>
                    <div class="field send">
                        <input type="submit" class="btn btn-send" value="Create">
                    </div>
                </form>
            </div>
        </main>

    </div>

<?php include_once('includes/templates/footer.php'); ?>