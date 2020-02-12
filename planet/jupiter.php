<?php
    $pid = (string)6;
    $title = "木星 | 星汉灿烂";
    include ("header.php");
?>
	<div>
		<audio id="audio" autoplay="autoplay" src="../content/songs/Jupiter.mp3">!audio not supported :(</audio>
	</div>
    <script>document.getElementById("audio").volume = 0.4;</script>

    <script src="../js/jupiter.js"></script>
<?php require ("footer.php"); ?>