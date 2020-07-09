<?php
session_start();
$sUserId = $_SESSION['sUserId'];

$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
$jInnerData = $jData->data;

$jInnerData->$sUserId->lastTimeLoggedin = time();

$sFinalData = json_encode($jData);
file_put_contents('../data/clients.json', $sFinalData);

session_destroy();
header('Location: ../index');
