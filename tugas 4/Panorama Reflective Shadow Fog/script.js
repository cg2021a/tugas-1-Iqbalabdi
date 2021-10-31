/// <reference types="THREE" />
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js";

let scene, camera, renderer;

function main() {
  //Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color("lightGray");
  scene.fog = new THREE.Fog("lightblue", 2, 25);

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(1, 0, 0);

  //lights
  const ambientLight = new THREE.AmbientLight("white", 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 0.6);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  //Panorama
  const texture = new THREE.TextureLoader().load("images/Evening_in_Park.jpg");
  const geometry = new THREE.SphereGeometry(7, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  //Plane
  const planeTexture = new THREE.TextureLoader().load("images/checker.jpg");
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4),
    new THREE.MeshPhongMaterial({
      map: planeTexture,
      side: THREE.DoubleSide,
    })
  );
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1;
  scene.add(plane);

  //Box
  const boxtexture = new THREE.TextureLoader().load("images/pyramid.jpg");
  const box = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const boxmaterial = new THREE.MeshPhongMaterial({
    map: boxtexture,
  });
  const cube = new THREE.Mesh(box, boxmaterial);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(1.5, 0, 0);
  scene.add(cube);

  //Cube Camera
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });

  let sphereCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
  sphereCamera.position.set(0, -5, 0);
  scene.add(sphereCamera);

  //make reflective balls
  {
    let sphereMaterial = new THREE.MeshBasicMaterial({
      envMap: sphereCamera.renderTarget,
    });
    let sphereGeo = new THREE.SphereGeometry(0.5, 36, 36);
    const sphereRef = new THREE.Mesh(sphereGeo, sphereMaterial);
    scene.add(sphereRef);
  }

  renderer = new THREE.WebGLRenderer();
  //Orbit
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  // Render
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);

  let animation = function () {
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    renderer.render(scene, camera);
    sphereCamera.updateCubeMap(renderer, scene);
    requestAnimationFrame(animation);
  };
  animation();
};
main();
