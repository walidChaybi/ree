import TRAITEMENT_RMC_ACTES_INSCRIPTIONS, { IResultatRMCActesInscriptions } from "@api/traitements/rmc/TraitementRMCActesInscriptions";
import TRAITEMENT_RMC_AUTO_ACTES_INSCRIPTIONS from "@api/traitements/rmc/TraitementRMCAutoActesInscriptions";
import {
  ITraitementAutoRDCSParams,
  estEligibleAuTraitementAutoRDCS,
  useTraitementAutoRDCSHook
} from "@hook/rmcAuto/TraitementAutoRDCSHook";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";
import { StockageLocal } from "../../../../utils/StockageLocal";
import { RMCActeInscriptionResultats } from "../acteInscription/resultats/RMCActeInscriptionResultats";
import { BoutonNouvelleRMCActeInscription } from "./BoutonNouvelleRMCActeInscription";

interface ITableauRMCProps {
  requete?: IRequeteDelivrance | IRequeteInformation;
  dataAlertes?: IAlerte[];
  onClickCheckboxTableauActes?: (event: TChangeEventSurHTMLInputElement, data: ResultatRMCActe) => void;
  onClickCheckboxTableauInscriptions?: (event: TChangeEventSurHTMLInputElement, data: TResultatRMCInscription) => void;
  reset?: () => void;
}

export const TableauRMC: React.FC<ITableauRMCProps> = ({ requete, ...props }) => {
  const location = useLocation();
  const [popinAffichee, setPopinAffichee] = useState<boolean>(false);

  /* Etats RMC Communs */
  const [resetRMCActeInscription, setResetRMCActeInscription] = useState<boolean>(false);
  const [resultatRMCActeInscription, setResultatRMCActeInscription] = useState<IResultatRMCActesInscriptions | null>(null);

  /* Etats RMC Auto */
  const [resultatRMCAutoActeInscription, setResultatRMCAutoActeInscription] = useState<IResultatRMCActesInscriptions | null>(null);

  /* Traitement RMC auto */
  const { lancerTraitement: lancerRMCAutoActeInscription, traitementEnCours: enAttenteRMCAuto } = useTraitementApi(
    TRAITEMENT_RMC_AUTO_ACTES_INSCRIPTIONS
  );

  useEffect(() => {
    if (!requete) return;

    lancerRMCAutoActeInscription({ parametres: { titulairesRequete: requete.titulaires }, apresSucces: setResultatRMCAutoActeInscription });
  }, [requete]);

  /* Actualisation des résultats de la RMC */
  useEffect(() => {
    if (resultatRMCAutoActeInscription) setResultatRMCActeInscription(resultatRMCAutoActeInscription);
  }, [resultatRMCAutoActeInscription]);

  /* Hook traitement auto RDCS*/
  const traitementAutoRDCSParams: ITraitementAutoRDCSParams | null = useMemo(() => {
    if (requete?.type !== TypeRequete.DELIVRANCE || !resultatRMCAutoActeInscription) return null;

    const { autoriserTraitementAutoRDCS } = location.state ?? { autoriserTraitementAutoRDCS: true };

    if (!autoriserTraitementAutoRDCS || !estEligibleAuTraitementAutoRDCS(requete as IRequeteDelivrance)) return null;

    return {
      requete: mappingRequeteDelivranceToRequeteTableau(requete as IRequeteDelivrance),
      resultatRMCAutoActe: resultatRMCAutoActeInscription.resultatRMCActe,
      resultatRMCAutoInscription: resultatRMCAutoActeInscription.resultatRMCInscription
    };
  }, [requete, resultatRMCAutoActeInscription]);

  const traitementAutoRDCSEnCours = useTraitementAutoRDCSHook(traitementAutoRDCSParams);

  /* Traitement RMC manuelle */
  const { lancerTraitement: lancerRMCActeInscription, traitementEnCours: enAttenteRMC } =
    useTraitementApi(TRAITEMENT_RMC_ACTES_INSCRIPTIONS);

  /* Nouvelle RMC depuis la pop up */
  const nouvelleRMCActeInscription = useCallback(
    (valeurs: any) => {
      setPopinAffichee(false);
      setResetRMCActeInscription(true);

      lancerRMCActeInscription({
        parametres: {
          valeursFormulaire: valeurs
        },
        apresSucces: setResultatRMCActeInscription
      });

      StockageLocal.stocker("CRITERES_RMC_ACTE_INSCRIPTION", valeurs);
      setResetRMCActeInscription(false);
      props.reset?.();
    },
    [props.reset]
  );

  return (
    <>
      {resultatRMCActeInscription && (
        <RMCActeInscriptionResultats
          typeRMC="Auto"
          dataAlertes={props.dataAlertes}
          dataRequete={requete}
          dataRMCActe={resultatRMCActeInscription.resultatRMCActe}
          dataTableauRMCActe={resultatRMCActeInscription.paramsTableauRMCActe}
          dataRMCInscription={resultatRMCActeInscription.resultatRMCInscription}
          dataTableauRMCInscription={resultatRMCActeInscription.paramsTableauRMCInscription}
          onClickCheckboxTableauActes={props.onClickCheckboxTableauActes}
          onClickCheckboxTableauInscriptions={props.onClickCheckboxTableauInscriptions}
          resetRMC={resetRMCActeInscription}
          rmcEnCours={enAttenteRMC || enAttenteRMCAuto}
        />
      )}
      <BoutonNouvelleRMCActeInscription
        nouvelleRMCActeInscription={nouvelleRMCActeInscription}
        setPopinAffichee={setPopinAffichee}
        popinAffichee={popinAffichee}
        titulaires={requete?.titulaires}
      />
      {traitementAutoRDCSEnCours && <PageChargeur />}
    </>
  );
};
