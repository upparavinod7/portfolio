"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePersona } from '@/context/PersonaContext';
import { skillsData } from '@/data/portfolioData';

export default function SkillSpheres() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { persona } = usePersona();
  const personaRef = useRef(persona);

  useEffect(() => {
    personaRef.current = persona;
  }, [persona]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold our elements
    const group = new THREE.Group();
    scene.add(group);

    // Dynamic light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(2, 4, 6);
    scene.add(dirLight);

    const getPersonaColor = (p: typeof persona) => {
      switch (p) {
        case 'ai-ml': return new THREE.Color(0x06b6d4);
        case 'full-stack': return new THREE.Color(0xf43f5e);
        case 'sde': return new THREE.Color(0x8b5cf6);
      }
    };

    let activeColor = getPersonaColor(personaRef.current);
    let targetColor = activeColor.clone();

    // Central Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: activeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const centralSphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(centralSphere);

    // Generate Text Badges
    const createBadgeTexture = (text: string, colorHex: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 40;
      const ctx = canvas.getContext('2d')!;

      // Badge backer
      ctx.fillStyle = 'rgba(10, 15, 30, 0.85)';
      ctx.strokeStyle = colorHex;
      ctx.lineWidth = 2;
      ctx.roundRect(4, 4, 120, 32, 8);
      ctx.fill();
      ctx.stroke();

      // Text
      ctx.font = '10px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text.toUpperCase(), 64, 20);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      const geometry = new THREE.PlaneGeometry(1.4, 0.45);
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    };

    let badgeGroup = new THREE.Group();
    group.add(badgeGroup);

    const rebuildSkillBadges = (p: typeof persona) => {
      // Clear
      while (badgeGroup.children.length > 0) {
        const mesh = badgeGroup.children[0] as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
        badgeGroup.remove(mesh);
      }

      // Flat map all skills
      const categories = skillsData[p];
      const skills = categories.flatMap(cat => cat.skills).slice(0, 12); // Limit to 12 for clean spacing
      const colorString = `#${targetColor.getHexString()}`;

      skills.forEach((skill, index) => {
        const badge = createBadgeTexture(skill.name, colorString);
        
        // Distribute points evenly on a sphere using Fibonacci lattice
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const radius = 2.4;

        badge.position.x = radius * Math.cos(theta) * Math.sin(phi);
        badge.position.y = radius * Math.sin(theta) * Math.sin(phi);
        badge.position.z = radius * Math.cos(phi);

        badge.userData = { 
          originalPos: badge.position.clone(),
          speedX: (Math.random() - 0.5) * 0.01,
          speedY: (Math.random() - 0.5) * 0.01
        };

        badgeGroup.add(badge);
      });
    };

    rebuildSkillBadges(personaRef.current);

    // Mouse positions for tilt
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const currentPersona = personaRef.current;

      targetColor.copy(getPersonaColor(currentPersona));
      activeColor.lerp(targetColor, 0.05);
      sphereMat.color.copy(activeColor);

      // Rebuild if color shifted significantly
      if (Math.abs(activeColor.r - targetColor.r) > 0.01 && elapsed % 0.5 < 0.05) {
        rebuildSkillBadges(currentPersona);
      }

      // Parallax rotations
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      group.rotation.y = elapsed * 0.15 + mouse.x * 0.6;
      group.rotation.x = mouse.y * 0.5;

      // Pulse central sphere
      const scale = 1 + Math.sin(elapsed * 2.5) * 0.06;
      centralSphere.scale.set(scale, scale, scale);

      // Orient badges to face camera
      badgeGroup.children.forEach((badge) => {
        badge.quaternion.copy(camera.quaternion);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      sphereGeo.dispose();
      sphereMat.dispose();

      badgeGroup.children.forEach((badge) => {
        const mesh = badge as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[320px] sm:h-[400px] flex items-center justify-center relative z-10 cursor-grab active:cursor-grabbing"
    />
  );
}
