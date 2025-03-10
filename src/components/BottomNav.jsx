import items from "../items.json";
import PropTypes from "prop-types";

BottomNav.propTypes = {
  itemIndex: PropTypes.number,
  onNav: PropTypes.func,
};

export function BottomNav({ itemIndex, onNav }) {
  return (
    <div className="bottom-nav">
      {items.map((item, i) => {
        return (
          <p
            onClick={() => onNav(i)}
            key={item.title}
            className={`bottom-nav-item ${itemIndex === i ? "selected" : ""}`}
          >
            {i + 1}
          </p>
        );
      })}
    </div>
  );
}
