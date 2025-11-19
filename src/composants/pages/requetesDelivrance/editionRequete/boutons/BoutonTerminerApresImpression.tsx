import { Droit } from "@model/agent/enum/Droit";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@views/common/hook/requete/ActionHook";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { IBoutonProps } from "../../../../commun/bouton/Bouton";
import { BoutonAvecChargement } from "../../../../commun/bouton/BoutonAvecChargement";

interface BoutonTerminerApresImpressionProps extends IBoutonProps {
  requete: IRequeteDelivrance;
}

export const BoutonTerminerApresImpression: React.FC<BoutonTerminerApresImpressionProps> = ({ requete, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const boutonActif = useMemo(
    () =>
      requete.idUtilisateur === utilisateurConnecte.id &&
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER }) &&
      DocumentReponse.verifierDocumentsValides(requete.documentsReponses),
    [requete, utilisateurConnecte]
  );

  const [postCreationActionEtMiseAJourStatutParams, setPostCreationActionEtMiseAJourStatutParams] = useState<
    ICreationActionEtMiseAjourStatutParams | undefined
  >();

  const miseAJourStatutRequeteEtAjoutAction = () => {
    setPostCreationActionEtMiseAJourStatutParams({
      requeteId: requete.id,
      libelleAction: EStatutRequete.TRAITE_IMPRIME_LOCAL,
      statutRequete: "TRAITE_IMPRIME_LOCAL"
    });
  };

  const idAction = usePostCreationActionEtMiseAjourStatutApi(postCreationActionEtMiseAJourStatutParams);

  useEffect(() => {
    if (idAction) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [idAction, location.pathname, navigate]);

  return (
    <BoutonAvecChargement
      executerApresClick={miseAJourStatutRequeteEtAjoutAction}
      activerVerificationDirty={true}
      disabled={!boutonActif}
      {...props}
    >
      {"Terminer après impression locale"}
    </BoutonAvecChargement>
  );
};
