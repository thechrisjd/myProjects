<?php
$sPhone = $_GET['phone'];
$iAmount = $_POST['txtAmount'];

if( !intval($iAmount)  ){
  sendResponse(-1, __LINE__, 'Amount can only contain numbers');
}

$sData = file_get_contents('../data/clients.json');
$jData = json_decode( $sData );

if( $jData == null){
  sendResponse(-1, __LINE__, 'Cannot convert data to JSON');
}

$jInnerData = $jData->data;
$jClient = $jInnerData->$sPhone;

$jClient->balance += $iAmount;

$sFinalData = json_encode($jData);
file_put_contents('../data/clients.json', $sFinalData);
header('Location: ../admin-profile');
//sendResponse( 1, __LINE__ , 'Recipient is a memeber of Lions Arch, transaction will occur immediately.'  );










function sendResponse($iStatus, $iLineNumber, $sMessage){
  echo '{"status":'.$iStatus.', "code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
