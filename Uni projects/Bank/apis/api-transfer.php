<?php
ini_set('user_agent', 'any');
//ini_set('display_errors', 0);

session_start();
if( !isset($_SESSION['sUserId'] ) ){
  sendResponse(-1, __LINE__, 'You must login to use this api');
}

if( empty( $_GET['phone'] ) ){
  sendResponse(-1, __LINE__, 'Phone missing');
}
if( empty( $_GET['amount'] ) ){
  sendResponse(-1, __LINE__, 'Amount is missing');
}

$sPhone = $_GET['phone'] ?? '';
if( strlen($sPhone) != 8 ){
  sendResponse(-1, __LINE__, 'Phone must be 8 characters in length');
}
if( !ctype_digit($sPhone)  ){
  sendResponse(-1, __LINE__, 'Phone can only contain numbers');
}

// Validate amount
$iAmount = $_GET['amount'] ?? '';
if( !ctype_digit($iAmount)  ){
  sendResponse(-1, __LINE__, 'Amount can only contain numbers');
}
if ($iAmount <= 0) {
  sendResponse(-1, __LINE__, 'Can not send negative amounts');
}



$sData = file_get_contents('../data/clients.json');
$jData = json_decode( $sData );

if( $jData == null){
  sendResponse(-1, __LINE__, 'Cannot convert data to JSON');
}

$jInnerData = $jData->data;
$jClientData = $jInnerData->$sPhone;
$sName = $jClientData->name;
$sLastName = $jClientData->lastName;

if( !$jInnerData->$sPhone ){
  $jListOfBanks = fnjGetListOfBanksFromCentralBank();
  foreach( $jListOfBanks as $sKey => $jBank ){

    $sUrl = $jBank->url.'/apis/api-handle-transaction?Phone='.$sPhone.'&amount='.$iAmount.'&name='.$jClientData->name.'&lastName='.$jClientData->lastName;
    $sBankResponse =  file_get_contents($sUrl);
    $jBankResponse = json_decode($sBankResponse);

    if( $jBankResponse->status == 1 && $jBankResponse->code && $jBankResponse->message ){
          sendResponse( 1, __LINE__ , $jBankResponse->message );
    }

  }
  sendResponse( 2, __LINE__ , 'Phone does not exist' );
}

$sSendingPhone = $_GET['sendingPhone'];
if ($jInnerData->$sSendingPhone->balance - $iAmount <= 0) {
  sendResponse( -1, __LINE__ , 'Insufficient funds.'  );
}

$iCurrentBalance = $jClientData->balance;
$jClientData->balance += $iAmount;
$sTransactionId = uniqid();
$jClientData->transactions->$sTransactionId = new stdClass();
$jClientData->transactions->$sTransactionId->date = time();
$jClientData->transactions->$sTransactionId->fromPhone = $sSendingPhone;
$jClientData->transactions->$sTransactionId->amount = $iAmount;
$jClientData->transactions->$sTransactionId->balanceBefore = $iCurrentBalance;
$jClientData->transactions->$sTransactionId->afterBalance = $iCurrentBalance + $iAmount;

$jSendingClientData = $jInnerData->$sSendingPhone;
$iCurrentBalance = $jSendingClientData->balance;
$jSendingClientData->balance -= $iAmount;
$jSendingClientData->transactions->$sTransactionId = new stdClass();
$jSendingClientData->transactions->$sTransactionId->date = time();
$jSendingClientData->transactions->$sTransactionId->toPhone = $sPhone;
$jSendingClientData->transactions->$sTransactionId->amount = $iAmount;
$jClientData->transactions->$sTransactionId->balanceBefore = $iCurrentBalance;
$jClientData->transactions->$sTransactionId->afterBalance = $iCurrentBalance - $iAmount;


$sFinalData = json_encode($jData);
file_put_contents('../data/clients.json', $sFinalData);
sendResponse( 1, __LINE__ , 'Recipient is a memeber of Lions Arch, transaction will occur immediately.'  );

// **************************************************
function sendResponse($iStatus, $iLineNumber, $sMessage){
  echo '{"status":'.$iStatus.', "code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}

// **************************************************
function fnjGetListOfBanksFromCentralBank(){
  // get the list of banks
  $sData = file_get_contents('https://ecuaguia.com/central-bank/api-get-list-of-banks.php?key=1111-2222-3333');
  return json_decode($sData);
}
