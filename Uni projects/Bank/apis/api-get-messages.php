<?php
session_start();
$sUserId = $_SESSION['sUserId'];
if (!isset($sUserId)) {
  header('Location: ../login');
}

$sUserId = $_GET['sUserId'];
$sUserId = $sUserId == 'Admin' ? 'admin' : 'user';

$sMessages = file_get_contents("../data/to-$sUserId.txt");
file_put_contents("../data/to-$sUserId.txt", '');
echo $sMessages;
