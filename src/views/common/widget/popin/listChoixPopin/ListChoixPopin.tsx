import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { Option } from "@util/Type";
import { estNonRenseigne } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { SelectRece } from "@widget/formulaire/champsSaisie/SelectField";
import React, { useState } from "react";
import { getLibelle } from "./../../../util/Utils";

interface IListChoixPopinProps {
  titre: string;
  placeholder: string;
  ariaLabel: string;
  ouverte: boolean;
  options: Option[];
  onValidation: (id?: string) => void;
  onCancel: () => void;
}

export const ListChoixPopin: React.FunctionComponent<
  IListChoixPopinProps
> = props => {
  const [optionSelectionnee, setOptionSelectionnee] = useState();
  function onSelectionneOption(e: any) {
    setOptionSelectionnee(e.target.value);
  }

  return (
    <>
      <Dialog
        open={props.ouverte}
        aria-labelledby="popin liste de choix"
        onClick={(e: any) => {
          if (e) {
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle>{getLibelle(props.titre)}</DialogTitle>
        <DialogContent>
          <SelectRece
            options={props.options}
            placeholder={props.placeholder}
            onChange={onSelectionneOption}
            ariaLabel={props.ariaLabel}
          />
        </DialogContent>
        <DialogActions>
          <Bouton type="button" onClick={props.onCancel}>
            {getLibelle("Annuler")}
          </Bouton>
          <Bouton
            onClick={() => props.onValidation(optionSelectionnee)}
            disabled={estNonRenseigne(optionSelectionnee)}
          >
            {getLibelle("Valider")}
          </Bouton>
        </DialogActions>
      </Dialog>
    </>
  );
};
