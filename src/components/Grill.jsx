import { Bounds, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useSpring, animated, config } from "@react-spring/three";

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};

GrillCanvas.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};

function Model({ src, name }) {
  const { nodes } = useGLTF(src);
  const mesh = useRef();
  const [dummy] = useState(() => new THREE.Object3D());
  const { pointer } = useThree();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [size, setSize] = useState();

  useEffect(() => {
    if (mesh.current) {
      const bbox = new THREE.Box3().setFromObject(mesh.current);
      const size = bbox.getSize(new THREE.Vector3());
      setSize(size.x);
    }
  }, [nodes]);

  function setScale() {
    const multiplier = size < 2 ? 6 : 1;
    const scale = 7 * multiplier;
    if (clicked) {
      return scale + 1;
    }

    if (isMouseOver) {
      return scale + 0.4;
    }

    return scale;
  }

  const { scale, position } = useSpring({
    scale: setScale(),
    position: clicked ? [0, -2, 0] : [-6, -3, 0],
    config: config.gentle,
  });

  useFrame((state, dt) => {
    const step = 0.1;
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 50, step);
    if (isMouseOver) {
      dummy.lookAt(pointer.x, pointer.y, 1);
    } else {
      dummy.lookAt(0, 0, 1);
    }
    easing.dampQ(mesh.current.quaternion, dummy.quaternion, 0.15, dt);
  });

  return (
    <animated.mesh
      ref={mesh}
      castShadow
      receiveShadow
      geometry={nodes[name].geometry}
      material={nodes[name].material}
      scale={scale}
      position={position}
      onClick={() => setClicked(!clicked)}
      onPointerEnter={() => setIsMouseOver(true)}
      onPointerLeave={() => setIsMouseOver(false)}
    ></animated.mesh>
  );
}

export function GrillCanvas({ src, name }) {
  return (
    <Canvas className="logo h-full" camera={{ position: [0, 10, 3] }}>
      <Bounds clip observe margin={1.2}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Model src={src} name={name} />
      </Bounds>
    </Canvas>
  );
}
