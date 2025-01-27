import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Typewriter from "typewriter-effect";
import { useState } from "react";

export const InfoPopup = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  return (
    <div>
      <a aria-describedby={id} onClick={handleClick} className=" header z-50 ">
        BAM
      </a>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
        <Box className="mx-3" sx={{ border: 1, p: 1 }}>
          <div className="typewriter">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(20)
                  .typeString(
                    "BAM is a jewellery and grillz studio currently based in London, UK."
                  )
                  .typeString(
                    "<br />Bam produces an evolving collection of ready to wear jewellery pieces as well as bespoke custom orders and tooth jewellery."
                  )
                  .typeString(
                    "<br />Each piece is handcrafted in London with love, care and time."
                  )
                  .typeString(
                    "<br />All pieces are made from recycled reclaimed silver and gold and conflict free gemstones. "
                  )
                  .typeString("<br />૮ ˶ᵔ ᵕ ᵔ˶ ა")
                  .start();
              }}
            />
          </div>
        </Box>
      </Popper>
    </div>
  );
};
