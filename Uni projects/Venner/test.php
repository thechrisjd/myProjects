<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>test</title>
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
		button {
			margin-left: 940px;
			float: left;
			margin-top: -12px;
		}
    </style>
	</head>
	<body>

		<form action="views?name=" method="get">
			<input id="sSearch" name='nameSearch' placeholder="Search" />
			<div id="display"></div>
			<button>Search</button>
		</form>
		<img src="./images/photo-camera.svg">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script src="js/practice.js"></script>


		<div class="user-upload-bar">
			<img id="thumbNailImage" class="removeFromDisplay" src="" style="width: 200px; height: 200px;">
			<form id="frmUserPost" action="./apis/api-user-upload.php" method="post" enctype="multipart/form-data">
				<div class="upload_grid">
					<p>Create post</p>
					<label class="myLabel grid_2">
						<input type="file" name="txtUserMediaUploads" id="fileToUpload" onchange="previewImage()">
						<span class="upload_tag">Photo/video</span>
					</label>
					<p>Live video</p>
				</div>
					<textarea name="txtUserStatus" rows="2" class="question" id="msg" autocomplete="off"></textarea>
					<label for="msg"><span>Have something to post?</span></label>
				<button class="btn-slide-line"> <span>Upload</span></button>
			</form>
		</div>



		<div class="user-upload-bar">
			<img id="thumbNailImage" class="removeFromDisplay" src="" style="width: 200px; height: 200px;">
			<form id="frmUserPost" action="./apis/api-upload-to-friends-page.php?ref=<?php echo $sKey;?>" method="post" enctype="multipart/form-data">
				<div class="upload_grid">
					<p>Create post</p>
					<label class="myLabel">
						<input type="file" name="txtUserMediaUploads" id="fileToUpload" onchange="previewImage()">
						<span>Photo/video</span>
					</label>
					<p>Live video</p>
				</div>
					<textarea name="txtUserStatus" rows="2" class="question" id="msg" autocomplete="off"></textarea>
					<label for="msg"><span>Write something to <?php echo $sUsersName ?>?</span></label>
				<button class="btn-slide-line"> <span>Upload</span></button>
			</form>
		</div>

















	</body>
</html>
