<?php
$sPhone = $_GET['phone'];
$sData = file_get_contents('../data/clients.json');
$jData = json_decode( $sData );

if( $jData == null){
  sendResponse(-1, __LINE__, 'Cannot convert data to JSON');
}

$jInnerData = $jData->data;
$jClient = $jInnerData->$sPhone;

$iPendingLoans = $jClient->pendingLoans;
$jClient->balance += $iPendingLoans;
$jClient->pendingLoans = 0;

$sFinalData = json_encode($jData);
file_put_contents('../data/clients.json', $sFinalData);
header('Location: ../admin-profile');
