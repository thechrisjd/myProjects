<?php
session_start();
/*if (!isset($_SESSION['sUserId'])) {
  header('Location: login');
}*/


$sUserId = $_SESSION['sUserId'];
$sData = file_get_contents('./data/clients.json');
//echo $sData;
$jData = json_decode($sData);
if ($jData == null) {
  echo 'system update';
}
$jInnerData = $jData->data;
$jClient = $jInnerData->$sUserId;
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="This website is a Bank project for my university. This is not a really Bank.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="shortcut icon" href="./icon/logo.ico" type="image/x-icon" />
    <title>Lions Arch | Profile</title>
    <style media="screen">
      * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
      }
      body {
        overflow: hidden;
        overflow-y: scroll;
      }
      nav {
        background-color: black;
        height: 40px;
        width: 100vw;
        font-size: 16px;
        padding-top: 10px;
        position: fixed;
      }
      nav a {
        text-decoration: none;
        color: white;
      }
      .Personal{
        padding: 0 10px 0 50px;
        border-right: 1px solid white;
        font-weight: bolder;
      }
      .Business{
        padding-left: 7px;
      }
      .Logout{
        padding-left: 64em;
        font-weight: bolder;
      }
      /*                       */
      header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        width: 100%;
        padding: 50px 40px 0px 0px;

        background-color: #BDBCBC;
      }
      #logo {
        position: absolute;
        top: 40px;
        left:   0px;
        width: 150px;
        height: 130px;
        background-image: url(./images/logo.PNG);
        background-repeat: no-repeat;
        background-size: contain;
        border: none;
      }

      .link {
        background-color: white;
        border: 1px solid #BDBCBC;
        text-align: center;
        font-size: 18px;
        padding: 10px;
      }



      /*Aside */
      aside {
        display: grid;
        grid-rows: 1fr 1fr 1fr 1fr 1fr;
        padding: 73px 0 0px 0;
        width: 150px;
        background-color: #BDBCBC;
      }
      .sideLink{
        background-color: white;
        border: 1px solid #BDBCBC;
        font-size: 16px;
        padding: 5px;
      }
      /*  main  */
      div.page{
      position: absolute;
      top: 75px; left: 0px;
      padding: 20px 15%;
    }

    .active {
      font-weight: bolder;
    }

    #finance {
      margin-top: 40px;
    }
    .move {
      margin-top: 20px;
    }
    .accounts {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      background-color: blue;

    }

    .loans {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      background-color: blue;
      width: 800px;

    }


    .infoLink {
      color: blue;
      text-decoration: underline;
    }

    #chat {
      display: grid;
      justify-items: center;
      align-items: center;
      margin-left: 100px;
    }

    #chat h1 {
      padding: 20px 0px;
    }
    .chatScreen {
      position: relative;
      width: 600px;
      height: 350px;
      border: 2px solid black;
    }

    #frmChat{
    position: absolute;
    bottom: 10px;
    left: 90px;
  }

  #frmChat input {
    width: 300px;
    height: 40px;
  }
  #frmChat button {
    width: 100px;
    height: 40px;
  }

  #payments {
    margin-top: 50px;
  }




      /*footer*/
      footer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100vw;
        height: 125px;
        padding: 0 8% 0 16%;
        margin-top: 225px;
        background-color: #BDBCBC;
      }

      footer div h2{
        margin-top: 40px;
        margin-bottom: -30px;
        font-size: 23px;
      }
      footer div p {
        margin-top: 35px;

      }

      .Copyright {
        background-color: black;
        color: white;
        text-align: center;
        padding: 20px 0px;
        font-size: 18px;
      }


    </style>
  </head>
  <body>
    <nav>
      <a class="Personal" href="index">Personal</a>
      <a class="Business" href="maintenance">Business</a>
      <a class="Logout" href="./apis/api-logout">Logout</a>
    </nav>


    <header>
      <a href="index"><div id="logo"></div></a>
      <div class="navLink link active home" data-showPage="finance">Daily finance</div>
      <div class="navLink link" data-showPage="savings">Savings & investment</div>
      <div class="navLink link" data-showPage="loans">Loans</div>
      <div class="navLink link" data-showPage="insurance">Insurance</div>
      <div class="navLink link" data-showPage="advice">Advice</div>
      <div class="navLink link" data-showPage="chat">Chat now</div>
    </header>
    <aside>
      <div class="navLink sideLink" data-showPage="payments">Payments & transfers</div>
      <div class="navLink sideLink" data-showPage="foreignPayments">Foreign payments</div>
      <div class="navLink sideLink" data-showPage="accounts">Accounts</div>
      <div class="navLink sideLink" data-showPage="cards">Cards</div>
      <div class="navLink sideLink" data-showPage="budget">Budget</div>
      <div class="navLink sideLink" data-showPage="mail">Mail</div>
    </aside>
    <main>
      <div id="finance" class="page">
        <h1>Welocome <?php echo $jClient->name.' '.$jClient->lastName; ?></h1>
          <p>You were last logged in on:</p>
          <p>Your mobile number is: <?php echo $sUserId;?>, <div class="navLink infoLink" data-showPage="changeSecuirtyInfo" >you can correct your number or change your password here.</div> </p>
          <div class="move">Accounts</div>
            <?php

              foreach ($jClient->accounts as $key => $iAccountDetails) {

                echo "<div class='Accounts'>
                        <div>Type
                          <div>
                            name
                          </div>
                        </div>
                        <div>Account</div>
                        <div>$key</div>
                        <div>Last movement
                          <div>
                            14/03/2018
                          </div>
                        </div>
                        <div>Balance</div>
                        <div>$iAccountDetails->balance</div>";

              }

             ?>
          <div class="loans">
            <div>Type
              <div>
                name
              </div>
            </div>
            <div>Account number
              <div>
                897247012
              </div>
            </div>
            <div>Last movement
              <div>
                14/03/2018
              </div>
            </div>
            <div>Balance
              <div>
                10
              </div>
            </div>
          </div>
      </div>
    </div>


      <div id="savings" class="page">Savings & investment</div>
      <div id="loans" class="page">
        <h1>Apply now</h1>
        <form id="frmApplyForLoan" action="./apis/api-apply-for-loan" method="POST">
          <input type="text" name="txtLoanAmount" placeholder="Amount">
          <input type="password" name="txtPassword" placeholder="password">
          <button>Apply</button>
        </form>
      </div>
      <div id="insurance" class="page">Insurance</div>
      <div id="advice" class="page">Advice</div>
      <div id="chat" class="page">
        <h1>Need help or advice? Speak to one of our online staff now!</h1>
        <div class="chatScreen">
          <div id="lblMessages"></div>
          <form id="frmChat" method="POST" action="./apis/api-set-message">
            <input type="text" name="txtSendingMessage">
            <button>Send</button>
          </form>
        </div>
      </div>

      <div id="payments" class="page">
        <h1>Transfer to others</h1>
        <form id="frmTransfer" action="./apis/api-transfer" method="get">
          <input type="text" placeholder="Phone number" id="txtTransferToPhone" name="txtPhoneNumber">
          <input type="text" placeholder="amount" id="txtTransferAmount" name="txtAmount">
          <button>Transfer</button>
        </form>
      </div>
      <div id="foreignPayments" class="page">Foreign payments</div>
      <div id="accounts" class="page">
        <h1>Create new account</h1>
        <form id="frmCreateAccount" action="./apis/api-create-account" method="post">
          <input type="text" name="txtAccounttype" placeholder="Account type">
          <input type="text" name="txtAccountBalance" placeholder="Balance">
          <input type="text" name="txtPassword" placeholder="password">
          <button>Create account</button>
        </form>
      </div>
      <div id="cards" class="page">Cards</div>
      <div id="budget" class="page">Budget</div>
      <div id="mail" class="page">Mail</div>
      <div id="changeSecuirtyInfo" class="page">
        <h1>Update personal information</h1>
        <form id="frmChangeNumber" action="./apis/api-change-phone-number" method="post">
          <input type="text" name="txtNewNumber" placeholder="New number">
          <button  name="btnChangeNumber">Change number</button>
        </form>
        <form id="frmChangePassword" action="./apis/api-change-password.php" method="post">
          <input type="password" name="txtOldPassword" placeholder="Old password">
          <input type="password" name="txtNewPassword" placeholder="New password">
          <input type="password" name="txtConfirmNewPassword" placeholder="Confirm password">
          <button name="btnChangePassword">Change password</button>
        </form>
      </div>
    </main>
    <footer>
      <div>
        <h2>Help & Support</h2>
          <p>Got any questions?</p>
        </div>
      <div>
        <h2>Find branch</h2>
          <p>Find your nearest banking location.</p>
      </div>
      <div>
        <h2>About Lions Arch</h2>
          <p>Looking for a job, contact us.</p>
      </div>
    </footer>
    <div class="Copyright">
      <p>  Lions Arch Group | © Copyright Lions Arch Group 2000-2019. All rights reserved</p>
    </div>
    <!-- JavaScript Below -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script type="text/javascript">
    //Hiding pages
      var jApp = {
        "fnvHidePages" : function(){
          $('.page').hide()
        }
      }
      jApp.fnvHidePages()
      let sPageToShow = $('.home').attr('data-showPage')
      $('#'+sPageToShow).show()
      $('.navLink').click(function(){
        $('.navLink').removeClass('active')
        jApp.fnvHidePages()
        $(this).addClass('active')
        let sPageToShow = $(this).attr('data-showPage')
        $('#'+sPageToShow).show()
      })
      //ajax for transfer
      $('#frmTransfer').submit(function(){
      $.ajax({
        method: 'GET',
        url: './apis/api-transfer?phone='+$('#txtTransferToPhone').val()+'&amount='+$('#txtTransferAmount').val()+"&sendingPhone=<?php echo $sUserId;?>",
        cache: false,
        dataType:"JSON"
      }).done(function(jData){
        if (jData.status == -1) {
          console.log('*******************************************');
          console.log(jData);
          swal({title: jData.message,
                icon: "warning", });
        }
        if (jData.status == 0) {
          console.log('*******************************************');
          console.log('Getting list');
          swal({title:"CONGRATS", text:jData.message,   icon: "success", });
        }
        if (jData.status == 1) {
          console.log('*******************************************');
          console.log(jData);
          swal({title:"CONGRATS", text:jData.message,   icon: "success", });
        }
      }).fail(function(){
        swal({title: "System under maintenance",
              icon: "warning", });
      })
      return false;
    })

    $('#frmChangePassword').submit(function(){
      $.ajax({
        method: 'POST',
        url: "./apis/api-change-password.php",
        data: $('#frmChangePassword').serialize(),
        dataType:"JSON"
      }).done(function(jData){
        if (jData.status == 1) {
          swal({title:"CONGRATS", text:jData.message,   icon: "success", });
        }
        if (jData.status == 0) {
          swal({title: jData.message,
                icon: "warning", });
        }
        if (jData.status == -1) {
          swal({title: jData.message,
                icon: "warning", });
        }
      }).fail(function(){
        swal({title: "ERROR",
              icon: "warning", });
      })
    return false;
  })

