"use client";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function FloatingShape() {
  return (
    // 🔴 THE FIX: Changed -z-10 to z-0 here 👇
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas className="h-full w-full">
        {/* Lights to make it shiny */}
        <ambientLight intensity={2} />
        <directionalLight position={[3, 2, 1]} intensity={3} />
        
        {/* The Floating Object */}
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#6b21a8" // Deep Cyber Purple
              attach="material"
              distort={0.4}   // How much it morphs
              speed={2}       // How fast it moves
              roughness={0.2} // Shiny but not mirror-like
              metalness={0.8} // Metallic look
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}