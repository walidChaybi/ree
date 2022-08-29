import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import { getUrlPrecedente } from "../../../../common/util/route/routeUtil";
import { storeRece } from "../../../../common/util/storeRece";
import { getLibelle } from "../../../../common/util/Utils";
import { Bouton } from "../../../../common/widget/boutonAntiDoubleSubmit/Bouton";
import { VisionneuseAvecTitre } from "../../../../common/widget/document/VisionneuseAvecTitre";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
import { receUrl } from "../../../../router/ReceUrls";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import { BoutonPrendreEnCharge } from "./contenu/BoutonPrendreEnCharge";

interface ApercuRequetePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuRequetePage: React.FC<ApercuRequetePageProps> = ({
  idRequeteAAfficher
}) => {
  const history = useHistory();
  const [documentAffiche, setDocumentAffiche] = useState<IDocumentReponse>();

  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [lancerMajRequete, setLancerMajRequete] =
    useState<CreationActionMiseAjourStatutHookParams>();

  useCreationActionMiseAjourStatut(lancerMajRequete);

  const setRequeteCallback = useCallback(
    (req: IRequeteDelivrance) => {
      setRequete(req);
    },
    [setRequete]
  );

  const setDocumentAfficheCallback = useCallback(
    (docReponse: IDocumentReponse) => {
      setDocumentAffiche(docReponse);
    },
    [setDocumentAffiche]
  );

  const finDeConsultation = useCallback(() => {
    if (requete) {
      setLancerMajRequete({
        libelleAction: StatutRequete.TRAITE_DELIVRE_DEMAT.libelle,
        statutRequete: StatutRequete.TRAITE_DELIVRE_DEMAT,
        requete: mappingRequeteDelivranceToRequeteTableau(requete),
        callback: () => {
          receUrl.replaceUrl(
            history,
            getUrlPrecedente(history.location.pathname)
          );
        }
      });
    }
  }, [requete, history]);

  const estPresentBoutonPriseEnCharge =
    StatutRequete.estAuStatutATraiterOuTransferee(
      requete?.statutCourant?.statut
    ) && SousTypeDelivrance.possibleAPrendreEnCharge(requete?.sousType);

  return (
    <ApercuRequeteTemplate
      title={getLibelle("Aperçu de la requête")}
      setRequeteCallback={setRequeteCallback}
      setDocumentAfficheCallback={setDocumentAfficheCallback}
      idRequeteAAfficher={idRequeteAAfficher}
    >
      {requete && (
        <>
          <VisionneuseAvecTitre
            titre={getLibelle("Aperçu des documents")}
            contenu={documentAffiche?.contenu}
            typeMime={documentAffiche?.mimeType}
          />
          {afficherBoutonFinConsultation(
            requete.statutCourant.statut,
            requete.idUtilisateur
          ) && (
            <Bouton onClick={finDeConsultation}>
              {getLibelle("Fin de consultation")}
            </Bouton>
          )}
          {!idRequeteAAfficher && <BoutonRetour />}
          {estPresentBoutonPriseEnCharge && (
            <BoutonPrendreEnCharge
              requete={requete}
              disabled={idRequeteAAfficher !== undefined}
            ></BoutonPrendreEnCharge>
          )}
        </>
      )}
    </ApercuRequeteTemplate>
  );
};

function afficherBoutonFinConsultation(
  statut: StatutRequete,
  idUtilisateur: string
) {
  return (
    statut === StatutRequete.TRAITE_REPONDU &&
    storeRece.utilisateurCourant?.idUtilisateur === idUtilisateur
  );
}