//***************CHAT SCREEN ***************************************************
  $('#frmChat').submit( function(){
      $.ajax({
        method: "POST",
        url: "./apis/api-set-message",
        data: $('#frmChat').serialize(),
        cache: false
      }).
      done(function( sMessages ){
        console.log('done')
      }).
      fail(function(){

      })
      return false;
    })

    setInterval( function(){
      $.ajax({
        method: "GET",
        url: "./apis/api-get-messages.php?sUserId="+<?php echo $sUserId; ?>,
        cache: false
      }).
      done(function( sMessages ){
        $('#lblMessages').append('<div>'+sMessages+'</div>')
      }).
      fail(function(){

      })
    } , 3000 )

    //**************************************************************************
    $('#frmApplyForLoan').submit(function(){
      $.ajax({
        method: 'POST',
        url: "./apis/api-apply-for-loan",
        data: $('#frmApplyForLoan').serialize(),
        dataType:"JSON"
      }).done(function(jData){
        if (jData.status == 1) {
          swal({title:"CONGRATS", text:jData.message,   icon: "success", });
        }
        if (jData.status == 0) {
          swal({title: jData.message,
                icon: "warning", });
        }
        if (jData.status == -1) {
          swal({title: jData.message,
                icon: "warning", });
        }
      }).fail(function(){
        swal({title: "ERROR",
              icon: "warning", });
      })
    return false;
  })

    </script>
  </body>
</html>
