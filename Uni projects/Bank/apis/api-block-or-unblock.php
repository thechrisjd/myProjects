<?php
if (!isset($_GET['phone'])) {
  header('Location: view-customers.php');
}
$sPhone = $_GET['phone'];


$sData = file_get_contents('../data/clients.json');

$jData = json_decode($sData);
if ($jData == null) {
  echo 'error';
}
$jClient = $jData->data->$sPhone;

$jClient->status = !$jClient->status;
$sFinalData = json_encode($jData);
file_put_contents('../data/clients.json', $sFinalData);
header('Location: ../admin-profile');
