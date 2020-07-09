<?php
  session_start(); // starting session to check if you have permission
  $sUserID = $_SESSION['sUserId'];
  if (!isset($sUserID)) {
    header('Location: ./login');
  }
  if (basename($_SERVER['PHP_SELF']) == 'profile.php'){
    require_once __DIR__.'/CRUD/connect.php';
    $stmt = $db->prepare('SELECT * FROM `user_info` WHERE `user_id`= :sUserID');
    $stmt->bindValue(':sUserID', "$sUserID");
    $stmt->execute();
    $aRows = $stmt->fetchAll();

    $sUsersName = $aRows[0]->name;
    $sUsersLastname = $aRows[0]->last_name;
    $sBannerImagePath = $aRows[0]->banner_image;
    $sProfileimagePath = $aRows[0]->profile_image;
  }
 ?>

 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <link rel="stylesheet" href="./css/profile-styling.css">
     <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
     <link rel="stylesheet" href="./css/message.css">
     <link rel="icon" href="./icons/favicon.ico" type="image/x-icon">
     <title>Venner | <?php echo $sUsersName.' '.$sUsersLastname;?></title>
     <style media="screen">
       .alert-user {
         font-weight: 600;
       }
       .alert-user-to-message {
         color: red;
       }
     </style>
   </head>
   <body>
     <header>
       <div class="users-infomation-bar">
         <div class="Logo"> <h1>Venner</h1> </div>
         <form action="views?name=" method="get">
     			<input id="sSearch" name='nameSearch' placeholder="Search" autocomplete="off"/>
     			<div id="display"></div>
     			<button>Search</button>
     		</form>
         <div class="nav_elements"> <a class="Profile-link" href="profile">Profile</a></div>
         <div class="nav_elements"> <a href="home">Home</a></div>
         <div class="nav_elements"> <a href="requests"><p id = "alert1">Requests</p></a></div>
         <div class="nav_elements"><a href="messages"><p id = "alert">Messages</p></a></div>
         <div class="nav_elements"> <a href="#">Notifacations</a></div>
         <div class="nav_elements"> <a href="apis/api-logout.php">Logout</a></div>
       </div>
