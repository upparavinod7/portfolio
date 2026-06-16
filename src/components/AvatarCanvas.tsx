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
    camera.position.set(-10, 4.8, 22);

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
    root.position.set(0, -1.12, -12);
    scene.add(root);

    const avatar = new THREE.Group();
    root.add(avatar);

    const environment = new THREE.Group();
    scene.add(environment);

    const holograms = new THREE.Group();
    root.add(holograms);

    const techOrbit = new THREE.Group();
    root.add(techOrbit);

    const matDark = new THREE.MeshStandardMaterial({
      color: 0x1c222d,
      roughness: 0.22,
      metalness: 0.82,
      envMapIntensity: 1.4,
    });
    const matArmor = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.16,
      metalness: 0.95,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 0.035,
    });
    const matSkin = new THREE.MeshStandardMaterial({
      color: 0xbfc8d6,
      roughness: 0.35,
      metalness: 0.2,
      emissive: new THREE.Color(0x111827),
      emissiveIntensity: 0.08,
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

    const ambient = new THREE.HemisphereLight(0x9ccfff, 0x02040a, 0.58);
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

    addMesh(spine, new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.62, 8, 18), matArmor), 0.16);
    addMesh(chest, new THREE.Mesh(new THREE.CapsuleGeometry(0.58, 0.68, 10, 24), matDark), 0.02).scale.set(1.05, 1, 0.58);
    const core = addMesh(chest, new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), matGlow), 0.08);
    core.position.z = 0.42;
    const headMesh = addMesh(head, new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 28), matSkin), 0.03);
    headMesh.scale.set(0.86, 1.08, 0.86);
    const visor = addMesh(head, new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.055, 0.08), matGlow), 0.08);
    visor.position.z = 0.36;
    const mouth = addMesh(jaw, new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.025, 0.05), matGlow), -0.16);
    mouth.position.z = 0.37;
    const halo = addMesh(head, new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.012, 8, 72), matGlass), 0.02);
    halo.rotation.y = Math.PI / 2;

    const makeLimb = (parent: THREE.Group, length: number, radius: number, wrist = false) => {
      const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 8, 16), wrist ? matSkin : matArmor);
      mesh.position.y = -length / 2;
      mesh.castShadow = true;
      parent.add(mesh);
      const joint = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.22, 16, 12), matGlow);
      joint.scale.set(1, 0.52, 1);
      parent.add(joint);
    };

    makeLimb(leftShoulder, 0.64, 0.09);
    makeLimb(rightShoulder, 0.64, 0.09);
    makeLimb(leftElbow, 0.58, 0.075);
    makeLimb(rightElbow, 0.58, 0.075);
    makeLimb(leftWrist, 0.16, 0.08, true);
    makeLimb(rightWrist, 0.16, 0.08, true);
    makeLimb(leftHip, 0.82, 0.11);
    makeLimb(rightHip, 0.82, 0.11);
    makeLimb(leftKnee, 0.76, 0.095);
    makeLimb(rightKnee, 0.76, 0.095);

    leftShoulder.rotation.z = -0.16;
    rightShoulder.rotation.z = 0.16;
    leftHip.rotation.z = 0.05;
    rightHip.rotation.z = -0.05;

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
    makePanel(["PROJECT_01", projectSnippets[0]], new THREE.Vector3(-3.25, 2.55, -0.4), [1.9, 0.7], "#67e8f9");
    makePanel(["PROJECT_02", projectSnippets[1]], new THREE.Vector3(3.25, 2.34, -0.55), [1.9, 0.7], "#f0abfc");
    makePanel(["LIVE_CODE", codeSnippets[0]], new THREE.Vector3(-2.9, 1.35, 0.12), [1.65, 0.58], "#86efac");
    makePanel(["GESTURE_READY", codeSnippets[2]], new THREE.Vector3(2.95, 1.28, 0.15), [1.65, 0.58], "#fcd34d");

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
    const state = { scroll: 0, phase: 0, expression: 0 };

    const onMouseMove = (event: MouseEvent) => {
      mouse.tx = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const onPointerDown = () => {
      gsap.to(state, { expression: 1, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
      gsap.to(rightShoulder.rotation, { x: -1.05, z: 0.42, duration: 0.36, yoyo: true, repeat: 1, ease: "power2.inOut" });
      gsap.to(rightElbow.rotation, { x: -0.8, duration: 0.36, yoyo: true, repeat: 1, ease: "power2.inOut" });
    };
    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      state.scroll = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    const intro = gsap.timeline();
    intro
      .to(camera.position, { x: 0, y: 2.05, z: 8.4, duration: 3.7, ease: "power3.inOut" })
      .to(root.position, { z: 0, duration: 3.15, ease: "power2.out" }, 0.42)
      .fromTo(holograms.scale, { x: 0.18, y: 0.18, z: 0.18 }, { x: 1, y: 1, z: 1, duration: 1.4, ease: "back.out(1.6)" }, 2.3)
      .fromTo(techOrbit.scale, { x: 0.05, y: 0.05, z: 0.05 }, { x: 1, y: 1, z: 1, duration: 1.2, ease: "power2.out" }, 2.7);

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
      matArmor.emissive.copy(color);
      ringMat.color.copy(color);
      particleMat.color.copy(color);
      tunnelMat.color.copy(secondary);
      rimLight.color.copy(secondary);
      cursorLight.color.copy(color);
      beamUniforms.glowColor.value.copy(color);

      beamUniforms.time.value = elapsed;
      mouse.x += (mouse.tx - mouse.x) * 0.085;
      mouse.y += (mouse.ty - mouse.y) * 0.085;

      const scroll = state.scroll;
      const walk = root.position.z < -0.2;
      const breathe = Math.sin(elapsed * 1.55);
      const micro = Math.sin(elapsed * 3.1);

      keyLight.position.x = -5 + mouse.x * 1.8;
      keyLight.position.y = 11 + mouse.y * 1.0;
      cursorLight.position.set(mouse.x * 5.3, 2.1 + mouse.y * 3.6, 3.4);
      cursorLight.intensity = 18 + Math.abs(mouse.x) * 10 + Math.max(mouse.y, 0) * 6;

      camera.position.x += (mouse.x * 0.38 + Math.sin(scroll * Math.PI * 2) * 0.35 - camera.position.x) * 0.02;
      camera.position.y += (2.05 + scroll * 1.4 + mouse.y * 0.18 - camera.position.y) * 0.02;
      camera.position.z += (8.4 + scroll * 2.4 - camera.position.z) * 0.02;
      camera.lookAt(0, 1.95 + scroll * 0.35, 0);

      if (walk) {
        const gait = Math.sin(elapsed * 8.8);
        leftHip.rotation.x = gait * 0.45;
        rightHip.rotation.x = -gait * 0.45;
        leftKnee.rotation.x = Math.max(0, -gait * 0.38);
        rightKnee.rotation.x = Math.max(0, gait * 0.38);
        leftShoulder.rotation.x = -gait * 0.34;
        rightShoulder.rotation.x = gait * 0.34;
        spine.position.y = 1.9 + Math.abs(gait) * 0.045;
      } else {
        chest.position.y = 0.82 + breathe * 0.035;
        chest.rotation.x = breathe * 0.018;
        spine.rotation.z = mouse.x * 0.035 + Math.sin(elapsed * 0.8) * 0.015;
        head.rotation.y += (mouse.x * 0.64 + Math.sin(elapsed * 0.42) * 0.05 - head.rotation.y) * 0.08;
        head.rotation.x += (mouse.y * 0.32 + Math.sin(elapsed * 0.7) * 0.025 - head.rotation.x) * 0.08;
        neck.rotation.y += (mouse.x * 0.18 - neck.rotation.y) * 0.08;
        leftShoulder.rotation.z += (-0.16 - scroll * 0.35 + Math.cos(elapsed * 1.1) * 0.04 - leftShoulder.rotation.z) * 0.05;
        rightShoulder.rotation.z += (0.16 + scroll * 0.35 - Math.cos(elapsed * 1.1) * 0.04 - rightShoulder.rotation.z) * 0.05;
        leftElbow.rotation.x += (-scroll * 0.65 - leftElbow.rotation.x) * 0.045;
        rightElbow.rotation.x += (-scroll * 0.78 - rightElbow.rotation.x) * 0.045;
        leftHip.rotation.x += (0.03 - leftHip.rotation.x) * 0.06;
        rightHip.rotation.x += (-0.03 - rightHip.rotation.x) * 0.06;
        leftKnee.rotation.x += (0.08 - leftKnee.rotation.x) * 0.06;
        rightKnee.rotation.x += (0.08 - rightKnee.rotation.x) * 0.06;
      }

      visor.scale.x = 1 + state.expression * 0.2 + Math.max(0, Math.sin(elapsed * 4.4)) * 0.025;
      mouth.scale.x = 1 + state.expression * 0.5 + Math.max(0, micro) * 0.08;
      core.scale.setScalar(1 + breathe * 0.14 + state.expression * 0.2);

      holograms.children.forEach((child, index) => {
        child.quaternion.copy(camera.quaternion);
        child.position.y += Math.sin(elapsed * 1.1 + index) * 0.0009;
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = (index === 0 ? 0.82 : 0.52) + Math.sin(elapsed * 2 + index) * 0.08 + scroll * 0.1;
      });
      nameplate.position.x = mouse.x * 0.12;

      techOrbit.rotation.y = elapsed * 0.34 + scroll * Math.PI * 1.5;
      techOrbit.rotation.x = 0.18 + Math.sin(elapsed * 0.55) * 0.05;
      techNodes.forEach((node, index) => {
        const angle = node.userData.angle + elapsed * 0.16;
        const radius = 2.25 + Math.sin(elapsed + index) * 0.16;
        node.position.set(Math.cos(angle) * radius, 2.05 + Math.sin(angle * 1.4) * 0.46, Math.sin(angle) * radius);
        node.quaternion.copy(camera.quaternion);
      });

      root.children.forEach((child) => {
        if (child.userData.spin) child.rotation.z += child.userData.spin * 0.016;
      });

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
      intro.kill();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      techTextures.forEach((texture) => texture.dispose());
      hudMaterials.forEach((material) => material.dispose());
      [matDark, matArmor, matSkin, matGlow, matGlass, ringMat, particleMat, tunnelMat].forEach((material) => material.dispose());
      particleGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden" />;
}
