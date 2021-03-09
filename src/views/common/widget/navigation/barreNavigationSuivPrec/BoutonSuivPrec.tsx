import React from "react";
import { getLibelle } from "../../Text";
import { Button } from "reakit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import "./sass/BoutonSuivPrec.scss";

export interface BoutonSuivPrecProps {
  direction: "left" | "right";
  index: number;
  max: number;
  setIndex: (index: number) => void;
}

export const BoutonSuivPrec: React.FC<BoutonSuivPrecProps> = ({
  direction,
  index,
  max,
  setIndex
}) => {
  return (
    <div
      className={"BoutonSuivPrec"}
      onClick={() => {
        changeIndexRequete(index, max, direction, setIndex);
      }}
    >
      <Button
        className="BoutonSuivPrecItem"
        id={`button-navigation-${direction}`}
        disabled={isDisabled(direction, index, max)}
        title={getLibelle(direction === "left" ? "Précédent" : "Suivant")}
      >
        <FontAwesomeIcon
          icon={
            direction === "left" ? faChevronCircleLeft : faChevronCircleRight
          }
        />
      </Button>
    </div>
  );
};

function isDisabled(
  direction: "left" | "right",
  index: number,
  max: number
): boolean {
  if (direction === "right") {
    return index >= max - 1;
  }
  return index <= 0;
}

function changeIndexRequete(
  index: number,
  max: number,
  direction: "left" | "right",
  setIndexRequete: (newIdx: number) => void
) {
  if (direction === "left") {
    setIndexRequete(Math.max(0, index - 1));
  } else {
    setIndexRequete(Math.min(max - 1, index + 1));
  }
}
