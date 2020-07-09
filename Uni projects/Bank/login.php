<?php
$sTabName = 'Login';
require_once 'top.php';
?>
<h1>login</h1>
<form id="frmLogin" action="./apis/api-login" method="POST">
  <input type="text" name="txtLoginPhone" placeholder="Phone number" data-validate="yes"
    data-min="8" data-max="8" data-type="string">
  <input type="password" name="txtLoginPassword" placeholder="Password" data-validate="yes"
    data-min="6" data-max="64" data-type="string">
  <button>Login</button>
  <a href="./password-reset"><div style="color:black">I don't remember my password</div>
</form>
<?php
$sLinkToScript = '<script src="./js/login.js"></script>';
$sLinkToSecondScript = '<script src="./js/validate.js"></script>';
require_once 'bottom.php';

?>
