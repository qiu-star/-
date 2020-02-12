<?php
    $pid = (string)5;
    $title = "火星 | 星汉灿烂";
    include ("header.php");
?>
	<div>
        <audio id="audio" autoplay="autoplay" src="../content/songs/bgmusic.mp3">!audio not supported :(</audio>
    </div>
    <script>document.getElementById("audio").volume = 0.4;</script>

    <script src="../js/mars.js"></script>
<?php require ("footer.php"); ?>