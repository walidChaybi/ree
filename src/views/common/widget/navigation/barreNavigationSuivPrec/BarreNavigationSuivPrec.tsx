import React from "react";
import { BoutonSuivPrec } from "./BoutonSuivPrec";
import "./scss/BarreNavigationSuivPrec.scss";

interface ActionsProps {
  index: number;
  max: number;
  setIndex: (index: number) => void;
}

export const BarreNavigationSuivPrec: React.FC<React.PropsWithChildren<ActionsProps>> = ({ index, max, setIndex, children }) => {
  return (
    <div className="BarreNavigationSuivPrec">
      <BoutonSuivPrec
        direction={"left"}
        index={index}
        max={max}
        setIndex={setIndex}
      />
      <div className="EventButton">{children}</div>

      <BoutonSuivPrec
        direction={"right"}
        index={index}
        max={max}
        setIndex={setIndex}
      />
    </div>
  );
};
