<?php
session_start();
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string(trim($_POST['username']));
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT user_id, password, isAdmin, canCreate FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Login successful
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $username;
            $_SESSION['isAdmin'] = $user['isAdmin'];
            $_SESSION['canCreate'] = $user['canCreate'];
            // Redirect to dashboard
            header('Location: /nfl_pool/public/dashboard.html');
            exit;
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "User not found.";
    }
    $stmt->close();
}
$conn->close();
?>