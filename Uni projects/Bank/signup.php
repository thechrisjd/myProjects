<?php
$sTabName = 'Signup';
require_once 'top.php';
?>
  <h1>signup</h1>
  <form id="frmSignup" action="./apis/api-signup" method="post">
    <input class="invalid" type="text" name="txtSignupName" placeholder="First name" data-validate="yes"
      data-min="2" data-max="20" data-type="string">
    <input type="text" name="txtSignupLastName" placeholder="Surname" data-validate="yes"
      data-min="2" data-max="20" data-type="string">
    <input type="text" name="txtSignupCpr" placeholder="DDMMYY-XXXX" data-validate="yes"
      data-min="11" data-max="11" data-type="string">
    <input type="text" name="txtSignupPhone" placeholder="Phone number" data-validate="yes"
      data-min="8" data-max="8" data-type="string">
    <input type="text" name="txtSignupEmail" placeholder="Email" data-validate="yes"
      data-min="5" data-type="email">
    <input type="text" name="txtSignupConfirmEmail" placeholder="Confirm email" data-validate="yes"
      data-min="5" data-type="email">
    <input type="password" name="txtSignupPassword" placeholder="Password" data-validate="yes"
      data-min="6" data-max="64" data-type="string">
    <input type="password" name="txtSignupConfirmPassword" placeholder="Confirm password" data-validate="yes"
      data-min="6" data-max="64" data-type="string">
    <button>Signup now</button>
  </form>
<?php
$sLinkToScript = '<script src="./js/signup.js"></script>';
$sLinkToSecondScript = '<script src="./js/validate.js"></script>';
require_once 'bottom.php';
?>
