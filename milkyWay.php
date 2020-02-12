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

    <img src="images/mask.png" id="mask-bg"/>
    <div>
        <img src="images/logo.png" class="logo"/>
        <div class="logo-txt">星汉灿烂，若出其里</div>
    </div>
    <div  id="scroll-div" style='position:absolute;text-align:left;top:100px;font-family:Arial;color:white;outline:none;background:none;border:none;'>
        <div class="scroll" id="scroll" >
            <div class="bar" id="bar">

            </div>
            <div class="mask" id="mask"></div>
        </div>
        <p id="percent" style="color: rgba(255,255,255,0);">0</p>
        <audio id="audio" autoplay="autoplay" src="./content/songs/yin_he_xi.mp3">!audio not supported :(</audio>
    </div>

    <script>
        $('#scroll').css('height',window.innerHeight*0.8);
        $('#scroll').css('top',-window.innerHeight*0.15);
        document.getElementById("audio").volume = 0.4;
        var scroll = document.getElementById('scroll');
        var scroll_div = document.getElementById('scroll-div');
        scroll_div.style.left = window.innerWidth-200+"px";
        var bar = document.getElementById('bar');
        var mask = document.getElementById('mask');
        var ptxt = document.getElementById('percent');
        var barleft = 0;
        bar.onmousedown = function(event){
            var event = event || window.event;
            var leftVal = event.clientY - this.offsetTop;
            var that = this;
            // 拖动一定写到 down 里面才可以
            document.onmousemove = function(event){
                var event = event || window.event;
                barleft = event.clientY - leftVal;
                if(barleft < 0)
                    barleft = 0;
                else if(barleft > scroll.offsetHeight - bar.offsetHeight)
                    barleft = scroll.offsetHeight - bar.offsetHeight;
                // mask.style.height = barleft +'px' ;
                that.style.top = barleft + "px";
                ptxt.innerHTML = (barleft/(scroll.offsetHeight-bar.offsetHeight) ).toString();

                var bgmask = document.getElementById('mask-bg');
                bgmask.style.opacity=barleft/(scroll.offsetHeight-bar.offsetHeight);

                var temp = parseInt(barleft/(scroll.offsetHeight-bar.offsetHeight)*100);
                if(temp == 100)
                {
                    window.location.href="solarsystem.php"
                }
                //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }

        }
        document.onmouseup = function(){
            document.onmousemove = null; //弹起鼠标不做任何操作
        }
    </script>
</body>
</html>