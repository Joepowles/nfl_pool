<?php
session_start();
include 'db_config.php';

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    die(json_encode(['error' => 'User not authenticated']));
}

// Check if the necessary POST data is available
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['pool_name']) && isset($_POST['description'])) {
    $pool_name = $conn->real_escape_string($_POST['pool_name']);
    $description = $conn->real_escape_string($_POST['description']);
    $user_id = $_SESSION['user_id'];

    // Insert the new pool into the pools table
    $stmt = $conn->prepare("INSERT INTO pools (pool_name, description, active) VALUES (?, ?, false)");
    $stmt->bind_param("ss", $pool_name, $description);
    if (!$stmt->execute()) {
        die(json_encode(['error' => 'Error creating pool: ' . $stmt->error]));
    }
    $pool_id = $conn->insert_id;
    $stmt->close();

    // Insert the user as the owner of the new pool in pool_memberships
    $stmt = $conn->prepare("INSERT INTO pool_memberships (pool_id, user_id, role) VALUES (?, ?, 'owner')");
    $stmt->bind_param("ii", $pool_id, $user_id);
    if (!$stmt->execute()) {
        die(json_encode(['error' => 'Error creating pool membership: ' . $stmt->error]));
    }
    $stmt->close();

    // Redirect to dashboard upon successful creation
    header('Location: /nfl_pool/public/dashboard.html');
    exit;
} else {
    // Error response if the necessary data isn't provided
    echo json_encode(['error' => 'Missing required fields']);
}

$conn->close();
?>
