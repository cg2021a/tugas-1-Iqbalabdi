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

let w1_sudutKananAtas = make_bevel(100, -0.23, 0.279, 0.055, 55);
let w1_sudutKananBawah = make_bevel(100, -0.035, 0.114, 0.065, 45);
let w1_sudutKiriAtas = make_bevel(50, -0.74, -0.14, 0.06, 180);
let w1_sudutKiriBawah = make_bevel(100, -0.555, -0.35, 0.06, 120);
let w1_tengahLuar = make_bevel(360, -0.4,-0.1, 0.06, 0);
let w1_tengahDalam = make_bevel(360, -0.4, -0.1, 0.04, 0);

//prettier-ignore
let n=1.5

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
    0.015,0.16,
    0.015,0.16,
    -0.2,  0.24,
     0,0.06,

];

//prettier-ignore
let w1_depanKiri = [
    -0.74,  -0.2,
    -0.78,  -0.18,
    -0.58,  -0.41,

    -0.74,  -0.2,
    -0.58,  -0.41,
    -0.52, -0.4,
];

let m = 1.4;
//prettier-ignore
let k2_atas = [
    //atas
    -0.38,  0,
    -0.24,  -0.28,
    0.43, 0,
    0.43, 0,
    0.365, -0.305,
    -0.24,  -0.28,
];
//prettier-ignore
let k2_alas = [
    //alas
    -0.45,  0,
    -0.5,  0.05,
    0.45, 0,
    0.45, 0,
    -0.5,  0.05,
    0.5,  0.05,

    //AA
    0.5,  0.05,
    0.482, 0.33,
    0.5, 0.3
];
//prettier-ignore
let k2_shading = [
     //atas
     -0.5,  0.05,
     0.5,  0.05,
     -0.05,  0.295,
     0.5,  0.05,
     -0.05,  0.295,
     0.482, 0.33,
];
//prettier-ignore
let k2_layar = [
    //layar
    0.45,  0.3,
    0.46,  0.08,
    -0.39, 0.075,
    -0.39, 0.075,
    0.45,  0.3,
    -0.04,  0.27,
];
