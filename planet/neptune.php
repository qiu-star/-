<?php
    $pid = (string)9;
    $title = "海王星 | 星汉灿烂";
    include ("header.php");
?>
	<div>
		<audio id="audio" autoplay="autoplay" src="../content/songs/Neptune.mp3">!audio not supported :(</audio>
	</div>
    <script src="../js/neptune.js"></script>
    <script>document.getElementById("audio").volume = 0.4;</script>
<?php require ("footer.php"); ?>