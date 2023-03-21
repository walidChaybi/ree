import React from "react";

export interface IBaseInputParams {
  identifiantsSelectionnes: string[];
  getIdentifiant: (data: any) => string;
  handleEstDesactive?: (data: any) => boolean;
  messageEstDesactive?: string;
  handleAfficheAvertissement?: (estSelectionne: boolean, data: any) => boolean;
}

export interface IInputBodyConteneurParams extends IBaseInputParams {
  handleChildChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => void;
}

export interface IColonneInputParams extends IBaseInputParams {
  setIdentifiantsSelectionnes: React.Dispatch<React.SetStateAction<string[]>>;
  handleClickInput?: (estSelectionne: boolean, data: any) => void;
  contientHeader?: boolean;
}
