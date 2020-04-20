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

        <div class="main-content main-students">
            <h1 class="title-s">Students</h1>
            <div class="field">
                <i class="fas fa-search"></i>
                <input type="search" id="search" class="searcher" placeholder="Find Students...">
            </div>

            <p class="total-students">
                <span>2</span> Students
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
                        <tr>
                            <td>Name</td>
                            <td>Last Name</td>
                            <td>mail@hotmail.com</td>
                            <td>
                                <a href="edit.php?id=5" class="btn btn-edit">
                                    <i class="fas fa-pen"></i>
                                </a>
                                <button data-id="5" type="button" class="btn btn-delete">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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