import { BoutonMenu, IBoutonMenuProps } from "@widget/boutonMenu/BoutonMenu";
import React from "react";
import {
  ConteneurElementContext,
  IConteneurElementContext
} from "../ConteneurElementContext";
import { TMouseEventSurHTMLButtonElement } from "../IColonneElementsParams";

export type ICelluleBoutonMenuProps = Omit<IBoutonMenuProps, "onClickMenuItem">;

export const CelluleBoutonMenu = <TData, TIdentifiant>(
  props: ICelluleBoutonMenuProps
): React.ReactElement => {
  const conteneurContext = React.useContext<
    IConteneurElementContext<
      TData,
      TIdentifiant,
      TMouseEventSurHTMLButtonElement
    >
  >(ConteneurElementContext);

  const onClickMenuItem = (key: string, event?: React.SyntheticEvent) => {
    event?.stopPropagation();
    conteneurContext.handleInteractionUtilisateur(
      event as TMouseEventSurHTMLButtonElement,
      conteneurContext.data,
      key
    );
  };

  return (
    <BoutonMenu
      {...props}
      onClickMenuItem={onClickMenuItem}
      disabled={conteneurContext.estDesactive}
    />
  );
};
