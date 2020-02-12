<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>太阳系丨星汉灿烂</title>
    <script src="js/vendor/jquery-1.7.2.min.js"></script>
    <style>
        canvas {
            position: absolute;
        }
    </style>
    <link rel="stylesheet" href="stylesheets/main.css">
</head>

<body id="bg">
    <image src="images/star.png" id="star-bg" />
    <div class="wrapper">
        <div id="player" style="visibility: hidden;">
            <audio controls id="audio" autoplay="autoplay" src="./content/songs/tai_yang_xi.mp3">!audio not supported :(</audio>
        </div>
        <div id="playlist">
            <ol>
		<?php
	    	    $con = mysqli_connect("localhost","root","","universe");
	    	    if(!$con)
	    	    {
			        die('Could not connect');
	    	    }
	     	    $query = "select * from phenomenon";
	    	    $result = mysqli_query($con,$query);
	    	    while($row=mysqli_fetch_array($result))
	    	    {
                    echo "<li id='li-".$row['id']."' onclick='".$row['src_name']."()'><a id='a-".$row['id']."'></a></li>";
	    	    }
		?>
            </ol>
        </div>
        <div id="lyricWrapper">
            <div id="lyricContainer">
            </div>
        </div>
    </div>

    <image src="images/sun.png" style="width: 145px;height: 145px;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin:auto" />
    <canvas id="space"></canvas>
    <div id="planet-name">
        <div style="position: absolute;left: -8px;top: -8px;cursor:pointer" id="sun" onclick="changePage('planet/sun.php')">太阳</div>
        <div style="position: absolute;left: 136px;top: -8px;cursor:pointer" id="mercury" onclick="changePage('planet/mercury.php')">水星</div>
        <div style="position: absolute;left: 211px;top: -8px;cursor:pointer" id="venus" onclick="changePage('planet/venus.php')">金星</div>
        <div style="position: absolute;left: 286px;top: -8px;cursor:pointer" id="earth" onclick="changePage('planet/earth.php')">地球</div>
        <div style="position: absolute;left: 361px;top: -8px;cursor:pointer" id="mars" onclick="changePage('planet/mars.php')">火星</div>
        <div style="position: absolute;left: 436px;top: -8px;cursor:pointer" id="jupiter" onclick="changePage('planet/jupiter.php')">木星</div>
        <div style="position: absolute;left: 511px;top: -8px;cursor:pointer" id="saturn" onclick="changePage('planet/saturn.php')">土星</div>
        <div style="position: absolute;left: 586px;top: -8px;cursor:pointer" id="uranus" onclick="changePage('planet/uranus.php')">天王星</div>
        <div style="position: absolute;left: 661px;top: -8px;cursor:pointer" id="neptune" onclick="changePage('planet/neptune.php')">海王星</div>
    </div>

    <div>
        <img src="images/logo.png" class="logo"/>
    	<div class="logo-txt">星汉灿烂，若出其里</div>
    </div>
    <button  class="rtnbtn" onclick="changePage('milkyWay.php')">
        <image src="images/return.png" class="rtnbtn-image" />
    </button>

    <script src="js/playList.js"></script>
    <script src="js/solarSystem.js"></script>
    <script src="js/function.js"></script>
</body>
</html>