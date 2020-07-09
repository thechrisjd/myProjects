<?php
$sUsersName = 'Home';
$sUsersLastname = '';

require_once 'inner-top.php';
echo "string";
echo "<div class='moving_down'></div>";
try {
  require_once __DIR__.'/CRUD/connect.php';
  $stmt = $db->prepare('SELECT `user_fk_b`FROM `user_relationships` WHERE `user_fk_a` = :sUserID AND `status` = "f"');
  $stmt->bindValue(':sUserID', "$sUserID");
  $stmt->execute();
  $aRows = $stmt->fetchAll();
  //var_dump($aRows);
  foreach( $aRows as $jRow ){
    $sSearchUserid = $jRow->user_fk_b;
    $stmt = $db->prepare('SELECT * FROM `user_posts` WHERE `user_fk`= :sUserID ORDER BY post_ID DESC');
    $stmt->bindValue(':sUserID', "$sSearchUserid");
    $stmt->execute();
    $aRows = $stmt->fetchAll();


    foreach ($aRows as $jRow) {
      if ($jRow->type == 'Photo') {
        $sUserWhoPostId = $jRow->from_id;
        $stmt = $db->prepare('SELECT `name`, `last_name` FROM `user_info` WHERE `user_id` = :sUserID');
        $stmt->bindValue(':sUserID', "$sUserWhoPostId");
        $stmt->execute();
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
        $stmt->execute();
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
  }
} catch (PDOException $e) {
  echo $e;
}


$LinkToSearchBarScript = '<script src="js/search-bar.js"></script>';
$LinkToCheckingScript = '<script src="js/checking-messages.js"></script>';
$LinkToCheckingRequestsScript = '<script src="js/checking-request.js"></script>';
require_once 'inner-bottom.php';
?>
