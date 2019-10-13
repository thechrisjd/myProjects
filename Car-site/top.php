<?php
session_start(); // starting session to check if you have permission
  $sUserID = $_SESSION['sUserId'];
  if (!isset($sUserID)) {
    header('Location: ./login');
  }
 ?>
