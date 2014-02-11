
if(!Detector.webgl) Detector.addGetWebGLMessage();

function modelView(objName){
	var path = 'models/';
	var suffix = '_LOW';
	var extension = '.js';

	var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, premultipliedAlpha: false });
	var s_x = window.innerWidth;
	var s_y = window.innerHeight;
	renderer.setSize(s_x, s_y);
	renderer.setClearColor(0x000000, 1.0);

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(15, s_x / s_y);
	camera.position = new THREE.Vector3(-270, 230, 290);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);

	var light1 = new THREE.DirectionalLight(0xcccccc);
	light1.position = new THREE.Vector3(0.577, 0.577, 0.577);
	scene.add(light1);

	var light2 = new THREE.DirectionalLight(0xcccccc);
	light2.position = new THREE.Vector3(-0.577, -0.577, -0.577);
	scene.add(light2);

	var ambient = new THREE.AmbientLight(0x333333);
	scene.add(ambient);

	var controls = new THREE.OrbitControls(camera);
	controls.center = new THREE.Vector3(0, 0, 0);

	function render() {
		var id = requestAnimationFrame(render);
		controls.update();
		renderer.render(scene, camera);
		document.getElementsByTagName('canvas')[0].className = id;
	};

	var loader = new THREE.JSONLoader();
	var fullpath = path + objName + suffix + extension;
	loader.load(fullpath, function(geometry) {
		var material = new THREE.MeshPhongMaterial();
		var mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		mesh.position.x = -20;
		document.body.appendChild(renderer.domElement);
		render();
	});

	window.addEventListener('resize', function() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}, false );
}
