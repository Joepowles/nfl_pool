<?php
include 'db_config.php';  // Ensure this file contains the correct database connection settings

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string(trim($_POST['username']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $phone = $conn->real_escape_string(trim($_POST['phone']));
    $display_name = $conn->real_escape_string(trim($_POST['username'])); // Default display_name to username
    $password = isset($_POST['password']) ? $conn->real_escape_string(trim($_POST['password'])) : '';

    // Check if password is empty
    if (empty($password)) {
        die('Password cannot be empty');
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, email, phone, display_name, password, role) VALUES (?, ?, ?, ?, ?, 'player')");
    $stmt->bind_param("sssss", $username, $email, $phone, $display_name, $hashed_password);
    $stmt->execute();

    if ($stmt->error) {
        echo "Error: " . $stmt->error;
    } else {
        echo "Registration successful!";
    }
    $stmt->close();
}

$conn->close();
?>
