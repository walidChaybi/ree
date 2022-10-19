import { formatLigne } from "@util/Utils";
import React from "react";

interface ItemMultiLignesProps {
  label?: string;
  classNameMultilignes?: string;
  modeColumn?: boolean;
  visible?: boolean;
}

export const ItemMultiLignes: React.FC<ItemMultiLignesProps> = ({
  children,
  modeColumn = false,
  visible = true,
  ...props
}) => {
  const classNameConteneur = formatLigne(
    ["ligne", modeColumn && "column"],
    " "
  );
  props.classNameMultilignes = formatLigne(
    [!modeColumn && "multilignes", props.classNameMultilignes],
    " "
  );

  return visible ? (
    <div className={classNameConteneur}>
      {props.label && <div className="titre">{props.label}</div>}

      <div className={props.classNameMultilignes}>{children}</div>
    </div>
  ) : null;
};
