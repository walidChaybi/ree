import React, { ReactNode, useEffect, useState } from "react";
import { OperationEnCours } from "./OperationEnCours";

interface BoutonOperationEnCoursProps {
  onClick: (...args: any[]) => any | void;
  class?: string;
  estDesactive?: boolean;
  children: ReactNode;
  visible?: boolean;
  title?: string;
}

export const BoutonOperationEnCours: React.FC<BoutonOperationEnCoursProps> = props => {
  const [opEnCours, setOpEnCours] = useState<boolean>(false);

  const handleClick = () => {
    setOpEnCours(true);
    props.onClick();
  };

  useEffect(() => {
    if (props.visible !== undefined) {
      setOpEnCours(props.visible);
    }
  }, [props.visible]);

  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={() => setOpEnCours(false)}
      ></OperationEnCours>
      <button
        title={props.title}
        className={props.class}
        type="button"
        disabled={props.estDesactive}
        onClick={handleClick}
      >
        {props.children}
      </button>
    </>
  );
};
