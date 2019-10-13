<?php

require_once __DIR__.'/connect.php';

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Gnosis</title>
    <style media="screen">
    a:hover {

     cursor: pointer;

     background-color: yellow;

    }
    #sSearch {
      width: 500px;
      margin-top: 250px;
      margin-left: 430px;
    }
    ul {
      list-style-type:none;
    }
    #display {
      margin-top: -15px;
      margin-left: 430px;
      border-bottom-color: lightblue;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-left-color: lightblue;
      border-left-style: solid;
      border-left-width: 2px;
      border-right-color: lightblue;
      border-right-style: solid;
      border-right-width: 2px;
      width: 500px;
      padding-top: 5px;

    }
    a {
      margin-left: -35px;
    }
    </style>
  </head>
  <body>

    <input type="text" id="sSearch" placeholder="Search" />
    <div id="display"></div>



    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

   <!-- Including scripting file. -->
   <script type="text/javascript" src="script.js"></script>
  </body>
</html>
