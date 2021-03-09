import React, { useState } from "react";
import { Formulaire } from "../../../common/widget/formulaire/Formulaire";
import RequeteFiltre, {
  RequeteDefaultValues,
  RequeteFiltreProps,
  RequeteValidationSchema
} from "../filtres/requete/RequeteFiltre";
import * as Yup from "yup";
import { NB_LIGNES_PAR_APPEL } from "../../../common/widget/tableau/TableauRece";
import { IRMCRequete } from "../../../../model/rmc/requete/IRMCRequete";
import { useRMCRequeteApiHook } from "./hook/RMCRequeteApiHook";
import { ICriteresRMCRequete } from "../../../../model/rmc/requete/ICriteresRMCRequete";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps,
  TitulaireValidationSchema
} from "../filtres/titulaire/TitulaireFiltre";
import "./scss/RMCRequetePage.scss";

import { stockageDonnees } from "../../../common/util/stockageDonnees";
import RMCBoutons, { RMCBoutonsProps } from "../boutons/RMCBoutons";

// Nom des filtres
export const REQUETE = "requete";
export const TITULAIRE = "titulaire";

// Valeurs par défaut des champs
const DefaultValuesRMCRequete = {
  [REQUETE]: RequeteDefaultValues,
  [TITULAIRE]: TitulaireDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRMCRequete = Yup.object({
  [REQUETE]: RequeteValidationSchema,
  [TITULAIRE]: TitulaireValidationSchema
});

export const titreForm = "Critères de recherche d'une requête";

export const RMCRequetePage: React.FC = () => {
  const blocsForm: JSX.Element[] = [getFormRequete(), getFormTitulaire()];

  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequete>({});

  const [nouvelleRecherche, setNouvelleRecherche] = useState<boolean>(false);

  const [
    critèresRechercheRequete,
    setCritèresRechercheRequete
  ] = useState<ICriteresRMCRequete>();

  const { dataRMCRequete, dataTableauRMCRequete } = useRMCRequeteApiHook(
    critèresRechercheRequete
  );

  const onSubmitRMCRequete = (values: any) => {
    setNouvelleRecherche(true);
    setValuesRMCRequete(values);
    setCritèresRechercheRequete({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    });
    stockageDonnees.stockerCriteresRMCReq(values);
    setNouvelleRecherche(false);
  };

  // const setRangeRequete = (range: string) => {
  //   if (valuesRMC && range !== "") {
  //     setCritèresRechercheRequete({
  //       valeurs: valuesRMC,
  //       range
  //     });
  //   }
  // };

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCReq();
  };

  const boutonsProps = {
    rappelCriteres
  } as RMCBoutonsProps;

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

      {dataRMCRequete && dataTableauRMCRequete && <> {dataRMCRequete} </>}
      {/* {dataRMCRequete && dataTableauRMCRequete && (
        <RMCRequeteResultats
          dataRMCRequete={dataRMCRequete}
          dataTableauRMCRequete={dataTableauRMCRequete}
          setRangeRequete={setRangeRequete}
          resetRMC={nouvelleRecherche}
        />
      )} */}
    </>
  );
};

function getFormRequete(): JSX.Element {
  const requeteFiltreProps = {
    nomFiltre: REQUETE
  } as RequeteFiltreProps;
  return <RequeteFiltre key={REQUETE} {...requeteFiltreProps} />;
}

function getFormTitulaire(): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return <TitulaireFiltre key={TITULAIRE} {...titulaireFiltreProps} />;
}
