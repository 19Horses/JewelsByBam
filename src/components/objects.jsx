import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import * as THREE from "three";

export function Model(props) {
  const mesh = useRef();
  const { nodes } = useGLTF(props.src);
  const [dummy] = useState(() => new THREE.Object3D());

  useFrame((state, dt) => {
    const step = 0.1;
    state.camera.fov = THREE.MathUtils.lerp(
      state.camera.fov,
      props.zoom ? 30 : 50,
      step
    );
    if (props.isMouseOver) {
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
      geometry={nodes[props.name].geometry}
      material={nodes[props.name].material}
    ></mesh>
  );
}

export function FinalModelWithDescriptor({
  src,
  name,
  material,
  zoomedIn,
  animatingIn,
  animatingOut,
  hoverState,
  setZoomedIn,
  setAnimatingIn,
  setAnimatingOut,
  animationRef,
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <Suspense fallback={null}>
      {src && name && (
        <div
          ref={animationRef}
          onClick={() => {
            setZoomedIn(!zoomedIn);
            console.log(zoomedIn);
          }}
          className={`transition-transform duration-300 ease-in-out w-full h-full  ${
            animatingIn ? "grillsIn" : ""
          } ${animatingOut ? "grillsOut" : ""} ${
            hoverState ? "scale-125" : "scale-100"
          }`}
          onAnimationEnd={() => {
            if (animatingOut) {
              setAnimatingOut(false);
              setAnimatingIn(true);
            } else if (animatingIn) {
              setAnimatingIn(false);
            }
          }}
          onMouseEnter={() => {
            setIsMouseOver(true);
          }}
          onMouseLeave={() => {
            setIsMouseOver(false);
          }}
        >
          <Model
            src={src}
            material={material}
            name={name}
            isMouseOver={isMouseOver}
          />
        </div>
      )}
    </Suspense>
  );
}

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  material: PropTypes.string,
  isMouseOver: PropTypes.bool,
  zoom: PropTypes.bool,
};

FinalModelWithDescriptor.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
  material: PropTypes.string,
  grillMaterial: PropTypes.string,
  madeFor: PropTypes.string,
  zoomedIn: PropTypes.bool,
  animatingIn: PropTypes.bool,
  animatingOut: PropTypes.bool,
  hoverState: PropTypes.bool,
  setZoomedIn: PropTypes.func,
  setAnimatingIn: PropTypes.func,
  setAnimatingOut: PropTypes.func,
  animationRef: PropTypes.object,
};
