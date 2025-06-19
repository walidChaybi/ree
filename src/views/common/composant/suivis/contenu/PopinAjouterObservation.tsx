import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { Formulaire } from "@widget/formulaire/Formulaire";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import FormBoutons, { FormBoutonsProps } from "@widget/popin/FormBoutons";
import React from "react";
import * as Yup from "yup";
import "../../../widget/popin/scss/PopinAjouter.scss";

export const OBSERVATION = "observation";

export interface IAjouterObservationFormValue {
  [OBSERVATION]: string;
}

// Valeurs par défaut des champs
const DefaultValues = {
  [OBSERVATION]: ""
};

const OBSERVATION_MAX_LENGTH = 500;

const NB_LIGNE_COMPLEMENT_DESCRIPTION = 10;

const OBSERVATION_LIMITE_TAILLE = `L'observation ne peut pas dépasser ${OBSERVATION_MAX_LENGTH} caractères`;

// Schéma de validation en sortie de champs
const ValidationSchema = Yup.object({
  [OBSERVATION]: Yup.string().max(OBSERVATION_MAX_LENGTH - 1, OBSERVATION_LIMITE_TAILLE)
});

interface PopinAjouterObservationProps {
  open: boolean;
  onClosePopin: () => void;
  onSubmit: (value: IAjouterObservationFormValue) => void;
  defaultValue?: {
    observation: string;
  };
}

export const PopinAjouterObservation: React.FC<PopinAjouterObservationProps> = ({ open, onClosePopin, onSubmit, defaultValue }) => {
  const boutonsProps = {
    onClosePopin
  } as FormBoutonsProps;

  return (
    <div className="PopinAjouter">
      <Dialog
        disablePortal={true}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Formulaire
            className="FormulaireAjouter"
            formDefaultValues={defaultValue ? defaultValue : DefaultValues}
            formValidationSchema={ValidationSchema}
            onSubmit={onSubmit}
          >
            <InputField
              name={OBSERVATION}
              component="textarea"
              label={"Saisissez l'observation"}
              placeholder={"Description"}
              rows={NB_LIGNE_COMPLEMENT_DESCRIPTION}
              maxLength={OBSERVATION_MAX_LENGTH.toString()}
            />
            <FormBoutons {...boutonsProps} />
          </Formulaire>
        </DialogContent>
      </Dialog>
    </div>
  );
};
