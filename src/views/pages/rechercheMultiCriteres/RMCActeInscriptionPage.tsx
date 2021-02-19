import React, { useState } from "react";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireValidationSchema
} from "./filtres/titulaire/TitulaireFiltre";
import * as Yup from "yup";
import "./scss/RMCActeInscriptionPage.scss";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeValidationSchema,
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps
} from "./filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import { useRMCInscriptionApiHook } from "./hook/RMCInscriptionApiHook";
import { useRMCActeApiHook } from "./hook/RMCActeApiHook";
import {
  RegistreRepertoireFiltre,
  RegistreRepertoireDefaultValues,
  RegistreRepertoireValidationSchema
} from "./filtres/registreReperoire/RegistreReperoireFiltre";

// Nom des filtres
const TITULAIRE = "titulaire";
export const DATES_DEBUT_FIN_ANNEE = "datesDebutFinAnnee";
export const REGISTRE_REPERTOIRE = "registreRepertoire";

// Valeurs par défaut des champs
const DefaultValuesRMCActeInscription = {
  [TITULAIRE]: TitulaireDefaultValues,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeDefaultValues,
  [REGISTRE_REPERTOIRE]: RegistreRepertoireDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRMCActeInscription = Yup.object({
  [TITULAIRE]: TitulaireValidationSchema,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeValidationSchema,
  [REGISTRE_REPERTOIRE]: RegistreRepertoireValidationSchema
});

export const titreFrom = "Critères de recherche d'un acte et d'une inscription";
export const RMCActeInscriptionPage: React.FC = () => {
  const blocsForm: JSX.Element[] = [
    getFormTitulaire(),
    getRegistreRepertoire(),
    getFormDatesDebutFinAnnee()
  ];

  const [valuesRMCActe, setValuesRMCActe] = useState<any>();

  const [valuesRMCInscription, setValuesRMCInscription] = useState<any>();

  const { dataRMCActe } = useRMCActeApiHook(valuesRMCActe);

  const { dataRMCInscription } = useRMCInscriptionApiHook(valuesRMCInscription);

  const onSubmitRMCActeInscription = (values: any) => {
    setValuesRMCActe(values);
    setValuesRMCInscription(values);
  };

  return (
    <>
      <title>{titreFrom}</title>
      <Formulaire
        titre={titreFrom}
        formDefaultValues={DefaultValuesRMCActeInscription}
        formValidationSchema={ValidationSchemaRMCActeInscription}
        libelleBouton="Recherche"
        blocs={blocsForm}
        onSubmit={onSubmitRMCActeInscription}
        formulaireClassName="DeuxColonnes FormulaireRMCAI"
      />
      {dataRMCActe && dataRMCActe.length > 0 && (
        <div>
          <p>ACTE : </p>
          {dataRMCActe?.map((acte, index) => {
            return (
              <p key={`acteRMC${index}`}>{`${acte.nom}  ${acte.natureActe}`}</p>
            );
          })}
        </div>
      )}
      {dataRMCInscription && dataRMCInscription.length > 0 && (
        <div>
          <p>INSCRIPTION : </p>
          {dataRMCInscription?.map((inscription, index) => {
            return (
              <p
                key={`inscriptionRMC${index}`}
              >{`${inscription.nom}  ${inscription?.natureInscription}`}</p>
            );
          })}
        </div>
      )}
    </>
  );
};

function getFormTitulaire(): JSX.Element {
  return <TitulaireFiltre nomFiltre={TITULAIRE} key={TITULAIRE} />;
}

function getFormDatesDebutFinAnnee(): JSX.Element {
  const datesDebutFinAnneeFiltreProps = {
    nomFiltre: DATES_DEBUT_FIN_ANNEE
  } as DatesDebutFinAnneeFiltreProps;
  return (
    <DatesDebutFinAnneeFiltre
      key={DATES_DEBUT_FIN_ANNEE}
      {...datesDebutFinAnneeFiltreProps}
    />
  );
}

function getRegistreRepertoire(): JSX.Element {
  return (
    <RegistreRepertoireFiltre
      nomFiltre={REGISTRE_REPERTOIRE}
      key={REGISTRE_REPERTOIRE}
    />
  );
}
