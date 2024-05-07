<?php
session_start();
include 'db_config.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

$user_id = $_SESSION['user_id'];
$pools = [];

// Prepare SQL to fetch pools that the user is a member of and check if they can create new pools
$query = "SELECT p.pool_id, p.pool_name, p.description, p.active, u.canCreate FROM pools p 
          INNER JOIN pool_memberships pm ON p.pool_id = pm.pool_id 
          INNER JOIN users u ON pm.user_id = u.user_id
          WHERE pm.user_id = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Fetch all pools and store them in an array
while ($row = $result->fetch_assoc()) {
    $pools[] = [
        'pool_id' => $row['pool_id'],
        'pool_name' => $row['pool_name'],
        'description' => $row['description'],
        'active' => $row['active'],
        'canCreate' => $row['canCreate']
    ];
}

$stmt->close();

// Return the pools as JSON
echo json_encode($pools);

?>