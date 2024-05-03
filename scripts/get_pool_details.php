<?php
session_start();
include 'db_config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

if (isset($_GET['pool_id'])) {
    $pool_id = $_GET['pool_id'];
    $stmt = $conn->prepare("SELECT pool_name, description, active FROM pools WHERE pool_id = ?");
    $stmt->bind_param("i", $pool_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $pool_details = $result->fetch_assoc();
        echo json_encode($pool_details);
    } else {
        echo json_encode(['error' => 'No pool found with the given ID']);
    }
} else {
    echo json_encode(['error' => 'Pool ID not provided']);
}

$conn->close();
?>