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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>CHAT</title>
  <style>
    body{
      display: grid;
      justify-items: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-size: 40px;
    }
    body > div{
      position: relative;
      width: 500px;
      height: 500px;
      border: 2px solid blue;
      padding: 20px;
    }
    form{
      position: absolute;
      bottom: 20px;
    }
  </style>
</head>
<body>

  <div>
    <div id="lblMessages"></div>
    <form id="frmChat" action="./apis/api-set-message" method="post">
      <input type="text" name="txtSendingMessage">
      <button>Send</button>
    </form>
  </div>


  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <script>
    let sUserId = '<?= $sUserId; ?>'

    $('#frmChat').submit( function(){
      $.ajax({
        method: "POST",
        url: "./apis/api-set-message",
        data: $('form').serialize(),
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
        url: "./apis/api-get-messages.php?sUserId="+sUserId,
        cache: false
      }).
      done(function( sMessages ){
        $('#lblMessages').append('<div>'+sMessages+'</div>')
      }).
      fail(function(){

      })

    } , 3000 )

  </script>
</body>
</html>
