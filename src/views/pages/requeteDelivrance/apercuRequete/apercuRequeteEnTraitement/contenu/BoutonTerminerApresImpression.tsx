import { RECEContextData } from "@core/contexts/RECEContext";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@hook/requete/ActionHook";
import { Droit } from "@model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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
      libelleAction: StatutRequete.TRAITE_IMPRIME_LOCAL.libelle,
      statutRequete: StatutRequete.TRAITE_IMPRIME_LOCAL
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
    const mAppartient = props.requete.idUtilisateur === utilisateurConnecte?.idUtilisateur;
    return (
      mAppartient &&
      officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER) &&
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
          {getLibelle("Terminer après impression locale")}
        </BoutonOperationEnCours>
      )}
    </>
  );
};
