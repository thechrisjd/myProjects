<?php
    $sUsersNames = $_GET['nameSearch'];
    $sUsersid = $_GET['id'] ?? '';
    $sUsersNames = explode(" ", $sUsersNames);
    $sUsersName = $sUsersNames[0];
    $sUsersLastname = ucfirst($sUsersNames[1] ?? '');
    require_once __DIR__.'/inner-top.php';

    require_once __DIR__.'/CRUD/connect.php';
    $stmt = $db->prepare(' SELECT * FROM `user_info` WHERE name LIKE :sFirstName');
    $stmt->bindValue(':sFirstName', "$sUsersName%");
    if (!$stmt->execute()) {
      header('Location: ../maintenance.html');
    }
    $aRows = $stmt->fetchAll();
    echo "</header>";
    echo "<main>";
    echo "string";
    echo "<div class='moving_down'></div>";
    foreach( $aRows as $jRow ){
      if ($jRow->user_id == $sUsersid or $jRow->last_name == $sUsersLastname) {
        echo "
          <h2 class='searching_people'>People</h2>
          <div class='Move_down_hdhdh'>

              <a href='profile-view?ref=$jRow->user_id'>$jRow->name $jRow->last_name</a>
              <div class='border_line'></div>
          </div>

        ";
      }
    }
    foreach ( $aRows as $jRow ) {
      // code...
      if ($jRow->user_id != $sUsersid and $jRow->last_name != $sUsersLastname) {
        echo "
        <div class='Move_down_sfjfshh_2'>
        <a href='profile-view?ref=$jRow->user_id'>$jRow->name $jRow->last_name</a>
        <div class='border_line'></div>
        </div>

        ";
      }
    }
    echo "</main">
    $LinkToScript = '<script src="js/profile.js"></script>';
    $LinkToSearchBarScript = '<script src="js/search-bar.js"></script>';
    $LinkToCheckingScript = '<script src="js/checking-messages.js"></script>';
    $LinkToCheckingRequestsScript = '<script src="js/checking-request.js"></script>';
    require_once './inner-bottom.php';
   ?>
