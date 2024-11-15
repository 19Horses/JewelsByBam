import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import * as THREE from "three";
import { container, item } from "./framerVariants";
import { models } from "./models";

FinalModelWithDescriptor.propTypes = {
  title: PropTypes.title,
  src: PropTypes.string,
  name: PropTypes.string,
};

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  isMouseOver: PropTypes.bool,
};

function Model(props) {
  const mesh = useRef();
  const { nodes } = useGLTF(props.src);
  const [dummy] = useState(() => new THREE.Object3D());

  useFrame((state, dt) => {
    if (props.isMouseOver) {
      dummy.lookAt(state.pointer.x, state.pointer.y, 1);
    } else {
      dummy.lookAt(0, 0, 1);
    }
    easing.dampQ(mesh.current.quaternion, dummy.quaternion, 0.15, dt);
  });

  return (
    <mesh ref={mesh} geometry={nodes[props.name].geometry} {...props}>
      <meshNormalMaterial />
    </mesh>
  );
}

function FinalModelWithDescriptor({ title, src, name }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <motion.div
      variants={item}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="flex h-full cursor-pointer"
    >
      <Canvas className="model logo h-full" camera={{ position: [0, 0.1, 3] }}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Model src={src} name={name} isMouseOver={isMouseOver} />
      </Canvas>
      <p className="descriptor entranceText">{title}</p>
    </motion.div>
  );
}

export default function DesktopGallery() {
  return (
    <>
      <motion.div
        initial={"hidden"}
        animate={"show"}
        variants={container}
        className="grid grid-cols-4 grid-rows-2 grillGallery"
      >
        {models.map((model) => {
          return (
            <FinalModelWithDescriptor
              key={model.title}
              title={model.title}
              name={model.name}
              src={model.src}
            />
          );
        })}
      </motion.div>
    </>
  );
}
