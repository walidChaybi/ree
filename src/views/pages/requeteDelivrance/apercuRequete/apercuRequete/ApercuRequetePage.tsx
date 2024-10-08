import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { IOfficier } from "@model/agent/IOfficier";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { getLibelle } from "@util/Utils";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { VisionneuseAvecTitre } from "@widget/visionneuseDocument/VisionneuseAvecTitre";
import React, { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import { BoutonPrendreEnCharge } from "./contenu/BoutonPrendreEnCharge";

interface ApercuRequetePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuRequetePage: React.FC<ApercuRequetePageProps> = ({
  idRequeteAAfficher
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [documentAffiche, setDocumentAffiche] = useState<IDocumentReponse>();

  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [lancerMajRequete, setLancerMajRequete] =
    useState<ICreationActionMiseAjourStatutHookParams>();

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
          replaceUrl(navigate, getUrlPrecedente(location.pathname));
        }
      });
    }
  }, [requete, location, navigate]);

  const estPresentBoutonPriseEnCharge =
    StatutRequete.estATraiterOuTransferee(requete?.statutCourant?.statut) &&
    SousTypeDelivrance.estPossibleAPrendreEnCharge(requete?.sousType);

  return (
    <ApercuRequeteTemplate
      title={getLibelle("Aperçu de la requête")}
      setRequeteCallback={setRequeteCallback}
      setDocumentAfficheCallback={setDocumentAfficheCallback}
      idRequeteAAfficher={idRequeteAAfficher}
    >
      {requete && (
        <>
          {documentAffiche && (
            <VisionneuseAvecTitre
              titre={getLibelle("Aperçu des documents")}
              contenuBase64={documentAffiche.contenu}
              typeMime={documentAffiche.mimeType}
            />
          )}
          {afficherBoutonFinConsultation(
            requete.statutCourant.statut,
            requete.idUtilisateur,
            utilisateurConnecte
          ) && (
            <BoutonDoubleSubmit onClick={finDeConsultation}>
              {getLibelle("Fin consultation")}
            </BoutonDoubleSubmit>
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
  idUtilisateur: string,
  utilisateurConnecte: IOfficier
) {
  return (
    statut === StatutRequete.TRAITE_REPONDU &&
    utilisateurConnecte?.idUtilisateur === idUtilisateur
  );
}
