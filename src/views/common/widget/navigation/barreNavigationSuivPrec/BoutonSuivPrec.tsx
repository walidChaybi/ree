import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import "./scss/BoutonSuivPrec.scss";

interface BoutonSuivPrecProps {
  direction: "left" | "right";
  index: number;
  max: number;
  setIndex: (index: number) => void;
}

export const BoutonSuivPrec: React.FC<BoutonSuivPrecProps> = ({ direction, index, max, setIndex }) => {
  return (
    <div
      className={"BoutonSuivPrec"}
      onClick={() => {
        changeIndexRequete(index, max, direction, setIndex);
      }}
    >
      <BoutonDoubleSubmit
        className="BoutonSuivPrecItem"
        id={`button-navigation-${direction}`}
        disabled={isDisabled(direction, index, max)}
        title={direction === "left" ? "Précédent" : "Suivant"}
        aria-label={direction === "left" ? "Précédent" : "Suivant"}
      >
        {direction === "left" ? <FaChevronCircleLeft aria-hidden /> : <FaChevronCircleRight aria-hidden />}
      </BoutonDoubleSubmit>
    </div>
  );
};

const isDisabled = (direction: "left" | "right", index: number, max: number): boolean => {
  if (direction === "right") {
    return index >= max - 1;
  }
  return index <= 0;
};

const changeIndexRequete = (index: number, max: number, direction: "left" | "right", setIndexRequete: (newIdx: number) => void) => {
  if (direction === "left") {
    setIndexRequete(Math.max(0, index - 1));
  } else {
    setIndexRequete(Math.min(max - 1, index + 1));
  }
};
