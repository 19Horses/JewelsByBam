import { useGLTF, Bounds } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import items from "./items.json";
import { Suspense, useMemo } from "react";
import {
  useMenuFunctionality,
  itemSwitchTEMP,
} from "./functions/menuFunctionality";
import { Footer } from "./components/footer";
import { InfoPopup } from "./components/infoPopup";

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  material: PropTypes.string,
  isMouseOver: PropTypes.bool,
  zoom: PropTypes.bool,
};

Grill.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
  material: PropTypes.string,
  urlName: PropTypes.string,
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function Model(props) {
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

function Grill({ src, name, material }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <motion.div
      variants={item}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className={`flex h-full `}
    >
      <Canvas className="model logo h-full" camera={{ position: [0, 10, 3] }}>
        <Bounds fit clip observe margin={1.2}>
          <ambientLight />
          <directionalLight position={[10, 10, 10]} />
          <Model
            src={src}
            material={material}
            name={name}
            isMouseOver={isMouseOver}
          />
        </Bounds>
      </Canvas>
    </motion.div>
  );
}

function wrapTextWithSpans(text) {
  return text.split(" ").map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="word"
      style={{ "--index": index }}
    >
      {word}&nbsp;
    </span>
  ));
}

export default function Details() {
  const [itemIndex, setItemIndex] = useState(0);
  const [animatingIn, setAnimatingIn] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(true);
  const [bioClick, setBioClick] = useState(false);
  const [sectionCount, setSectionCount] = useState(10);

  const sectionRef = useRef(null);
  const animationRef = useMenuFunctionality(setAnimatingIn);
  const sectionDelaysRef = useRef([]);

  const currentItem = useMemo(() => {
    return items[itemIndex];
  }, [itemIndex]);

  const previousItem = useMemo(() => {
    return itemIndex > 0 ? items[itemIndex - 1] : null;
  }, [itemIndex]);

  const nextItemTEMP = useMemo(() => {
    return itemIndex < items.length - 1 ? items[itemIndex + 1] : null;
  }, [itemIndex]);

  function NavButtons() {
    return (
      <div className={`nav-container`}>
        <div
          className={`nav-item left ${
            !animatingIn && !animatingOut ? "" : "pointer-events-none "
          }
            ${zoomedIn ? "" : "nav-item-anim-rev"}
            `}
          onClick={() => {
            itemSwitchTEMP(setAnimatingOut, setAnimatingIn, () =>
              setItemIndex(itemIndex - 1)
            );
          }}
        >
          {previousItem && <p> {"← " + previousItem.title}</p>}
        </div>

        <div
          className={`nav-item right ${
            !animatingIn && !animatingOut ? "" : "pointer-events-none"
          }
            ${zoomedIn ? "" : "nav-item-anim"}
            `}
          onClick={() => {
            itemSwitchTEMP(setAnimatingOut, setAnimatingIn, () =>
              setItemIndex(itemIndex + 1)
            );
          }}
        >
          {nextItemTEMP && <p>{nextItemTEMP.title + " →"}</p>}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (sectionDelaysRef.current.length === 0) {
      sectionDelaysRef.current = Array.from({ length: sectionCount }).map(
        () => Math.random() * 10
      );
    }
  }, [sectionCount]);

  useEffect(() => {
    const updateSectionCount = () => {
      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const sectionHeight = sectionRef.current.offsetHeight;
          const viewportHeight = window.innerHeight;

          if (sectionHeight > 0) {
            const count = Math.ceil(viewportHeight / sectionHeight);
            setSectionCount(count);
            console.log("Viewport Height:", viewportHeight);
            console.log("Section Height:", sectionHeight);
            console.log("Section Count:", count);
          }
        }
      });
    };

    updateSectionCount();
    window.addEventListener("resize", updateSectionCount);

    return () => {
      window.removeEventListener("resize", updateSectionCount);
    };
  }, []);

  if (!currentItem) {
    return <p>hello</p>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          className={`header-container ${bioClick ? "px-5" : ""}`}
          onClick={() => setBioClick(!bioClick)}
        >
          <InfoPopup />
        </div>

        <div
          className={` w-full h-full relative transition-all duration-500 ${
            bioClick ? "blur-md pointer-events-none" : ""
          }`}
        >
          <NavButtons />
          <div
            className={`billboard-container
            ${zoomedIn ? "" : "zoomed-in"}`}
          >
            <section className={`h-full`}>
              <div className={`full-billboard`}>
                <p className="single-billboard">{currentItem.title}</p>
                <p className="single-billboard">{currentItem.title}</p>
              </div>
            </section>
          </div>
          <div
            className={`item-info-container ${
              zoomedIn ? "zoomed-out" : "zoomed-in"
            }`}
          >
            <p
              className={`item-info-header ${animatingOut ? "grills-out" : ""}`}
            >
              {wrapTextWithSpans(currentItem.title)}
            </p>
            <p
              key={currentItem.id}
              className={`item-info ${animatingOut ? "grills-out" : ""}`}
            >
              {wrapTextWithSpans(currentItem.grillMaterial)}
            </p>
          </div>
          <div
            className={`grill-object ${zoomedIn ? "zoomed-out" : "zoomed-in"} `}
          >
            <Suspense fallback={null}>
              {currentItem.src && currentItem.name && (
                <div
                  ref={animationRef}
                  onClick={() => {
                    setZoomedIn(!zoomedIn);
                    console.log(zoomedIn);
                  }}
                  className={`grill-object  ${animatingIn ? "grills-in" : ""} ${
                    animatingOut ? "grills-out" : ""
                  } 
                  ${zoomedIn ? "cursor-zoom-in" : "cursor-zoom-out"} ${
                    !animatingIn && !animatingOut
                      ? "pointer-events-auto"
                      : "pointer-events-none "
                  }
                  `}
                  onAnimationEnd={() => {
                    if (animatingOut) {
                      setAnimatingOut(false);
                    } else if (animatingIn) {
                      setAnimatingIn(false);
                    }
                  }}
                >
                  <Grill
                    key={currentItem.title}
                    title={currentItem.title}
                    name={currentItem.name}
                    material={currentItem.material}
                    grillMaterial={currentItem.grillMaterial}
                    madeFor={currentItem.madeFor}
                    src={currentItem.src.slice(1)}
                  />
                </div>
              )}
            </Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
