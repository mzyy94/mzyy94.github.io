if(!Detector.webgl) Detector.addGetWebGLMessage();

      var renderer = new THREE.WebGLRenderer({ antialias:true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColorHex(0x000000, 1);
      document.body.appendChild(renderer.domElement);

      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera(
        15, window.innerWidth / window.innerHeight);
      camera.position = new THREE.Vector3(0, 0, 8);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);

      var light = new THREE.DirectionalLight(0xcccccc);
      light.position = new THREE.Vector3(0.577, 0.577, 0.577);
      var ambient = new THREE.AmbientLight(0x333333);
      scene.add(light);
      scene.add(ambient);

      var geometry = new THREE.SphereGeometry(1, 32, 16);
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
        map: THREE.ImageUtils.loadTexture('earth.jpg') });
      var mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // カメラコントロールを作成
      var controls = new THREE.OrbitControls(camera);
      controls.center = new THREE.Vector3(0, 0, 0);

      var baseTime = +new Date;
      function render() {
        requestAnimationFrame(render);

        // カメラの状態を更新
        controls.update();

		console.log(camera.position);

        mesh.rotation.y = 0.3 * (+new Date - baseTime) / 1000;
        renderer.render(scene, camera);
      };
      render();

      window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }, false );
