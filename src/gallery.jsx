import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Flex, Box } from "@react-three/flex";

FinalModelWithDescriptor.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
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
    <Flex justifyContent="center" alignItems="center">
      <Box centerAnchor width="auto" height="auto">
        <mesh ref={mesh} geometry={nodes[props.name].geometry} {...props}>
          <meshNormalMaterial />
        </mesh>
      </Box>
    </Flex>
  );
}

function FinalModelWithDescriptor({ title, description, src, name }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="flex cursor-pointer h-auto"
    >
      <Canvas className="model logo h-full" camera={{ position: [.3, .1, 3] }}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Model src={src} name={name} isMouseOver={isMouseOver} />
      </Canvas>
      <p className="descriptor entranceText">{title}</p>
    </div>
  );
}

const models = [
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "SOLID CAP WITH WIRE GATE INSPIRATION",
    type: "g"
  },
  {
    src: "./pumpkin_scan.glb",
    name: "Pumpkin",
    title: "SUPA SHINY STRETCHY STAR",
    type: "g"
  },
  {
    src: "./29_04_2024.glb",
    name: "mesh_0",
    title: "SPIRALLY BOW for LAYAL",
    type: "g"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "DOUBLE ANKH CAP for TYLA",
    type: "g"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "SOLID AND WINDOW for DAVE",
    type: "g"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "CLASSIC WINDOW for ORLA",
    type: "g"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "DOUBLE ABSTRACT CAP for NICK",
    type: "g"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
    type: "r"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
    type: "r"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
    type: "r"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
    type: "r"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
    type: "r"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
    type: "r"
  },
  {
    src: "./suzanne.glb",
    name: "Suzanne",
    title: "LITTLE BOW RING NO.2",
    type: "r"
  },
];

export default function Gallery() {
  return (
    <>
    
      <div
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
        
      </div>
    </>
  );
}
