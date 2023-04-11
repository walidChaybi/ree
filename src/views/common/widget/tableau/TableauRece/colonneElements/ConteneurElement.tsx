import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { PropsPartielles } from "@util/Utils";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ConteneurElementContext } from "./ConteneurElementContext";
import "./scss/ColonneElements.scss";

interface IConteneurElementProps<
  TData,
  TIdentifiant,
  TEvenement extends React.SyntheticEvent
> {
  identifiantCourant: TIdentifiant;
  data: TData;
  handleInteractionUtilisateur?: (
    event: TEvenement,
    data: TData,
    cle?: string
  ) => void;
  handleEstSelectionne?: (data: TData) => boolean;
  handleEstDesactive?: (data: TData) => boolean;
  handleAfficheAvertissement?: (
    estSelectionne: boolean,
    data: TData
  ) => boolean;
  messageInfoBulleEstDesactive?: string;
}

export type IConteneurElementPropsPartielles<
  TData,
  TIdentifiant,
  TEvenement extends React.SyntheticEvent
> = PropsPartielles<
  IConteneurElementProps<TData, TIdentifiant, TEvenement>,
  "identifiantCourant" | "data"
>;

const ConteneurElement = <
  TData,
  TIdentifiant,
  TEvenement extends React.SyntheticEvent
>({
  data: dataProps,
  handleEstSelectionne: handleEstSelectionneProps,
  handleEstDesactive: handleEstDesactiveProps,
  handleAfficheAvertissement: handleAfficheAvertissementProps,
  ...props
}: PropsWithChildren<
  IConteneurElementProps<TData, TIdentifiant, TEvenement>
>): React.ReactElement => {
  const [estSelectionne, setEstSelectionne] = useState<boolean>(false);
  const [estDesactive, setEstDesactive] = useState<boolean>(false);
  const [afficheAvertissement, setAfficheAvertissement] =
    useState<boolean>(false);

  const handleInteractionUtilisateur: (
    event: TEvenement,
    data: TData,
    cle?: string
  ) => void =
    props.handleInteractionUtilisateur ??
    ((event: TEvenement, data: TData, cle?: string) => {});

  useEffect(() => {
    handleEstSelectionneProps &&
      setEstSelectionne(handleEstSelectionneProps(dataProps));
  }, [handleEstSelectionneProps, dataProps]);

  useEffect(() => {
    handleEstDesactiveProps &&
      setEstDesactive(handleEstDesactiveProps(dataProps));
  }, [handleEstDesactiveProps, dataProps]);

  useEffect(() => {
    handleAfficheAvertissementProps &&
      !estDesactive &&
      setAfficheAvertissement(
        handleAfficheAvertissementProps(estSelectionne, dataProps)
      );
  }, [
    handleAfficheAvertissementProps,
    dataProps,
    estSelectionne,
    estDesactive
  ]);

  return (
    <ConteneurElementContext.Provider
      value={{
        data: dataProps,
        identifiant: props.identifiantCourant,
        estSelectionne,
        estDesactive,
        handleInteractionUtilisateur
      }}
    >
      <div
        className="conteneur-colonne-element"
        title={estDesactive ? props.messageInfoBulleEstDesactive : ""}
      >
        {props.children}
        {afficheAvertissement && <WarningIcon className="WarningIcon" />}
        {estDesactive && props.messageInfoBulleEstDesactive && (
          <InfoIcon className="InfoIcon" />
        )}
      </div>
    </ConteneurElementContext.Provider>
  );
};

export function getConteneurAvecElement<
  TData,
  TIdentifiant,
  TEvenement extends React.SyntheticEvent
>(
  conteneurPropsPartielles: IConteneurElementPropsPartielles<
    TData,
    TIdentifiant,
    TEvenement
  >,
  getIdentifiant: (data: TData) => TIdentifiant,
  filtreAffichageElement: (data: TData) => boolean,
  element: JSX.Element,
  data: TData
): JSX.Element {
  return (
    <ConteneurElement<TData, TIdentifiant, TEvenement>
      {...conteneurPropsPartielles}
      identifiantCourant={getIdentifiant(data)}
      data={data}
    >
      {filtreAffichageElement(data) ? element : <></>}
    </ConteneurElement>
  );
}
