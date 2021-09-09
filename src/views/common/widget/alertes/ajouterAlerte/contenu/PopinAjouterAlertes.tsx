import { Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import * as Yup from "yup";
import { TypeAlerte } from "../../../../../../model/etatcivil/enum/TypeAlerte";
import { InputField } from "../../../formulaire/champsSaisie/InputField";
import { SelectField } from "../../../formulaire/champsSaisie/SelectField";
import { Formulaire } from "../../../formulaire/Formulaire";
import { getLibelle } from "../../../Text";
import FormAjouterAlerteBoutons, {
  FormAjouterAlerteBoutonsProps
} from "./FormAjouterAlerteBoutons";

export const ID_TYPE_ALERTE = "idTypeAlerte";
export const COMPLEMENT_DESCRIPTION = "complementDescription";

export interface IAjouterAlerteFormValue {
  [ID_TYPE_ALERTE]: string;
  [COMPLEMENT_DESCRIPTION]: string;
}

// Valeurs par défaut des champs
const DefaultValues = {
  [ID_TYPE_ALERTE]: "",
  [COMPLEMENT_DESCRIPTION]: ""
};

const COMPLEMENT_DESCRIPTION_MAX_LENGTH = 150;

const ALERTE_OBLIGATOIRE = "Le choix d'une alerte est obligatoire";

const COMPLEMENT_DESCRIPTION_LIMITE_TAILLE = `La description ne peut pas dépasser ${COMPLEMENT_DESCRIPTION_MAX_LENGTH} caractères`;

// Schéma de validation en sortie de champs
const ValidationSchema = Yup.object({
  [ID_TYPE_ALERTE]: Yup.string().required(ALERTE_OBLIGATOIRE),
  [COMPLEMENT_DESCRIPTION]: Yup.string().max(
    COMPLEMENT_DESCRIPTION_MAX_LENGTH,
    COMPLEMENT_DESCRIPTION_LIMITE_TAILLE
  )
});

export interface PopinAjouterAlertesProps {
  open: boolean;
  onClosePopin: () => void;
  onSubmit: (value: IAjouterAlerteFormValue) => void;
}

export const PopinAjouterAlertes: React.FC<PopinAjouterAlertesProps> = ({
  open,
  onClosePopin,
  onSubmit
}) => {
  const boutonsProps = {
    onClosePopin
  } as FormAjouterAlerteBoutonsProps;

  return (
    <Dialog
      disablePortal={true}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Formulaire
          formDefaultValues={DefaultValues}
          formValidationSchema={ValidationSchema}
          onSubmit={onSubmit}
        >
          <SelectField
            name={ID_TYPE_ALERTE}
            label={getLibelle("Sélectionner l'alerte à ajouter :")}
            options={TypeAlerte.getAllEnumsAsOptions()}
          />
          <InputField
            name={COMPLEMENT_DESCRIPTION}
            component="textarea"
            label={getLibelle(
              "Compléter l'alerte avec votre description (si nécessaire) :"
            )}
            placeholder="..."
            maxLength={"150"}
          />
          <FormAjouterAlerteBoutons {...boutonsProps} />
        </Formulaire>
      </DialogContent>
    </Dialog>
  );
};
