<?php
session_start();
$sFromAccount = $_SESSION['sUserId'];
if (!isset($sFromAccount)) {
  header('Location: ../login');
}

// TODO: check for ref
$sAccountUploadingTo = $_GET['ref'] ?? 'xx';

$txtUserStatus = $_POST['txtUserStatus'] ?? '';

if (!empty($txtUserStatus)) {
  // TODO: insert

  try {
   require_once '../CRUD/connect.php';
   $stmt = $db->prepare(' INSERT INTO `user_posts`(`post_ID`, `user_fk`, `from_id`, `type`, `data`, `time`)
   VALUES (null, :sAccountUploadingTo, :sFromAccount, :sType, :sData, :sTimeStamp) ');
   $stmt->bindValue(':sAccountUploadingTo', $sAccountUploadingTo);
   $stmt->bindValue(':sFromAccount', $sFromAccount);
   $stmt->bindValue(':sType', 'text');
   $stmt->bindValue(':sData', "$txtUserStatus");
   $stmt->bindValue(':sTimeStamp', time());
   if (!$stmt->execute()) {
     header('Location: ../maintenance.html');
   }
 } catch (PDOException $e) {
   header('Location: ../maintenance.html');
 }
}

//////////////////////////////////////////////////////////////////////////////
$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES["txtUserMediaUploads"]["name"]);
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if ($imageFileType == "jpg" || $imageFileType == "png" || $imageFileType == "jpeg"
|| $imageFileType == "gif") {
  // code...
  if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
      if($check == false) {
          fnSendResponce(0,__LINE__,"File is not an image.");
      }
  }

  if ($_FILES["txtUserMediaUploads"]["size"] > 5000000) {
      fnSendResponce(0,__LINE__,"Sorry, your file is too large.");
  }


  if (move_uploaded_file($_FILES["txtUserMediaUploads"]["tmp_name"], $target_file)) {
      // TODO: try catch
      require_once '../CRUD/connect.php';
      $filePath = basename( $_FILES["txtUserMediaUploads"]["name"]);
      $stmt = $db->prepare('INSERT INTO `user_posts`(`post_ID`, `user_fk`, `from_id`, `type`, `data`, `time`)
      VALUES (null, :sAccountUploadingTo, :sFromAccount, :sType, :sData, :sTimeStamp)');
      $stmt->bindValue(':sAccountUploadingTo', $sAccountUploadingTo);
      $stmt->bindValue(':sFromAccount', $sFromAccount);
      $stmt->bindValue(':sType', 'Photo');
      $stmt->bindValue(':sData', "$filePath");
      $stmt->bindValue(':sTimeStamp', time());
      if (!$stmt->execute()) {
        header('Location: ../maintenance.html');
      }
    }
}




fnSendResponce(1,__LINE__,"Your post has been uploaded.");


//**************************************Functions below***************************************\\

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  $sAccountUploadingTo = $_GET['ref'];
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  header('Location: ../profile-view.php?ref='.$sAccountUploadingTo.'');
  exit;
}
