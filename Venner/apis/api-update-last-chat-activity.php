<?php
session_start();
$sUserID = $_SESSION['sUserId'];
if (!isset($sUserID)) {
  header('Location: ../login');
}

try {
  require_once '../CRUD/connect.php';
  $stmt = $db->prepare('SELECT * FROM `user_relationships` WHERE `status`= "f" AND `user_fk_a` = :sUserID');
  $stmt->bindValue(':sUserID', $sUserID);
  $stmt->execute();
  $aRows = $stmt->fetchAll();
  //echo $sUserID;
  //var_dump($aRows);
  $array = array();
  foreach ($aRows as $jRow) {
    $id = $jRow->user_fk_b;

    $stmt = $db->prepare('SELECT `chat_id`, `status` FROM `chat` WHERE `sending_user_id` = :sFriendId
        AND `receiving_user_id`= :sUserID AND `status` = "1"');
      $stmt->bindValue(':sFriendId', $id);
      $stmt->bindValue(':sUserID', $sUserID);
      $stmt->execute();
      $aRows = $stmt->fetchAll();
      //var_dump($aRows);
      /*if (empty($aRow)) {
        echo '{"status":0, "id":'.$id.'}';
      }*/
      $passedID = 0;
      foreach ($aRows as $jRow) {
         $sStatus = $jRow->status;
        if ($sStatus == '1') {
          //echo '{"status":1, "id":'.$id.'}';
          array_push($array, '{"status":1, "id":'.$id.'}');
          $passedID = $id;
        }
        /*if (empty($aRows)) {
          echo '{"status":0, "id":'.$id.'}';
        }*/
      }
      if (!$passedID) {
        // code...
        if (empty($aRow)) {
          //echo '{"status":0, "id":'.$id.'},';
          array_push($array, '{"status":0, "id":'.$id.'}');
        }

      }
      /*if (empty($aRow)) {
        //echo '{"status":0, "id":'.$id.'},';
        array_push($array, '{"status":0, "id":'.$id.'}');
      }*/

 }
 echo json_encode($array);
}catch (\Exception $e) {

}
