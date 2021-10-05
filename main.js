function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

let canvas = document.getElementById("myCanvas");
let gl = canvas.getContext("experimental-webgl");

let vertices = [
  ...w1_depan,
  ...w1_brand,
  ...w1_depanKanan,
  ...w1_depanKiri,
  ...w1_atas,
  ...w1_sudutKananAtas,
  ...w1_sudutKananBawah,
  ...w1_sudutKiriAtas,
  ...w1_sudutKiriBawah,
  ...w1_kameraLuar,
  ...w1_kameraTengah,
  ...w1_kamerahDalam,
  ...w2_depan,
  ...w2_atas,
  ...w2_bawah,
  ...w2_kamera,
  ...w2_kameraAtas,
  ...w2_kameraBawah,
  ...w2_kameraDepan,
  ...w2_kabel1,
  ...w2_kabel2,
];

let vertexShaderCode = `
	attribute vec2 a_position;
	attribute vec4 a_color;
	varying vec4 v_color;
	uniform mat4 u_matrix;

	void main() {
		gl_Position = u_matrix * vec4(a_position, 0, 1.65);
		v_color = a_color;
	}
`;
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);

let fragmentShaderCode = `
	precision mediump float;
	varying vec4 v_color;

	void main() {
		gl_FragColor = v_color;
	}
`;
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

let coords = gl.getAttribLocation(shaderProgram, "a_position");
var colorLocation = gl.getAttribLocation(shaderProgram, "a_color");

var color = [];

for (let i = 0; i < w1_depan.length / 2; i++) {
  let r = 0.78;
  let g = 0.78;
  let b = 0.78;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < w1_brand.length / 2; i++) {
  let r = 0.81;
  let g = 0.84;
  let b = 0.84;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_depanKanan.length / 2; i++) {
  let r = 0.57;
  let g = 0.59;
  let b = 0.59;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_depanKiri.length / 2; i++) {
  let r = 0.57;
  let g = 0.59;
  let b = 0.59;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_atas.length / 2; i++) {
  let r = 0.478;
  let g = 0.486;
  let b = 0.486;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKananAtas.length / 2; i++) {
  let r = 0.478;
  let g = 0.486;
  let b = 0.486;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKananBawah.length / 2; i++) {
  let r = 0.57;
  let g = 0.59;
  let b = 0.59;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKiriAtas.length / 2; i++) {
  let r = 0.478;
  let g = 0.486;
  let b = 0.486;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKiriBawah.length / 2; i++) {
  let r = 0.57;
  let g = 0.59;
  let b = 0.59;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_kameraLuar.length / 2; i++) {
  let r = 0.65;
  let g = 0.63;
  let b = 0.65;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
  88, 92, 89;
}

for (let i = 0; i < w1_kameraTengah.length / 2; i++) {
  let r = 0.5;
  let g = 0.5;
  let b = 0.5;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
  88, 92, 89;
}

for (let i = 0; i < w1_kamerahDalam.length / 2; i++) {
  let r = 0.1;
  let g = 0.1;
  let b = 0.1;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
  88, 92, 89;
}

for (let i = 0; i < w2_depan.length / 2; i++) {
  let r = 0.478;
  let g = 0.486;
  let b = 0.486;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < w2_atas.length / 2; i++) {
  let r = 0.478;
  let g = 0.486;
  let b = 0.486;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < w2_bawah.length / 2; i++) {
  let r = 0.478;
  let g = 0.486;
  let b = 0.486;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < w2_kamera.length / 2; i++) {
  let r = 0.65;
  let g = 0.63;
  let b = 0.65;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w2_kameraAtas.length / 2; i++) {
  let r = 0.65;
  let g = 0.63;
  let b = 0.65;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w2_kameraBawah.length / 2; i++) {
  let r = 0.65;
  let g = 0.63;
  let b = 0.65;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w2_kameraDepan.length / 2; i++) {
  let r = 0.5;
  let g = 0.5;
  let b = 0.5;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w2_kabel1.length / 2; i++) {
  let r = 0.65;
  let g = 0.63;
  let b = 0.65;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w2_kabel2.length / 2; i++) {
  let r = 0.65;
  let g = 0.63;
  let b = 0.65;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

let colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colorLocation);

let vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coords);

let positionY = 0;
let speed = 0.0151;
function drawScene() {
  positionY >= 0.8 ? (speed = -speed) : (speed = speed);
  positionY <= -0.8 ? (speed = -speed) : (speed = speed);
  positionY += speed;
  gl.useProgram(shaderProgram);
  //prettier-ignore
  const leftObject = [
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		-0.4, 0.0, 0.0, 1.0,
	]
  //prettier-ignore
  const rightObject = [
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.4, positionY, 0.0, 1.0,
	]

  gl.clearColor(0.9, 0.941, 0.874, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const u_matrix = gl.getUniformLocation(shaderProgram, "u_matrix");
  gl.uniformMatrix4fv(u_matrix, false, rightObject);

  gl.drawArrays(
    gl.TRIANGLES,
    (w1_depan.length +
      w1_depanKanan.length +
      w1_brand.length +
      w1_depanKiri.length +
      w1_atas.length +
      w1_sudutKananAtas.length +
      w1_sudutKananBawah.length +
      w1_sudutKiriAtas.length +
      w1_sudutKiriBawah.length +
      w1_kameraLuar.length +
      w1_kameraTengah.length +
      w1_kamerahDalam.length) /
      2,
    (w2_depan.length +
      w2_atas.length +
      w2_bawah.length +
      w2_kamera.length +
      w2_kameraAtas.length +
      w2_kameraBawah.length +
      w2_kameraDepan.length +
      w2_kabel1.length +
      w2_kabel2.length) /
      2
  );

  gl.uniformMatrix4fv(u_matrix, false, leftObject);
  gl.drawArrays(
    gl.TRIANGLES,
    0,
    (w1_depan.length +
      w1_depanKanan.length +
      w1_brand.length +
      w1_depanKiri.length +
      w1_atas.length +
      w1_sudutKananAtas.length +
      w1_sudutKananBawah.length +
      w1_sudutKiriAtas.length +
      w1_sudutKiriBawah.length +
      w1_kameraLuar.length +
      w1_kameraTengah.length +
      w1_kamerahDalam.length) /
      2
  );
  requestAnimationFrame(drawScene);
}

drawScene();
