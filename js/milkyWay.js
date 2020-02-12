THREE.TrackballControls = function ( object, domElement ) {

    var _this = this;
    this.object = object;
    this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.maxDistance = Infinity;
    // internals
    this.target = new THREE.Vector3();

    this.update = function () {
        _this.object.lookAt( _this.target );
    };
};

var t=0,z=0;

setScene();
animate();
/** FUNCTIONS **/

//galaxy generator

function newGalaxy (_n, _axis1, _axis2, _armsAngle, _bulbSize, _ellipticity){

    //NOTE : this function misses a better implementation of galactic bulbs.
    //It's not visible with additive blending but the bulb does not have a correct shape yet.
    //(haven't yet found a function that provides the correct z-profile of the 'ellipticity' degree of the different Hubble galaxies'types)
    //see 'ellipticity'

    //number of particles.
    var n=(typeof _n === 'undefined')?10000:_n;

    //to get 'arms', the main galaxy shape has to be an ellipse, i.e. axis1/axis2 must raise over a certain %
    //otherwise, because of the 'ellipticity' z-profile problem, you get a potatoe
    var axis1=(typeof _axis1 === 'undefined')?(60+Math.random()*20):_axis1;
    var axis2=(typeof _axis2 === 'undefined')?(axis1+20+Math.random()*40):_axis2;
    //make sure axis1 is the biggest (excentricity equation fails if they are inverted), and allow the coder no to care about axis order
    var maja,mina;
    axis1>axis2?(maja=axis1,mina=axis2):
        axis1==axis2?(maja=axis1+1,mina=axis2):(maja=axis2,mina=axis1);

    //radians from the center to the end of each arm, proposed value range : between 3 and 13
    var armsAngle=(typeof _armsAngle === 'undefined')?((Math.random()*2-1)>0?1:-1)*12+3:_armsAngle;

    //core proportion in the (x,y) plane, between 0 and 1, proposed value range : between .1 and .8
    var bulbSize=(typeof _bulbSize === 'undefined')?Math.random()*.6:_bulbSize>1?1:_bulbSize<0?0:_bulbSize;

    //'ellipticity' : not found a better word to name the degree of 'elliptic' Hubble type.
    //'ellipticity' is what is mainly responsible of the z-profile in this experiment.
    //Range : between 0 and 1. Proposed : .2 to .4
    //TODO: implement string handling (or value from spacename ?) to create Hubble-class galaxy ala 'SBb'...
    var ellipticity=(typeof _ellipticity === 'undefined')?.2+Math.random()*.2:_ellipticity>1?1:_ellipticity<0?0:_ellipticity;

    var stars=[];

    for(var i=0;i<n;i++){

        var dist=Math.random();
        var angle=(dist-bulbSize)*armsAngle;

        //ellipse parameters
        var a=maja*dist;
        var b=mina*dist;
        var e=Math.sqrt(a*a-b*b)/a;
        var phi=ellipticity*Math.PI/2*(1-dist)*(Math.random()*2-1);

        //create point on the ellipse with polar coordinates
        //1. random angle from the center
        var theta=Math.random()*Math.PI*2;
        //2. deduce radius from theta in polar coordinates, from the CENTER of an ellipse, plus variations
        var radius=Math.sqrt(b*b/(1-e*e*Math.pow(Math.cos(theta),2)))*(1+Math.random()*.1);
        //3. then shift theta with the angle offset to get arms, outside the bulb
        if(dist>bulbSize)theta+=angle;

        //convert to cartesian coordinates
        stars.push({
            x:Math.cos(phi)*Math.cos(theta)*radius,
            y:Math.cos(phi)*Math.sin(theta)*radius,
            z:Math.sin(phi)*radius
        });
    }

    return stars;

}

//threejs functions
function setScene(){
    scene=new THREE.Scene();

    camera=new THREE.PerspectiveCamera(31,innerWidth/innerHeight,.5,1500);
    camera.position.set(-20,-155,90);

    renderer=new THREE.WebGLRenderer();
    renderer.setSize(innerWidth,innerHeight);

    renderer.setClearColor(0x0000000);
    document.body.appendChild(renderer.domElement);

    controls=new THREE.TrackballControls(camera,renderer.domElement);
    controls.rotateSpeed=20;
    controls.dynamicDampingFactor = .5;
    setGalaxy();
}

function setGalaxy(){
    galaxyMaterial=new THREE.ShaderMaterial({
        vertexShader:document.getElementById('vShader').textContent,
        fragmentShader:document.getElementById('fShader').textContent,
        uniforms:{
            size:{type:'f',value:3.3},
            t:{type:"f",value:0},
            z:{type:"f",value:0},
            pixelRatio:{type:"f",value:innerHeight}
        },
        transparent:true,
        depthTest:false,
        blending:THREE.AdditiveBlending
    });
    var stars1=new THREE.Geometry();
    stars1.vertices=newGalaxy();
    galaxy=new THREE.Points(stars1,galaxyMaterial);
    scene.add(galaxy);
}

function animate(){
    galaxyMaterial.uniforms.t.value=t;
    galaxyMaterial.uniforms.z.value=z;
    requestAnimationFrame(animate);

    //拖拽进度条进入下一个界面
    var ptxt = document.getElementById('percent');
    var num = parseFloat(ptxt.innerText);
    camera.position.z = 90-num*10;
    camera.position.y = -155+num*100;

    renderer.render(scene,camera);
    scene.rotation.z+=.0005;
    controls.update();
}
