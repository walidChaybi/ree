import React, { useRef } from "react";
import { DoubleSubmitUtil } from "../../util/DoubleSubmitUtil";

type BoutonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const TIME_OUT_MS = 1000;

export const Bouton: React.FC<BoutonProps> = props => {
  const boutonRef = useRef<HTMLButtonElement>(null);

  function onClickEmpecheDoubleSubmit(event: any) {
    if (props.onClick) {
      DoubleSubmitUtil.desactiveOnClick(boutonRef?.current);
      setTimeout(() => {
        DoubleSubmitUtil.reactiveOnClick(boutonRef?.current);
      }, TIME_OUT_MS);
      props.onClick(event);
    }
  }

  const boutonProps: BoutonProps = {
    ...props,
    onClick: onClickEmpecheDoubleSubmit,
    type: props.type || "button"
  };

  return (
    <button ref={boutonRef} {...boutonProps}>
      {props.children}
    </button>
  );
};
