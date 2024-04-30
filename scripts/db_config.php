<?php
// Database credentials
define('DB_HOST', 'localhost');      // Database host (usually localhost)
define('DB_USERNAME', 'root');       // Database username (default 'root' for XAMPP)
define('DB_PASSWORD', '');           // Database password (default is empty in XAMPP)
define('DB_NAME', 'nfl_confidence_pool');  // Database name

// Create a connection to the database
$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optionally, set the charset to utf8mb4 for full Unicode support
$conn->set_charset("utf8mb4");

?>
