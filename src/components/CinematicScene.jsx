import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Line, Sparkles } from '@react-three/drei';

const NODE_COUNT = 35;
const nodePositions = Array.from({ length: NODE_COUNT }, (_, i) => {
  const t = i / NODE_COUNT;
  const angle = t * Math.PI * 2;
  const radius = 2.4 + (i % 7) * 0.34;
  const z = Math.sin(angle * 2.0) * 1.6 + (i % 5) * 0.3;
  return [Math.cos(angle) * radius, Math.sin(angle * 1.65) * 1.7, z];
});

function palette(progress) {
  if (progress < 0.58) return { primary:'#62e8ff', secondary:'#8f67ff', neutral:'#dcecf0' };
  if (progress < 0.78) return { primary:'#76f4d1', secondary:'#62e8ff', neutral:'#eef7f3' };
  return { primary:'#72f4c4', secondary:'#b18cff', neutral:'#f0f6f4' };
}

function NeuralField({ progressRef }) {
  const group = useRef();
  const core = useRef();
  const inner = useRef();
  const lines = useMemo(() => {
    const output = [];
    for (let i = 0; i < nodePositions.length; i += 1) {
      for (let j = i + 1; j < nodePositions.length; j += 1) {
        if ((i * 3 + j) % 13 === 0) output.push([nodePositions[i], nodePositions[j]]);
      }
    }
    return output;
  }, []);
  const instanced = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(0.075, 1);
    const material = new THREE.MeshBasicMaterial({ color:'#a9ecff', transparent:true, opacity:0.9 });
    const mesh = new THREE.InstancedMesh(geometry, material, NODE_COUNT);
    const dummy = new THREE.Object3D();
    nodePositions.forEach((p, i) => {
      dummy.position.set(...p);
      dummy.scale.setScalar(0.74 + (i % 5) * 0.11);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }, []);

  useFrame(({ clock, mouse }) => {
    const p = progressRef.current;
    const c = palette(p);
    if (!group.current || !core.current || !inner.current) return;
    const drift = clock.elapsedTime * (p < 0.6 ? 0.055 : 0.08);
    group.current.rotation.y = drift + mouse.x * 0.09;
    group.current.rotation.x = mouse.y * -0.04;
    group.current.position.z = -p * 5.6;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, Math.sin(p * Math.PI * 1.7) * (0.45 + p * 0.6), 2.7, 1/60);
    group.current.scale.setScalar(1 + p * 0.32);
    core.current.rotation.x = clock.elapsedTime * (0.17 + p * 0.12);
    core.current.rotation.z = clock.elapsedTime * 0.14 - p * 0.8;
    inner.current.rotation.y = -clock.elapsedTime * 0.23 + p;
    inner.current.material.emissive.set(c.primary);
  });

  return (
    <group ref={group}>
      <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.25}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.16, 3]} />
          <meshStandardMaterial color="#091015" emissive="#62e8ff" emissiveIntensity={1.45} metalness={0.9} roughness={0.2} wireframe />
        </mesh>
        <mesh ref={inner} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.72, 0.014, 12, 180]} />
          <meshStandardMaterial color="#0c1115" emissive="#62e8ff" emissiveIntensity={1.5} metalness={0.85} roughness={0.26} />
        </mesh>
        <mesh rotation={[0.2, Math.PI/3, 0.4]}>
          <torusGeometry args={[2.15, 0.008, 10, 180]} />
          <meshBasicMaterial color="#a18aff" transparent opacity={0.5} />
        </mesh>
      </Float>
      <primitive object={instanced} />
      {lines.map((line, index) => <Line key={index} points={line} color={index % 3 === 0 ? '#82f4d5' : '#62e8ff'} transparent opacity={0.115} lineWidth={0.4} />)}
      <Sparkles count={145} scale={[12, 9, 12]} size={1.15} speed={0.15} color="#bcecff" noise={1.0} />
    </group>
  );
}

function RailTunnel({ progressRef }) {
  const group = useRef();
  const rings = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ z: -i * 2.1, scale: 2.5 + (i % 4) * 0.42 })), []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const p = progressRef.current;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.08 + p * 0.65;
    group.current.rotation.y = Math.sin(p * Math.PI) * 0.18;
    group.current.position.z = -p * 8.5;
  });
  return <group ref={group}>{rings.map((ring, i) => <mesh key={i} position={[0,0,ring.z]} rotation={[0.2+i*0.035, i*0.11, i*0.07]} scale={ring.scale}><torusGeometry args={[1,0.0065,8,140]} /><meshBasicMaterial color={i % 2 ? '#62e8ff' : '#9a78ff'} transparent opacity={0.09 + (i === 6 ? 0.12 : 0)} /></mesh>)}</group>;
}

function SceneFloor({ progressRef }) {
  const grid = useRef();
  useFrame(({ clock }) => {
    const p = progressRef.current;
    if (!grid.current) return;
    grid.current.rotation.z = Math.sin(clock.elapsedTime*0.1 + p) * 0.03;
    grid.current.position.y = -2.5 + p * 0.8;
    grid.current.scale.setScalar(1 + p * 0.24);
  });
  return <group ref={grid} position={[0,-2.5,-2]}><gridHelper args={[18, 24, '#16343b', '#0b161b']} rotation={[0,0,0]} /></group>;
}

function CameraRig({ progressRef }) {
  const { camera } = useThree();
  useFrame(({ clock, mouse }) => {
    const p = progressRef.current;
    const t = p * Math.PI * 2;
    const targetX = Math.sin(t * 0.55) * (1.7 + p * 0.9) + mouse.x * 0.24;
    const targetY = Math.cos(t * 0.7) * (0.65 + p * 0.6) + mouse.y * 0.14;
    const targetZ = 8.5 - p * 6.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.7, 1/60);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.7, 1/60);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.3, 1/60);
    camera.lookAt(Math.sin(p * Math.PI) * 0.3, 0, -p * 2.2);
    camera.rotation.z = Math.sin(clock.elapsedTime * 0.12 + t) * 0.018;
  });
  return null;
}

export default function CinematicScene({ progressRef }) {
  return (
    <Canvas dpr={[1,1.6]} camera={{ position:[0,0,8.5], fov:33, near:0.1, far:70 }} gl={{ antialias:true, alpha:true, powerPreference:'high-performance' }} fallback={<div className="webgl-fallback" aria-hidden="true" />}>
      <fog attach="fog" args={['#040607', 6, 26]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[4,3,4]} intensity={17} distance={14} color="#59deff" />
      <pointLight position={[-4,-1,2]} intensity={11} distance={12} color="#8d67ff" />
      <pointLight position={[0,-3,-3]} intensity={8} distance={10} color="#6ff4ca" />
      <RailTunnel progressRef={progressRef} />
      <SceneFloor progressRef={progressRef} />
      <NeuralField progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </Canvas>
  );
}
