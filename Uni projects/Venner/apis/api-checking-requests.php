  <?php
  session_start();
  $sUserID = $_SESSION['sUserId'];
  if (!isset($sUserID)) {
    header('Location: ../login');
  }
  try {
    require_once '../CRUD/connect.php';
    $stmt = $db->prepare('SELECT `status` FROM `user_relationships` WHERE `status`= "p" AND `user_fk_a` = :sUserID');
    $stmt->bindValue(':sUserID', $sUserID);
    $stmt->execute();
    $aRows = $stmt->fetchAll();
    $array = array();
    foreach ($aRows as $jRow) {
      $sStatus = $jRow->status ?? '';
      if ($sStatus == "p") {
        array_push($array, '{"status":1, "id":"jfj9j9ff9"}');;
      }
   }
   echo json_encode($array);
  }catch (\Exception $e) {

  }
