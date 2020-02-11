<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>星汉灿烂</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="stylesheets/main.css">
  <script src="js/vendor/jquery-1.7.2.min.js" type="text/javascript"></script>
</head>

<body>

<script id='vShader' type='x-vertex/x-shader'>
    uniform float size;
    uniform float t;
    uniform float z;
    uniform float pixelRatio;

    varying vec3 vPosition;
    varying vec3 mPosition;//modified position
    varying float gas;

    float a,b=0.;

    void main(){

    vPosition=position;

    a=length(position);
    if(t>0.)b=max(0.,(cos(a/20.-t*.02)-.99)*3./a);
    if(z>0.)b=max(0.,cos(a/40.-z*.01+2.));
    mPosition=position*(1.+b*4.);
    vec4 mvPosition=modelViewMatrix*vec4(mPosition,1.);
    gl_Position=mvPosition*projectionMatrix;

    gas=max(.0,sin(-a/20.));
    gl_PointSize=pixelRatio*size*(1.+gas*2.)/length(mvPosition.xyz);

    }
</script>

<script id='fShader' type='x-fragment/x-shader'>
    uniform float z;

    varying vec3 vPosition;
    varying vec3 mPosition;
    varying float gas;

    void main(){

    float a=distance(mPosition,vPosition);
    if(a>0.)a=1.;

    float b=max(.32,.0065*length(vPosition));

    float c=distance(gl_PointCoord,vec2(.5));
    float starlook=-(c-.5)*1.2*gas;
    float gaslook=(1.-gas)/(c*10.);
    float texture=starlook+gaslook;

    gl_FragColor=vec4(.138,.28,b,1.)*texture*(1.-a*.35);
    if(z>0.)gl_FragColor*=cos(1.57*z/322.)*(1.-.001*length(mPosition));
    }
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js"></script>
<script src="js/milkyWay.js"></script>

<script src="js/ProgressBarWars.js"></script>
<div style='position:absolute;top:0px;width:100%'>
    <div class="progress" id="windu"></div>
    <script>
        var wd=$("#windu").ProgressBarWars({porcentaje:80,estilo:"windu"});
    </script>
<input type="button" value="windu 50%" onclick="wd.mover(50);">
</div>
<script>
    $("#windu").css("height",window.innerHeight-80);
</script>

<img src="images/mask.png" id="mask-bg"/>
<div>
    <img src="images/logo.png" class="logo"/>
    <div class="logo-txt">星汉灿烂，若出其里</div>
</div>

</body>
</html>