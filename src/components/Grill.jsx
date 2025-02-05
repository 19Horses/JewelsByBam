import { Bounds, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import * as THREE from "three";

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  isMouseOver: PropTypes.bool,
};

GrillCanvas.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function Model({ src, isMouseOver, name }) {
  const mesh = useRef();
  const { nodes } = useGLTF(src);
  const [dummy] = useState(() => new THREE.Object3D());

  useFrame((state, dt) => {
    const step = 0.1;
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 50, step);
    if (isMouseOver) {
      dummy.lookAt(state.pointer.x, state.pointer.y, 1);
    } else {
      dummy.lookAt(0, 0, 1);
    }
    easing.dampQ(mesh.current.quaternion, dummy.quaternion, 0.15, dt);
  });

  return (
    <mesh
      ref={mesh}
      castShadow
      receiveShadow
      geometry={nodes[name].geometry}
      material={nodes[name].material}
    ></mesh>
  );
}

export function GrillCanvas({ src, name }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <motion.div
      variants={item}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className={`flex h-full `}
    >
      <Canvas className="model logo h-full" camera={{ position: [0, 10, 3] }}>
        <Bounds fit clip observe margin={1.2}>
          <ambientLight />
          <directionalLight position={[10, 10, 10]} />
          <Model src={src} name={name} isMouseOver={isMouseOver} />
        </Bounds>
      </Canvas>
    </motion.div>
  );
}
