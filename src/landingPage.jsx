import { Splat, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <motion.div
      style={{ height: "100%" }}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <Link to="/works">
        <p className="entranceText text-red-800 z-10">LINK TO ITEMS</p>
      </Link>
      <Canvas>
        <OrbitControls autoRotate autoRotateSpeed={4} />
        <Splat src="https://huggingface.co/datasets/mkprma/splats/resolve/main/roomSplat.splat" />
      </Canvas>
    </motion.div>
  );
}
