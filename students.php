<?php 
    session_start();
    if (!isset($_SESSION['logged'])) {
        header('Location:account.php');
        exit();
    }
?>
<?php require_once('includes/functions/sql.php') ?>
<?php 
    if (!SQL::verifyClass($_GET['class'])) {
        header('Location:index.php');
        exit();
    }
?>

<?php include_once('includes/templates/header.php'); ?>

    <div class="container w-sidebar">
        <?php include_once('includes/templates/sidebar.php') ?>
        <div class="wave"></div>
        <div class="wave-2"></div>

        <div class="main-content" class-id='<?php echo $_GET['class'] ?>'>
            <div class="main-students">
                <h1 class="title-s">Students</h1>
                <div class="field">
                    <i class="fas fa-search"></i>
                    <input type="search" id="search" class="searcher" placeholder="Find Students...">
                </div>

                <p class="total-students">
                    <span></span> Students
                </p>

                <div class="table-container">
                    <table class="student-list" id="student-list">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>E-Mail</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <?php 
                                $students = SQL::selectStudents($_GET['class']);

                                if (count($students) > 0) {
                                    foreach ($students as $value){ ?>
                                        <tr>
                                            <td><?php echo $value['name'] ?></td>
                                            <td><?php echo $value['last_name'] ?></td>
                                            <td><?php echo $value['mail'] ?></td>
                                            <td class="icon-action">
                                                <div class="icon">
                                                    <button student-id='<?php echo $value['id'] ?>' class="btn btn-actions edit">
                                                        <i class="fas fa-pen"></i>
                                                    </button>
                                                </div>
                                                <div class="icon">
                                                    <button student-id='<?php echo $value['id'] ?>' class="btn btn-actions delete">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                <?php }
                                }    
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="modal" class="modal">
        <div id="modal-content">
            <h1>Add New Student</h1>

            <div class="class-box">
                <form class="new-student" id="new-student" autocomplete="off">
                    <div class="field">
                        <i class="fas fa-address-card"></i>
                        <input type="text" name="name" id="name" placeholder="Name">
                    </div>
                    <div class="field">
                        <i class="fas fa-address-card"></i>
                        <input type="text" name="last-name" id="last-name" placeholder="Last Name">
                    </div>
                    <div class="field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" name="mail" id="mail" placeholder="E-Mail">
                    </div>
                    <div class="field send">
                        <input type="hidden" name="add-student" id="add-student" value="add-student" class-id="<?php echo $_GET['class'] ?>">
                        <input type="submit" class="btn btn-send" value="Create">
                    </div>
                </form>
            </div>
        </div>
    </div>

<?php include_once('includes/templates/footer.php'); ?>