import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { ICriteresRMCRequete } from "../../../../model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "../../../../model/rmc/requete/IRMCRequete";
import { MEP_YEAR } from "../../../common/util/DateUtils";
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
import RequerantFiltre, {
  RequerantDefaultValues,
  RequerantFiltreProps,
  RequerantValidationSchema
} from "../filtres/requerant/RequerantFiltre";
import RequeteFiltre, {
  RequeteDefaultValues,
  RequeteFiltreProps,
  RequeteValidationSchema
} from "../filtres/requete/RequeteFiltre";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps,
  TitulaireValidationSchema
} from "../filtres/titulaire/TitulaireFiltre";
import { useRMCRequeteApiHook } from "./hook/RMCRequeteApiHook";
import { RMCRequeteResultats } from "./resultats/RMCRequeteResultats";
import "./scss/RMCRequetePage.scss";

// Nom des filtres
export const REQUETE = "requete";
export const DATES_DEBUT_FIN = "datesDebutFin";
export const TITULAIRE = "titulaire";
export const REQUERANT = "requerant";

// Valeurs par défaut des champs
const DefaultValuesRMCRequete = {
  [REQUETE]: RequeteDefaultValues,
  [DATES_DEBUT_FIN]: DatesDebutFinAnneeDefaultValues,
  [TITULAIRE]: TitulaireDefaultValues,
  [REQUERANT]: RequerantDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRMCRequete = Yup.object({
  [REQUETE]: RequeteValidationSchema,
  [DATES_DEBUT_FIN]: DatesDebutFinAnneeValidationSchema,
  [TITULAIRE]: TitulaireValidationSchema,
  [REQUERANT]: RequerantValidationSchema
});

export const titreForm = "Critères de recherche d'une requête";

export const RMCRequetePage: React.FC = () => {
  const blocsForm: JSX.Element[] = [
    getFormRequete(),
    getFormDatesDebutFin(),
    getFormTitulaire(),
    getFormRequerant()
  ];

  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequete>({});

  const [nouvelleRecherche, setNouvelleRecherche] = useState<boolean>(false);

  const [
    criteresRechercheRequete,
    setCriteresRechercheRequete
  ] = useState<ICriteresRMCRequete>();

  const { dataRMCRequete, dataTableauRMCRequete } = useRMCRequeteApiHook(
    criteresRechercheRequete
  );

  const onSubmitRMCRequete = (values: any) => {
    setNouvelleRecherche(true);
    setValuesRMCRequete(values);
    setCriteresRechercheRequete({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    });
    stockageDonnees.stockerCriteresRMCReq(values);
    setNouvelleRecherche(false);
  };

  const setRangeRequete = (range: string) => {
    if (valuesRMCRequete && range !== "") {
      setCriteresRechercheRequete({
        valeurs: valuesRMCRequete,
        range
      });
    }
  };

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCReq();
  };

  const boutonsProps = {
    rappelCriteres
  } as RMCBoutonsProps;

  const RMCRequeteRef = useRef();

  return (
    <>
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesRMCRequete}
        formValidationSchema={ValidationSchemaRMCRequete}
        onSubmit={onSubmitRMCRequete}
      >
        <div className="DeuxColonnes FormulaireRMCRequete">{blocsForm}</div>
        <RMCBoutons {...boutonsProps} />
      </Formulaire>
      <AutoScroll autoScroll={nouvelleRecherche} baliseRef={RMCRequeteRef} />
      {dataRMCRequete && dataTableauRMCRequete && (
        <RMCRequeteResultats
          dataRMCRequete={dataRMCRequete}
          dataTableauRMCRequete={dataTableauRMCRequete}
          setRangeRequete={setRangeRequete}
          resetRMC={nouvelleRecherche}
        />
      )}
    </>
  );
};

function getFormRequete(): JSX.Element {
  const requeteFiltreProps = {
    nomFiltre: REQUETE
  } as RequeteFiltreProps;
  return <RequeteFiltre key={REQUETE} {...requeteFiltreProps} />;
}

function getFormDatesDebutFin(): JSX.Element {
  const datesDebutFinAnneeFiltreProps = {
    nomFiltre: DATES_DEBUT_FIN,
    anneeMin: MEP_YEAR
  } as DatesDebutFinAnneeFiltreProps;
  return (
    <DatesDebutFinAnneeFiltre
      key={DATES_DEBUT_FIN}
      {...datesDebutFinAnneeFiltreProps}
    />
  );
}

function getFormTitulaire(): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return <TitulaireFiltre key={TITULAIRE} {...titulaireFiltreProps} />;
}

function getFormRequerant(): JSX.Element {
  const requerantFiltreProps = {
    nomFiltre: REQUERANT
  } as RequerantFiltreProps;
  return <RequerantFiltre key={REQUERANT} {...requerantFiltreProps} />;
}
