<?php

$sUersEmail = $_GET['email'];
$sCompanyName = $_GET['name'];
$sType = $_GET['type'];
$intPrice = $_GET['price'];
$intPickupDate = $_GET['pickup'];
$intReturnDate = $_GET['return'];

$sSubject = 'Car rental';

$sMail_content = <<<EOF
This is an email conformation of your car rental.
Your pickup date is $intPickupDate.
Your return date is $intReturnDate.
Please retrun the car with a full tank.
EOF;


/*if(!mail($sUersEmail,$sSubject, $sMail_content)){
  sendResponse(0,__LINE__,'Could not send email');
}*/

header('Location: ../transaction-complete.php');
