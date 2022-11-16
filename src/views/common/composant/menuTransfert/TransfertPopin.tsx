import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { FilterOptionsState } from "@material-ui/lab";
import { Option, Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import { ChampRecherche } from "@widget/formulaire/champRecherche/ChampRechercheField";
import React, { useState } from "react";
import "./scss/TransfertPopin.scss";

interface TransfertPopinProps {
  open: boolean;
  onClose: () => void;
  onValidate: (entite: Option | undefined, texte?: string) => void;
  options: Options;
  titre: string;
  zoneTexte?: boolean;
}

export const TransfertPopin: React.FC<TransfertPopinProps> = ({
  open,
  onClose,
  onValidate,
  options,
  titre,
  zoneTexte
}) => {
  const [optionChoisie, setOptionChoisie] = useState<Option>({
    value: "",
    str: ""
  });
  const [texte, setTexte] = useState<string>();

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
              setOptionChoisie({ value: "", str: "" });
            }}
            value={optionChoisie}
            filterOptions={filterOptions}
            onChange={newValue => {
              if (newValue && newValue.str) {
                setOptionChoisie(newValue);
              }
            }}
          />
          {zoneTexte && (
            <>
              <h5>{getLibelle("Message pour valideur :")}</h5>{" "}
              <textarea
                placeholder={getLibelle("Pouvez-vous vérifier mon travail ?")}
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
            estDesactive={estDesactive(optionChoisie, texte, zoneTexte)}
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
  zoneTexte = false
): boolean {
  return (
    (zoneTexte && (!texte || optionChoisie.value === "")) ||
    (!zoneTexte && optionChoisie.value === "")
  );
}
