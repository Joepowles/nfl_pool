<?php
session_start();
header('Content-Type: application/json');

$response = array();
if (isset($_SESSION['user_id'])) {
    $response['isLoggedIn'] = true;  // This should be a boolean
    $response['username'] = $_SESSION['username'];  // Assuming 'username' is set in the session
} else {
    $response['isLoggedIn'] = false;  // This should be a boolean
}

echo json_encode($response);
?>