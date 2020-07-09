<?php
session_start();
$sUserID = $_SESSION['sUserId'];
if (empty($sUserID)) {
  header('Location: ../login');
}


$txtUserBannerPicture = $_FILES["txtUserBannerPicture"]["name"] ?? '';
$txtUserProfilePicture= $_FILES["txtUserProfilePicture"]["name"] ?? '';

if (!empty($txtUserBannerPicture)) {

  $target_dir = "../uploads/";
  $target_file = $target_dir . basename($_FILES["txtUserBannerPicture"]["name"]);
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
      if($check == false) {
          fnSendResponce(0,__LINE__,"File is not an image.");
      }
  }

  // Check file size
  if ($_FILES["txtUserBannerPicture"]["size"] > 5000000) {
      fnSendResponce(0,__LINE__,"Sorry, your file is too large.");
  }

  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif" ) {
      fnSendResponce(0,__LINE__,"Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
  }

  if (move_uploaded_file($_FILES["txtUserBannerPicture"]["tmp_name"], $target_file)) {
      // TODO: try catch
      require_once '../CRUD/connect.php';
      $filePath = basename( $_FILES["txtUserBannerPicture"]["name"]);
      $stmt = $db->prepare('UPDATE `user_info` SET `banner_image`= :sData WHERE `user_id`= :sUserID');
      $stmt->bindValue(':sData', "$filePath");
      $stmt->bindValue(':sUserID', $sUserID);
      if (!$stmt->execute()) {
        fnSendResponce(0,__LINE__, "Something went wrong.");
      }
      header('Location: ../profile');
    }
}

if (!empty($txtUserProfilePicture)) {
  $target_dir = "../uploads/";
  $target_file = $target_dir . basename($_FILES["txtUserProfilePicture"]["name"]);
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
      if($check == false) {
          fnSendResponce(0,__LINE__,"File is not an image.");
      }
  }

  // Check file size
  if ($_FILES["txtUserProfilePicture"]["size"] > 5000000) {
      fnSendResponce(0,__LINE__,"Sorry, your file is too large.");
  }

  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif" ) {
      fnSendResponce(0,__LINE__,"Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
  }

  if (move_uploaded_file($_FILES["txtUserProfilePicture"]["tmp_name"], $target_file)) {
      // TODO: try catch
      require_once '../CRUD/connect.php';
      $filePath = basename( $_FILES["txtUserProfilePicture"]["name"]);
      $stmt = $db->prepare('UPDATE `user_info` SET `profile_image`= :sData WHERE `user_id`= :sUserID');
      $stmt->bindValue(':sData', "$filePath");
      $stmt->bindValue(':sUserID', $sUserID);
      if (!$stmt->execute()) {
        fnSendResponce(0,__LINE__, "Something went wrong.");
      }
      header('Location: ../profile');
    }
}



function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}
