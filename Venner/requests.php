<?php
$sUsersName = 'Friend';
$sUsersLastname = 'requests';
require_once 'inner-top.php';
echo '</header>';
echo '<p>hello</p>';

try {
  require_once __DIR__.'/CRUD/connect.php';
  $stmt = $db->prepare('SELECT `user_fk_a` FROM `user_relationships` WHERE `user_fk_b` = :sUserID AND `status` = "p" ');
  $stmt->bindValue(':sUserID', $sUserID);
  if (!$stmt->execute()) {
    header('Location: ../maintenance.html');
  }
  $aRows = $stmt->fetchAll();
  foreach ($aRows as $jRow) {
    // code...
    $sFriendID = $jRow->user_fk_a;
    $stmt = $db->prepare('SELECT * FROM `user_info` WHERE `user_id`= :sFriendID');
    $stmt->bindValue(':sFriendID', $sFriendID);
    if (!$stmt->execute()) {
      header('Location: ../maintenance.html');
    }
    $aRows = $stmt->fetchAll();
    foreach ($aRows as $jRow) {
      $sFriendName = $jRow->name;
      $sLastName = $jRow->last_name;
      echo '
        <div class = "requestPage" >
            <a href="profile-view?ref='.$sFriendID.'">'.$sFriendName.' '.$sLastName.' </a>
            <form class="" action="./apis/api-confirm-request.php?ref='.$sFriendID.'" method="post">
              <button>Comfrim friend request</button>
            </form>
        </div>

      ';
    }
  }


} catch (\Exception $e) {
  header('Location: ../maintenance.html');
}












?>








<?php
$LinkToSearchBarScript = '<script src="js/search-bar.js"></script>';
$LinkToCheckingScript = '<script src="js/checking-messages.js"></script>';
require_once 'inner-bottom.php';
?>
