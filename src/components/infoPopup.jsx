import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Typewriter from "typewriter-effect";
import { useState } from "react";

export const InfoPopup = () => {
  const [clicked, setClicked] = useState(false);
  const text1 =
    "BAM is a jewellery and grillz studio currently based in London, UK. Bam produces an evolving collection of ready to wear jewellery pieces as well as bespoke custom orders and tooth jewellery. Each piece is handcrafted in London with love, care and time. All pieces are made from recycled reclaimed silver and gold and conflict free gemstones.";
  const text2 = "BAM";

  const [headerText, setHeaderText] = useState(text2);

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

  const handleClick = () => {
    setClicked(!clicked);
    setHeaderText(clicked ? text2 : text1);
  };

  return (
    <div onClick={handleClick} className={``}>
      <a className={`header ${clicked ? "text-[#fa8072] text-[4vw]" : ""}`}>
        {wrapTextWithSpans(headerText)}
      </a>
      {clicked && <p className="cute-thing anim-bottom">૮ ˶ᵔ ᵕ ᵔ˶ ა</p>}
    </div>
  );
};
