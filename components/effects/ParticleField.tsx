"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 600 }) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 15;
      temp[i3 + 1] = (Math.random() - 0.5) * 15;
      temp[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    return temp;
  }, [count]);

  // Create colors for aurora effect
  const colors = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const colorOptions = [
      [0.024, 0.714, 0.831], // Cyan #06B6D4
      [0.545, 0.361, 0.965], // Purple #8B5CF6
      [0.925, 0.282, 0.600], // Pink #EC4899
    ];
    
    for (let i = 0; i < count; i++) {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      temp[i * 3] = color[0];
      temp[i * 3 + 1] = color[1];
      temp[i * 3 + 2] = color[2];
    }
    return temp;
  }, [count]);

  const sizes = useMemo(() => {
    const temp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      temp[i] = Math.random() * 0.5 + 0.5;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.015;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;

      const positions = mesh.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.002;
        positions[i3] += Math.cos(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrbs() {
  const orbs = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbs.current) {
      orbs.current.children.forEach((orb, i) => {
        orb.position.y =
          Math.sin(state.clock.elapsedTime * 0.5 + i * 2) * 0.5 +
          orb.userData.baseY;
        orb.position.x =
          Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.3 +
          orb.userData.baseX;
      });
    }
  });

  const orbColors = ["#06B6D4", "#8B5CF6", "#EC4899", "#06B6D4", "#8B5CF6"];

  return (
    <group ref={orbs}>
      {orbColors.map((color, i) => (
        <mesh
          key={i}
          position={[(i - 2) * 3, (i % 2) * 2 - 1, -5]}
          userData={{ baseY: (i % 2) * 2 - 1, baseX: (i - 2) * 3 }}
        >
          <sphereGeometry args={[0.3 + i * 0.1, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#EC4899" />
        <Particles count={800} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
