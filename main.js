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
  ...w1_tengahLuar,
  ...w1_tengahDalam,
  ...k2_atas,
  ...k2_alas,
  ...k2_shading,
  ...k2_layar,
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
  let r = 0.9;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < w1_brand.length / 2; i++) {
  let r = 0.7;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_depanKanan.length / 2; i++) {
  let r = 0.9;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_depanKiri.length / 2; i++) {
  let r = 0.9;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_atas.length / 2; i++) {
  let r = 1;
  let g = 0.6;
  let b = 0.6;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKananAtas.length / 2; i++) {
  let r = 1;
  let g = 0.6;
  let b = 0.6;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKananBawah.length / 2; i++) {
  let r = 0.9;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKiriAtas.length / 2; i++) {
  let r = 1;
  let g = 0.6;
  let b = 0.6;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_sudutKiriBawah.length / 2; i++) {
  let r = 0.9;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}

for (let i = 0; i < w1_tengahLuar.length / 2; i++) {
  let r = 0.65;
  let g = 0.63;
  let b = 0.65;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
  88, 92, 89;
}

for (let i = 0; i < w1_tengahLuar.length / 2; i++) {
  let r = 0.1;
  let g = 0.1;
  let b = 0.1;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
  88, 92, 89;
}

for (let i = 0; i < k2_atas.length / 2; i++) {
  let r = 0.9;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < k2_alas.length / 2; i++) {
  let r = 0.7;
  let g = 0.3;
  let b = 0.3;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < k2_shading.length / 2; i++) {
  let r = 1;
  let g = 0.4;
  let b = 0.4;
  color.push(r);
  color.push(g);
  color.push(b);
  color.push(1);
}
for (let i = 0; i < k2_layar.length / 2; i++) {
  let r = 1;
  let g = 0.6;
  let b = 0.6;
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
let speed = 0.0128;
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

  gl.clearColor(0.972, 0.941, 0.874, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const u_matrix = gl.getUniformLocation(shaderProgram, "u_matrix");
  // gl.uniformMatrix4fv(u_matrix, false, rightObject);

  //   gl.drawArrays(
  //     gl.TRIANGLES,
  //     (w1_depan.length + w1_brand.length + w1_kanan.length + w1_atas.length) / 2,
  //     (k2_atas.length + k2_alas.length + k2_shading.length + k2_layar.length) / 2
  //   );

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
      w1_tengahLuar.length +
      w1_tengahDalam.length) /
      2
  );
  requestAnimationFrame(drawScene);
}

drawScene();