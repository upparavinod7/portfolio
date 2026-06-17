"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { usePersona, Persona } from "@/context/PersonaContext";

type StageTheme = {
  primary: number;
  secondary: number;
  hot: number;
  name: string;
  stack: string[];
};

const projectSnippets = [
  "CareerOS AI // fit_score(user, role)",
  "Emotion CNN // webcam -> playlist",
  "Price Engine // XGBoost inference",
  "REST Mesh // JWT + indexed MongoDB",
];

const codeSnippets = [
  "const agent = await deploy(model)",
  "vector.search({ skills, projects })",
  "camera.track(cursor, 0.08)",
  "pipeline.optimize(latency < 200)",
];

function getTheme(persona: Persona): StageTheme {
  switch (persona) {
    case "full-stack":
      return {
        primary: 0xff3f72,
        secondary: 0xffb23f,
        hot: 0x4ade80,
        name: "FULL_STACK_MODE",
        stack: ["React", "Node", "Mongo", "TS", "API", "JWT"],
      };
    case "sde":
      return {
        primary: 0x9b6cff,
        secondary: 0x30d5ff,
        hot: 0xfff1a8,
        name: "SDE_CORE_MODE",
        stack: ["Java", "DSA", "Python", "SQL", "OOP", "OS"],
      };
    case "ai-ml":
    default:
      return {
        primary: 0x14d9ff,
        secondary: 0x6d7dff,
        hot: 0xfff38a,
        name: "AI_ML_NEURAL_MODE",
        stack: ["Python", "PyTorch", "CV", "NLP", "Keras", "ML"],
      };
  }
}

