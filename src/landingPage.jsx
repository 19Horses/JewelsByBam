import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import items from "./items.json";

export default function LandingPage() {
  const hey = useGLTF.preload(items[0].src, true);
  console.log(hey);
  const gltf = useLoader(GLTFLoader, "./studio.glb");

  const { progress, loaded, total } = useProgress();

  return (
    <>
      <Canvas camera={{ position: [4, 3, 3] }}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />
        <primitive position={[0, 1, 0]} object={gltf.scene} />
      </Canvas>
      {total === loaded ? (
        <Link to="/works">
          <p className="loading-text">Link to items</p>
        </Link>
      ) : (
        <p className="loading-text">Loading studio: {Math.floor(progress)}%</p>
      )}
    </>
  );
}
