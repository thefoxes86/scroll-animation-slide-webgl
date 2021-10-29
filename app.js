import * as module from "./module.js";

var materials = [];
var geometry;
var texture;
var material;
var mesh;
var scene;

// MESH
var vShader = document.getElementById("fragmentShader").innerHTML;
var fShader = document.getElementById("vertexShader").innerHTML;

// var loader = new THREE.FileLoader();
// loader.load('vertexShader.glsl',function ( data ) {vShader =  data;},);
// loader.load('fragmentShader.glsl',function ( data ) {fShader =  data;},);

// SCENE
var scene = new THREE.Scene({
  background: "black",
});

// CAMERA
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var texture1 = new THREE.Material();

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var texture = new THREE.TextureLoader();

var attributes = {
  size: { type: "f", value: null },
  alpha: { type: "f", value: [] },
  customColor: { type: "c", value: null },
};

var uniforms = {
  time: { value: 1.0 },
  resolution: { value: new THREE.Vector2() },
  texture1: { type: "t", value: texture },
};

export var delta = 0;

var geometry = new THREE.PlaneBufferGeometry(6, 3, 1, 1);
var material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vShader,
  fragmentShader: fShader,
});
var mesh = new THREE.Mesh(geometry, material);

camera.position.z = 6;

var vertexDisplacement = new Float32Array();

for (let i = 0; i < vertexDisplacement.length; i++) {
  vertexDisplacement[i] = Math.sin(i);
}

geometry.setAttribute(
  "vertexDisplacement",
  new THREE.BufferAttribute(vertexDisplacement, 1)
);

function handleImages() {
  module.img.forEach((im, i) => {
    let mat = material.clone();

    mat.uniforms.texture1.value = new THREE.Texture(im);
    mat.uniforms.texture1.value.needsUpdate = true;
    materials.push(mat);

    console.log(mat);

    let geo = new THREE.PlaneBufferGeometry(6, 3);
    let mesh = new THREE.Mesh(geo, mat);
    let group = new THREE.Group();
    group.add(mesh);
    module.groups.push(group);
    module.meshes.push(mesh);
    scene.add(group);
    mesh.position.y = 3.5 * i;
    group.rotation.y = -0.3;
    group.rotation.x = -0.2;
    group.rotation.z = -0.1;
  });
}

// RENDER
var render = function () {
  // Render
  requestAnimationFrame(render);
  renderer.setClearColor(0x000000, 0);
  renderer.render(scene, camera);
};

var init = function () {
  handleImages();
  render();
  module.raf();
};

init();
