<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
    <title><?php echo ($title);?></title>
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.5, maximum-scale=1.5">
    <script src="../js/vendor/jquery-1.7.2.min.js"></script>
    <script>
        $(window).load(function(){
            $('#preloader').hide(1000);
        });
    </script>
    <script src="../js/vendor/three.min.js"></script>
    <script src="../js/vendor/orbitcontrols.min.js"></script>
    <link rel="stylesheet" href="../stylesheets/planetmain.css">
    <link rel="stylesheet" href="../stylesheets/main.css">
    <script src="../js/function.js"></script>
</head>

<body id = "bg">
<div id="preloader">
</div>


<?php
    $con = mysqli_connect("localhost","root","","universe");//kali是php7,而我自己的服务器是php5,有可能还要改成php5的格式
    mysqli_query($con,"set names 'utf8'");
    if(!$con)
    {
    	die('Could not connect');
    }
    $query = "select pname, pdesc, pdesc_detail from planet where id = ".$pid;
    $result = mysqli_query($con,$query);
    while($row=mysqli_fetch_array($result))
    {
	    $pname = $row['pname'];
    	$title = $pname." | 星汉灿烂";
	    $desc = $row['pdesc'];
	    $desc_detail = $row['pdesc_detail'];
    }
?>

<div class="info-container">
    <h1><?php echo $pname;?></h1>
    <p><?php echo $desc_detail;?></p>
    <ul id = "vlist">
    <?php
        $query = "select vsrc_name, vsrc_disc from pvideo where pid = ".$pid;
        $result = mysqli_query($con,$query);
        while($row=mysqli_fetch_array($result))
        {
            echo "<li class=\"vli\"><a class = \"vitem\" onclick=\"playVideo('".$row['vsrc_name']."')\">".$row['vsrc_disc']."</a></li>";
        }
    ?>
    </ul>
    <button id="zoom">关闭</button>
</div>