import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { container, item } from "./framerVariants";
import { models } from "./models";
import items from "../items.json";

FinalModelWithDescriptor.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
};

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  isMouseOver: PropTypes.bool,
};

function Model(props) {
  const mesh = useRef();
  const { nodes } = useGLTF(props.src);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
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
      className="min-h-dvh flex items-center justify-center flex-col p-4"
    >
      <Canvas className="logo h-full" camera={{ position: [0, 0.1, 3] }}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Model src={src} name={name} isMouseOver={isMouseOver} />
      </Canvas>
      <p className="mobile-descriptor">{title}</p>
    </motion.div>
  );
}

export default function MobileGallery() {
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
      {items.map((model) => {
        return (
          <FinalModelWithDescriptor
            key={model.title}
            name={model.name}
            src={model.src}
            title={model.title}
          />
        );
      })}
    </motion.div>
  );
}
