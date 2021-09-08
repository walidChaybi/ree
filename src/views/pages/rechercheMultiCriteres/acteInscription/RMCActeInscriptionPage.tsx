import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { IRMCActeInscription } from "../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { MIN_YEAR } from "../../../common/util/DateUtils";
import { stockageDonnees } from "../../../common/util/stockageDonnees";
import { AutoScroll } from "../../../common/widget/autoScroll/autoScroll";
import { Formulaire } from "../../../common/widget/formulaire/Formulaire";
import { NB_LIGNES_PAR_APPEL } from "../../../common/widget/tableau/v1/TableauRece";
import RMCBoutons, { RMCBoutonsProps } from "../boutons/RMCBoutons";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps,
  DatesDebutFinAnneeValidationSchema
} from "../filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import RegistreRepertoireFiltre, {
  RegistreRepertoireDefaultValues,
  RegistreRepertoireFiltreProps,
  RegistreRepertoireValidationSchema
} from "../filtres/registreReperoire/RegistreReperoireFiltre";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps,
  TitulaireValidationSchema
} from "../filtres/titulaire/TitulaireFiltre";
import { useRMCActeApiHook } from "./hook/RMCActeApiHook";
import {
  ICriteresRecherche,
  useRMCInscriptionApiHook
} from "./hook/RMCInscriptionApiHook";
import { RMCActeInscriptionResultats } from "./resultats/RMCActeInscriptionResultats";
import "./scss/RMCActeInscriptionPage.scss";

// Nom des filtres
export const TITULAIRE = "titulaire";
export const DATES_DEBUT_FIN_ANNEE = "datesDebutFinAnnee";
export const REGISTRE_REPERTOIRE = "registreRepertoire";

// Valeurs par défaut des champs
export const DefaultValuesRMCActeInscription = {
  [TITULAIRE]: TitulaireDefaultValues,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeDefaultValues,
  [REGISTRE_REPERTOIRE]: RegistreRepertoireDefaultValues
};

// Schéma de validation en sortie de champs
export const ValidationSchemaRMCActeInscription = Yup.object({
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
    criteresRechercheActe,
    setCriteresRechercheActe
  ] = useState<ICriteresRecherche>();

  const [
    criteresRechercheInscription,
    setCriteresRechercheInscription
  ] = useState<ICriteresRecherche>();

  const { dataRMCActe, dataTableauRMCActe } = useRMCActeApiHook(
    criteresRechercheActe
  );

  const {
    dataRMCInscription,
    dataTableauRMCInscription
  } = useRMCInscriptionApiHook(criteresRechercheInscription);

  const onSubmitRMCActeInscription = (values: any) => {
    setNouvelleRecherche(true);
    setValuesRMC(values);
    setCriteresRechercheActe({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    });
    setCriteresRechercheInscription({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    });
    stockageDonnees.stockerCriteresRMCActeInspt(values);
    setNouvelleRecherche(false);
  };

  const setRangeActe = (range: string) => {
    if (valuesRMC && range !== "") {
      setCriteresRechercheActe({
        valeurs: valuesRMC,
        range
      });
    }
  };

  const setRangeInscription = (range: string) => {
    if (valuesRMC && range !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMC,
        range
      });
    }
  };

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCActeInspt();
  };

  const boutonsProps = {
    rappelCriteres
  } as RMCBoutonsProps;

  const RMCActeInscriptionRef = useRef();

  return (
    <>
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesRMCActeInscription}
        formValidationSchema={ValidationSchemaRMCActeInscription}
        onSubmit={onSubmitRMCActeInscription}
      >
        <div className="DeuxColonnes FormulaireRMCAI">{blocsForm}</div>
        <RMCBoutons {...boutonsProps} />
      </Formulaire>
      <AutoScroll
        autoScroll={nouvelleRecherche}
        baliseRef={RMCActeInscriptionRef}
      />
      {dataRMCActe &&
        dataTableauRMCActe &&
        dataRMCInscription &&
        dataTableauRMCInscription && (
          <RMCActeInscriptionResultats
            typeRMC="Classique"
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

export function getFormTitulaire(): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return <TitulaireFiltre key={TITULAIRE} {...titulaireFiltreProps} />;
}

export function getFormDatesDebutFinAnnee(): JSX.Element {
  const datesDebutFinAnneeFiltreProps = {
    nomFiltre: DATES_DEBUT_FIN_ANNEE,
    anneeVisible: true,
    anneeMin: MIN_YEAR
  } as DatesDebutFinAnneeFiltreProps;
  return (
    <DatesDebutFinAnneeFiltre
      key={DATES_DEBUT_FIN_ANNEE}
      {...datesDebutFinAnneeFiltreProps}
    />
  );
}

export function getRegistreRepertoire(): JSX.Element {
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
