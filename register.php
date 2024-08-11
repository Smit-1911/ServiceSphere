<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "servicesphere";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize and get form data
$firstName = $conn->real_escape_string(trim($_POST['firstname']));
$lastName = $conn->real_escape_string(trim($_POST['lastname']));
$mobileNo = $conn->real_escape_string(trim($_POST['mobileNo']));
$email = $conn->real_escape_string(trim($_POST['email']));
$address = $conn->real_escape_string(trim($_POST['address']));
$password = trim($_POST['password']);

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$stmt = $conn->prepare("SELECT COUNT(*) FROM signup WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

if ($count > 0) {
    echo "Error: Email is already registered.";
} else {
    // Insert new user
    $stmt = $conn->prepare("INSERT INTO signup (firstname, lastname, mobileNo, email, address, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $firstName, $lastName, $mobileNo, $email, $address, $hashedPassword);

    if ($stmt->execute()) {
        // Redirect after successful registration
        header("Location: login.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

// Close connection
$conn->close();
?>
