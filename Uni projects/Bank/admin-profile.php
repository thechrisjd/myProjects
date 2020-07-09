<?php
session_start();
if (!isset($_SESSION['sUserId'])) {
  header('Location: admin');
}


$sUserId = $_SESSION['sUserId'];

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>VIEW CUSTOMERS</title>
    <style media="screen">
      .client {
        margin-top: 20px;

      }
      .client:nth-child(even) {
        background-color: rgba(0,0,0,0.2);
      }
    </style>
  </head>
  <body>
    <h1>view customers</h1>
    <nav>
      <a href="./adminChat">Chat</a>
      <div>Logout</div>
    </nav>
    <?php
      $sData = file_get_contents('./data/clients.json');

      $jData = json_decode($sData);
      if ($jData == null) {
        echo "error";
        exit;
      }

      foreach ($jData->data as $key => $jclient) {

        $sWord = ($jclient->status == 0) ? 'UNBLOCK' : 'BLOCK';
        $sLoanStatus = ($jclient->pendingLoans == 0) ? 'No loan for approval' : 'Loan for approval';
        echo "<div class=\"client\">
                <div>Phone:$key</div>
                <div>Name:$jclient->name</div>
                <div>Last name:$jclient->lastName</div>
                <div>Balance:$jclient->balance</div>
                <div>
                  <form action='./apis/api-admin-loan-approval.php?phone=$key' method='POST'>
                    <div>Loan amount pendding:$jclient->pendingLoans</div>
                    <button>$sLoanStatus</button>
                  </form>
                </div>
                <a href='./apis/api-block-or-unblock.php?phone=$key'>$sWord</a>
                <form action='./apis/api-admin-transfer.php?phone=$key' method='POST'>
                  <input type=\"text\" name=\"txtAmount\" placeholder=\"amount\">
                  <button>Send</button>
                </form>
              </div>";
      }

     ?>


  </body>
</html>
