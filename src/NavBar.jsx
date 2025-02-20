import PropTypes from "prop-types";
import { useMemo } from "react";
import { isMobile } from "react-device-detect";
import { InfoPopup } from "./components/infoPopup";
import items from "./items.json";

NavBar.propTypes = {
  animatingIn: PropTypes.bool,
  animatingOut: PropTypes.bool,
  zoomedOut: PropTypes.bool,
  onNav: PropTypes.func,
  itemIndex: PropTypes.number,
};

export function NavBar({
  animatingIn,
  animatingOut,
  zoomedOut,
  onNav,
  itemIndex,
}) {
  const previousItem = useMemo(() => {
    return itemIndex > 0 ? items[itemIndex - 1] : null;
  }, [itemIndex]);

  const nextItem = useMemo(() => {
    return itemIndex < items.length - 1 ? items[itemIndex + 1] : null;
  }, [itemIndex]);

  return (
    <div className="nav-container">
      <div
        className={`nav-item left ${
          !animatingIn && !animatingOut ? "" : "pointer-events-none"
        }
          ${zoomedOut ? "" : "nav-item-anim-rev"}  ${
          animatingOut ? "nav-item-anim" : ""
        } ${animatingIn ? "enter-from-left" : ""} ${isMobile ? "mobile" : ""}
          `}
        onClick={() => {
          onNav(itemIndex - 1);
        }}
      >
        {previousItem && <p> {"← " + previousItem.title}</p>}
      </div>
      <InfoPopup />
      <div
        className={`nav-item right ${
          !animatingIn && !animatingOut ? "" : "pointer-events-none"
        }
          ${zoomedOut ? "" : "nav-item-anim"} ${
          animatingOut ? "nav-item-anim-rev" : ""
        } ${animatingIn ? "enter-from-right" : ""} ${isMobile ? "mobile" : ""}
          `}
        onClick={() => {
          onNav(itemIndex + 1);
        }}
      >
        {nextItem && <p>{nextItem.title + " →"}</p>}
      </div>
    </div>
  );
}
