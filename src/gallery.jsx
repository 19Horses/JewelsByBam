import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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

export default function Gallery() {
  const [showGallery, setShowGallery] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState('hello');
  const [selectedName, setSelectedName] = useState('Suzanne');
  const [selectedSrc, setSelectedSrc] = useState('./suzanne.glb');

  function gallerySelector(src, name) {
    setSelectedName(name);
    setSelectedSrc(src);
  }

  return (
    <>
      <motion.div
        initial={"hidden"}
        animate={"show"}
        variants={container}
        className={`grid grid-cols-4 grid-rows-2 grillGallery `}
      >
        {models.map((model) => {
          return (
            <div
            className={`${showGallery ? '' : 'hidden'}`}
              key={model.title}
              onClick={()=> {
                console.log(model.title);
                setShowGallery(!showGallery);
                gallerySelector(model.src, model.name)
              }}
            >
            <FinalModelWithDescriptor
              key={model.title}
              title={model.title}
              name={model.name}
              src={model.src}
            />
            </div>
          );
        })}
        <div className= "absolute">
          <FinalModelWithDescriptor
              key={selectedTitle}
              title={selectedTitle}
              name={selectedName}
              src={selectedSrc}
          />
        </div>
      </motion.div>
      
    </>
  );
}
