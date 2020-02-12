/*--------------------------------------------------------------------------------------

            STANDING ON THE SHOULDERS OF GIANTS
            
            This page is absolutely and completely thanks
            only to Mr.Doob and TheGameMaker, both of 
            whom supplied the resources to lay a very large
            and mostly complete foundation for what you 
            see here.
            
            Thank you for your contributions to WebGL and 
            the web in general!

----------------------------------------------------------------------------------------*/

var container;

var clock = new THREE.Clock();

var camera, scene, renderer, composer, zoomed = false;

var uniforms, material, sunMesh;

var width = window.innerWidth || 2;
var height = window.innerHeight || 2;

var windowHalfX = width / 2;
var windowHalfY = height / 2;

init();
animate();

function init() {

	container = document.getElementById( 'container' );

	//camera
	camera = new THREE.PerspectiveCamera( 35, windowHalfX / windowHalfY, 1, 3000 );
	camera.position.z = 6.2;
	camera.position.y = -0.15;

	scene = new THREE.Scene();

	uniforms = {

		fogDensity: { type: "f", value: 0.17 },
		fogColor: { type: "v3", value: new THREE.Vector3( 0, 0, 0 ) },
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() },
		uvScale: { type: "v2", value: new THREE.Vector2( 3.0, 1.0 ) },
		texture1: { type: "t", value: THREE.ImageUtils.loadTexture( "../images/cloud.png" ) },
		texture2: { type: "t", value: THREE.ImageUtils.loadTexture( "../images/lavatile.jpg" ) }

	};

	uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
	uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;

	material = new THREE.ShaderMaterial( {

		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent

	} );

	//SUN
	sunMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material);
	sunMesh.rotation.x = 0.3;
	scene.add( sunMesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	container.appendChild( renderer.domElement );
	renderer.autoClear = false;

	//STARFIELD
	var imagePrefix = "../images/";
	var directions = ["s_px", "s_nx", "s_py", "s_ny", "s_pz", "s_nz"];
	var imageSuffix = ".jpg";
	var skyGeometry = new THREE.CubeGeometry(2048, 2048, 2048);
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push(new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture(imagePrefix + directions[i] + imageSuffix),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
	var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
	scene.add(skyBox);


	//EFFECTS
	var renderModel = new THREE.RenderPass( scene, camera );
	var effectBloom = new THREE.BloomPass( 1.25 );
	var effectFilm = new THREE.FilmPass( 0.35, 0.95, 2048, false );

	effectFilm.renderToScreen = true;

	composer = new THREE.EffectComposer( renderer );

	composer.addPass( renderModel );
	composer.addPass( effectBloom );
	composer.addPass( effectFilm );

	//

	onWindowResize();

	window.addEventListener( 'resize', onWindowResize, false );
	$("#zoom").on('click', function(){
	  if (zoomed == false){
		zoomed = true;
		$('.info-container').animate({'opacity': 0}, 400);
	  }
	});

	//controls
	controls = new THREE.OrbitControls( camera, renderer.domElement);
	controls.addEventListener( 'change', render );

}

function onWindowResize( event ) {

	uniforms.resolution.value.x = window.innerWidth;
	uniforms.resolution.value.y = window.innerHeight;

	renderer.setSize( window.innerWidth, window.innerHeight );

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	composer.reset();

}

//

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	var delta = 5 * clock.getDelta();
	if (camera.position.z > 4){
		if (zoomed){
			camera.position.z -= 0.03;
		}
	}

	uniforms.time.value += 0.2 * delta;

	renderer.clear();
	composer.render( 0.01 );

}