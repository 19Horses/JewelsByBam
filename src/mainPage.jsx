import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { Footer } from "./components/footer";
import { itemSwitch } from "./functions/menuFunctionality";
import { wrapTextWithSpans } from "./functions/wrapTextWithSpans";
import items from "./items.json";
import { NavBar } from "./NavBar";
import { GrillCanvas } from "./components/Grill";

export default function Details() {
  const [itemIndex, setItemIndex] = useState(0);
  const [animatingIn, setAnimatingIn] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [zoomedOut, setZoomedOut] = useState(true);

  const currentItem = useMemo(() => {
    return items[itemIndex];
  }, [itemIndex]);

  const onNav = useCallback((newIndex) => {
    itemSwitch(setAnimatingOut, setAnimatingIn, () => setItemIndex(newIndex));
  }, []);

  useEffect(() => {
    const next = items[itemIndex + 1];
    if (next) {
      useGLTF.preload(next.src, true);
    }
  }, [itemIndex]);

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
        <NavBar
          itemIndex={itemIndex}
          onNav={onNav}
          animatingIn={animatingIn}
          animatingOut={animatingOut}
          zoomedOut={zoomedOut}
        />
        <div className={` w-full h-full relative transition-all duration-500`}>
          <div className={`billboard-container ${isMobile ? "mobile" : ""}`}>
            <section className={`h-full`}>
              <div className={`full-billboard`}>
                <p className="single-billboard">{currentItem.title}</p>
                <p className="single-billboard">{currentItem.title}</p>
              </div>
            </section>
          </div>
          <div
            className={`item-info-container ${
              zoomedOut ? "zoomed-out" : "zoomed-in"
            } ${isMobile ? "mobile" : ""}`}
          >
            <p
              className={`item-info-header ${
                animatingOut ? "grills-out" : ""
              } ${isMobile ? "mobile" : ""}`}
            >
              {wrapTextWithSpans(currentItem.title)}
            </p>
            <p
              className={`item-info ${animatingOut ? "grills-out" : ""} ${
                isMobile ? "mobile" : ""
              }`}
            >
              {wrapTextWithSpans(currentItem.grillMaterial)}
            </p>
          </div>
          <div
            className={`grill-object ${isMobile ? "mobile" : ""} ${
              animatingIn ? "grills-in" : ""
            } ${animatingOut ? "grills-out" : ""} 
                  ${
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
            <Canvas className="logo h-full" camera={{ position: [0, 10, 3] }}>
              <Suspense fallback={null}>
                <GrillCanvas
                  src={currentItem.src}
                  onZoom={() => setZoomedOut(!zoomedOut)}
                />
              </Suspense>
            </Canvas>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
