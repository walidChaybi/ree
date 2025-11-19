import { Droit } from "@model/agent/enum/Droit";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@views/common/hook/requete/ActionHook";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../../contexts/RECEContextProvider";

interface BoutonTerminerApresImpressionProps {
  requete: IRequeteDelivrance;
}

export const BoutonTerminerApresImpression: React.FC<BoutonTerminerApresImpressionProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const [majStatutParams, setMajStatutParams] = useState<ICreationActionEtMiseAjourStatutParams | undefined>();

  // 1 - Ajout de l'action et mise à jour du statut
  const setActionEtUpdateStatut = () => {
    setMajStatutParams({
      requeteId: props.requete.id,
      libelleAction: EStatutRequete.TRAITE_IMPRIME_LOCAL,
      statutRequete: "TRAITE_IMPRIME_LOCAL"
    });
  };

  const idAction = usePostCreationActionEtMiseAjourStatutApi(majStatutParams);

  useEffect(() => {
    if (idAction) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [idAction, location.pathname, navigate]);

  const estAValiderOuASigner =
    props.requete.statutCourant.statut === StatutRequete.A_VALIDER || props.requete.statutCourant.statut === StatutRequete.A_SIGNER;

  const requeteCourrier = props.requete.sousType === SousTypeDelivrance.RDC || props.requete.sousType === SousTypeDelivrance.RDCSC;

  const afficherBouton = requeteCourrier && estAValiderOuASigner;

  function estActif() {
    const mAppartient = props.requete.idUtilisateur === utilisateurConnecte?.id;
    return (
      mAppartient &&
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER }) &&
      DocumentReponse.verifierDocumentsValides(props.requete.documentsReponses)
    );
  }

  return (
    <>
      {afficherBouton && (
        <BoutonOperationEnCours
          onClick={setActionEtUpdateStatut}
          estDesactive={!estActif()}
          checkDirtyActive={true}
        >
          {"Terminer après impression locale"}
        </BoutonOperationEnCours>
      )}
    </>
  );
};