function makeTextTexture(
  lines: string[],
  color: string,
  width = 512,
  height = 192,
  title = false
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(2, 6, 16, 0.52)";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = color;
  ctx.lineWidth = title ? 3 : 2;
  ctx.strokeRect(8, 8, width - 16, height - 16);
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.moveTo(26, 36);
  ctx.lineTo(width - 26, 36);
  ctx.moveTo(26, height - 34);
  ctx.lineTo(width - 26, height - 34);
  ctx.stroke();

  ctx.font = title ? "700 30px monospace" : "700 22px monospace";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  lines.forEach((line, index) => {
    ctx.fillStyle = index === 0 ? "#ffffff" : color;
    ctx.fillText(line, width / 2, height / 2 - (lines.length - 1) * 18 + index * 36);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function AvatarCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { persona } = usePersona();
  const personaRef = useRef<Persona>(persona);

  useEffect(() => {
    personaRef.current = persona;
  }, [persona]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.035);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 130);
    camera.position.set(0, 2.05, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const theme = getTheme(personaRef.current);
    const color = new THREE.Color(theme.primary);
    const secondary = new THREE.Color(theme.secondary);

    const root = new THREE.Group();
    // Default starting position
    root.position.set(1.5, -1.2, 0);
    scene.add(root);

    const avatar = new THREE.Group();
    root.add(avatar);

    const environment = new THREE.Group();
    scene.add(environment);

    const holograms = new THREE.Group();
    root.add(holograms);

    const techOrbit = new THREE.Group();
    root.add(techOrbit);

    // Material system for personalized avatar
    const matSkin = new THREE.MeshStandardMaterial({
      color: 0xe8c1ac, // Lighter, whitish warm skin tone as requested by the user
      roughness: 0.62,
      metalness: 0.08,
    });
    const matHoodie = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Camel/mustard hoodie
      roughness: 0.82,
      metalness: 0.05,
    });
    const matJeans = new THREE.MeshStandardMaterial({
      color: 0x2e5b88, // Blue jeans
      roughness: 0.9,
      metalness: 0.05,
    });
    const matHair = new THREE.MeshStandardMaterial({
      color: 0x121212, // Dark curly hair
      roughness: 0.88,
      metalness: 0.05,
    });
    const matGlassesFrame = new THREE.MeshStandardMaterial({
      color: 0x1f2937, // Black/dark grey frame
      roughness: 0.35,
      metalness: 0.4,
    });
    const matGlassesLens = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4, // Glowing cyan glass lens
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.5,
      thickness: 0.15,
      emissive: new THREE.Color(0x06b6d4),
      emissiveIntensity: 0.28,
    });
    const matSneakers = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6, // White sneakers
      roughness: 0.72,
      metalness: 0.1,
    });
    const matGlow = new THREE.MeshBasicMaterial({
      color: theme.primary,
      transparent: true,
      opacity: 0.86,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const matGlass = new THREE.MeshPhysicalMaterial({
      color: theme.secondary,
      transparent: true,
      opacity: 0.2,
      roughness: 0.02,
      metalness: 0.1,
      transmission: 0.25,
      thickness: 0.25,
      emissive: new THREE.Color(theme.secondary),
      emissiveIntensity: 0.18,
    });

    const ambient = new THREE.HemisphereLight(0xffffff, 0x02040a, 0.75);
    scene.add(ambient);

    const keyLight = new THREE.SpotLight(0xffffff, 80, 55, Math.PI / 6.5, 0.45, 1.2);
    keyLight.position.set(-5, 11, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(theme.secondary, 16, 28);
    rimLight.position.set(5, 3.2, -2);
    scene.add(rimLight);

    const cursorLight = new THREE.PointLight(theme.primary, 20, 18);
    cursorLight.position.set(0, 2, 4);
    scene.add(cursorLight);

    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(3.8, 4.8, 0.08, 96),
      new THREE.MeshStandardMaterial({
        color: 0x050914,
        roughness: 0.18,
        metalness: 0.72,
        emissive: new THREE.Color(theme.primary),
        emissiveIntensity: 0.03,
      })
    );
    floor.position.y = -0.04;
    floor.receiveShadow = true;
    root.add(floor);

    const ringMat = new THREE.MeshBasicMaterial({
      color: theme.primary,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < 5; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6 + i * 0.56, 0.008, 8, 160), ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.03 + i * 0.012;
      ring.userData.spin = (i % 2 ? -1 : 1) * (0.12 + i * 0.04);
      root.add(ring);
    }

    const spine = new THREE.Group();
    const chest = new THREE.Group();
    const neck = new THREE.Group();
    const head = new THREE.Group();
    const jaw = new THREE.Group();
    const leftShoulder = new THREE.Group();
    const rightShoulder = new THREE.Group();
    const leftElbow = new THREE.Group();
    const rightElbow = new THREE.Group();
    const leftWrist = new THREE.Group();
    const rightWrist = new THREE.Group();
    const leftHip = new THREE.Group();
    const rightHip = new THREE.Group();
    const leftKnee = new THREE.Group();
    const rightKnee = new THREE.Group();

    avatar.add(spine);
    spine.position.y = 1.9;
    spine.add(chest, leftHip, rightHip);
    chest.position.y = 0.82;
    chest.add(neck, leftShoulder, rightShoulder);
    neck.position.y = 0.82;
    neck.add(head);
    head.position.y = 0.28;
    head.add(jaw);
    leftShoulder.position.set(0.68, 0.56, 0);
    rightShoulder.position.set(-0.68, 0.56, 0);
    leftShoulder.add(leftElbow);
    rightShoulder.add(rightElbow);
    leftElbow.position.y = -0.68;
    rightElbow.position.y = -0.68;
    leftElbow.add(leftWrist);
    rightElbow.add(rightWrist);
    leftWrist.position.y = -0.6;
    rightWrist.position.y = -0.6;
    leftHip.position.set(0.28, -0.38, 0);
    rightHip.position.set(-0.28, -0.38, 0);
    leftHip.add(leftKnee);
    rightHip.add(rightKnee);
    leftKnee.position.y = -0.86;
    rightKnee.position.y = -0.86;

    const addMesh = (parent: THREE.Group, mesh: THREE.Mesh, y = 0) => {
      mesh.position.y = y;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // Construct Hoodie Body
    addMesh(spine, new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.62, 8, 18), matHoodie), 0.16);
    const bodyMesh = addMesh(chest, new THREE.Mesh(new THREE.CapsuleGeometry(0.48, 0.66, 10, 24), matHoodie), 0.02);
    bodyMesh.scale.set(1.05, 1, 0.72);

    // Hood attachment behind head
    const hoodMesh = new THREE.Mesh(new THREE.SphereGeometry(0.44, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.78), matHoodie);
    hoodMesh.position.set(0, 0.05, -0.12);
    hoodMesh.rotation.x = 0.35;
    chest.add(hoodMesh);

    // Drawstrings
    const stringLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.28, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }));
    stringLeft.position.set(0.12, -0.22, 0.3);
    stringLeft.rotation.z = -0.1;
    chest.add(stringLeft);

    const stringRight = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.28, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }));
    stringRight.position.set(-0.12, -0.22, 0.3);
    stringRight.rotation.z = 0.1;
    chest.add(stringRight);

    const drawstringTipLeft = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), matGlow);
    drawstringTipLeft.position.set(0.14, -0.36, 0.3);
    chest.add(drawstringTipLeft);

    const drawstringTipRight = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), matGlow);
    drawstringTipRight.position.set(-0.14, -0.36, 0.3);
    chest.add(drawstringTipRight);

    // Custom head with whitish skin tone
    const headMesh = addMesh(head, new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 28), matSkin), 0.03);
    headMesh.scale.set(0.92, 1.12, 0.92);

    // Nose
    const nose = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.09, 8, 12), matSkin);
    nose.position.set(0, 0.04, 0.36);
    nose.rotation.x = 0.1;
    head.add(nose);

    // Ears
    const earLeft = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), matSkin);
    earLeft.position.set(0.38, 0.02, -0.04);
    earLeft.scale.set(0.6, 1, 1);
    head.add(earLeft);

    const earRight = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), matSkin);
    earRight.position.set(-0.38, 0.02, -0.04);
    earRight.scale.set(0.6, 1, 1);
    head.add(earRight);

    // Dark curly, voluminous hair (WhatsApp/Meta avatar style using procedural clumping spheres)
    const hairGroup = new THREE.Group();
    head.add(hairGroup);

    const hairPositions = [
      // Top Crown
      { x: 0, y: 0.38, z: 0, r: 0.16 },
      { x: 0.12, y: 0.36, z: 0.1, r: 0.14 },
      { x: -0.12, y: 0.36, z: 0.1, r: 0.14 },
      { x: 0.12, y: 0.36, z: -0.1, r: 0.14 },
      { x: -0.12, y: 0.36, z: -0.1, r: 0.14 },
      { x: 0, y: 0.43, z: 0.05, r: 0.12 },
      { x: 0.06, y: 0.43, z: -0.06, r: 0.12 },
      { x: -0.06, y: 0.43, z: -0.06, r: 0.12 },
      // Sides
      { x: 0.28, y: 0.19, z: 0.05, r: 0.14 },
      { x: 0.31, y: 0.1, z: 0, r: 0.12 },
      { x: 0.28, y: 0.26, z: 0.08, r: 0.13 },
      { x: 0.28, y: 0.26, z: -0.08, r: 0.13 },
      { x: -0.28, y: 0.19, z: 0.05, r: 0.14 },
      { x: -0.31, y: 0.1, z: 0, r: 0.12 },
      { x: -0.28, y: 0.26, z: 0.08, r: 0.13 },
      { x: -0.28, y: 0.26, z: -0.08, r: 0.13 },
      // Back of head
      { x: 0, y: 0.22, z: -0.28, r: 0.16 },
      { x: 0.12, y: 0.18, z: -0.26, r: 0.14 },
      { x: -0.12, y: 0.18, z: -0.26, r: 0.14 },
      { x: 0.18, y: 0.28, z: -0.22, r: 0.15 },
      { x: -0.18, y: 0.28, z: -0.22, r: 0.15 },
      { x: 0, y: 0.32, z: -0.26, r: 0.16 },
      { x: 0.1, y: 0.32, z: -0.24, r: 0.14 },
      { x: -0.1, y: 0.32, z: -0.24, r: 0.14 },
      { x: 0.22, y: 0.14, z: -0.18, r: 0.13 },
      { x: -0.22, y: 0.14, z: -0.18, r: 0.13 },
      // Front Voluminous Hairline (Fringe curly puffs)
      { x: 0.15, y: 0.32, z: 0.22, r: 0.12 },
      { x: -0.15, y: 0.32, z: 0.22, r: 0.12 },
      { x: 0.0, y: 0.34, z: 0.25, r: 0.135 },
      { x: 0.08, y: 0.36, z: 0.22, r: 0.12 },
      { x: -0.08, y: 0.36, z: 0.22, r: 0.12 }
    ];

    hairPositions.forEach((pos) => {
      const hairGeom = new THREE.SphereGeometry(pos.r, 8, 8);
      const hairMesh = new THREE.Mesh(hairGeom, matHair);
      hairMesh.position.set(pos.x, pos.y, pos.z);
      const s = 0.95 + Math.random() * 0.15;
      hairMesh.scale.set(s, s * 1.1, s);
      hairMesh.castShadow = true;
      hairGroup.add(hairMesh);
    });

    // Rectangular Glasses
    const glassesGroup = new THREE.Group();
    head.add(glassesGroup);

    const glassesLeftFrame = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.02), matGlassesFrame);
    glassesLeftFrame.position.set(0.13, 0.08, 0.35);

    const glassesRightFrame = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.02), matGlassesFrame);
    glassesRightFrame.position.set(-0.13, 0.08, 0.35);

    const glassesLeftLens = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.13, 0.015), matGlassesLens);
    glassesLeftLens.position.set(0.13, 0.08, 0.355);

    const glassesRightLens = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.13, 0.015), matGlassesLens);
    glassesRightLens.position.set(-0.13, 0.08, 0.355);

    const glassesBridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.02), matGlassesFrame);
    glassesBridge.position.set(0, 0.08, 0.35);

    const glassesTempleLeft = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.32), matGlassesFrame);
    glassesTempleLeft.position.set(0.25, 0.08, 0.19);
    glassesTempleLeft.rotation.y = 0.04;

    const glassesTempleRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.32), matGlassesFrame);
    glassesTempleRight.position.set(-0.25, 0.08, 0.19);
    glassesTempleRight.rotation.y = -0.04;

    glassesGroup.add(glassesLeftFrame, glassesRightFrame, glassesLeftLens, glassesRightLens, glassesBridge, glassesTempleLeft, glassesTempleRight);

    // Eyes with Blinking mechanics
    const leftEye = new THREE.Group();
    leftEye.position.set(0.13, 0.08, 0.32);
    head.add(leftEye);

    const rightEye = new THREE.Group();
    rightEye.position.set(-0.13, 0.08, 0.32);
    head.add(rightEye);

    const eyeWhiteLeft = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
    eyeWhiteLeft.scale.set(1.1, 1, 0.45);
    leftEye.add(eyeWhiteLeft);

    const eyeWhiteRight = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
    eyeWhiteRight.scale.set(1.1, 1, 0.45);
    rightEye.add(eyeWhiteRight);

    const pupilLeft = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), new THREE.MeshStandardMaterial({ color: 0x110d0a, roughness: 0.2 }));
    pupilLeft.position.set(0, 0, 0.045);
    leftEye.add(pupilLeft);

    const pupilRight = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), new THREE.MeshStandardMaterial({ color: 0x110d0a, roughness: 0.2 }));
    pupilRight.position.set(0, 0, 0.045);
    rightEye.add(pupilRight);

    // Eyebrows
    const eyebrowLeft = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.02), matHair);
    eyebrowLeft.position.set(0.13, 0.19, 0.33);
    eyebrowLeft.rotation.z = 0.08;
    head.add(eyebrowLeft);

    const eyebrowRight = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.02), matHair);
    eyebrowRight.position.set(-0.13, 0.19, 0.33);
    eyebrowRight.rotation.z = -0.08;
    head.add(eyebrowRight);

    // Smile & Mustache
    const smileGroup = new THREE.Group();
    jaw.add(smileGroup);

    const lipColor = new THREE.MeshStandardMaterial({ color: 0xb55a4e, roughness: 0.5 });
    const lipLeft = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.015, 0.015), lipColor);
    lipLeft.position.set(0.05, -0.17, 0.35);
    lipLeft.rotation.z = 0.18;

    const lipRight = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.015, 0.015), lipColor);
    lipRight.position.set(-0.05, -0.17, 0.35);
    lipRight.rotation.z = -0.18;

    const lipCenter = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.015, 0.015), lipColor);
    lipCenter.position.set(0, -0.185, 0.35);

    smileGroup.add(lipLeft, lipRight, lipCenter);

    const mustacheGroup = new THREE.Group();
    jaw.add(mustacheGroup);

    const mustacheLeft = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.025, 0.02), matHair);
    mustacheLeft.position.set(0.05, -0.11, 0.355);
    mustacheLeft.rotation.z = -0.12;

    const mustacheRight = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.025, 0.02), matHair);
    mustacheRight.position.set(-0.05, -0.11, 0.355);
    mustacheRight.rotation.z = 0.12;

    mustacheGroup.add(mustacheLeft, mustacheRight);

    // Custom helper for limbs
    const makeLimb = (parent: THREE.Group, length: number, radius: number, material: THREE.Material, jointMaterial: THREE.Material = matGlow) => {
      const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 8, 16), material);
      mesh.position.y = -length / 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      if (jointMaterial) {
        const joint = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.15, 16, 12), jointMaterial);
        joint.scale.set(1, 0.52, 1);
        parent.add(joint);
      }
    };

    // Hoodie Sleeves
    makeLimb(leftShoulder, 0.64, 0.09, matHoodie);
    makeLimb(rightShoulder, 0.64, 0.09, matHoodie);
    makeLimb(leftElbow, 0.58, 0.075, matHoodie);
    makeLimb(rightElbow, 0.58, 0.075, matHoodie);
    // Skin Hands
    makeLimb(leftWrist, 0.16, 0.08, matSkin, matSkin);
    makeLimb(rightWrist, 0.16, 0.08, matSkin, matSkin);

    // Jeans Legs
    makeLimb(leftHip, 0.82, 0.11, matJeans);
    makeLimb(rightHip, 0.82, 0.11, matJeans);
    makeLimb(leftKnee, 0.76, 0.095, matJeans);
    makeLimb(rightKnee, 0.76, 0.095, matJeans);

    // Sneakers
    const leftAnkle = new THREE.Group();
    leftAnkle.position.y = -0.76;
    leftKnee.add(leftAnkle);

    const rightAnkle = new THREE.Group();
    rightAnkle.position.y = -0.76;
    rightKnee.add(rightAnkle);

    const shoeLeft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.28), matSneakers);
    shoeLeft.position.set(0, -0.06, 0.06);
    shoeLeft.castShadow = true;
    leftAnkle.add(shoeLeft);

    const shoeRight = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.28), matSneakers);
    shoeRight.position.set(0, -0.06, 0.06);
    shoeRight.castShadow = true;
    rightAnkle.add(shoeRight);

    // Halo ring over head
    const halo = addMesh(head, new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.012, 8, 72), matGlass), 0.02);
    halo.rotation.y = Math.PI / 2;

    // Default positioning defaults
    leftShoulder.rotation.z = -0.16;
    rightShoulder.rotation.z = 0.16;
    leftHip.rotation.z = 0.05;
    rightHip.rotation.z = -0.05;

    // Nameplate and floating dashboards
    const techTextures: THREE.Texture[] = [];
    const hudMaterials: THREE.MeshBasicMaterial[] = [];
    const panelMeshes: THREE.Mesh[] = [];

    const makePanel = (lines: string[], pos: THREE.Vector3, size: [number, number], accent: string, title = false) => {
      const texture = makeTextTexture(lines, accent, title ? 700 : 512, title ? 180 : 192, title);
      techTextures.push(texture);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: title ? 0.92 : 0.64,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      hudMaterials.push(material);
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), material);
      panel.position.copy(pos);
      panelMeshes.push(panel);
      holograms.add(panel);
      return panel;
    };

    const nameplate = makePanel(["UPPARA VINOD", theme.name], new THREE.Vector3(0, 3.75, 0.05), [2.7, 0.68], "#67e8f9", true);
    makePanel(["PROJECT_OS", projectSnippets[0]], new THREE.Vector3(-3.25, 2.55, -0.4), [1.9, 0.7], "#67e8f9");
    makePanel(["AI_VISION", projectSnippets[1]], new THREE.Vector3(3.25, 2.34, -0.55), [1.9, 0.7], "#f0abfc");
    makePanel(["PIPELINE_IN", codeSnippets[0]], new THREE.Vector3(-2.9, 1.35, 0.12), [1.65, 0.58], "#86efac");
    makePanel(["SYSTEM_LIVE", codeSnippets[2]], new THREE.Vector3(2.95, 1.28, 0.15), [1.65, 0.58], "#fcd34d");

    // Orbiting tech skill nodes
    const makeTechNode = (label: string, index: number) => {
      const texture = makeTextTexture([label], "#ffffff", 256, 128, false);
      techTextures.push(texture);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      hudMaterials.push(material);
      const group = new THREE.Group();
      const chip = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.32), material);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), matGlow);
      dot.position.x = -0.42;
      group.add(chip, dot);
      group.userData.angle = (index / theme.stack.length) * Math.PI * 2;
      techOrbit.add(group);
      return group;
    };

    const techNodes = theme.stack.map(makeTechNode);

    // Glowing main background scanning beam
    const beamUniforms = {
      time: { value: 0 },
      glowColor: { value: new THREE.Color(theme.primary) },
    };
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 4.2, 12, 64, 1, true),
      new THREE.ShaderMaterial({
        uniforms: beamUniforms,
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 glowColor;
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            float fresnel = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            float scan = sin(vUv.y * 36.0 - time * 3.2) * 0.08;
            float fade = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.74, 1.0, vUv.y));
            gl_FragColor = vec4(glowColor, (fresnel + scan + 0.12) * fade * 0.26);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      })
    );
    beam.position.y = 4.7;
    scene.add(beam);

    // Floating particles
    const particleCount = 1100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 9 - 1.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      seeds[i] = Math.random();
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    const particleMat = new THREE.PointsMaterial({
      color: theme.primary,
      size: 0.032,
      transparent: true,
      opacity: 0.56,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Sci-fi environment frames
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: theme.secondary,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
      blending: THREE.AdditiveBlending,
    });
    for (let i = 0; i < 7; i++) {
      const frame = new THREE.Mesh(new THREE.TorusGeometry(4.2 + i * 0.12, 0.012, 4, 4), tunnelMat);
      frame.position.z = -18 + i * 4.5;
      frame.rotation.z = Math.PI / 4;
      frame.scale.y = 0.56;
      environment.add(frame);
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const state = { 
      scroll: 0, 
      activeSection: "hero", 
      sectionProgress: 0, 
      expression: 0.4, 
      blink: 1, 
      isCheering: false 
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.tx = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onPointerDown = () => {
      // Small smile expression jump on click
      gsap.to(state, { expression: 1.0, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
    };

    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    const sectionElements = sections.map(id => document.getElementById(id));

    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      state.scroll = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);

      // Dynamically locate the active section based on scroll offsets
      let currentSection = "hero";
      let progress = 0;
      const vh = window.innerHeight;

      for (let i = 0; i < sections.length; i++) {
        const el = sectionElements[i] || document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when spanning the middle line of the screen
          if (rect.top <= vh * 0.55 && rect.bottom >= vh * 0.45) {
            currentSection = sections[i];
            const height = rect.height || 1;
            progress = THREE.MathUtils.clamp(-rect.top / (height - vh + 1), 0, 1);
            break;
          }
        }
      }
      state.activeSection = currentSection;
      state.sectionProgress = progress;
    };

    const onProjectSelected = () => {
      gsap.to(state, { expression: 0.9, duration: 0.2, yoyo: true, repeat: 1 });
      // Temporary pointing animation triggers on project selection
      gsap.fromTo(leftShoulder.rotation, { x: 0, z: -0.2 }, { x: -0.4, z: -1.4, duration: 0.6, yoyo: true, repeat: 1, repeatDelay: 1.5 });
      gsap.fromTo(leftElbow.rotation, { x: 0 }, { x: -0.65, duration: 0.6, yoyo: true, repeat: 1, repeatDelay: 1.5 });
    };

    const onContactSuccess = () => {
      state.isCheering = true;
      setTimeout(() => {
        state.isCheering = false;
      }, 3500);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("project-selected", onProjectSelected);
    window.addEventListener("contact-success", onContactSuccess);

    const resizeObserver = new ResizeObserver(() => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    const startTime = performance.now();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;
      const currentTheme = getTheme(personaRef.current);

      color.lerp(new THREE.Color(currentTheme.primary), 0.045);
      secondary.lerp(new THREE.Color(currentTheme.secondary), 0.045);
      matGlow.color.copy(color);
      matGlass.color.copy(secondary);
      matGlass.emissive.copy(secondary);
      ringMat.color.copy(color);
      particleMat.color.copy(color);
      tunnelMat.color.copy(secondary);
      rimLight.color.copy(secondary);
      cursorLight.color.copy(color);
      beamUniforms.glowColor.value.copy(color);

      beamUniforms.time.value = elapsed;
      mouse.x += (mouse.tx - mouse.x) * 0.085;
      mouse.y += (mouse.ty - mouse.y) * 0.085;

      // Natural breathing and blinking rates
      const breathe = Math.sin(elapsed * 1.55);
      const eyeBlinkRate = elapsed % 4.0;
      state.blink = (eyeBlinkRate < 0.15) ? 0.05 : 1.0;

      leftEye.scale.y = state.blink;
      rightEye.scale.y = state.blink;

      keyLight.position.x = -5 + mouse.x * 1.8;
      keyLight.position.y = 11 + mouse.y * 1.0;
      cursorLight.position.set(mouse.x * 5.3, 2.1 + mouse.y * 3.6, 3.4);
      cursorLight.intensity = 18 + Math.abs(mouse.x) * 10 + Math.max(mouse.y, 0) * 6;

      // Define target layout offsets for section storytelling
      let targetPos = new THREE.Vector3(1.5, -1.2, 0);
      let targetRotY = -0.3;
      
      let leftShoulderRot = new THREE.Vector3(0, 0, -0.16);
      let rightShoulderRot = new THREE.Vector3(0, 0, 0.16);
      let leftElbowRot = new THREE.Vector3(0, 0, 0);
      let rightElbowRot = new THREE.Vector3(0, 0, 0);
      let leftHipRot = new THREE.Vector3(0, 0, 0.05);
      let rightHipRot = new THREE.Vector3(0, 0, -0.05);
      let leftKneeRot = new THREE.Vector3(0, 0, 0.08);
      let rightKneeRot = new THREE.Vector3(0, 0, 0.08);
      let neckRot = new THREE.Vector3(0, 0, 0);
      let headRot = new THREE.Vector3(0, 0, 0);
      let spinePos = new THREE.Vector3(0, 1.9, 0);
      let activeSmile = 0.45;

      // Dynamic targets based on tracked section
      if (state.isCheering) {
        targetPos.set(0, -0.6, 2.5);
        targetRotY = 0;
        leftShoulderRot.set(0.4, 0, -2.2);
        rightShoulderRot.set(0.4, 0, 2.2);
        leftElbowRot.set(-0.35, 0, 0);
        rightElbowRot.set(-0.35, 0, 0);
        headRot.set(-0.25, Math.sin(elapsed * 12) * 0.12, 0);
        activeSmile = 1.0;
      } else {
        switch (state.activeSection) {
          case "hero":
            targetPos.set(1.5, -1.2, 0);
            targetRotY = -0.3;
            // Welcome wave for the first few seconds
            if (elapsed < 6.0 || state.scroll < 0.02) {
              rightShoulderRot.set(0, -0.15, 1.6 + Math.sin(elapsed * 6.5) * 0.25);
              rightElbowRot.set(-0.7, 0, 0);
            } else {
              rightShoulderRot.set(0, 0, 0.16 + Math.cos(elapsed * 1.5) * 0.04);
            }
            leftShoulderRot.set(0, 0, -0.16 + Math.cos(elapsed * 1.5) * 0.04);
            headRot.set(mouse.y * 0.32, mouse.x * 0.42, 0);
            activeSmile = 0.5;
            break;

          case "about":
            targetPos.set(-2.2, -1.2, 0.5);
            targetRotY = 0.5;
            // Points to milestones on the right side
            rightShoulderRot.set(-0.18, -0.4, 1.1 + Math.sin(elapsed * 1.8) * 0.04);
            rightElbowRot.set(-0.35, 0, 0);
            leftShoulderRot.set(0, 0, -0.16 + Math.cos(elapsed * 1.2) * 0.03);
            headRot.set(0.08, 0.45 + mouse.x * 0.15, 0);
            activeSmile = 0.4;
            break;

          case "skills":
            // Stands inside holographic command desk
            targetPos.set(-1.8, -1.2, 0.8);
            targetRotY = 0.6;
            // typing arms motion
            leftShoulderRot.set(-0.48 + Math.sin(elapsed * 3.5) * 0.06, 0.15, -0.2);
            leftElbowRot.set(-0.75 + Math.cos(elapsed * 4.2) * 0.08, 0, 0);
            rightShoulderRot.set(-0.48 + Math.cos(elapsed * 3.2) * 0.06, -0.15, 0.2);
            rightElbowRot.set(-0.75 + Math.sin(elapsed * 4.5) * 0.08, 0, 0);
            headRot.set(0.12 + mouse.y * 0.1, 0.38 + mouse.x * 0.12, 0);
            activeSmile = 0.4;
            break;

          case "projects":
            // Presents selected project
            targetPos.set(2.0, -1.2, 0.5);
            targetRotY = -0.6;
            // Left arm presenting to the left
            leftShoulderRot.set(-0.25, 0.45, -1.15 + Math.sin(elapsed * 2.2) * 0.04);
            leftElbowRot.set(-0.35, 0, 0);
            rightShoulderRot.set(0, 0, 0.16 + Math.cos(elapsed * 1.3) * 0.03);
            headRot.set(0.08, -0.42 + mouse.x * 0.12, 0);
            activeSmile = 0.52;
            break;

          case "experience":
            // Walks down a pathway
            targetPos.set(2.0, -1.2, 0.2);
            targetRotY = 0;
            const gait = Math.sin(elapsed * 9);
            leftHipRot.set(gait * 0.42, 0, 0.05);
            rightHipRot.set(-gait * 0.42, 0, -0.05);
            leftKneeRot.set(Math.max(0, -gait * 0.35), 0, 0.08);
            rightKneeRot.set(Math.max(0, gait * 0.35), 0, 0.08);
            leftShoulderRot.set(-gait * 0.32, 0, -0.16);
            rightShoulderRot.set(gait * 0.32, 0, 0.16);
            leftElbowRot.set(-0.15, 0, 0);
            rightElbowRot.set(-0.15, 0, 0);
            spinePos.set(0, 1.9 + Math.abs(gait) * 0.04, 0);
            headRot.set(0.04, mouse.x * 0.15, 0);
            activeSmile = 0.38;
            break;

          case "contact":
            // Leaned in close, welcomes visitor
            targetPos.set(0, -0.68, 2.5);
            targetRotY = 0;
            if (state.sectionProgress > 0.8) {
              // Farewell wave at the very bottom
              rightShoulderRot.set(0, -0.15, 1.6 + Math.sin(elapsed * 7) * 0.25);
              rightElbowRot.set(-0.7, 0, 0);
              leftShoulderRot.set(0, 0, -0.16 + Math.cos(elapsed * 1.5) * 0.04);
            } else {
              leftShoulderRot.set(-0.22, 0.08, -0.42);
              leftElbowRot.set(-0.32, 0, 0);
              rightShoulderRot.set(-0.22, -0.08, 0.42);
              rightElbowRot.set(-0.32, 0, 0);
            }
            headRot.set(mouse.y * 0.15, mouse.x * 0.15, 0);
            activeSmile = 0.6;
            break;
        }
      }

      // Smooth camera tracks
      const scroll = state.scroll;
      camera.position.x += (mouse.x * 0.38 + Math.sin(scroll * Math.PI * 2) * 0.35 - camera.position.x) * 0.02;
      camera.position.y += (2.05 + scroll * 1.4 + mouse.y * 0.18 - camera.position.y) * 0.02;
      camera.position.z += (8.4 + scroll * 2.4 - camera.position.z) * 0.02;
      camera.lookAt(0, 1.95 + scroll * 0.35, 0);

      // Smoothly interpolate poses using lerp
      root.position.lerp(targetPos, 0.04);
      root.rotation.y += (targetRotY - root.rotation.y) * 0.04;

      leftShoulder.rotation.x += (leftShoulderRot.x - leftShoulder.rotation.x) * 0.04;
      leftShoulder.rotation.y += (leftShoulderRot.y - leftShoulder.rotation.y) * 0.04;
      leftShoulder.rotation.z += (leftShoulderRot.z - leftShoulder.rotation.z) * 0.04;

      rightShoulder.rotation.x += (rightShoulderRot.x - rightShoulder.rotation.x) * 0.04;
      rightShoulder.rotation.y += (rightShoulderRot.y - rightShoulder.rotation.y) * 0.04;
      rightShoulder.rotation.z += (rightShoulderRot.z - rightShoulder.rotation.z) * 0.04;

      leftElbow.rotation.x += (leftElbowRot.x - leftElbow.rotation.x) * 0.04;
      rightElbow.rotation.x += (rightElbowRot.x - rightElbow.rotation.x) * 0.04;

      leftHip.rotation.x += (leftHipRot.x - leftHip.rotation.x) * 0.04;
      rightHip.rotation.x += (rightHipRot.x - rightHip.rotation.x) * 0.04;

      leftKnee.rotation.x += (leftKneeRot.x - leftKnee.rotation.x) * 0.04;
      rightKnee.rotation.x += (rightKneeRot.x - rightKnee.rotation.x) * 0.04;

      neck.rotation.x += (neckRot.x - neck.rotation.x) * 0.04;
      neck.rotation.y += (neckRot.y - neck.rotation.y) * 0.04;

      head.rotation.x += (headRot.x - head.rotation.x) * 0.04;
      head.rotation.y += (headRot.y - head.rotation.y) * 0.04;

      spine.position.y += (spinePos.y - spine.position.y) * 0.04;
      state.expression += (activeSmile - state.expression) * 0.04;

      // Animate facial shapes based on smile state
      smileGroup.scale.set(1 + (state.expression - 0.45) * 0.3, 1 + (state.expression - 0.45) * 0.15, 1);
      
      // Update Orbiting skill matrix scale
      let targetOrbitScale = 0.1;
      if (state.activeSection === "skills") {
        targetOrbitScale = 1.0;
      } else if (state.activeSection === "hero") {
        targetOrbitScale = 0.4;
      }
      techOrbit.scale.x += (targetOrbitScale - techOrbit.scale.x) * 0.05;
      techOrbit.scale.y += (targetOrbitScale - techOrbit.scale.y) * 0.05;
      techOrbit.scale.z += (targetOrbitScale - techOrbit.scale.z) * 0.05;

      techOrbit.rotation.y = elapsed * 0.34 + scroll * Math.PI * 1.5;
      techOrbit.rotation.x = 0.18 + Math.sin(elapsed * 0.55) * 0.05;
      techNodes.forEach((node, index) => {
        const angle = node.userData.angle + elapsed * 0.16;
        const radius = 2.25 + Math.sin(elapsed + index) * 0.16;
        node.position.set(Math.cos(angle) * radius, 2.05 + Math.sin(angle * 1.4) * 0.46, Math.sin(angle) * radius);
        node.quaternion.copy(camera.quaternion);
      });

      // Update nameplate & panel opacity
      let targetHoloOpacity = (state.activeSection === "hero") ? 1.0 : 0;
      holograms.children.forEach((child, index) => {
        child.quaternion.copy(camera.quaternion);
        child.position.y += Math.sin(elapsed * 1.1 + index) * 0.0009;
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        const baseOpacity = index === 0 ? 0.82 : 0.52;
        material.opacity += (targetHoloOpacity * baseOpacity - material.opacity) * 0.05;
      });
      nameplate.position.x = mouse.x * 0.12;

      root.children.forEach((child) => {
        if (child.userData.spin) child.rotation.z += child.userData.spin * 0.016;
      });

      // Update particle field
      const particleArray = particleGeo.getAttribute("position").array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particleArray[i * 3 + 1] += 0.006 + seeds[i] * 0.007;
        particleArray[i * 3] += Math.sin(elapsed * 0.7 + seeds[i] * 20) * 0.0015;
        if (particleArray[i * 3 + 1] > 8.2) particleArray[i * 3 + 1] = -1.2;
      }
      particleGeo.getAttribute("position").needsUpdate = true;
      particles.rotation.y = elapsed * 0.018 + scroll * 0.7;

      environment.rotation.z = elapsed * 0.018;
      environment.position.z = scroll * 4;
      beam.rotation.y = elapsed * 0.08;

      const bgShift = Math.floor(scroll * 4);
      scene.fog = new THREE.FogExp2(bgShift % 2 ? 0x05030c : 0x02040a, 0.032 + scroll * 0.012);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("project-selected", onProjectSelected);
      window.removeEventListener("contact-success", onContactSuccess);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      techTextures.forEach((texture) => texture.dispose());
      hudMaterials.forEach((material) => material.dispose());
      [matSkin, matHoodie, matJeans, matHair, matGlassesFrame, matGlassesLens, matSneakers, matGlow, matGlass, ringMat, particleMat, tunnelMat].forEach((material) => material.dispose());
      particleGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden" />;
}
