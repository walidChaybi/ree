import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import React, { useEffect, useState } from "react";
import { IInputBodyConteneurParams } from "./InputParams";
import "./scss/ColonneInput.scss";

export const InputBodyConteneurContext = React.createContext({
  data: {},
  identifiant: "",
  estCochee: false,
  estDesactive: false,
  handleChildChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {}
});

interface IInputBodyConteneurProps {
  identifiantsSelectionnes: string[];
  identifiantCourant: string;
  data: any;
  handleChildChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => void;
  handleEstDesactive?: (data: any) => boolean;
  messageEstDesactive?: string;
  handleAfficheAvertissement?: (estCochee: boolean, data: any) => boolean;
}

const InputBodyConteneur: React.FC<IInputBodyConteneurProps> = ({
  data: dataProps,
  handleEstDesactive: handleEstDesactiveProps,
  handleAfficheAvertissement: handleAfficheAvertissementProps,
  ...props
}) => {
  const [afficheAvertissement, setAfficheAvertissement] =
    useState<boolean>(false);
  const [estDesactive, setEstDesactive] = useState<boolean>(false);
  const estCochee = props.identifiantsSelectionnes.includes(
    props.identifiantCourant
  );

  useEffect(() => {
    handleEstDesactiveProps &&
      setEstDesactive(handleEstDesactiveProps(dataProps));
  }, [handleEstDesactiveProps, dataProps]);

  useEffect(() => {
    handleAfficheAvertissementProps &&
      !estDesactive &&
      setAfficheAvertissement(
        handleAfficheAvertissementProps(estCochee, dataProps)
      );
  }, [handleAfficheAvertissementProps, dataProps, estCochee, estDesactive]);

  return (
    <InputBodyConteneurContext.Provider
      value={{
        data: dataProps,
        identifiant: props.identifiantCourant,
        estCochee,
        estDesactive,
        handleChildChange: props.handleChildChange
      }}
    >
      <div
        className="colonne-input-body"
        title={estDesactive ? props.messageEstDesactive : ""}
      >
        {props.children}
        {afficheAvertissement && <WarningIcon className="WarningIcon" />}
        {estDesactive && props.messageEstDesactive && (
          <InfoIcon className="InfoIcon" />
        )}
      </div>
    </InputBodyConteneurContext.Provider>
  );
};

export function getInputBodyConteneur(
  params: IInputBodyConteneurParams,
  inputChild: JSX.Element,
  data: any
): JSX.Element {
  return (
    <InputBodyConteneur
      identifiantsSelectionnes={params.identifiantsSelectionnes}
      identifiantCourant={params.getIdentifiant(data)}
      data={data}
      handleChildChange={params.handleChildChange}
      messageEstDesactive={params.messageEstDesactive}
      handleEstDesactive={params.handleEstDesactive}
      handleAfficheAvertissement={params.handleAfficheAvertissement}
    >
      {inputChild}
    </InputBodyConteneur>
  );
}
