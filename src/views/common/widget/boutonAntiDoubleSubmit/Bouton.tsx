import { DoubleClicUtil } from "@util/DoubleClicUtil";
import React, { useRef } from "react";

type BoutonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const TIME_OUT_MS = 1000;
const ARIA_LABEL = "aria-label";

export const Bouton: React.FC<BoutonProps> = props => {
  const boutonRef = useRef<HTMLButtonElement>(null);

  function onClickEmpecheDoubleSubmit(event: any) {
    if (props.onClick) {
      DoubleClicUtil.desactiveOnClick(boutonRef?.current);
      setTimeout(() => {
        DoubleClicUtil.reactiveOnClick(boutonRef?.current);
      }, TIME_OUT_MS);
      props.onClick(event);
    }
  }
  const ariaLabel = props[ARIA_LABEL]
    ? props[ARIA_LABEL]
    : typeof props.children === "string"
    ? props.children
    : "bouton";

  const boutonProps: BoutonProps = {
    ...props,
    onClick: onClickEmpecheDoubleSubmit,
    type: props.type || "button",
    [ARIA_LABEL]: ariaLabel
  };
  return (
    <button ref={boutonRef} {...boutonProps}>
      {props.children}
    </button>
  );
};
