import { useState } from "react";
import { wrapTextWithSpans } from "../functions/wrapTextWithSpans";
import { isMobile } from "react-device-detect";

export const InfoPopup = () => {
  const [clicked, setClicked] = useState(false);
  const text1 =
    "BAM is a jewellery and grillz studio currently based in London, UK. Bam produces an evolving collection of ready to wear jewellery pieces as well as bespoke custom orders and tooth jewellery. Each piece is handcrafted in London with love, care and time. All pieces are made from recycled reclaimed silver and gold and conflict free gemstones.";
  const text2 = "BAM";

  const [headerText, setHeaderText] = useState(text2);

  const handleClick = () => {
    setClicked(!clicked);
    setHeaderText(clicked ? text2 : text1);
  };

  const clickedStyle = {
    color: "#fa8072",
    fontSize: "5vw",
    width: "100%",
  };

  return (
    <div onClick={handleClick}>
      <a
        style={clicked ? clickedStyle : {}}
        className={`header ${isMobile ? "mobile" : ""}`}
      >
        {wrapTextWithSpans(headerText)}
      </a>
      {clicked && <p className="cute-thing anim-bottom">૮ ˶ᵔ ᵕ ᵔ˶ ა</p>}
    </div>
  );
};
