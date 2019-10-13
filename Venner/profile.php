<?php
require_once './inner-top.php';
?>

      <div class="banner-image">
        <img src="./uploads/<?php echo $sBannerImagePath;?>" alt="">
        <form class="banner_upload" action="./apis/api-changing-standard-images.php" method="post" enctype="multipart/form-data">
          <label class="myLabel">
            <input type="file" name="txtUserBannerPicture" >
            <span class="banner_upload_input"> ..<img src="./images/photo-camera.svg"> </span>
          </label>
          <input class="upload_banner_image" type="image" src="./images/upload.svg" alt="Submit">
        </form>
      </div>
      <div class="profile-image">
        <img src="./uploads/<?php echo $sProfileimagePath;?>" alt="">
        <form class="" action="./apis/api-changing-standard-images.php" method="post" enctype="multipart/form-data">
          <label class="myLabel">
            <input type="file" name="txtUserProfilePicture">
            <span class="profile_upload_input"> <img src="./images/photo-camera.svg"> </span>
          </label>
          <input class="upload_profile_image" type="image" src="./images/upload.svg" alt="Submit">
        </form>
      </div>
      <div class="users-information">
        <h2><?php echo $sUsersName.' '.$sUsersLastname;?></h2>
        <div class="navbar">
          <a href="#">Photos</a>
          <a href="#">Friends</a>
          <a href="#">About</a>
          <a href="#">Archive</a>
          <a href="#">Edit profile</a>
        </div>
      </div>
    </header>
    <main>
      <div class="user-upload-bar">
        <img id="thumbNailImage" class="removeFromDisplay" src="" style="width: 200px; height: 200px;">
        <form id="frmUserPost" action="./apis/api-user-upload.php" method="post" enctype="multipart/form-data">
          <div class="upload_grid">
            <p>Create post</p>
            <label class="myLabel grid_2">
              <input type="file" name="txtUserMediaUploads" id="fileToUpload" onchange="previewImage()">
              <span class="upload_tag">Photo/video</span>
            </label>
            <p>Live video</p>
          </div>
            <textarea name="txtUserStatus" rows="2" class="question" id="msg" autocomplete="off"></textarea>
            <label for="msg"><span>Have something to post?</span></label>
          <button class="btn-slide-line"> <span>Upload</span></button>
        </form>
      </div>
      <?php

        try {
          $stmt = $db->prepare('SELECT * FROM user_posts WHERE user_fk = :sUserID ORDER BY post_ID DESC LIMIT 25 ');
          $stmt->bindValue(':sUserID', "$sUserID");
          $stmt->execute();
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
        } catch (PDOException $e) {
          echo $e;
        }
       ?>
    </main>
    <?php
    $LinkToScript = '<script src="js/profile.js"></script>';
    $LinkToSearchBarScript = '<script src="js/search-bar.js"></script>';
    $LinkToCheckingScript = '<script src="js/checking-messages.js"></script>';
    $LinkToCheckingRequestsScript = '<script src="js/checking-request.js"></script>';
    require_once './inner-bottom.php';
    ?>
