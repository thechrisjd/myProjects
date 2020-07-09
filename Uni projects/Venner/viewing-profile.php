<div class="banner-image"> <img src="./uploads/<?php echo $sBannerImagePath;?>" alt=""> </div>
<div class="profile-image"> <img src="./uploads/<?php echo $sProfileimagePath;?>" alt=""> </div>
<div class="users-information">
  <h2><?php echo $sUsersName.' '.$sUsersLastname;?></h2>
  <div class="navbar">
    <a href="#">Photos</a>
    <a href="#">Friends</a>
    <a href="#">About</a>
    <form id="frmFriend" action="" method="post">
      <button id="btnChangeStatus">  <?php
        try {
          $stmt = $db->prepare('SELECT * FROM `user_relationships` WHERE `user_fk_a`= :sUserid AND `user_fk_b`= :skey OR `user_fk_a`= :skey AND `user_fk_b`= :sUserid');
          $stmt->bindValue(':sUserid', "$sUserID");
          $stmt->bindValue(':skey', "$sKey");
          if (!$stmt->execute()) {
            header('Location: ../maintenance.html');
          }
          $aRows = $stmt->fetchAll();
          if (!empty($aRows)) {
            if ($sUserID == $aRows[0]->user_fk_a) {

              if ($aRows[0]->status == 'p') {
                echo 'Pending';
              }
            }
            if ($sUserID == $aRows[0]->user_fk_b) {
              // code...
              if ($aRows[0]->status == 'p') {
                echo 'Pending';
              }
            }
            if ($aRows[0]->status == 'f') {
              echo 'Unfriend';
            }
          }else {
            echo 'add friend';
          }


        } catch (\Exception $e) {

        }
       ?></button>
    </form>
  </div>
</div>
</header>
<main>
<div class="user-upload-bar">
  <img id="thumbNailImage" class="removeFromDisplay" src="" style="width: 200px; height: 200px;">
  <form id="frmUserPost" action="./apis/api-upload-to-friends-page.php?ref=<?php echo $sKey;?>" method="post" enctype="multipart/form-data">
    <div class="upload_grid">
      <p>Create post</p>
      <label class="myLabel grid_2">
        <input type="file" name="txtUserMediaUploads" id="fileToUpload" onchange="previewImage()">
        <span class="upload_tag">Photo/video</span>
      </label>
      <p>Live video</p>
    </div>
      <textarea name="txtUserStatus" rows="2" class="question" id="msg" autocomplete="off"></textarea>
      <label for="msg"><span>Write something to <?php echo $sUsersName ?>?</span></label>
    <button class="btn-slide-line"> <span>Upload</span></button>
  </form>
</div>
<?php
  require_once __DIR__.'/CRUD/connect.php';
  $stmt = $db->prepare('SELECT * FROM user_posts WHERE user_fk= :skey ORDER BY post_ID DESC LIMIT 25');
  $stmt->bindValue(':skey', "$sKey");
  if (!$stmt->execute()) {
    header('Location: ../maintenance.html');
  }
  $aRows = $stmt->fetchAll();
  foreach( $aRows as $jRow ){
    if ($jRow->type == 'Photo') {
      $sUserWhoPostId = $jRow->from_id;
      $stmt = $db->prepare('SELECT `name`, `last_name` FROM `user_info` WHERE `user_id` = :sUserID');
      $stmt->bindValue(':sUserID', "$sUserWhoPostId");
      if (!$stmt->execute()) {
        header('Location: ../maintenance.html');
      }
      $aRows = $stmt->fetchAll();
      $sPostersName = $aRows[0]->name;
      $sPostersLastName = $aRows[0]->last_name;
      echo '
      <div class="user-image-posts">
        <a href="profile-view?ref='.$sUserWhoPostId.'">'.$sPostersName.' '.$sPostersLastName.' </a>
        <div class="image">
          <img src="./uploads/'.$jRow->data.'">
        </div>
      </div>
      ';
    }
    if ($jRow->type == 'text') {
      $sUserWhoPostId = $jRow->from_id;
      $stmt = $db->prepare('SELECT `name`, `last_name` FROM `user_info` WHERE `user_id` = :sUserID');
      $stmt->bindValue(':sUserID', "$sUserWhoPostId");
      if (!$stmt->execute()) {
        header('Location: ../maintenance.html');
      }
      $aRows = $stmt->fetchAll();
      $sPostersName = $aRows[0]->name;
      $sPostersLastName = $aRows[0]->last_name;
      echo '
      <div class="user-status-posts">
        <a href="profile-view?ref='.$sUserWhoPostId.'">'.$sPostersName.' '.$sPostersLastName.' </a>
        <p>'.$jRow->data.' </p>
      </div>

      ';
    }
  }
 ?>
</main>
