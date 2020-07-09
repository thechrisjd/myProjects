<?php
$sPageTitle = 'Venner | Signup';
require_once './outer-top.php';

?>
<div class="limiter">
<div class="container-login100" style="background-image: url('images/bg-01.jpg');">
  <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
    <form id="frmSignup" class="login100-form validate-form">
      <span class="login100-form-title p-b-49">
        Signup
      </span>

      <div class="wrap-input100 validate-input m-b-23" data-validate = "Name is reauired">
        <span class="label-input100">First Name</span>
        <input class="input100" type="text" name="txtSignupFirstName" placeholder="First Name">
        <span class="focus-input100" data-symbol="&#xf206;"></span>
      </div>

      <div class="wrap-input100 validate-input m-b-23" data-validate = "Last name is reauired">
        <span class="label-input100">Last Name</span>
        <input class="input100" type="text" name="txtSignupLastName" placeholder="Last Name">
        <span class="focus-input100" data-symbol="&#xf206;"></span>
      </div>

      <div class="wrap-input100 validate-input m-b-23" data-validate = "Email is reauired">
        <span class="label-input100">Email</span>
        <input class="input100" type="text" name="txtSignupEmail" placeholder="Type your email">
        <span class="focus-input100" data-symbol="&#xf206;"></span>
      </div>

      <div class="wrap-input100 validate-input m-b-23" data-validate = "Comfirm email is reauired">
        <span class="label-input100">Confirm Email</span>
        <input class="input100" type="text" name="txtSignupConfirmEmail" placeholder="Re-type your email">
        <span class="focus-input100" data-symbol="&#xf206;"></span>
      </div>

      <div class="wrap-input100 validate-input" data-validate="Password is required">
        <span class="label-input100">Password</span>
        <input class="input100" type="password" name="txtSignupPassword" placeholder="Type your password">
        <span class="focus-input100" data-symbol="&#xf190;"></span>
      </div>

      <div class="wrap-input100 validate-input input-space" data-validate="Password is required">
        <span class="label-input100">Confrim Password</span>
        <input class="input100" type="password" name="txtSignupConfirmPassword" placeholder="Re-type your password">
        <span class="focus-input100" data-symbol="&#xf190;"></span>
      </div>

      <div class="container-login100-form-btn button-space">
        <div class="wrap-login100-form-btn">
          <div class="login100-form-bgbtn"></div>
          <button class="login100-form-btn">
            Signup
          </button>
        </div>
      </div>
      <div class="txt1 text-center p-t-54 p-b-20">
        <span>
          <a href="./index">Home </a> or <a href="./login"> Login </a>
        </span>
      </div>
    </form>
  </div>
</div>
</div>
<div id="dropDownSelect1"></div>


<?php
$LinkToScript = '<script src="./js/signup.js"></script>';
$LinkToSecondScript = '<script src="./js/main.js"></script>';
require_once './outer-bottom.php';
?>
