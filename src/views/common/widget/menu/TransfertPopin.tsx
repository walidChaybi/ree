import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { Option, Options } from "../../util/Type";
import { BoutonOperationEnCours } from "../attente/BoutonOperationEnCours";
import { getLibelle } from "../Text";
import "./scss/TransfertPopin.scss";

interface TransfertPopinProps {
  open: boolean;
  onClose: () => void;
  onValidate: (entite: Option) => void;
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

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="PopinTransfert"
      >
        <DialogTitle>{getLibelle(titre)}</DialogTitle>
        <DialogContent>
          <Autocomplete
            data-testid="autocomplete"
            className="Autocomplete"
            noOptionsText={getLibelle("Aucun résultats")}
            getOptionLabel={(option: Option) => option.str}
            getOptionSelected={(option, val) => {
              return option.value === val.value;
            }}
            options={options}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setOptionChoisie(newValue);
                setvaliderDesactive(false);
              }
            }}
            renderInput={params => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  placeholder={"Recherche..."}
                  {...params.inputProps}
                  aria-label={"Recherche"}
                />
              </div>
            )}
            renderOption={option => {
              return <span key={option.value}>{option.str}</span>;
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
