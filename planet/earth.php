<?php
    $pid = (string)4;
    $title = "地球丨星汉灿烂";
    include ("header.php");
?>
    <div>
        <audio id="audio" autoplay="autoplay" src="../content/songs/earth.mp3">!audio not supported :(</audio>
    </div>

    <script id="vertexShader" type="x-shader/x-vertex">
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;

        void main(){
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    </script>
    <script>document.getElementById("audio").volume = 0.4;</script>
    <script id="fragmentShader" type="x-shader/x-fragment">
        uniform vec3 glowColor;
        varying float intensity;

        void main(){
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
        }
    </script>
    <script src="../js/earth.js"></script>

<?php require ("footer.php"); ?>
