import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { FilterOptionsState } from "@material-ui/lab";
import React, { useState } from "react";
import { Option, Options } from "../../util/Type";
import { getLibelle } from "../../util/Utils";
import { BoutonOperationEnCours } from "../../widget/attente/BoutonOperationEnCours";
import { ChampRecherche } from "../../widget/formulaire/champRecherche/ChampRechercheField";
import "./scss/TransfertPopin.scss";

interface TransfertPopinProps {
  open: boolean;
  onClose: () => void;
  onValidate: (entite: Option | undefined) => void;
  options: Options;
  titre: string;
}

export const TransfertPopin: React.FC<TransfertPopinProps> = ({
  open,
  onClose,
  onValidate,
  options,
  titre
}) => {
  const [optionChoisie, setOptionChoisie] = useState<Option>({
    value: "",
    str: ""
  });
  const [validerDesactive, setvaliderDesactive] = useState<boolean>(true);

  const filterOptions = (
    optionsAutocomplete: Option[],
    state: FilterOptionsState<Option>
  ) => {
    return optionsAutocomplete.filter(option => {
      return option.str
        .toLowerCase()
        .startsWith(state.inputValue.toLowerCase());
    });
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="PopinTransfert"
        onClick={(e: any) => {
          if (e) {
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle>{getLibelle(titre)}</DialogTitle>
        <DialogContent>
          <ChampRecherche
            componentName="TransfertPopin"
            options={options}
            onClickClear={() => {
              setvaliderDesactive(true);
              setOptionChoisie({ value: "", str: "" });
            }}
            value={optionChoisie}
            filterOptions={filterOptions}
            onChange={newValue => {
              if (newValue && newValue.str) {
                setOptionChoisie(newValue);
                setvaliderDesactive(false);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <button type="button" onClick={onClose}>
            {getLibelle("Annuler")}
          </button>
          <BoutonOperationEnCours
            onClick={() => onValidate(optionChoisie)}
            estDesactive={validerDesactive}
          >
            {getLibelle("Valider")}
          </BoutonOperationEnCours>
        </DialogActions>
      </Dialog>
    </>
  );
};
