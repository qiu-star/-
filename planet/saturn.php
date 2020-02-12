<?php
    $pid = (string)7;
    $title = "土星 | 星汉灿烂";
    $desc = "土曰镇星。";
    include ("header.php");
?>
	<div>
		<audio id="audio" autoplay="autoplay" src="../content/songs/Saturn.mp3">!audio not supported :(</audio>
	</div>
        <script src="../js/saturn.js"></script>
        <script>document.getElementById("audio").volume = 0.4;</script>
<?php require ("footer.php"); ?>