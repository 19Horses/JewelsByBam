import { OrbitControls, Text, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Fallback } from "./components/Fallback";
import pixels from "./fonts/PerfectoCalligraphy.ttf";
import items from "./items.json";

export default function LandingPage() {
  useGLTF.preload(items[0].src, true);
  const gltf = useLoader(GLTFLoader, "./studio.glb");
  const { progress, loaded, total } = useProgress();
  const [isZoomedOut, setIsZoomedOut] = useState(true);
  const [doneTransitioning, setDoneTransitioning] = useState(false);

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      const targetLookAt = isZoomedOut
        ? new Vector3(0, 0, 0)
        : new Vector3(0, 1, 0);
      camera.lookAt(targetLookAt);

      if (doneTransitioning) {
        return;
      }
      const targetPosition = isZoomedOut
        ? isMobile
          ? new Vector3(1, 5, 4)
          : new Vector3(3, 3, 3)
        : new Vector3(1, 1, 2);

      camera.position.lerp(targetPosition, delta * 3);
      if (camera.position.distanceTo(targetPosition) < 0.05) {
        setDoneTransitioning(true);
      }
    });
    return null;
  };

  return (
    <>
      <ErrorBoundary fallback={<Fallback />}>
        <Canvas camera={{ position: [10, 10, 10] }}>
          <CameraController />
          <ambientLight />
          <directionalLight position={[10, 10, 10]} />
          <OrbitControls
            enableZoom={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            enablePan={doneTransitioning}
            enableRotate={doneTransitioning}
          />
          <Text
            color="salmon"
            font={pixels}
            fontSize={0.15}
            position={[-0.7, 1, -1.2]}
          >
            {"Bambi"}
          </Text>
          <primitive position={[0, 1, 0]} object={gltf.scene} />
        </Canvas>
      </ErrorBoundary>
      <button
        className={`toggle ${isMobile ? "mobile" : ""} ${
          isZoomedOut ? "" : "in"
        }`}
        onClick={() => {
          setDoneTransitioning(false);
          setIsZoomedOut(!isZoomedOut);
        }}
      >
        ↓
      </button>
      {total === loaded ? (
        <Link to="/works">
          <p
            className={`loading-text ${isMobile ? "mobile" : ""} ${
              isZoomedOut ? "" : "in"
            }`}
          >
            Enter studio
          </p>
        </Link>
      ) : (
        <p
          className={`loading-text ${isMobile ? "mobile" : ""} ${
            isZoomedOut ? "" : "in"
          }`}
        >
          Loading studio: {Math.floor(progress)}%
        </p>
      )}
    </>
  );
}
