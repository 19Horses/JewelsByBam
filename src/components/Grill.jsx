import { Bounds, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

Model.propTypes = {
  src: PropTypes.string,
  onZoom: PropTypes.func,
};

GrillCanvas.propTypes = {
  src: PropTypes.string,
  onZoom: PropTypes.func,
};

function Model({ src, onZoom }) {
  const { nodes } = useGLTF(src, true);
  const meshRef = useRef();
  const [dummy] = useState(() => new THREE.Object3D());
  const { pointer } = useThree();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (isMouseOver && !clicked) {
      document.body.className = "cursor-zoom-in";
    } else if (isMouseOver && clicked) {
      document.body.className = "cursor-zoom-out";
    } else {
      document.body.className = "";
    }
  }, [clicked, isMouseOver]);

  useFrame((state, dt) => {
    const step = 0.1;
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 50, step);
    if (isMouseOver) {
      dummy.lookAt(pointer.x, pointer.y, 1);
    } else {
      dummy.lookAt(0, 0, 1);
    }
    easing.dampQ(meshRef.current.quaternion, dummy.quaternion, 0.15, dt);
  });

  const mesh = Object.values(nodes).filter((node) => node.isMesh)[0];

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      geometry={mesh.geometry}
      material={mesh.material}
      onClick={() => {
        onZoom();
        setClicked(!clicked);
      }}
      onPointerEnter={() => setIsMouseOver(true)}
      onPointerLeave={() => setIsMouseOver(false)}
    ></mesh>
  );
}

export function GrillCanvas({ src, onZoom }) {
  return (
    <Bounds fit clip observe margin={1.2}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <Model src={src} onZoom={onZoom} />
    </Bounds>
  );
}
