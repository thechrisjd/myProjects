<?php

session_start();
if (!isset($_SESSION['sUserId'])) {
  header('Location: ../index');
}

session_destroy();
header('Location: ../index');
