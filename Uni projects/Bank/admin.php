<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>Admin account</h1>
    <form id="frmAdminLogin" action="./apis/api-admin-login" method="post">
      <input type="text" name="txtUsername" placeholder="username">
      <input type="password" name="txtLoginPassword" placeholder="password">
      <button>Login</button>
    </form>




    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="./js/admin-login.js"></script>


    </script>
  </body>
</html>
