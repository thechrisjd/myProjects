<?php
$sPageTitle = 'Venner | Login';
require_once './outer-top.php';?>

<div class="limiter">
<div class="container-login100" style="background-image: url('images/bg-01.jpg');">
  <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
    <form id="frmLogin" class="login100-form validate-form">
      <span class="login100-form-title p-b-49">
        Login
      </span>

      <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
        <span class="label-input100">Email</span>
        <input class="input100" type="text" name="txtLoginEmail" placeholder="Type your email">
        <span class="focus-input100" data-symbol="&#xf206;"></span>
      </div>

      <div class="wrap-input100 validate-input" data-validate="Password is required">
        <span class="label-input100">Password</span>
        <input class="input100" type="password" name="txtLoginPassword" placeholder="Type your password">
        <span class="focus-input100" data-symbol="&#xf190;"></span>
      </div>

      <div class="text-right p-t-8 p-b-31">
        <a href="./forgot.php">
          Forgot password?
        </a>
      </div>

      <div class="container-login100-form-btn">
        <div class="wrap-login100-form-btn">
          <div class="login100-form-bgbtn"></div>
          <button class="login100-form-btn">
            Login
          </button>
        </div>
      </div>
      <div class="txt1 text-center p-t-54 p-b-20">
        <span>
          <a href="./index">Home </a> or <a href="./signup">Sign Up</a>
        </span>
      </div>
    </form>
  </div>
</div>
</div>
<div id="dropDownSelect1"></div>
<?php
$LinkToScript = '<script src="./js/login.js"></script>';
$LinkToSecondScript = '<script src="./js/main.js"></script>';
require_once './outer-bottom.php';?>
