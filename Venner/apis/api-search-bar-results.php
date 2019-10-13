<?php
session_start();
if (!isset($_SESSION['sUserId'])) {
  header('Location: ../login');
}
include "../CRUD/connect.php";

if (isset($_POST['databaseQuery'])) {

   $sDatabaseSearch = $_POST['databaseQuery'];
   $sDatabaseSearch = explode(" ", $sDatabaseSearch);
   $sFirstName = ucfirst($sDatabaseSearch[0]);
   $sLastName = ucfirst($sDatabaseSearch[1] ?? '');

    try {

       $stmt = $db->prepare(' SELECT * FROM `user_info` WHERE name LIKE :sFirstName AND last_name LIKE :sLastName ');
       $stmt->bindValue(':sFirstName', "$sFirstName%");
       $stmt->bindValue(':sLastName', "$sLastName%");
       //$stmt->execute();
       if (!$stmt->execute()) {
         fnSendResponce(0,__LINE__, "Something went wrong.");
       }
       $aRows = $stmt->fetchAll();
       foreach ($aRows as $jRow) {
         $sSearchUsers = $jRow->name.' '.$jRow->last_name;
         $str = <<<EOD
         <ul>
           <li onclick=fill("$sSearchUsers")>
             <a class="highLightSearchElement" href="views?nameSearch=$jRow->name&id=$jRow->user_id">
               $sSearchUsers
             </a>
           </li>
         </ul>
EOD;
       echo $str;
     }
    } catch (PDOException $e) {
     echo $e;
    }
}

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}
