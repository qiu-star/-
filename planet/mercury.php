<?php
    $pid = (string)2;
    $title = "水星 | 星汉灿烂";
    include ("header.php");
?>
	<div>
		<audio id="audio" autoplay="autoplay" src="../content/songs/Mercury.mp3">!audio not supported :(</audio>
	</div>
    <script>document.getElementById("audio").volume = 0.4;</script>
    <script src="../js/mercury.js"></script>
<?php require ("footer.php"); ?>