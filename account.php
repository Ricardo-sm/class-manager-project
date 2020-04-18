<?php 
    session_start();

    if (isset($_GET['close'])) {
        $_SESSION = array();
    }
?>

<?php include_once('includes/templates/header.php'); ?>
    
    <main class="main">
            <div id="account-container" class="account-container">
                <h1>Classroom <span>| LogIn</span></h1>

                <div id="account-content" class="account-content">
                    <div class="description">
                        <div id="message" class="message">
                            <h1>Hello, Teacher!</h1>
                            <p>
                                Cras feugiat rhoncus magna sit amet vulputate. 
                                Nulla a sodales nunc, nec tincidunt massa. 
                                Mauris feugiat mi non vulputate tempus.
                            </p>
                            <button class="btn btn-transparent" id="btn">SignIn</button>
                        </div>
                    </div>

                    <form id="form" class="login-box" method="POST" autocomplete="off">
                        <div class="form-content">
                            <legend>Please LogIn to Your Account</legend>
                            <div class="field" style="display: none">
                                <i class="fas fa-user"></i>
                                <input type="text" name="username" id="username" placeholder="Username">
                            </div>
                            <div class="field">
                                <i class="fas fa-envelope"></i>
                                <input type="email" name="mail" id="mail" placeholder="E-Mail">
                            </div>
                            <div class="field">
                                <i class="fas fa-lock"></i>
                                <input type="password" name="password" id="password" placeholder="Password">
                            </div>
                            
                            <div class="forgot">
                                <a href="#">Forgot Your Password?</a>
                            </div>
                        </div>
                        <div class="options">
                            <div class="field">
                                <input type="hidden" name="type" id="type" value="login">
                                <input type="submit" id="send" class="btn btn-send" value="LogIn">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    </main>

    <div class="credits">
        Image from <a href=
        "https://pixabay.com/es/users/weisanjiang-1916748/?utm_source=link-attribution&
        amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2787754">
        潜辉 韦</a> on 
        <a href="https://pixabay.com/es/?utm_source=link-attribution&amp;
        utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2787754">
        Pixabay</a>
    </div>
<?php include_once('includes/templates/footer.php'); ?>
