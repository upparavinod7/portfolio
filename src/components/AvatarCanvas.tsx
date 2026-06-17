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
  ctx.fillStyle = "rgba(2, 6, 16, 0.72)";
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

  ctx.font = title ? "700 24px monospace" : "700 18px monospace";
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

    const techTextures: THREE.Texture[] = [];
    const hudMaterials: THREE.MeshBasicMaterial[] = [];
    const panelMeshes: THREE.Mesh[] = [];

    const root = new THREE.Group();
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

    const gitGrid = new THREE.Group();
    root.add(gitGrid);

    const resumeHolo = new THREE.Group();
    root.add(resumeHolo);

    // Realistic physical materials for premium digital human twin
    const matSkin = new THREE.MeshPhysicalMaterial({
      color: 0xebd2c4, // Natural warm whitish skin tone
      roughness: 0.52,
      metalness: 0.04,
      clearcoat: 0.15,
      clearcoatRoughness: 0.4,
    });
    const matHoodie = new THREE.MeshPhysicalMaterial({
      color: 0x111622, // Black techwear jacket base
      roughness: 0.76,
      metalness: 0.1,
      clearcoat: 0.1,
    });
    const matJeans = new THREE.MeshStandardMaterial({
      color: 0x1e2e3f, // Deep indigo raw denim jeans
      roughness: 0.9,
      metalness: 0.05,
    });
    const matHair = new THREE.MeshStandardMaterial({
      color: 0x0a0807, // Realistic natural black/dark brown hair
      roughness: 0.85,
      metalness: 0.05,
    });
    const matGlassesFrame = new THREE.MeshStandardMaterial({
      color: 0x0a0f18, // Matte black spectacles
      roughness: 0.22,
      metalness: 0.6,
    });
    const matGlassesLens = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4, // Cyan glowing semi-transparent glass
      transparent: true,
      opacity: 0.32,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.75,
      thickness: 0.12,
      emissive: new THREE.Color(0x06b6d4),
      emissiveIntensity: 0.18,
    });
    const matSneakers = new THREE.MeshStandardMaterial({
      color: 0xf9fafb, // White sneakers
      roughness: 0.65,
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

    const ambient = new THREE.HemisphereLight(0xffffff, 0x02040a, 0.82);
    scene.add(ambient);

    const keyLight = new THREE.SpotLight(0xffffff, 85, 55, Math.PI / 6.5, 0.45, 1.2);
    keyLight.position.set(-5, 11, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(theme.secondary, 18, 28);
    rimLight.position.set(5, 3.2, -2);
    scene.add(rimLight);

    const cursorLight = new THREE.PointLight(theme.primary, 22, 18);
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

    // Rebuild Premium Techwear Jacket (Cyberpunk AI aesthetic)
    addMesh(spine, new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.62, 8, 18), matHoodie), 0.16);
    const bodyMesh = addMesh(chest, new THREE.Mesh(new THREE.CapsuleGeometry(0.48, 0.66, 12, 24), matHoodie), 0.02);
    bodyMesh.scale.set(1.05, 1, 0.72);

    const techCollar = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.065, 8, 32), matHoodie);
    techCollar.rotation.x = Math.PI / 2;
    techCollar.position.set(0, 0.4, 0);
    chest.add(techCollar);

    const zipper = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.5, 8), matGlow);
    zipper.position.set(0, 0.1, 0.36);
    chest.add(zipper);

    const techStrapL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.02), matGlassesFrame);
    techStrapL.position.set(0.18, 0.12, 0.35);
    techStrapL.rotation.z = -0.15;
    chest.add(techStrapL);

    const techStrapR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.02), matGlassesFrame);
    techStrapR.position.set(-0.18, 0.12, 0.35);
    techStrapR.rotation.z = 0.15;
    chest.add(techStrapR);

    // Custom deformed head representing realistic proportions
    const headGeom = new THREE.SphereGeometry(0.38, 32, 32);
    const posAttr = headGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);

      if (y < 0) {
        // Taper cheek and narrow jawline
        posAttr.setX(i, x * (1 + y * 0.24));
        posAttr.setY(i, y * 1.05); // elongate chin
        if (z > 0) {
          // Pull chin box slightly forward
          posAttr.setZ(i, z + Math.pow(Math.abs(y), 2.0) * 0.15);
        }
      }
      if (y > 0.02 && y < 0.16 && z > 0.22 && Math.abs(x) < 0.08) {
        // defined realistic nose bridge displacement
        posAttr.setZ(i, z + 0.055);
      }
      if (y > 0.05 && y < 0.18 && Math.abs(x) > 0.15 && z > 0.15) {
        // cheekbone volume
        posAttr.setZ(i, z + 0.016);
      }
    }
    headGeom.computeVertexNormals();
    const headMesh = addMesh(head, new THREE.Mesh(headGeom, matSkin), 0.03);

    // Nose
    const nose = new THREE.Mesh(new THREE.CapsuleGeometry(0.042, 0.095, 8, 12), matSkin);
    nose.position.set(0, 0.04, 0.36);
    nose.rotation.x = 0.08;
    head.add(nose);

    // Ears
    const earL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), matSkin);
    earL.position.set(0.38, 0.02, -0.04);
    earL.scale.set(0.55, 1, 0.9);
    head.add(earL);

    const earR = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), matSkin);
    earR.position.set(-0.38, 0.02, -0.04);
    earR.scale.set(0.55, 1, 0.9);
    head.add(earR);

    // Curly hair helical strands (3D corkscrews for professional organic representation)
    const hairGroup = new THREE.Group();
    head.add(hairGroup);

    const createHelicalPath = (start: THREE.Vector3, end: THREE.Vector3, radius: number, turns: number) => {
      const points = [];
      const segments = 12;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const pos = new THREE.Vector3().lerpVectors(start, end, t);
        const angle = t * turns * Math.PI * 2;
        pos.x += Math.cos(angle) * radius;
        pos.z += Math.sin(angle) * radius;
        points.push(pos);
      }
      return new THREE.CatmullRomCurve3(points);
    };

    const makeCurl = (start: THREE.Vector3, end: THREE.Vector3, radius: number, turns: number, thickness = 0.018) => {
      const curve = createHelicalPath(start, end, radius, turns);
      const geom = new THREE.TubeGeometry(curve, 10, thickness, 4, false);
      const mesh = new THREE.Mesh(geom, matHair);
      mesh.castShadow = true;
      hairGroup.add(mesh);
    };

    const generateCurls = () => {
      const scalpRadius = 0.355;
      const numCurls = 42;
      for (let i = 0; i < numCurls; i++) {
        const phi = Math.acos(Math.random() * 0.78 + 0.12);
        const theta = Math.random() * Math.PI * 2;
        const start = new THREE.Vector3(
          scalpRadius * Math.sin(phi) * Math.cos(theta),
          scalpRadius * Math.cos(phi) + 0.05,
          scalpRadius * Math.sin(phi) * Math.sin(theta)
        );
        const end = start.clone().multiplyScalar(1.18);
        const curlRadius = 0.035 + Math.random() * 0.015;
        const turns = 1.6 + Math.random() * 1.4;
        const thickness = 0.014 + Math.random() * 0.008;
        makeCurl(start, end, curlRadius, turns, thickness);
      }
    };
    generateCurls();

    // Glasses
    const glassesGroup = new THREE.Group();
    head.add(glassesGroup);

    const glFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.02), matGlassesFrame);
    glFrameL.position.set(0.13, 0.08, 0.35);

    const glFrameR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.02), matGlassesFrame);
    glFrameR.position.set(-0.13, 0.08, 0.35);

    const glLensL = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.13, 0.015), matGlassesLens);
    glLensL.position.set(0.13, 0.08, 0.355);

    const glLensR = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.13, 0.015), matGlassesLens);
    glLensR.position.set(-0.13, 0.08, 0.355);

    const glBridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.02), matGlassesFrame);
    glBridge.position.set(0, 0.08, 0.35);

    const glTempleL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.32), matGlassesFrame);
    glTempleL.position.set(0.25, 0.08, 0.19);
    glTempleL.rotation.y = 0.04;

    const glTempleR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.32), matGlassesFrame);
    glTempleR.position.set(-0.25, 0.08, 0.19);
    glTempleR.rotation.y = -0.04;

    glassesGroup.add(glFrameL, glFrameR, glLensL, glLensR, glBridge, glTempleL, glTempleR);

    // High Gloss Glinting Eyes
    const leftEye = new THREE.Group();
    leftEye.position.set(0.13, 0.08, 0.32);
    head.add(leftEye);

    const rightEye = new THREE.Group();
    rightEye.position.set(-0.13, 0.08, 0.32);
    head.add(rightEye);

    const eyeWhiteL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
    eyeWhiteL.scale.set(1.1, 1, 0.45);
    leftEye.add(eyeWhiteL);

    const eyeWhiteR = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
    eyeWhiteR.scale.set(1.1, 1, 0.45);
    rightEye.add(eyeWhiteR);

    const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), new THREE.MeshStandardMaterial({ color: 0x140c08, roughness: 0.2 }));
    pupilL.position.set(0, 0, 0.045);
    leftEye.add(pupilL);

    const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), new THREE.MeshStandardMaterial({ color: 0x140c08, roughness: 0.2 }));
    pupilR.position.set(0, 0, 0.045);
    rightEye.add(pupilR);

    // Eyebrows
    const ebL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.02), matHair);
    ebL.position.set(0.13, 0.19, 0.33);
    ebL.rotation.z = 0.06;
    head.add(ebL);

    const ebR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.02), matHair);
    ebR.position.set(-0.13, 0.19, 0.33);
    ebR.rotation.z = -0.06;
    head.add(ebR);

    // Smile & Mustache
    const smileGroup = new THREE.Group();
    jaw.add(smileGroup);

    const lipColor = new THREE.MeshStandardMaterial({ color: 0xb2584d, roughness: 0.5 });
    const lipL = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.015, 0.015), lipColor);
    lipL.position.set(0.05, -0.17, 0.35);
    lipL.rotation.z = 0.18;

    const lipR = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.015, 0.015), lipColor);
    lipR.position.set(-0.05, -0.17, 0.35);
    lipR.rotation.z = -0.18;

    const lipCtr = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.015, 0.015), lipColor);
    lipCtr.position.set(0, -0.185, 0.35);

    smileGroup.add(lipL, lipR, lipCtr);

    const mustacheGroup = new THREE.Group();
    jaw.add(mustacheGroup);

    const mustL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.025, 0.02), matHair);
    mustL.position.set(0.05, -0.11, 0.355);
    mustL.rotation.z = -0.12;

    const mustR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.025, 0.02), matHair);
    mustR.position.set(-0.05, -0.11, 0.355);
    mustR.rotation.z = 0.12;

    mustacheGroup.add(mustL, mustR);

    // Custom limb helper
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

    // Sleeve / Wrist / Hip / Leg mounts
    makeLimb(leftShoulder, 0.64, 0.09, matHoodie);
    makeLimb(rightShoulder, 0.64, 0.09, matHoodie);
    makeLimb(leftElbow, 0.58, 0.075, matHoodie);
    makeLimb(rightElbow, 0.58, 0.075, matHoodie);
    makeLimb(leftWrist, 0.16, 0.08, matSkin, matSkin);
    makeLimb(rightWrist, 0.16, 0.08, matSkin, matSkin);

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

    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.28), matSneakers);
    shoeL.position.set(0, -0.06, 0.06);
    shoeL.castShadow = true;
    leftAnkle.add(shoeL);

    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.28), matSneakers);
    shoeR.position.set(0, -0.06, 0.06);
    shoeR.castShadow = true;
    rightAnkle.add(shoeR);

    // Floating 3D GitHub activity contribution grid (neon blocks)
    const buildGitGrid = () => {
      const size = 0.08;
      const spacing = 0.115;
      const cols = 7;
      const rows = 5;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const density = Math.random();
          let colorHex = 0x161b22; // empty
          if (density > 0.8) colorHex = 0x39d353; // high commit
          else if (density > 0.5) colorHex = 0x26a641;
          else if (density > 0.2) colorHex = 0x0e4429;

          const blockMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            roughness: 0.1,
            metalness: 0.8,
            emissive: new THREE.Color(colorHex),
            emissiveIntensity: colorHex !== 0x161b22 ? 0.45 : 0.02,
          });
          const block = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), blockMat);
          block.position.set((c - cols / 2) * spacing, (r - rows / 2) * spacing, 0);
          gitGrid.add(block);
        }
      }
    };
    buildGitGrid();
    gitGrid.position.set(-1.8, 1.25, 0.4);

    // Interactive holographic resume panel
    const buildResumeHolo = () => {
      const texture = makeTextTexture([
        "UPPARA VINOD // AI_ENGINEER",
        "GPA: 9.45/10 // Joy University",
        "Intern: Hyperready (MERN + TS)",
        "Intern: Unified Mentor (Flask+ML)",
        "Leadership: ACM Vice Chairperson",
        "AWS Cloud Solutions Architect Sim"
      ], "#fcd34d", 512, 256);
      techTextures.push(texture);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      hudMaterials.push(material);
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.15), material);
      resumeHolo.add(panel);
    };
    buildResumeHolo();
    resumeHolo.position.set(1.8, 1.25, 0.4);

    // Halo torus
    const halo = addMesh(head, new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.012, 8, 72), matGlass), 0.02);
    halo.rotation.y = Math.PI / 2;



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

    // Orbiting tech nodes
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

    // Scanner beam cylinder shader
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

    // Particles
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

    // Tunnel frame cylinders
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
      expression: 0.45, 
      blink: 1, 
      isCheering: false,
      isRecruiterMode: false 
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.tx = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onPointerDown = () => {
      gsap.to(state, { expression: 0.9, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
    };

    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    const sectionElements = sections.map(id => document.getElementById(id));

    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      state.scroll = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);

      let currentSection = "hero";
      let progress = 0;
      const vh = window.innerHeight;

      for (let i = 0; i < sections.length; i++) {
        const el = sectionElements[i] || document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
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
      gsap.to(state, { expression: 0.85, duration: 0.2, yoyo: true, repeat: 1 });
      // Walk present point trigger
      gsap.fromTo(leftShoulder.rotation, { x: 0, z: -0.2 }, { x: -0.4, z: -1.3, duration: 0.6, yoyo: true, repeat: 1, repeatDelay: 1.5 });
      gsap.fromTo(leftElbow.rotation, { x: 0 }, { x: -0.55, duration: 0.6, yoyo: true, repeat: 1, repeatDelay: 1.5 });
    };

    const onContactSuccess = () => {
      state.isCheering = true;
      setTimeout(() => {
        state.isCheering = false;
      }, 3500);
    };

    const onRecruiterToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      state.isRecruiterMode = customEvent.detail;
    };

    const onAiChatResponse = (e: Event) => {
      const customEvent = e as CustomEvent;
      const gesture = customEvent.detail; // 'nod', 'cheer', 'point'
      if (gesture === "nod") {
        gsap.to(head.rotation, { x: 0.22, duration: 0.18, yoyo: true, repeat: 3 });
      } else if (gesture === "cheer") {
        state.isCheering = true;
        setTimeout(() => { state.isCheering = false; }, 3200);
      } else if (gesture === "point") {
        gsap.fromTo(leftShoulder.rotation, { x: 0, z: -0.2 }, { x: -0.35, z: -1.25, duration: 0.5, yoyo: true, repeat: 1, repeatDelay: 1.2 });
        gsap.fromTo(leftElbow.rotation, { x: 0 }, { x: -0.5, duration: 0.5, yoyo: true, repeat: 1, repeatDelay: 1.2 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("project-selected", onProjectSelected);
    window.addEventListener("contact-success", onContactSuccess);
    window.addEventListener("recruiter-mode-toggle", onRecruiterToggle);
    window.addEventListener("ai-chat-response", onAiChatResponse);

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

      const breathe = Math.sin(elapsed * 1.55);
      const blinkTimer = elapsed % 4.2;
      state.blink = (blinkTimer < 0.16) ? 0.05 : 1.0;

      leftEye.scale.y = state.blink;
      rightEye.scale.y = state.blink;

      keyLight.position.x = -5 + mouse.x * 1.8;
      keyLight.position.y = 11 + mouse.y * 1.0;
      cursorLight.position.set(mouse.x * 5.3, 2.1 + mouse.y * 3.6, 3.4);
      cursorLight.intensity = 18 + Math.abs(mouse.x) * 10 + Math.max(mouse.y, 0) * 6;

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

      if (state.isCheering) {
        targetPos.set(0, -0.6, 2.5);
        targetRotY = 0;
        leftShoulderRot.set(0.4, 0, -2.2);
        rightShoulderRot.set(0.4, 0, 2.2);
        leftElbowRot.set(-0.35, 0, 0);
        rightElbowRot.set(-0.35, 0, 0);
        headRot.set(-0.25, Math.sin(elapsed * 12) * 0.12, 0);
        activeSmile = 1.0;
      } else if (state.isRecruiterMode) {
        // Salute pose for Recruiter Mode
        targetPos.set(1.5, -1.2, 0.5);
        targetRotY = -0.35;
        rightShoulderRot.set(0.65, 0.2, 1.6);
        rightElbowRot.set(-1.8, 0, 0);
        leftShoulderRot.set(0.1, 0, -0.2);
        leftElbowRot.set(-0.25, 0, 0);
        headRot.set(0.05, mouse.x * 0.2, 0);
        activeSmile = 0.8;
      } else {
        switch (state.activeSection) {
          case "hero":
            targetPos.set(1.5, -1.2, 0);
            targetRotY = -0.3;
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
            rightShoulderRot.set(-0.18, -0.4, 1.1 + Math.sin(elapsed * 1.8) * 0.04);
            rightElbowRot.set(-0.35, 0, 0);
            leftShoulderRot.set(0, 0, -0.16 + Math.cos(elapsed * 1.2) * 0.03);
            headRot.set(0.08, 0.45 + mouse.x * 0.15, 0);
            activeSmile = 0.4;
            break;

          case "skills":
            targetPos.set(-1.8, -1.2, 0.8);
            targetRotY = 0.6;
            leftShoulderRot.set(-0.48 + Math.sin(elapsed * 3.5) * 0.06, 0.15, -0.2);
            leftElbowRot.set(-0.75 + Math.cos(elapsed * 4.2) * 0.08, 0, 0);
            rightShoulderRot.set(-0.48 + Math.cos(elapsed * 3.2) * 0.06, -0.15, 0.2);
            rightElbowRot.set(-0.75 + Math.sin(elapsed * 4.5) * 0.08, 0, 0);
            headRot.set(0.12 + mouse.y * 0.1, 0.38 + mouse.x * 0.12, 0);
            activeSmile = 0.4;
            break;

          case "projects":
            targetPos.set(2.0, -1.2, 0.5);
            targetRotY = -0.6;
            leftShoulderRot.set(-0.25, 0.45, -1.15 + Math.sin(elapsed * 2.2) * 0.04);
            leftElbowRot.set(-0.35, 0, 0);
            rightShoulderRot.set(0, 0, 0.16 + Math.cos(elapsed * 1.3) * 0.03);
            headRot.set(0.08, -0.42 + mouse.x * 0.12, 0);
            activeSmile = 0.52;
            break;

          case "experience":
            targetPos.set(2.0, -1.2, 0.2);
            targetRotY = 0;
            const walkGait = Math.sin(elapsed * 9);
            leftHipRot.set(walkGait * 0.42, 0, 0.05);
            rightHipRot.set(-walkGait * 0.42, 0, -0.05);
            leftKneeRot.set(Math.max(0, -walkGait * 0.35), 0, 0.08);
            rightKneeRot.set(Math.max(0, walkGait * 0.35), 0, 0.08);
            leftShoulderRot.set(-walkGait * 0.32, 0, -0.16);
            rightShoulderRot.set(walkGait * 0.32, 0, 0.16);
            leftElbowRot.set(-0.15, 0, 0);
            rightElbowRot.set(-0.15, 0, 0);
            spinePos.set(0, 1.9 + Math.abs(walkGait) * 0.04, 0);
            headRot.set(0.04, mouse.x * 0.15, 0);
            activeSmile = 0.38;
            break;

          case "contact":
            targetPos.set(0, -0.68, 2.5);
            targetRotY = 0;
            if (state.sectionProgress > 0.8) {
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

      const scroll = state.scroll;
      camera.position.x += (mouse.x * 0.38 + Math.sin(scroll * Math.PI * 2) * 0.35 - camera.position.x) * 0.02;
      camera.position.y += (2.05 + scroll * 1.4 + mouse.y * 0.18 - camera.position.y) * 0.02;
      camera.position.z += (8.4 + scroll * 2.4 - camera.position.z) * 0.02;
      camera.lookAt(0, 1.95 + scroll * 0.35, 0);

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

      smileGroup.scale.set(1 + (state.expression - 0.45) * 0.3, 1 + (state.expression - 0.45) * 0.15, 1);
      
      // Orbiting skill matrix scale
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

      // Orbiting GitHub Contribution grid scale (active in skills / projects)
      let targetGitScale = 0.01;
      if (state.activeSection === "skills" || state.activeSection === "projects" || state.isRecruiterMode) {
        targetGitScale = 1.0;
      }
      gitGrid.scale.setScalar(gitGrid.scale.x + (targetGitScale - gitGrid.scale.x) * 0.04);
      gitGrid.rotation.y = elapsed * 0.18 + scroll * 0.6;
      gitGrid.rotation.x = Math.sin(elapsed * 0.4) * 0.05;

      // Holographic Resume scale (active in about / recruiter mode)
      let targetResumeScale = 0.01;
      if (state.activeSection === "about" || state.isRecruiterMode) {
        targetResumeScale = 1.0;
      }
      resumeHolo.scale.setScalar(resumeHolo.scale.x + (targetResumeScale - resumeHolo.scale.x) * 0.04);
      resumeHolo.quaternion.copy(camera.quaternion);
      resumeHolo.position.y = 1.25 + Math.sin(elapsed * 1.2) * 0.03;

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
      window.removeEventListener("recruiter-mode-toggle", onRecruiterToggle);
      window.removeEventListener("ai-chat-response", onAiChatResponse);
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

  return <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden animate-fade-in" />;
}
