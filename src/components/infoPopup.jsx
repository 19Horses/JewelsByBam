import { useState } from "react";
import { wrapTextWithSpans } from "../functions/wrapTextWithSpans";
import { isMobile } from "react-device-detect";

export function InfoPopup() {
  const [showModal, setShowModal] = useState(false);
  const text1 =
    "BAM is a jewellery and grillz studio currently based in London, UK. Bam produces an evolving collection of ready to wear jewellery pieces as well as bespoke custom orders and tooth jewellery. Each piece is handcrafted in London with love, care and time. All pieces are made from recycled reclaimed silver and gold and conflict free gemstones.";
  const text2 = "BAM";

  const onClick = () => {
    setShowModal(!showModal);
  };

  const clickedStyle = {
    color: "#fa8072",
    fontSize: "4vw",
    width: "100%",
  };

  return (
    <>
      <p
        onClick={onClick}
        className={`header ${isMobile ? "mobile" : ""} header-container`}
      >
        {text2}
      </p>
      {showModal && (
        <div
          className={`modal header ${isMobile ? "mobile" : ""}`}
          onClick={onClick}
        >
          <a style={clickedStyle}>{wrapTextWithSpans(text1)}</a>
          <p className="cute-thing anim-bottom">૮ ˶ᵔ ᵕ ᵔ˶ ა</p>
        </div>
      )}
    </>
  );
}
