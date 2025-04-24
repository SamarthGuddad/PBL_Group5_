<?php
    $password = "your_input_password";
    $hashFromDB = '$2y$10$9xsn...'; // From your debug
    
    if (password_verify($password, $hashFromDB)) {
        echo "It matches!";
    } else {
        echo "Nope.";
    }
?>