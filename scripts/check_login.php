<?php
session_start();
include 'db_config.php';
header('Content-Type: application/json');

$response = array();
if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT username,email,phone , isAdmin, canCreate FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $response['isLoggedIn'] = true;  // This should be a boolean
    $response['username'] = $user['username']; 
    $response['isAdmin'] = $user['isAdmin'];
    $response['canCreate'] = $user['canCreate'];
    $response['email'] = $user['email'];
    $response['phone'] = $user['phone'];
    $_SESSION['isLoggedIn'] = true;
    $_SESSION['username'] = $user['username'];
    $_SESSION['isAdmin'] = $user['isAdmin'];
    $_SESSION['canCreate'] = $user['canCreate'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['phone'] = $user['phone'];
} else {
    $response['isLoggedIn'] = false;  // This should be a boolean
    $_SESSION = array();
}

echo json_encode($response);
?>