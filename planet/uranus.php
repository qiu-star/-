<?php
    $pid = (string)8;
    $title = "天王星 | 星汉灿烂";
    $desc = "躺着旋转的天王星。";
    include ("header.php");
?>
	<div>
		<audio id="audio" autoplay="autoplay" src="../content/songs/Uranus.mp3">!audio not supported :(</audio>
	</div>
	<script>document.getElementById("audio").volume = 0.4;</script>
    <script src="../js/uranus.js"></script>
<?php require ("footer.php"); ?>