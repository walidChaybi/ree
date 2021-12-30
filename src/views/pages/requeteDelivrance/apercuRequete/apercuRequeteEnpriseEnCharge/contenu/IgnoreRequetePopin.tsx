import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { IRequete } from "../../../../../../model/requete/IRequete";
import {
  IgnorerParams,
  useIgnorerApi
} from "../../../../../common/hook/requete/IgnorerHook";
import { getUrlPrecedente } from "../../../../../common/util/route/routeUtil";
import { getLibelle } from "../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../../common/widget/formulaire/champsSaisie/SelectField";
import { Formulaire } from "../../../../../common/widget/formulaire/Formulaire";
import {
  ALERTE_AUTRE,
  ALERTE_OBLIGATOIRE,
  COMPLEMENT_DESCRIPTION_LIMITE_TAILLE
} from "../../../../../common/widget/formulaire/FormulaireMessages";
import FormBoutons, {
  FormBoutonsProps
} from "../../../../../common/widget/popin/FormBoutons";
import "../scss/IgnoreRequetePopin.scss";

export interface IgnoreRequetePopinProps {
  isOpen: boolean;
  onClosePopin: () => void;
  requete: IRequete;
}

export const MOTIF_IGNORE = "motifIgnore";
export const COMPLEMENT_IGNORE = "complementIgnore";
// Valeurs par défaut des champs
const DefaultValues = {
  [MOTIF_IGNORE]: "",
  [COMPLEMENT_IGNORE]: ""
};

export interface IIgnorerFormValue {
  [MOTIF_IGNORE]: string;
  [COMPLEMENT_IGNORE]: string;
}

export const COMPLEMENT_DESCRIPTION_MAX_LENGTH = 150;

const NB_LIGNE_COMPLEMENT_DESCRIPTION = 10;

// Schéma de validation en sortie de champs
const ValidationSchema = Yup.object({
  [MOTIF_IGNORE]: Yup.string().required(ALERTE_OBLIGATOIRE),
  [COMPLEMENT_IGNORE]: Yup.string().when(MOTIF_IGNORE, {
    is: (value: string) => value === AUTRE,
    then: Yup.string()
      .max(
        COMPLEMENT_DESCRIPTION_MAX_LENGTH,
        COMPLEMENT_DESCRIPTION_LIMITE_TAILLE
      )
      .required(ALERTE_AUTRE),
    otherwise: Yup.string().max(
      COMPLEMENT_DESCRIPTION_MAX_LENGTH,
      COMPLEMENT_DESCRIPTION_LIMITE_TAILLE
    )
  })
});

const REQUETE_DEJA_TRAITEE = "Requête déjà traitée";
const ADRESSE_INCOMPLETE = "Adresse incomplète";
const AUTRE = "Autre";

export const IgnoreRequetePopin: React.FC<IgnoreRequetePopinProps> = ({
  isOpen,
  onClosePopin,
  requete
}) => {
  const history = useHistory();

  const [param, setParam] = useState<IgnorerParams>({});
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const boutonsProps = {
    onClosePopin
  } as FormBoutonsProps;

  const onSubmit = (res: IIgnorerFormValue) => {
    setOperationEnCours(true);
    setParam({
      idRequete: requete.id,
      texteObservation: `${res[MOTIF_IGNORE]}${
        res[COMPLEMENT_IGNORE] ? " - " : ""
      }${res[COMPLEMENT_IGNORE]}`
    });
    onClosePopin();
  };

  const motif = [
    { str: REQUETE_DEJA_TRAITEE, value: REQUETE_DEJA_TRAITEE },
    { str: ADRESSE_INCOMPLETE, value: ADRESSE_INCOMPLETE },
    { str: AUTRE, value: AUTRE }
  ];

  const idAction = useIgnorerApi(param);

  useEffect(() => {
    if (idAction) {
      setOperationEnCours(false);
      history.push(getUrlPrecedente(history.location.pathname));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAction]);

  return (
    <>
      <OperationEnCours visible={operationEnCours}></OperationEnCours>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {getLibelle("Ignorer la requête")}
        </DialogTitle>
        <DialogContent>
          <Formulaire
            className="IgnoreRequetePopin"
            formDefaultValues={DefaultValues}
            formValidationSchema={ValidationSchema}
            onSubmit={onSubmit}
          >
            <DialogContentText id="alert-dialog-description">
              {getLibelle(
                `Vous allez ignorer la requête sans donner de réponse à l'usager.`
              )}
              <br />
              {getLibelle(`
            Merci de choisir un motif et d'indiquer une observation sur la requête pour expliquer votre action :`)}
            </DialogContentText>
            <SelectField
              name={MOTIF_IGNORE}
              label={getLibelle("Motif:")}
              options={motif}
              formik={boutonsProps.formik}
            />
            <InputField
              name={COMPLEMENT_IGNORE}
              component="textarea"
              label={getLibelle("Observation:")}
              placeholder={getLibelle("Observation")}
              rows={NB_LIGNE_COMPLEMENT_DESCRIPTION}
              maxLength={"150"}
            />
            <FormBoutons {...boutonsProps} />
          </Formulaire>
        </DialogContent>
      </Dialog>
    </>
  );
};
