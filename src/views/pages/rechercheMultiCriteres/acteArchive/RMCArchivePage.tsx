import { stockageDonnees } from "@util/stockageDonnees";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { NB_LIGNES_PAR_APPEL_ACTE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useState } from "react";
import * as Yup from "yup";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import RMCBoutons, { RMCBoutonsProps } from "../boutons/RMCBoutons";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps,
  DatesDebutFinAnneeValidationSchema
} from "../filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import RegistreArchiveFiltre, {
  RegistreArchiveDefaultValues,
  RegistreArchiveFiltreProps,
  RegistreArchiveValidationSchema
} from "../filtres/registreArchive/RegistreArchiveFiltre";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps,
  TitulaireValidationSchema
} from "../filtres/titulaire/TitulaireFiltre";
import { ICriteresRechercheActeArchive, useRMCActeArchiveApiHook } from "./hook/RMCActeArchiveApiHook";
import { RMCActeArchiveResultats } from "./resultats/RMCActeArchiveResultats";
import "./scss/RMCActeArchivePage.scss";

// Nom des filtres
const TITULAIRE = "titulaire";
const DATES_DEBUT_FIN_ANNEE = "datesDebutFinAnnee";
const REGISTRE_ARCHIVE = "registreArchive";

// Valeurs par défaut des champs
const DefaultValuesRMCActeArchive = {
  [TITULAIRE]: TitulaireDefaultValues,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeDefaultValues,
  [REGISTRE_ARCHIVE]: RegistreArchiveDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRMCActeArchive = Yup.object({
  [TITULAIRE]: TitulaireValidationSchema,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeValidationSchema,
  [REGISTRE_ARCHIVE]: RegistreArchiveValidationSchema
});

export const titreForm = "Critères de recherche d'un acte";

export const RMCArchivePage: React.FC = () => {
  const blocsForm: JSX.Element[] = [getFormTitulaire(), getRegistreArchive(), getFormDatesDebutFinAnnee()];

  const [nouvelleRecherche, setNouvelleRecherche] = useState<boolean>(false);

  const [criteresRechercheActe, setCriteresRechercheActe] = useState<ICriteresRechercheActeArchive>();

  const resultatRMCActe = useRMCActeArchiveApiHook(criteresRechercheActe);

  const onSubmitRMCActeArchive = (values: any) => {
    setNouvelleRecherche(true);
    setCriteresRechercheActe({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
    });
    stockageDonnees.stockerCriteresRMCActeArchive(values);
    setNouvelleRecherche(false);
  };

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCActeArchive();
  };

  const boutonsProps = {
    rappelCriteres
  } as RMCBoutonsProps;

  useTitreDeLaFenetre(titreForm);

  return (
    <>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesRMCActeArchive}
        formValidationSchema={ValidationSchemaRMCActeArchive}
        onSubmit={onSubmitRMCActeArchive}
      >
        <div className="DeuxColonnes FormulaireRMCAI">{blocsForm}</div>
        <RMCBoutons {...boutonsProps} />
      </Formulaire>
      {resultatRMCActe?.dataRMCActe && resultatRMCActe.dataTableauRMCActe && (
        <RMCActeArchiveResultats
          dataRMCActeArchive={resultatRMCActe.dataRMCActe}
          dataTableauRMCActeArchive={resultatRMCActe.dataTableauRMCActe}
          resetRMC={nouvelleRecherche}
        />
      )}
    </>
  );
};

function getFormTitulaire(): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return (
    <TitulaireFiltre
      key={TITULAIRE}
      {...titulaireFiltreProps}
    />
  );
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

function getRegistreArchive(): JSX.Element {
  const registreArchiveFiltreFiltreProps = {
    nomFiltre: REGISTRE_ARCHIVE
  } as RegistreArchiveFiltreProps;
  return (
    <RegistreArchiveFiltre
      key={REGISTRE_ARCHIVE}
      {...registreArchiveFiltreFiltreProps}
    />
  );
}
