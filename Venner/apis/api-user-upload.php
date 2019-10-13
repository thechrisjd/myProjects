<?php
session_start();
$sUserID = $_SESSION['sUserId'];
if (!isset($sUserID)) {
  header('Location: ../login');
}
$txtUserStatus = $_POST['txtUserStatus'] ?? '';


if (!empty($txtUserStatus)) {
  // TODO: insert

  try {
   require_once '../CRUD/connect.php';
   $stmt = $db->prepare(' INSERT INTO `user_posts`(`post_ID`, `user_fk`, `from_id`, `type`, `data`, `time`)
   VALUES (null, :sUserID, :sUserID, :sType, :sData, :sTimeStamp) ');
   $stmt->bindValue(':sUserID', $sUserID);
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

if (!empty($_FILES["txtUserMediaUploads"]["name"])) {

  $target_dir = "../uploads/";
  $target_file = $target_dir . basename($_FILES["txtUserMediaUploads"]["name"]);
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image
  if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
      if($check == false) {
          fnSendResponce(0,__LINE__,"File is not an image.");
      }
  }

  // Check file size
  if ($_FILES["txtUserMediaUploads"]["size"] > 5000000) {
      fnSendResponce(0,__LINE__,"Sorry, your file is too large.");
  }

  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif" ) {
      fnSendResponce(0,__LINE__,"Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
  }

  if (move_uploaded_file($_FILES["txtUserMediaUploads"]["tmp_name"], $target_file)) {
      // TODO: try catch
      require_once '../CRUD/connect.php';
      $filePath = basename( $_FILES["txtUserMediaUploads"]["name"]);
      $stmt = $db->prepare('INSERT INTO `user_posts`(`post_ID`, `user_fk`, `from_id`, `type`, `data`, `time`)
      VALUES (null, :sUserID, :sUserID, :sType, :sData, :sTimeStamp)');
      $stmt->bindValue(':sUserID', $sUserID);
      $stmt->bindValue(':sType', 'Photo');
      $stmt->bindValue(':sData', "$filePath");
      $stmt->bindValue(':sTimeStamp', time());
      if (!$stmt->execute()) {
        header('Location: ../maintenance.html');
      }
    }
}
//fnSendResponce(0,__LINE__,"Sorry, there was an error uploading your file.");
fnSendResponce(1,__LINE__,"Your post has been uploaded.");


//**************************************Functions below***************************************\\

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  header('Location: ../profile.php');
  exit;
}
