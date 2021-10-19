let scene, camera, renderer, controls, rayCast;

let randomInRange = function (from, to) {
  let x = Math.random() * (to - from);
  return x + from;
};
//create object
let createSphere = function () {
  let geometry = new THREE.SphereGeometry(3, 50, 20);
  const colorList = [0xfc0303, 0x68de0d, 0x0dc2de, 0x9910de];
  let color = colorList[Math.floor(randomInRange(0, 4))];
  let emissive = color + 0.05;

  let material = new THREE.MeshPhongMaterial({
    color: color,
    transparent: true,
  });
  let sphere = new THREE.Mesh(geometry, material);

  // random spawn object
  sphere.position.x = randomInRange(-30, 30);
  sphere.position.y = randomInRange(-30, 30);
  sphere.position.z = randomInRange(-30, 30);
  scene.add(sphere);
};

let elementScore = document.getElementById("score");
let elementHighScore = document.getElementById("highscore");
let scoreCorrect = 1;
let currentScore = 0;
let highScore = 0;
let speed = 2000;
const baseSpeed = 2500;

let selectedObject = [];
let originalColors = [];

let onMouseClick = function (e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.z = 1;

  rayCast.setFromCamera(mouse, camera);

  let intersects = rayCast.intersectObjects(scene.children, false);
  intersects.forEach((obj) => (obj.object.material.opacity = 0.5));

  if (intersects.length == 0) return;
  else {
    selectedObject.push(intersects);
    originalColors.push(intersects[0].object.material.color.getHex());
    console.log(intersects);
    console.log(originalColors);
    console.log(selectedObject);
    //check object picked
    if (selectedObject.length > 1) {
      if (
        selectedObject[0][0].object.uuid === selectedObject[1][0].object.uuid
      ) {
        selectedObject[0][0].object.rotation.x = 0;
        selectedObject[0][0].object.rotation.y = 0;
      } else if (originalColors[0] == originalColors[1]) {
        selectedObject.forEach((object) => {
          object[0].object.geometry.dispose();
          object[0].object.material.dispose();
          scene.remove(object[0].object);
          renderer.renderLists.dispose();
        });

        currentScore += scoreCorrect;
        speed += 10;
        console.log(currentScore);
        elementScore.innerHTML = currentScore;
      } else {
        selectedObject[0][0].object.material.emissive.setHex(originalColors[0]);
        selectedObject[0][0].object.rotation.x = 0;
        selectedObject[0][0].object.rotation.y = 0;
        console.log(currentScore);
        elementScore.innerHTML = currentScore;
      }

      selectedObject = [];
      originalColors = [];
    } else if (selectedObject.length > 2) {
      selectedObject = [];
      originalColors = [];
      return;
    }
  }
};
//create object with limit
let generateSphere = function () {
  if (scene.children.length >= 30) {
    speed = baseSpeed;
    if (currentScore > highScore) {
      highScore = currentScore;
      elementHighScore.innerHTML = highScore;
    }
    currentScore = 0;
    elementScore.innerHTML = currentScore;
  } else {
    speed -= (5 / 100) * speed;
    createSphere();
  }
  setTimeout(generateSphere, speed);
};

// set up the environment -
// initiallize scene, camera, objects and renderer
let init = function () {
  // 1. create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  // 2. create an locate the camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 70;

  // 3. create an locate the object on the scene
  createSphere();
  generateSphere();

  //create lighting
  let lightAmbientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(lightAmbientLight);
  lightAmbientLight.position.set(50, 50, -50);

  let lightDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(lightDirectionalLight);
  lightDirectionalLight.position.set(50, -50, 50);

  let lightPointLight = new THREE.PointLight(0xffffff, 0.5);
  lightPointLight.position.set(50, 50, 50);
  scene.add(lightPointLight);

  // 4. create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("click", onMouseClick, false);

  //controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = mouse.y = -1;
};

// main animation loop - calls 50-60 in a second.
let mainLoop = function () {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

///////////////////////////////////////////////
init();
mainLoop();
