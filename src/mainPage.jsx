import { Suspense, useMemo, useState } from "react";
import { Footer } from "./components/footer";
import { InfoPopup } from "./components/infoPopup";
import { itemSwitch } from "./functions/menuFunctionality";
import items from "./items.json";
import { GrillCanvas } from "./components/Grill";
import { wrapTextWithSpans } from "./functions/wrapTextWithSpans";
import { isMobile } from "react-device-detect";

export default function Details() {
  const [itemIndex, setItemIndex] = useState(0);
  const [animatingIn, setAnimatingIn] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [zoomedOut, setZoomedOut] = useState(true);
  const [bioClick, setBioClick] = useState(false);

  const currentItem = useMemo(() => {
    return items[itemIndex];
  }, [itemIndex]);

  const previousItem = useMemo(() => {
    return itemIndex > 0 ? items[itemIndex - 1] : null;
  }, [itemIndex]);

  const nextItem = useMemo(() => {
    return itemIndex < items.length - 1 ? items[itemIndex + 1] : null;
  }, [itemIndex]);

  function NavButtons() {
    return (
      <div className={`nav-container`}>
        <div
          className={`nav-item left ${
            !animatingIn && !animatingOut ? "" : "pointer-events-none"
          }
            ${zoomedOut ? "" : "nav-item-anim-rev"} ${
            animatingOut ? "nav-item-anim" : ""
          } ${animatingIn ? "enter-from-left" : ""} ${isMobile ? "mobile" : ""}
            `}
          onClick={() => {
            itemSwitch(setAnimatingOut, setAnimatingIn, () =>
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
            ${zoomedOut ? "" : "nav-item-anim"} ${
            animatingOut ? "nav-item-anim-rev" : ""
          } ${animatingIn ? "enter-from-right" : ""} ${isMobile ? "mobile" : ""}
            `}
          onClick={() => {
            itemSwitch(setAnimatingOut, setAnimatingIn, () =>
              setItemIndex(itemIndex + 1)
            );
          }}
        >
          {nextItem && <p>{nextItem.title + " →"}</p>}
        </div>
      </div>
    );
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
            className={`grill-object ${
              zoomedOut ? "zoomed-out" : "zoomed-in"
            } ${isMobile ? "mobile" : ""} `}
          >
            <Suspense fallback={null}>
              {
                <div
                  onClick={() => {
                    setZoomedOut(!zoomedOut);
                  }}
                  className={`grill-object  ${animatingIn ? "grills-in" : ""} ${
                    animatingOut ? "grills-out" : ""
                  } 
                  ${zoomedOut ? "cursor-zoom-in" : "cursor-zoom-out"} ${
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
                  <GrillCanvas
                    key={currentItem.title}
                    name={currentItem.name}
                    src={currentItem.src}
                  />
                </div>
              }
            </Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
