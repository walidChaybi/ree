import React, { ReactNode, useContext, useEffect, useState } from "react";
import { RECEContext } from "../../../core/body/Body";
import { Bouton } from "../../composant/boutonAntiDoubleSubmit/Bouton";
import { checkDirty } from "../../util/Utils";
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
    if (props.toileDeFondVisible !== undefined) {
      setOpEnCours(props.toileDeFondVisible);
    }
  }, [props.toileDeFondVisible]);

  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={() => setOpEnCours(false)}
        onClick={() => setOpEnCours(false)}
      ></OperationEnCours>
      <Bouton
        title={props.title}
        id={props.id}
        className={props.class}
        type={props.type ? props.type : "button"}
        disabled={props.estDesactive}
        onClick={handleClick}
      >
        {props.children}
      </Bouton>
    </>
  );
};
