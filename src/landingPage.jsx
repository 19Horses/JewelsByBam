import { OrbitControls, Splat, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import items from "./items.json";

export default function LandingPage() {
  useGLTF.preload(items[0].src);
  return (
    <>
      <Link to="/works">
        <p className="entranceText text-red-800 z-10">LINK TO ITEMS</p>
      </Link>
      <Canvas>
        <OrbitControls autoRotate autoRotateSpeed={4} />
        <Splat src="https://huggingface.co/datasets/mkprma/splats/resolve/main/roomSplat.splat" />
      </Canvas>
    </>
  );
}
