import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import items from "./items.json";

export default function LandingPage() {
  useGLTF.preload(items[0].src, true);
  const gltf = useLoader(GLTFLoader, "./studio.glb");
  return (
    <>
      <Link to="/works">
        <p className="entranceText text-red-800 z-10">LINK TO ITEMS</p>
      </Link>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableZoom={false}
        />
        <primitive object={gltf.scene} />
      </Canvas>
    </>
  );
}
