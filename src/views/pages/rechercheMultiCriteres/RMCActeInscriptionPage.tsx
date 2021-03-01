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
import {
  ICriteresRecherche,
  useRMCInscriptionApiHook
} from "./hook/RMCInscriptionApiHook";
import { useRMCActeApiHook } from "./hook/RMCActeApiHook";
import { RMCActeInscriptionResultats } from "./resultats/RMCActeInscriptionResultats";
import { NB_LIGNES_PAR_APPEL } from "../../common/widget/tableau/TableauRece";
import {
  RegistreRepertoireFiltre,
  RegistreRepertoireDefaultValues,
  RegistreRepertoireValidationSchema
} from "./filtres/registreReperoire/RegistreReperoireFiltre";
import { IRMCActeInscription } from "../../../model/rmc/rechercheForm/IRMCActeInscription";

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

export const titreForm = "Critères de recherche d'un acte ou d'une inscription";

export const RMCActeInscriptionPage: React.FC = () => {
  const blocsForm: JSX.Element[] = [
    getFormTitulaire(),
    getRegistreRepertoire(),
    getFormDatesDebutFinAnnee()
  ];

  const [valuesRMC, setValuesRMC] = useState<IRMCActeInscription>({});

  const [nouvelleRecherche, setNouvelleRecherche] = useState<boolean>(false);

  const [
    critèresRechercheActe,
    setCritèresRechercheActe
  ] = useState<ICriteresRecherche>();

  const [
    critèresRechercheInscription,
    setCritèresRechercheInscription
  ] = useState<ICriteresRecherche>();

  const { dataRMCActe, dataTableauRMCActe } = useRMCActeApiHook(
    critèresRechercheActe
  );

  const {
    dataRMCInscription,
    dataTableauRMCInscription
  } = useRMCInscriptionApiHook(critèresRechercheInscription);

  const onSubmitRMCActeInscription = (values: any) => {
    setNouvelleRecherche(true);
    setValuesRMC(values);
    setCritèresRechercheActe({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    });
    setCritèresRechercheInscription({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    });
    setNouvelleRecherche(false);
  };

  const setRangeActe = (range: string) => {
    if (valuesRMC && range !== "") {
      setCritèresRechercheActe({
        valeurs: valuesRMC,
        range
      });
    }
  };

  const setRangeInscription = (range: string) => {
    if (valuesRMC && range !== "") {
      setCritèresRechercheInscription({
        valeurs: valuesRMC,
        range
      });
    }
  };

  return (
    <>
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesRMCActeInscription}
        formValidationSchema={ValidationSchemaRMCActeInscription}
        libelleBouton="Rechercher"
        blocs={blocsForm}
        onSubmit={onSubmitRMCActeInscription}
        formulaireClassName="DeuxColonnes FormulaireRMCAI"
      />
      {dataRMCActe &&
        dataTableauRMCActe &&
        dataRMCInscription &&
        dataTableauRMCInscription && (
          <RMCActeInscriptionResultats
            dataRMCActe={dataRMCActe}
            dataTableauRMCActe={dataTableauRMCActe}
            dataRMCInscription={dataRMCInscription}
            dataTableauRMCInscription={dataTableauRMCInscription}
            setRangeInscription={setRangeInscription}
            setRangeActe={setRangeActe}
            resetRMC={nouvelleRecherche}
          />
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
