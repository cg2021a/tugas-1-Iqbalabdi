function make_bevel(degree, px = 0, py = 0, radius = 1, start_degree = 0) {
  let points = [];

  for (let i = 0; i <= degree; i++) {
    let j = ((i + start_degree) * Math.PI) / 180;
    let k = ((i + start_degree + 1) * Math.PI) / 180;

    let vert1 = [Math.sin(j) * radius + px, Math.cos(j) * radius + py];

    let vert2 = [px, py];
    let vert3 = [Math.sin(k) * radius + px, Math.cos(k) * radius + py];

    points = points.concat(vert1);
    points = points.concat(vert2);
    points = points.concat(vert3);
  }

  return points;
}

let w1_sudutKananAtas = make_bevel(90, -0.23, 0.279, 0.05, 55);
let w1_sudutKananBawah = make_bevel(90, -0.04, 0.114, 0.065, 55);
let w1_sudutKiriAtas = make_bevel(50, -0.74, -0.14, 0.06, 180);
let w1_sudutKiriBawah = make_bevel(100, -0.55, -0.37, 0.04, 130);
let w1_kameraLuar = make_bevel(360, -0.4, -0.1, 0.06, 0);
let w1_kameraTengah = make_bevel(360, -0.4, -0.1, 0.04, 0);
let w1_kamerahDalam = make_bevel(360, -0.4, -0.1, 0.02, 0);
let w2_atas = make_bevel(90, 0.22, 0.3, 0.3, 0);
let w2_bawah = make_bevel(90, 0.22, -0.46, 0.3, 90);
let w2_kameraAtas = make_bevel(90, 0.52, 0.02, 0.04, 0);
let w2_kameraBawah = make_bevel(90, 0.52, -0.14, 0.04, 90);

//prettier-ignore

//prettier-ignore
let w1_depan = [
    //depan
    -0.74,  -0.2,
    -0.2,  0.24,
    -0.52, -0.4,
    -0.52, -0.4,
    -0.2,  0.24,
    0,0.06,
];

//prettier-ignore
let w1_brand = [
    //atas
    -0.44, -0.32,
    -0.36,-0.36,
    -0.08,-0.005,
    -0.08,-0.005,
    -0.36,-0.36,
    -0.06, -0.11,
];

//prettier-ignore
let w1_atas = [
  //key1
  -0.74, -0.2,
  -0.74, -0.14,
  -0.2, 0.3,
  -0.2, 0.3,
  -0.74,  -0.2,
  -0.2,  0.24,
];

//prettier-ignore
let w1_depanKanan = [
    -0.2,  0.24,
    -0.185, 0.31,
    0.015,0.15,
    0.015,0.15,
    -0.2,  0.24,
     0,0.06,

];

//prettier-ignore
let w1_depanKiri = [
    -0.74,  -0.2,
    -0.79,  -0.18,
    -0.57,  -0.412,

    -0.74,  -0.2,
    -0.57,  -0.412,
    -0.52, -0.4,
];

// let m = 1.4;
//prettier-ignore
let w2_depan = [
    //atas
    0.22,  0.3,
    0.52,  0.3,
    0.52, -0.46,
    0.52, -0.46,
    0.22,  0.3,
    0.22, -0.46

];

//prettier-ignore
let w2_kamera = [
    //layar
    0.52, 0.02,
    0.56, 0.02,
    0.56, -0.14,
    0.56, -0.14,
    0.52, 0.02,
    0.52,-0.14,
];

let w2_kameraDepan = [
  0.56, 0.01, 0.58, 0.01, 0.58, -0.13, 0.58, -0.13, 0.56, 0.01, 0.56, -0.13,
];
let w2_kabel1 = [
  0.22, 0.015, 0.19, 0.015, 0.19, -0.11, 0.19, -0.11, 0.22, 0.015, 0.22, -0.11,
];

let w2_kabel2 = [0.19, 0, 0.05, 0, 0.05, -0.1, 0.05, -0.1, 0.19, 0, 0.19, -0.1];
