//const { Color } = require("three");

// let canvas = document.getElementById("myCanvas");
let scene, camera, renderer; // set up the environment - // initiallize scene, camera, objects and renderer
let cube;
let cone;
let torus;
let cylinder;
let sphere;
let octa;
let icosa;
let move = 0.02;

let createCube = function () {
  let geometry = new THREE.BoxGeometry(4, 4, 2);
  const material = new THREE.MeshNormalMaterial({
    color: 0xf3ffe2,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = 8;
  cube.position.y = -6;
   cube.position.z = 2;
};

let createCone = function () {
  const geometry = new THREE.ConeGeometry(2, 3, 10);
  let material = new THREE.MeshPhysicalMaterial({
    color: 0xf3ffe2,
  });

  cone = new THREE.Mesh(geometry, material);
  scene.add(cone);
  cone.position.z = 3;
  cone.position.y = 6;
  cone.rotation.y = Math.PI / 2;
};

let createTorus = function () {
  let geometry = new THREE.TorusGeometry(1.54, 0.5, 10, 8);
  const material = new THREE.MeshPhongMaterial({
    color: "#adf542",
    flatShading: false,
    shininess: 150,
  });
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
  torus.position.z = 3;
  torus.position.x = -8;
  torus.position.y = -6;
};

let createCylinder = function () {
  const geometry = new THREE.CylinderGeometry(1.54, 1.54, 2, 50);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff00ff, // red (can also use a CSS color string here)
    flatShading: false,
    shininess: 150,
  });
  cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);

  cylinder.position.z = 3;
  cylinder.position.x = 8;
  cylinder.position.y = 5;
};

let createSphere = function () {
  let geometry = new THREE.SphereGeometry(1.54, 10, 10);
  const material = new THREE.MeshStandardMaterial({
    color: 0xda70d6,
    metalness: 0.6,
    flatShading: true,
    clearcoat: 0.5,
    wireframe: true,
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = -6;
    sphere.position.z = 5;
  scene.add(sphere);
};

let createOctahedron = function () {
  let geometry = new THREE.OctahedronGeometry(1.57);
  const material = new THREE.MeshNormalMaterial({
    color: 0xccff66, // red (can also use a CSS color string here)
    flatShading: false,
    wireframe: true,
  });
  octa = new THREE.Mesh(geometry, material);
  scene.add(octa);
  octa.position.z = 3;
  octa.position.x = -8;
  octa.position.y = 5;
};

let createIcosa = function () {
  const radius = 1.54;

  const geometry = new THREE.IcosahedronGeometry(radius);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
  });
  icosa = new THREE.Mesh(geometry, material);
  icosa.position.z = 2;
  icosa.position.y = 0;
  icosa.position.x = 0;
  scene.add(icosa);
};

let getLights = function () {
  let ambient = new THREE.AmbientLight(0xffffff, 0.7);
  let directional = new THREE.DirectionalLight(0xffffff, 1);
  let hemipshere = new THREE.HemisphereLight(0xffffff, 0x0095dd, 1);
  let point = new THREE.PointLight(0xffffff, 1, 100);
  let point2 = new THREE.PointLight(0xffffff, 1, 100);
  let spotlight = new THREE.SpotLight(0xffffff, 1, 75);
  let none = new THREE.AmbientLight(0xffffff, 0);

  ambient.position.set(20, 20, 20);
  directional.position.set(-10, 25, 25).normalize();
  hemipshere.position.set(10, 20, 30);
  point.position.set(10, 10, 10);
  point2.position.set(0, 8, 0);
  spotlight.position.set(30, 30, 30);

  const lights = [ambient, directional, hemipshere, point, spotlight, none];

  lights.forEach((obj) => scene.add(obj));

  lights.forEach((light) => {
    light.visible = false;
  });

  lights[0].visible = true;

  const getlight = document.getElementById("light");
  getlight.addEventListener("change", (x) => {
    const selected = x.target.value;

    lights.forEach((light) => {
      light.visible = false;
    });
    lights[selected].visible = true;
  });
};

let init = function () {
  // 1. create the scene
  // ...
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  // 2. create an locate the camera
  // ...
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = -1;
  camera.position.z = 18;

  // Light
  getLights();
  // 3. create an locate the object on the scene
  // ...
  createCube();
  createCone();
  createTorus();
  createCylinder();
  createIcosa();
  createOctahedron();
  createSphere();
  // 4. create the renderer
  // ...
  //renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

// main animation loop - calls 50-60 in a second.
let mainLoop = function () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cone.rotation.y += 0.01;
  cone.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.x += 0.01;
  sphere.rotation.x += -0.05;
  icosa.rotation.x += -0.05;
  icosa.rotation.y += -0.05;
  octa.rotation.z += 0.06;
  
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

///////////////////////////////////////////////
init();
mainLoop();
