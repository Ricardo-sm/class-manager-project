        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

        <?php 
            $page = Utilities::getPage();

            if ($page == 'account') { ?>
                <script src="js/form.js?v=<?php echo rand(); ?>"></script>
            <?php } else { ?>
                <script src="js/scripts.js?v=<?php echo rand(); ?>"></script>
            <?php } ?>

    </body>
</html>