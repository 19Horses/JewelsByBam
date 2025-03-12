import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";
import { Vector3 } from "three";
import items from "./items.json";

export default function LandingPage() {
  useGLTF.preload(items[0].src, true);
  const gltf = useLoader(GLTFLoader, "./studio.glb");
  const { progress, loaded, total } = useProgress();
  const [isZoomedOut, setIsZoomedOut] = useState(true);

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      const targetPosition = isZoomedOut
        ? new Vector3(3, 3, 3)
        : new Vector3(1, 1, 2);
      const targetLookAt = isZoomedOut
        ? new Vector3(0, 0, 0)
        : new Vector3(0, 1, 0);

      camera.position.lerp(targetPosition, delta * 3);
      camera.lookAt(targetLookAt);
    });
    return null;
  };

  return (
    <>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <CameraController />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <primitive position={[0, 1, 0]} object={gltf.scene} />
      </Canvas>
      <button
        className={`toggle ${isZoomedOut ? "" : "in"}`}
        onClick={() => setIsZoomedOut(!isZoomedOut)}
      >
        ↓
      </button>
      {total === loaded ? (
        <Link to="/works">
          <p className="loading-text">Enter studio</p>
        </Link>
      ) : (
        <p className="loading-text">Loading studio: {Math.floor(progress)}%</p>
      )}
    </>
  );
}
