import React from "react";

export interface IConteneurElementContext<
  TData,
  TIdentifiant,
  TEvenement extends React.SyntheticEvent
> {
  data: TData;
  identifiant: TIdentifiant;
  estSelectionne: boolean;
  estDesactive: boolean;
  handleInteractionUtilisateur: (
    event: TEvenement,
    data: TData,
    cle?: string
  ) => void;
}

export const ConteneurElementContext = React.createContext<
  IConteneurElementContext<any, any, any>
>(undefined as any);
