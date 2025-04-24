    <?php
    session_start();
    include('connect.php');

    if (isset($_GET['token'])) {
        $token = $_GET['token'];
        $verify_query = "SELECT verify_token, verify_status FROM users WHERE verify_token='$token' LIMIT 1";
        $verify_query_run = mysqli_query($conn, $verify_query);

        if (mysqli_num_rows($verify_query_run) > 0) {
            $row = mysqli_fetch_array($verify_query_run);

            if ($row['verify_status'] == 0) {
                $clicked_token = $row['verify_token'];
                $update_query = "UPDATE users SET verify_status=1 WHERE verify_token='$clicked_token' LIMIT 1";
                $update_query_run = mysqli_query($conn, $update_query);

                if ($update_query_run) {
                    echo "<h2>Your Account Has Been Verified Successfully</h2>";
                    echo "<p>Redirecting to login page...</p>";
                    echo "<script>
                            setTimeout(() => {
                                window.location.href = 'http://localhost:3000/login';
                            }, 5000);
                        </script>";
                } else {
                    echo "<h2>Verification Failed. Try Again.</h2>";
                }
            } else {
                echo "<h2>Email Already Verified! Please Login.</h2>";
                echo "<script>
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/login';
                        }, 3000);
                    </script>";
            }
        } else {
            echo "<h2>This token does not exist</h2>";
        }
    } else {
        echo "<h2>No token provided</h2>";
    }
    ?>