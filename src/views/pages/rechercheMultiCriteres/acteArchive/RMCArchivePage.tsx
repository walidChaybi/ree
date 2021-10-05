import React, { useState } from "react";
import * as Yup from "yup";
import { IRMCActeArchive } from "../../../../model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { stockageDonnees } from "../../../common/util/stockageDonnees";
import { Formulaire } from "../../../common/widget/formulaire/Formulaire";
import { NB_LIGNES_PAR_APPEL } from "../../../common/widget/tableau/TableUtils";
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
  ICriteresRecherche,
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

  const [
    criteresRechercheActe,
    setCriteresRechercheActe
  ] = useState<ICriteresRecherche>();

  const { dataRMCActe, dataTableauRMCActe } = useRMCActeArchiveApiHook(
    criteresRechercheActe
  );

  const onSubmitRMCActeArchive = (values: any) => {
    setNouvelleRecherche(true);
    setValuesRMC(values);
    setCriteresRechercheActe({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL}`
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

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCActeArchive();
  };

  const boutonsProps = {
    rappelCriteres
  } as RMCBoutonsProps;

  return (
    <>
      <title>{titreForm}</title>
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
    nomFiltre: DATES_DEBUT_FIN_ANNEE,
    anneeVisible: true
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
