import pics from "../pics.json";
import PropTypes from "prop-types";

Polaroid.propTypes = {
  itemIndex: PropTypes.number,
  onNav: PropTypes.func,
};

export function Polaroid({ itemIndex, onNav }) {
  return (
    <div className="bottom-nav">
      {pics.map((pic, i) => {
        return (
          <div className="bottom-nav-item" key={i}>
            <img
              className="bottom-nav-item-img"
              src={pic.src}
              alt={pic.title}
              key={i}
              onClick={() => onNav(i)}
            />
          </div>
        );
      })}
    </div>
  );
}
