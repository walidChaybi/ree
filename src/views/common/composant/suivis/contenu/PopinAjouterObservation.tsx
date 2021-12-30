import { Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import * as Yup from "yup";
import { getLibelle } from "../../../util/Utils";
import { InputField } from "../../../widget/formulaire/champsSaisie/InputField";
import { Formulaire } from "../../../widget/formulaire/Formulaire";
import FormBoutons, {
  FormBoutonsProps
} from "../../../widget/popin/FormBoutons";
import "../../../widget/popin/scss/PopinAjouter.scss";

export const OBSERVATION = "observation";

export interface IAjouterObservationFormValue {
  [OBSERVATION]: string;
}

// Valeurs par défaut des champs
const DefaultValues = {
  [OBSERVATION]: ""
};

const OBSERVATION_MAX_LENGTH = 150;

const NB_LIGNE_COMPLEMENT_DESCRIPTION = 10;

const OBSERVATION_LIMITE_TAILLE = `L'observation ne peut pas dépasser ${OBSERVATION_MAX_LENGTH} caractères`;

// Schéma de validation en sortie de champs
const ValidationSchema = Yup.object({
  [OBSERVATION]: Yup.string().max(
    OBSERVATION_MAX_LENGTH,
    OBSERVATION_LIMITE_TAILLE
  )
});
 
export interface PopinAjouterObservationProps {
  open: boolean;
  onClosePopin: () => void;
  onSubmit: (value: IAjouterObservationFormValue) => void;
  defaultValue?: {
    observation: string;
  };
}

export const PopinAjouterObservation: React.FC<PopinAjouterObservationProps> =
  ({ open, onClosePopin, onSubmit, defaultValue }) => {
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
                label={getLibelle("Saisissez l'observation")}
                placeholder={getLibelle("Description")}
                rows={NB_LIGNE_COMPLEMENT_DESCRIPTION}
                maxLength={"151"}
              />
              <FormBoutons {...boutonsProps} />
            </Formulaire>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
