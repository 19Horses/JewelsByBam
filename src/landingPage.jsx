import { Splat, OrbitControls, } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.div
      style={{ height: "100%"}}
      initial={{opacity: 0, scale: 1.1}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 1.1}}
      transition={{
        duration: 1,
        ease: "easeInOut"
      }}
    >
      <Canvas>
        <OrbitControls 
          autoRotate
          autoRotateSpeed={4}
        />
        <Splat src = "https://huggingface.co/datasets/mkprma/splats/resolve/main/roomSplat.splat"/>
      </Canvas> 
    </motion.div>
  );
}