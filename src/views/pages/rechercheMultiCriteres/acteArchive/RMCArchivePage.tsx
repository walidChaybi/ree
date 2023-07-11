import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { stockageDonnees } from "@util/stockageDonnees";
import { Formulaire } from "@widget/formulaire/Formulaire";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_PAGE_ACTE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { goToLinkRMC } from "../acteInscription/resultats/RMCTableauCommun";
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
import {
  ICriteresRechercheActeArchive,
  useRMCActeArchiveApiHook
} from "./hook/RMCActeArchiveApiHook";
import { RMCActeArchiveResultats } from "./resultats/RMCActeArchiveResultats";
import "./scss/RMCActeArchivePage.scss";

// Nom des filtres
export const TITULAIRE = "titulaire";
export const DATES_DEBUT_FIN_ANNEE = "datesDebutFinAnnee";
export const REGISTRE_ARCHIVE = "registreArchive";

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
  const blocsForm: JSX.Element[] = [
    getFormTitulaire(),
    getRegistreArchive(),
    getFormDatesDebutFinAnnee()
  ];

  const [valuesRMC, setValuesRMC] = useState<IRMCActeArchive>({});

  const [nouvelleRecherche, setNouvelleRecherche] = useState<boolean>(false);

  const [criteresRechercheActe, setCriteresRechercheActe] =
    useState<ICriteresRechercheActeArchive>();

  // Critères de recherche pour alimenter les données des fiches Acte en effet leur pagination/navigation est indépendante du tableau de résultats
  const [criteresRechercheFicheActe, setCriteresRechercheFicheActe] =
    useState<ICriteresRechercheActeArchive>();

  const { dataRMCActe, dataTableauRMCActe } = useRMCActeArchiveApiHook(
    criteresRechercheActe
  );

  /** Récupération des résultats rmc pour une fiche Acte lors d'une navigation */
  const resultatRMCFicheActe = useRMCActeArchiveApiHook(
    criteresRechercheFicheActe
  );

  const onSubmitRMCActeArchive = (values: any) => {
    setNouvelleRecherche(true);
    setValuesRMC(values);
    setCriteresRechercheActe({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
    });
    stockageDonnees.stockerCriteresRMCActeArchive(values);
    setNouvelleRecherche(false);
  };

  const setRangeActeArchive = (range: string) => {
    if (valuesRMC && range !== "") {
      setCriteresRechercheActe({
        valeurs: valuesRMC,
        range
      });
    }
  };

  const getLignesSuivantesOuPrecedentesActe = useCallback(
    (ficheIdentifiant: string, lien: string) => {
      const range = goToLinkRMC(lien);
      if (valuesRMC && range) {
        setCriteresRechercheFicheActe({
          valeurs: valuesRMC,
          range,
          ficheIdentifiant
        });
      }
    },
    [valuesRMC]
  );

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
      {dataRMCActe && dataTableauRMCActe && (
        <RMCActeArchiveResultats
          dataRMCActeArchive={dataRMCActe}
          dataTableauRMCActeArchive={dataTableauRMCActe}
          setRangeActeArchive={setRangeActeArchive}
          resetRMC={nouvelleRecherche}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
          getLignesSuivantesOuPrecedentesActe={
            getLignesSuivantesOuPrecedentesActe
          }
          idFicheActe={resultatRMCFicheActe?.ficheIdentifiant}
          dataRMCFicheActe={resultatRMCFicheActe?.dataRMCActe}
          dataTableauRMCFicheActe={resultatRMCFicheActe?.dataTableauRMCActe}
        />
      )}
    </>
  );
};

function getFormTitulaire(): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return <TitulaireFiltre key={TITULAIRE} {...titulaireFiltreProps} />;
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
