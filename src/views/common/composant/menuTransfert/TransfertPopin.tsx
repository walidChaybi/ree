import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { Option, Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import { ChampRecherche } from "@widget/formulaire/champRecherche/ChampRechercheField";
import React, { useEffect, useState } from "react";
import "./scss/TransfertPopin.scss";

const OPTION_VIDE: Option = {
  cle: "",
  libelle: ""
};

interface TransfertPopinProps {
  open: boolean;
  onClose: () => void;
  onValidate: (service: Option | undefined, texte?: string) => void;
  options?: Options;
  titre: string;
  libelleAvantTexte?: string;
  placeholder?: string;
}

export const TransfertPopin: React.FC<TransfertPopinProps> = ({
  open,
  onClose,
  onValidate,
  options,
  titre,
  libelleAvantTexte,
  placeholder
}) => {
  const [optionChoisie, setOptionChoisie] = useState<Option>(OPTION_VIDE);
  const [texte, setTexte] = useState<string>();

  useEffect(() => {
    open && setOptionChoisie(OPTION_VIDE);
  }, [open]);

  const filterOptions = (
    optionsAutocomplete: Options,
    state: FilterOptionsState<Option>
  ) => {
    return optionsAutocomplete.filter(option => {
      return option.libelle
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
          {options && (
            <ChampRecherche
              componentName="TransfertPopin"
              options={options}
              onClickClear={() => {
                setOptionChoisie({ cle: "", libelle: "" });
              }}
              value={optionChoisie}
              filterOptions={filterOptions}
              onChange={newValue => {
                if (newValue && newValue.libelle) {
                  setOptionChoisie(newValue);
                }
              }}
            />
          )}
          {placeholder && (
            <>
              {libelleAvantTexte && <h5>{libelleAvantTexte}</h5>}
              <textarea
                placeholder={placeholder}
                value={texte}
                onChange={e => {
                  setTexte(e.target.value);
                }}
              ></textarea>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <button type="button" onClick={onClose}>
            {getLibelle("Annuler")}
          </button>
          <BoutonOperationEnCours
            onClick={() => onValidate(optionChoisie, texte)}
            estDesactive={estDesactive(
              optionChoisie,
              texte,
              Boolean(placeholder),
              Boolean(options)
            )}
          >
            {getLibelle("Valider")}
          </BoutonOperationEnCours>
        </DialogActions>
      </Dialog>
    </>
  );
};

function estDesactive(
  optionChoisie: Option,
  texte?: string,
  zoneTextePresente = false,
  selectPresent = false
): boolean {
  return (
    (zoneTextePresente &&
      (!texte || (selectPresent && optionChoisie.cle === ""))) ||
    (!zoneTextePresente && optionChoisie.cle === "")
  );
}
