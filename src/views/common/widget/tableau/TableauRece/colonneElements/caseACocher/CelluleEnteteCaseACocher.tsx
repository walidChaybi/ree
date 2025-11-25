import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { ZERO } from "@util/Utils";
import React, { PropsWithChildren } from "react";
import { TChangeEventSurHTMLInputElement } from "../IColonneElementsParams";

interface ICelluleEnteteCaseACocher<TIdentifiant> extends CheckboxProps {
  identifiantsDeLaPage: TIdentifiant[];
  identifiantsSelectionnes: TIdentifiant[];
  handleChange: (event: TChangeEventSurHTMLInputElement) => void;
}

export const CelluleEnteteCaseACocher = <TIdentifiant,>({
  identifiantsDeLaPage: identifiantsDeLaPageProps,
  identifiantsSelectionnes: identifiantsSelectionnesProps,
  handleChange: handleChangeProps,
  ...props
}: PropsWithChildren<ICelluleEnteteCaseACocher<TIdentifiant>>): React.ReactElement => {
  const identifiantEstSelectionne = (identifiant: TIdentifiant): boolean => {
    return identifiantsSelectionnesProps.includes(identifiant);
  };

  const estDesactive = (): boolean => {
    return identifiantsDeLaPageProps.length === ZERO;
  };

  const estCochee = (): boolean => {
    return identifiantsDeLaPageProps.every(identifiantEstSelectionne);
  };

  const estIndeterminee = (): boolean => {
    return identifiantsDeLaPageProps.some(identifiantEstSelectionne) && !estCochee();
  };

  return (
    <Checkbox
      className={`entete-case-a-cocher ${props.className}`}
      checked={!estDesactive() && estCochee()}
      indeterminate={estIndeterminee()}
      onChange={handleChangeProps}
      disabled={estDesactive()}
      inputProps={{ "aria-label": "checkbox-header" }}
      style={{ padding: 0 }}
      {...props}
    />
  );
};
