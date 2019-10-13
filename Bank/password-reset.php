<?php
$sTabName = 'Login';
require_once 'top.php';
?>
  <h1>Rest password</h1>
  <form id="frmPasswordReset" action="./apis/api-request-password-reset" method="POST">
    <input type="text" name="txtPhoneForPasswordRest" placeholder="Phone number" data-validate="yes"
      data-min="8" data-max="8" data-type="string">
    <input type="text" name="txtEmailForPasswordRest" placeholder="a@a.com" data-validate="yes"
      data-min="5" data-type="email">
    <button>Reset</button>
  </form>
<?php
$sLinkToScript = '<script src="./js/password-reset.js"></script>';
$sLinkToSecondScript = '<script src="./js/validate.js"></script>';
require_once 'bottom.php';
?>
