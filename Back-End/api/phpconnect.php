<?php
$servername = "localhost";
$username = "id17865809_root";
$password = "TpFinalEntornoAdmin2021#";
$database = "id17865809_tpfinalentorno";

$con = mysqli_connect(
    $servername,
    $username,
    $password,
    $database
);

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM competitions";

$result = mysqli_query($conn, $sql);

$rows = array();

while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows, 128);

mysqli_close($conn);
?>