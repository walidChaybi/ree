import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { MIN_YEAR } from "@util/DateUtils";
import { stockageDonnees } from "@util/stockageDonnees";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React from "react";
import * as Yup from "yup";
import RMCBoutons from "../boutons/RMCBoutons";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps,
  DatesDebutFinAnneeValidationSchema
} from "../filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import RegistreRepertoireFiltre, {
  RegistreRepertoireDefaultValues,
  RegistreRepertoireFiltreProps,
  RegistreRepertoireValidationSchema
} from "../filtres/registreReperoire/RegistreRepertoireFiltre";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps,
  TitulaireValidationSchema
} from "../filtres/titulaire/TitulaireFiltre";
import "./scss/RMCActeInscriptionPage.scss";

// Nom des filtres
export const TITULAIRE = "titulaire";
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

export const titreForm = "Critères de recherche d'un acte et d'une inscription";

interface RMCActeInscriptionFormProps {
  onSubmit: (values: any) => void;
  titulaires?: ITitulaireRequete[];
}

export const RMCActeInscriptionForm: React.FC<RMCActeInscriptionFormProps> = props => {
  const blocsForm: JSX.Element[] = [getFormTitulaire(props.titulaires), getRegistreRepertoire(), getFormDatesDebutFinAnnee()];

  const onSubmitRMCActeInscription = (values: any): void => {
    props.onSubmit(values);
  };

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCActeInspt();
  };

  useTitreDeLaFenetre(titreForm);

  return (
    <Formulaire
      titre={titreForm}
      formDefaultValues={DefaultValuesRMCActeInscription}
      formValidationSchema={ValidationSchemaRMCActeInscription}
      onSubmit={onSubmitRMCActeInscription}
    >
      <div className="DeuxColonnes FormulaireRMCAI">{blocsForm}</div>
      <RMCBoutons rappelCriteres={rappelCriteres} />
    </Formulaire>
  );
};

function getFormTitulaire(titulaires?: ITitulaireRequete[]): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return (
    <TitulaireFiltre
      key={TITULAIRE}
      {...titulaireFiltreProps}
      titulaires={titulaires}
    />
  );
}

function getFormDatesDebutFinAnnee(): JSX.Element {
  const datesDebutFinAnneeFiltreProps = {
    nomFiltre: DATES_DEBUT_FIN_ANNEE,
    anneeMin: MIN_YEAR
  } as DatesDebutFinAnneeFiltreProps;
  return (
    <DatesDebutFinAnneeFiltre
      key={DATES_DEBUT_FIN_ANNEE}
      {...datesDebutFinAnneeFiltreProps}
    />
  );
}

function getRegistreRepertoire(): JSX.Element {
  const registreRepertoireFiltreFiltreProps = {
    nomFiltre: REGISTRE_REPERTOIRE
  } as RegistreRepertoireFiltreProps;
  return (
    <RegistreRepertoireFiltre
      key={REGISTRE_REPERTOIRE}
      {...registreRepertoireFiltreFiltreProps}
    />
  );
}
