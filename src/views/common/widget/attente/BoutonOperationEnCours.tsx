import { checkDirty } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { RECEContextActions, RECEContextData } from "../../../../contexts/RECEContextProvider";
import { OperationEnCours } from "./OperationEnCours";

interface BoutonOperationEnCoursProps {
  onClick: (...args: any[]) => any | void;
  class?: string;
  estDesactive?: boolean;
  children: ReactNode;
  toileDeFondVisible?: boolean;
  title?: string;
  checkDirtyActive?: boolean;
  id?: string;
  type?: "button" | "reset" | "submit";
  timeoutInMiliSec?: number;
}

export const BoutonOperationEnCours: React.FC<BoutonOperationEnCoursProps> = props => {
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const { decrets, isDirty } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const handleClick = () => {
    if (!props.checkDirtyActive || (props.checkDirtyActive && checkDirty(isDirty, setIsDirty))) {
      setOpEnCours(true);
      props.onClick();
    }
  };

  useEffect(() => {
    if (props.toileDeFondVisible !== undefined) {
      setOpEnCours(props.toileDeFondVisible);
    }
  }, [props.toileDeFondVisible]);

  return (
    <>
      <OperationEnCours
        visible={opEnCours || !decrets}
        onTimeoutEnd={() => setOpEnCours(false)}
        onClick={() => setOpEnCours(false)}
        timeoutInMiliSec={props.timeoutInMiliSec}
      ></OperationEnCours>
      <BoutonDoubleSubmit
        title={props.title}
        id={props.id}
        className={props.class}
        type={props.type ? props.type : "button"}
        disabled={props.estDesactive}
        onClick={handleClick}
      >
        {props.children}
      </BoutonDoubleSubmit>
    </>
  );
};
