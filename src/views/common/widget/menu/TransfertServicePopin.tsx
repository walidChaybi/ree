import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { storeRece } from "../../util/storeRece";
import { Option, Options } from "../../util/Type";
import { BoutonOperationEnCours } from "../attente/BoutonOperationEnCours";
import { getLibelle } from "../Text";
import "./scss/TransfertServicePopin.scss";

interface TransfertServicePopinProps {
  open: boolean;
  onClose: () => void;
  onValidate: (entite: Option) => void;
}

export const TransfertServicePopin: React.FC<TransfertServicePopinProps> = ({
  open,
  onClose,
  onValidate
}) => {
  const [entiteChoisie, setEntiteChoisie] = useState<Option>({
    value: "",
    str: ""
  });
  const [validerDesactive, setvaliderDesactive] = useState<boolean>(true);

  function listeEntiteToOptions(): Options {
    return storeRece.listeEntite.map(entite => {
      return { value: entite.idEntite, str: entite.libelleEntite };
    });
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="PopinService"
      >
        <DialogTitle>{getLibelle("Transfert à un service")}</DialogTitle>
        <DialogContent>
          <Autocomplete
            data-testid="autocomplete"
            className="Autocomplete"
            noOptionsText={getLibelle("Aucun résultats")}
            getOptionLabel={(option: Option) => option.str}
            getOptionSelected={(option, val) => {
              return option.value === val.value;
            }}
            options={listeEntiteToOptions()}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setEntiteChoisie(newValue);
                setvaliderDesactive(false);
              }
            }}
            renderInput={params => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  placeholder={"Recherche..."}
                  {...params.inputProps}
                  aria-label={"Recherche service"}
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
            onClick={() => onValidate(entiteChoisie)}
            estDesactive={validerDesactive}
          >
            {getLibelle("Valider")}
          </BoutonOperationEnCours>
        </DialogActions>
      </Dialog>
    </>
  );
};
