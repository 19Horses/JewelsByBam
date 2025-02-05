import { Bounds, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import PropTypes from "prop-types";
import { memo, useRef, useState } from "react";
import * as THREE from "three";

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};

GrillCanvas.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};

function Model({ src, name }) {
  const mesh = useRef();
  const { nodes } = useGLTF(src);
  const [dummy] = useState(() => new THREE.Object3D());
  const { pointer } = useThree();
  const [isMouseOver, setIsMouseOver] = useState(false);

  useFrame((state, dt) => {
    console.log(dummy);
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
    <mesh
      ref={mesh}
      castShadow
      receiveShadow
      geometry={nodes[name].geometry}
      material={nodes[name].material}
      onPointerEnter={() => setIsMouseOver(true)}
      onPointerLeave={() => setIsMouseOver(false)}
    ></mesh>
  );
}

export function GrillCanvas({ src, name }) {
  console.log("hey");
  return (
    <Canvas className="model logo h-full" camera={{ position: [0, 10, 3] }}>
      <Bounds fit clip observe margin={1.2}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Model src={src} name={name} />
      </Bounds>
    </Canvas>
  );
}
