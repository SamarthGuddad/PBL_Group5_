<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Check if there's input
if ($_SERVER['CONTENT_LENGTH'] <= 0) {
    echo json_encode(["status" => "error", "message" => "Empty request body."]);
    exit;
}

$rawInput = file_get_contents("php://input");

// Log raw input for debugging
error_log("RAW INPUT: " . $rawInput);

$input = json_decode($rawInput, true);

if (!$input) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON input.",
        "raw" => $rawInput
    ]);
    exit;
}

$userEmail = $input['email'] ?? null;
$module = $input['module'] ?? null;
$progress = $input['progress'] ?? null;

if (!$userEmail || !$module || $progress === null) {
    echo json_encode(["status" => "error", "message" => "Missing fields (email, module, or progress)."]);
    exit;
}

// Fetch user ID
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $userEmail);
$stmt->execute();
$stmt->bind_result($userId);
$stmt->fetch();
$stmt->close();

if (!$userId) {
    echo json_encode(["status" => "error", "message" => "User not found."]);
    $conn->close();
    exit;
}

// Handle progress update
if (in_array($module, ['addition', 'subtraction', 'multiplication', 'division'])) {
    $stmt = $conn->prepare("
        INSERT INTO user_progress (user_id, module_name, progress)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE progress = progress + 1
    ");
    $stmt->bind_param("is", $userId, $module);
} else {
    $stmt = $conn->prepare("
        INSERT INTO user_progress (user_id, module_name, progress)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE progress = GREATEST(progress, VALUES(progress))
    ");
    $stmt->bind_param("isi", $userId, $module, $progress);
}

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Progress updated."]);
} else {
    echo json_encode(["status" => "error", "message" => "DB error: " . $stmt->error]);
}
$stmt->close();
$conn->close();
?>
