<?php 
    session_start();
    if (!isset($_SESSION['logged'])) {
        header('Location:account.php');
        exit();
    }
?>

<?php require_once('includes/functions/sql.php') ?>

<?php include_once('includes/templates/header.php'); ?>

    <div class="container w-sidebar">
        <?php include_once('includes/templates/sidebar.php') ?>
        <div class="wave"></div>
        <div class="wave-2"></div>

        <main class="main-content">
            <div class="classes">
                <?php 
                    $classes = SQL::selectClasses($_SESSION['id']);

                   if (count($classes) > 0) {
                       foreach ($classes as $value) { ?>
                        <div class="class" class-id="<?php echo $value['id'] ?>">
                            <h5><?php echo $value['class_name']; ?></h5>
                            <div class="icon-bar">
                                <div class="icon">
                                    <i class="fas fa-trash-alt"></i>
                                </div>
                            </div>
                        </div>
                   <?php } 
                   }
                ?>
            </div>
        </main>

    </div>

    <div id="modal" class="modal">
        <div id="modal-content">
            <h1>Add New Class</h1>

            <div class="class-box">
                <form class="new-class" id="new-class">
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