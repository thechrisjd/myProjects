<?php
session_start();
$sDays = $_POST['daysquery'];

$_SESSION['NumberOfDays'] = $sDays;
