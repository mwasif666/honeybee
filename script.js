import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "https://cdn.skypack.dev/gsap";

// Camera
const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 13;

// Scene
const scene = new THREE.Scene();
let bee;
let mixer;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1.3));
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Load Model
const loader = new GLTFLoader();
loader.load(
  "bee.glb",
  function (gltf) {
    bee = gltf.scene;
    bee.scale.set(0.03, 0.03, 0.03);
    scene.add(bee);

    mixer = new THREE.AnimationMixer(bee);
    if (gltf.animations.length > 0) {
      mixer.clipAction(gltf.animations[0]).play();
    }

    modelMove();
  },
  (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
  (error) => console.error("Error loading model:", error)
);

// Animation Loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (mixer) mixer.update(0.02);
};
animate();

// 🔹 Responsive Positions — Desktop, Tablet, Mobile alag-alag
const responsivePositions = {
  one: {
    desktop: { pos: { x: 1.5, y: -0.1, z: 0 }, rot: { x: 5, y: -1, z: 5 } },
    tablet: { pos: { x: 1.2, y: -0.1, z: 0 }, rot: { x: 4, y: -0.8, z: 4 } },
    mobile: { pos: { x: 0.3, y: 0.5, z: -5 }, rot: { x: 3, y: 4.5, z: 3 } },
  },
  two: {
    desktop: { pos: { x: 1, y: 0, z: -1 }, rot: { x: 0.5, y: -2, z: 0 } },
    tablet: { pos: { x: 0.8, y: -0.2, z: -1 }, rot: { x: 0.4, y: -1.5, z: 0 } },
    mobile: {
      pos: { x: 0.3, y: 0.5, z: -5 },
      rot: { x: 0.2, y: -0.5, z: -0.2 },
    },
  },
  three: {
    desktop: { pos: { x: -1, y: -1, z: -5 }, rot: { x: 0, y: 0.5, z: 0.2 } },
    tablet: { pos: { x: -0.8, y: -0.8, z: -4 }, rot: { x: 0, y: 0.4, z: 0.2 } },
    mobile: { pos: { x: -0.5, y: -0.6, z: -3 }, rot: { x: 0, y: 0.3, z: 0.1 } },
  },
  four: {
    desktop: {
      pos: { x: 0.45, y: -2, z: -10 },
      rot: { x: 0.2, y: -0.5, z: -0.2 },
    },
    tablet: {
      pos: { x: 0.3, y: -1.5, z: -8 },
      rot: { x: 0.2, y: -0.4, z: -0.2 },
    },
    mobile: {
      pos: { x: 0.2, y: -1.2, z: -6 },
      rot: { x: 0.2, y: -0.3, z: -0.1 },
    },
  },
  five: {
    desktop: { pos: { x: -1, y: -1, z: -5 }, rot: { x: 0, y: 0.5, z: 0.2 } },
    tablet: { pos: { x: -0.8, y: -0.8, z: -4 }, rot: { x: 0, y: 0.4, z: 0.2 } },
    mobile: { pos: { x: -0.5, y: -0.6, z: -3 }, rot: { x: 0, y: 0.3, z: 0.1 } },
  },
  six: {
    desktop: {
      pos: { x: 0.45, y: -2, z: -10 },
      rot: { x: 0.2, y: -0.5, z: -0.2 },
    },
    tablet: {
      pos: { x: 0.3, y: -1.5, z: -8 },
      rot: { x: 0.2, y: -0.4, z: -0.2 },
    },
    mobile: {
      pos: { x: 0.2, y: -1.2, z: -6 },
      rot: { x: 0.2, y: -0.3, z: -0.1 },
    },
  },
  seven: {
    desktop: { pos: { x: 1, y: 0, z: -1 }, rot: { x: 0.5, y: -2, z: 0 } },
    tablet: { pos: { x: 0.8, y: -0.2, z: -1 }, rot: { x: 0.4, y: -1.5, z: 0 } },
    mobile: { pos: { x: 0.5, y: -0.3, z: -1 }, rot: { x: 0.3, y: -1, z: 0 } },
  },
  eight: {
    desktop: { pos: { x: 1.5, y: -0.1, z: 0 }, rot: { x: 5, y: -1, z: 5 } },
    tablet: { pos: { x: 1.2, y: -0.1, z: 0 }, rot: { x: 4, y: -0.8, z: 4 } },
    mobile: { pos: { x: 0.8, y: -0.2, z: 0 }, rot: { x: 3, y: -0.5, z: 3 } },
  },
  nine: {
    desktop: { pos: { x: 1, y: 0, z: -1 }, rot: { x: 0.5, y: -2, z: 0 } },
    tablet: { pos: { x: 0.8, y: -0.2, z: -1 }, rot: { x: 0.4, y: -1.5, z: 0 } },
    mobile: { pos: { x: 3, y: 0.5, z: -5 }, rot: { x: 3, y: 4.5, z: 3 } },
  },
  ten: {
    desktop: { pos: { x: -1, y: -1, z: -5 }, rot: { x: 0, y: 0.5, z: 0.2 } },
    tablet: { pos: { x: -0.8, y: -0.8, z: -4 }, rot: { x: 0, y: 0.4, z: 0.2 } },
    mobile: { pos: { x: -0.5, y: -0.6, z: -3 }, rot: { x: 0, y: 0.3, z: 0.1 } },
  },
};

// 🔹 Helper function for current device
const getDeviceType = () => {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
};

// 🔹 Scroll Based Animation
const modelMove = () => {
  const sections = document.querySelectorAll(".section");
  let currentSection;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 3) currentSection = section.id;
  });

  if (currentSection && bee) {
    const device = getDeviceType();
    const config = responsivePositions[currentSection][device];

    gsap.to(bee.position, {
      x: config.pos.x,
      y: config.pos.y,
      z: config.pos.z,
      duration: 2.5,
      ease: "power2.out",
    });

    gsap.to(bee.rotation, {
      x: config.rot.x,
      y: config.rot.y,
      z: config.rot.z,
      duration: 2.5,
      ease: "power2.out",
    });
  }
};

// Event listeners
window.addEventListener("scroll", () => {
  if (bee) modelMove();
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if (bee) modelMove();
});
