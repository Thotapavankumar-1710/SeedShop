<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'shop_db');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            echo "Login successful! <a href='index.html'>Start shopping</a>";
        } else {
            echo "Incorrect password! <a href='login.html'>Try again</a>";
        }
    } else {
        echo "No user found with this username! <a href='login.html'>Try again</a>";
    }

    $stmt->close();
    $conn->close();
}
?>
