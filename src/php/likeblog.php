<?php
// $allowed_origins = [
//     "http://localhost:3000",
//     "http://localhost:8080"
// ];

// // Kiểm tra giá trị của HTTP_ORIGIN
// if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
//     header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
// } else {
//     header("Access-Control-Allow-Origin: " . $allowed_origins[0]); // Mặc định là nguồn gốc đầu tiên
// }
// header("Access-Control-Allow-Headers: *");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Headers: Content-Type");
// header('Content-Type: application/json');

require './checkconnect.php';

require './db.php';

// $username = $data->username;

$sql = "SELECT * FROM LIKE_BLOG";
// $params = array($username);
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    echo json_encode(array("message" => "Error in query execution."));
    die(print_r(sqlsrv_errors(), true));
}

$list = array();

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $list[] = $row;
}

echo json_encode($list);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>