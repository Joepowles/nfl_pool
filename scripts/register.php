<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string(trim($_POST['username']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $phone = $conn->real_escape_string(trim($_POST['phone']));
    $display_name = $conn->real_escape_string(trim($_POST['username']));
    $password = isset($_POST['password']) ? $conn->real_escape_string(trim($_POST['password'])) : '';

    if (empty($password)) {
        die('Password cannot be empty');
    }

    // Check if a user with the same username or email already exists.
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        die('A user with this username or email already exists');
    }

    $stmt->close();

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, email, phone, display_name, password, role) VALUES (?, ?, ?, ?, ?, 'player')");
    $stmt->bind_param("sssss", $username, $email, $phone, $display_name, $hashed_password);
    $stmt->execute();

    if ($stmt->error) {
        echo "Error: " . $stmt->error;
    } else {
        session_start();
        $_SESSION['user_id'] = $conn->insert_id;
        header('Location: /nfl_pool/public/dashboard.html');
        exit;
    }

    $stmt->close();
}

$conn->close();
?>