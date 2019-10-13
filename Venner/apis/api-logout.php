<?php
session_start();
if (!isset($_SESSION['sUserId'])) {
  header('Location: ../login');
}

session_destroy();
header('Location: ../login');
