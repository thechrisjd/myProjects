<?php
$sUsersName = 'Messages';
$sUsersLastname = '';
require_once 'inner-top.php';?>


</header>

<h1>hello world</h1>
<h2> Hi </h2>
<?php
  try {
    require_once './CRUD/connect.php';
    $stmt = $db->prepare('SELECT * FROM `user_relationships` WHERE `status`= "f" AND `user_fk_a` = :sUserID OR `user_fk_b`= :sUserID');
    $stmt->bindValue(':sUserID', $sUserID);
    if (!$stmt->execute()) {
      header('Location: ../maintenance.html');
    }
    $aRows = $stmt->fetchAll();
    echo '<div class="sideTable">';
    echo "<div class = ''></div>";
    foreach ($aRows as $jRow) {

      if ($jRow->user_fk_a != $sUserID) {
        $sFrindID = $jRow->user_fk_a;
        $stmt = $db->prepare('SELECT `name`, `last_name`, `profile_image` FROM `user_info` WHERE `user_id` = :sFriendId');
        $stmt->bindValue(':sFriendId', $sFrindID);
        if (!$stmt->execute()) {
          header('Location: ../maintenance.html');
        }
        $aRows = $stmt->fetchAll();
        echo "<div class='navLink' id='styling$jRow->user_fk_a' data-showPage='$jRow->user_fk_a'>";
        foreach ($aRows as $jRow) {
          echo "<img class= 'profilePic' src='./uploads/$jRow->profile_image'>";
          echo "<div class='fullName'>$jRow->name $jRow->last_name</div>";
        }

        echo "</div>";
      }
  }
}catch (PDOException $e) {
    header('Location: ../maintenance.html');
  }
  echo '</div>';

  try {
    $stmt = $db->prepare('SELECT * FROM `user_relationships` WHERE `user_fk_a` = :sUserID AND `status` = "f"');
    $stmt->bindValue(':sUserID', $sUserID);
    if (!$stmt->execute()) {
      header('Location: ../maintenance.html');
    }
    $aRows = $stmt->fetchAll();

    foreach ($aRows as $jRow) {
      $sFriendId = $jRow->user_fk_b;
      $stmt = $db->prepare('SELECT `name`, `last_name` FROM `user_info` WHERE `user_id` = :sFriendId');
      $stmt->bindValue(':sFriendId', $sFriendId);
      if (!$stmt->execute()) {
        header('Location: ../maintenance.html');
      }
      $aRows = $stmt->fetchAll();
      $sFriendName = $aRows[0]->name;
      $sFriendLastName = $aRows[0]->last_name;
      echo "<div id = '$sFriendId' class = 'page'>";
      echo "<div class = 'name'><h3>$sFriendName $sFriendLastName</h3></div>";
      echo "<div  class = 'scrollBar'>";
      echo "<div id='user_details$sFriendId'></div>";

      echo  '</div>';
      echo "<form  id='frmMessenger$sFriendId' class='form' action='./apis/api-insert-into-chat.php?postingToId=$sFriendId'>
        <input id='submintIDfrmMessenger$sFriendId' type='textarea' class = 'inputBar' name='txtChatMessage'>
        <input type='submit' class = 'hide'>
      </form>";
      echo  '</div>';
    }

  } catch (PDOException $e) {
    header('Location: ../maintenance.html');
}



 ?>











<?php
$LinkToScript = '<script src="./js/chat.js"></script>';
$LinkToSearchBarScript = '<script src="js/search-bar.js"></script>';
$LinkToCheckingRequestsScript = '<script src="js/checking-request.js"></script>';
require_once 'inner-bottom.php'; ?>
