<?php
  require_once __DIR__.'/CRUD/connect.php';
  $sKey = $_GET['ref'];
  $stmt2 = $db->prepare('SELECT * FROM `user_info` WHERE `user_id`= :skey');
  $stmt2->bindValue(':skey', "$sKey");
  if (!$stmt2->execute()) {
    header('Location: ../maintenance.html');
  }
  $aRows2 = $stmt2->fetchAll();
  $sUsersName = $aRows2[0]->name;
  $sUsersLastname = $aRows2[0]->last_name;
  $sBannerImagePath = $aRows2[0]->banner_image;
  $sProfileimagePath = $aRows2[0]->profile_image;
  require_once __DIR__.'/inner-top.php';
  if ($sKey == $sUserID) {
    header('Location: ./profile');
  }

  $stmt3 = $db->prepare('SELECT `status` FROM `user_relationships` WHERE `user_fk_a` = :skey AND `user_fk_b` = :sUserID OR `user_fk_a` = :sUserID AND `user_fk_b` = :skey ');
  $stmt3->bindValue(':skey', "$sKey");
  $stmt3->bindValue(':sUserID', "$sUserID");
  if (!$stmt3->execute()) {
    header('Location: ../maintenance.html');
  }
  $aRows3 = $stmt3->fetchAll();
  $sStatus = $aRows3[0]->status;
  if ($sStatus == "f") {
    include 'viewing-profile.php';
  }
  if ($sStatus != "f") {
    ?>
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
              //SELECT status FROM `user_relationships` WHERE `user_fk_a`= :sUserid AND `user_fk_b`= :skey OR `user_fk_a`= :skey AND `user_fk_b`= :sUserid
              //SELECT status FROM `user_relationships` WHERE `user_fk_a`= :sUserid AND `user_fk_b`= :skey OR `user_fk_a`= :skey AND `user_fk_b`= :sUserid
              $stmt = $db->prepare('SELECT * FROM `user_relationships` WHERE `user_fk_a`= :sUserid AND `user_fk_b`= :skey OR `user_fk_a`= :skey AND `user_fk_b`= :sUserid');
              $stmt->bindValue(':sUserid', "$sUserID");
              $stmt->bindValue(':skey', "$sKey");
              $stmt->execute();
              $aRows = $stmt->fetchAll();
              //var_dump($aRows);
              if (!empty($aRows)) {
                if ($sUserID == $aRows[0]->user_fk_a) {
                  // code...
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


    <?php
  }
 ?>


<?php
  $LinkToScript = '<script src="js/profile.js"></script>'; //why?
  $LinkToSearchBarScript = '<script src="js/search-bar.js"></script>';
  $LinkToChangeFriendStatusScript = '<script src="js/change-friend-status.js"></script>';
  $LinkToCheckingScript = '<script src="js/checking-messages.js"></script>';
?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
$("#frmFriend").click(function(){
  console.log('xxxxxxxx');

    var sLoggedInUserID = "<?php echo $sUserID ;?>";
    var sOtherUserID = "<?php echo $sKey ;?>";
      $.ajax({
        type: "POST",
        url: "./apis/api-change-friend-status.php",
        data: {
            loggedInUserID: sLoggedInUserID,
            otherUserID: sOtherUserID ,

        },
        dataType: "JSON"
      }).done(function (jData){
        /*if (jData.status == ) {

        }*/
        console.log(jData.status);
        $("#btnChangeStatus").html(jData.status);
        return false;
      }).fail(function () {
        console.log('not');
        console.log('working');
        return false;
      });

  return false;
})
</script>
<?php
$LinkToCheckingRequestsScript = '<script src="js/checking-request.js"></script>';
require_once './inner-bottom.php'; ?>
