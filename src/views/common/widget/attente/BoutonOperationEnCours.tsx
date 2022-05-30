import React, { ReactNode, useContext, useEffect, useState } from "react";
import { RECEContext } from "../../../core/body/Body";
import { checkDirty } from "../../util/Utils";
import { OperationEnCours } from "./OperationEnCours";

interface BoutonOperationEnCoursProps {
  onClick: (...args: any[]) => any | void;
  class?: string;
  estDesactive?: boolean;
  children: ReactNode;
  visible?: boolean;
  title?: string;
  checkDirtyActive?: boolean;
  id?: string;
}

export const BoutonOperationEnCours: React.FC<
  BoutonOperationEnCoursProps
> = props => {
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const handleClick = () => {
    if (
      !props.checkDirtyActive ||
      (props.checkDirtyActive && checkDirty(isDirty, setIsDirty))
    ) {
      setOpEnCours(true);
      props.onClick();
    }
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
        onClick={() => setOpEnCours(false)}
      ></OperationEnCours>
      <button
        title={props.title}
        id={props.id}
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
