import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import * as THREE from "three";

FinalModelWithDescriptor.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  isMouseOver: PropTypes.bool,
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: "easeInOut",
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

function FinalModelWithDescriptor({ src, name, isMouseOver }) {
  return (
    <Canvas className="model logo h-full" camera={{ position: [0, 0.1, 3] }}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <Model src={src} name={name} isMouseOver={isMouseOver} />
    </Canvas>
  );
}

const models = [
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "SOLID CAP WITH WIRE GATE INSPIRATION",
  },
  {
    src: "./pumpkin_scan.glb",
    name: "Pumpkin",
    title: "SUPA SHINY STRETCHY STAR",
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "SPIRALLY BOW for LAYAL",
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "DOUBLE ANKH CAP for TYLA",
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "SOLID AND WINDOW for DAVE",
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "CLASSIC WINDOW for ORLA",
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "DOUBLE ABSTRACT CAP for NICK",
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
  },
];

export default function MobileGallery() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleNext(),
    onSwipedDown: () => handlePrevious(),
    preventScrollOnSwipe: true,
  });

  const handleNext = () => {
    if (currentIndex < models.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <motion.div
      {...swipeHandlers}
      initial={"hidden"}
      animate={"show"}
      variants={container}
      className="min-h-dvh overflow-hidden flex flex-col transition-transform duration-500"
      style={{
        transform: `translateY(-${currentIndex * 100}vh)`,
      }}
    >
      {models.map((model) => {
        return (
          <motion.div
            key={model.title}
            variants={item}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            className="min-h-dvh flex items-center justify-center flex-col p-4"
          >
            <FinalModelWithDescriptor
              name={model.name}
              src={model.src}
              isMouseOver={isMouseOver}
            />
            <p className="mobile-descriptor">{model.title}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
