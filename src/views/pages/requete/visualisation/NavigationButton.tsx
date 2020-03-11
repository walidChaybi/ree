import React from "react";
import { Text } from "../../../common/widget/Text";
import { Button } from "reakit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import "./sass/NavigationButtons.scss";

export interface NavigationProps {
  direction: "left" | "right";
  indexRequete: number;
  maxRequetes: number;
  setIndexRequete: (index: number) => void;
}

export const NavigationButton: React.FC<NavigationProps> = ({
  indexRequete,
  setIndexRequete,
  maxRequetes,
  direction
}) => {
  return (
    <div
      className={`button-request ${direction}-button`}
      onClick={() => {
        changeIndexRequete(
          indexRequete,
          maxRequetes,
          direction,
          setIndexRequete
        );
      }}
    >
      {direction === "right" && (
        <span>
          <Text messageId={"pages.requetes.apercu.bouton.right"} />
        </span>
      )}
      <Button
        className="button-navigation-request"
        id={`button-navigation-${direction}`}
        disabled={isDisabled(direction, indexRequete, maxRequetes)}
      >
        <FontAwesomeIcon
          icon={
            direction === "left" ? faChevronCircleLeft : faChevronCircleRight
          }
        />
      </Button>
      {direction === "left" && (
        <span>
          <Text messageId={"pages.requetes.apercu.bouton.left"} />
        </span>
      )}
    </div>
  );
};

function isDisabled(
  direction: "left" | "right",
  indexRequete: number,
  maxRequetes: number
): boolean {
  if (direction === "right") {
    return indexRequete >= maxRequetes - 1;
  }
  return indexRequete <= 0;
}

function changeIndexRequete(
  indexRequete: number,
  maxRequetes: number,
  direction: "left" | "right",
  setIndexRequete: (newIdx: number) => void
) {
  if (direction === "left") {
    setIndexRequete(Math.max(0, indexRequete - 1));
  } else {
    setIndexRequete(Math.min(maxRequetes - 1, indexRequete + 1));
  }
}
