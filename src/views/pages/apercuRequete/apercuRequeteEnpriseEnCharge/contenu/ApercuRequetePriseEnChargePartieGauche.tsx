import React, { useEffect, useState } from "react";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL } from "../../../../common/widget/tableau/TableUtils";
import { useRMCAutoRequeteApiHook } from "../../../rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequeteApiHook";
import { RMCRequetesAssocieesResultats } from "../../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { useRMCRequeteApiHook } from "../../../rechercheMultiCriteres/requete/hook/RMCRequeteApiHook";
import {
  DocumentsReponses,
  InfoDocumentAffiche
} from "../../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../../resume/ResumeRequeteV2";

interface ApercuRequetePriseEnChargePartieGaucheProps {
  idRequete: string;
  detailRequete: TRequete;
  dataRequetes: IRequeteTableau[];
  openFenetre: (infoDoc: InfoDocumentAffiche) => void;
}

export const ApercuRequetePriseEnChargePartieGauche: React.FC<ApercuRequetePriseEnChargePartieGaucheProps> = props => {
  /* Etats RMC */
  const [requetesTableau, setRequetesTableau] = useState<IRequeteTableau[]>();
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>();

  /* Etats RMC manuelle*/
  const [nouvelleRMCRequete, setNouvelleRMCRequete] = useState<boolean>(false);
  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequete>({});

  const [
    criteresRechercheRequete,
    setCriteresRechercheRequete
  ] = useState<ICriteresRMCRequete>();

  /* Hook d'appel de l'API RMC Auto requêtes */
  const {
    dataRMCAutoRequete,
    dataTableauRMCAutoRequete
  } = useRMCAutoRequeteApiHook(
    props.idRequete,
    props.dataRequetes,
    `0-${NB_LIGNES_PAR_APPEL}`
  );

  /* Hook d'appel de l'API RMC manuelle requêtes */
  const { dataRMCRequete, dataTableauRMCRequete } = useRMCRequeteApiHook(
    criteresRechercheRequete
  );

  /* Actualisation des résultats de la RMC */
  useEffect(() => {
    if (dataRMCAutoRequete && dataTableauRMCAutoRequete) {
      setRequetesTableau(dataRMCAutoRequete);
      setParamsTableau(dataTableauRMCAutoRequete);
    }
  }, [dataRMCAutoRequete, dataTableauRMCAutoRequete]);

  useEffect(() => {
    if (dataRMCRequete && dataTableauRMCRequete) {
      setRequetesTableau(dataRMCRequete);
      setParamsTableau(dataTableauRMCRequete);
    }
  }, [dataRMCRequete, dataTableauRMCRequete]);

  /* Gestion de la pagination pour la RMC */
  const setRangeRequete = (rangeRequete: string) => {
    if (valuesRMCRequete && rangeRequete !== "") {
      setCriteresRechercheRequete({
        valeurs: valuesRMCRequete,
        range: rangeRequete
      });
    }
  };

  return (
    <div className="side left">
      <ResumeRequeteV2 requete={props.detailRequete} />
      {requetesTableau && paramsTableau && (
        <RMCRequetesAssocieesResultats
          dataRMCRequete={requetesTableau}
          dataTableauRMCRequete={paramsTableau}
          setRangeRequete={setRangeRequete}
          setNouvelleRMCRequete={setNouvelleRMCRequete}
          setValuesRMCRequete={setValuesRMCRequete}
          setCriteresRechercheRequete={setCriteresRechercheRequete}
          resetRMC={nouvelleRMCRequete}
        />
      )}
      <SuiviObservationsRequete
        observations={props.detailRequete?.observations}
      />
      <SuiviActionsRequete actions={props.detailRequete?.actions} />
      <DocumentsReponses
        documents={
          (props.detailRequete as IRequeteDelivrance)?.documentsReponses
        }
        setDocumentAffiche={props.openFenetre}
      />
    </div>
  );
};
