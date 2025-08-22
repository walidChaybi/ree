import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { VisionneuseAvecTitre } from "@widget/visionneuseDocument/VisionneuseAvecTitre";
import React, { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import { BoutonPrendreEnCharge } from "./contenu/BoutonPrendreEnCharge";

interface ApercuRequetePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuRequetePage: React.FC<ApercuRequetePageProps> = ({ idRequeteAAfficher }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [documentAffiche, setDocumentAffiche] = useState<IDocumentReponse>();

  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [lancerMajRequete, setLancerMajRequete] = useState<ICreationActionMiseAjourStatutHookParams>();

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
        libelleAction: EStatutRequete.TRAITE_DELIVRE_DEMAT,
        statutRequete: "TRAITE_DELIVRE_DEMAT",
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
      title={"Aperçu de la requête"}
      setRequete={setRequeteCallback}
      setDocumentAfficheCallback={setDocumentAfficheCallback}
      idRequeteAAfficher={idRequeteAAfficher}
    >
      {requete && (
        <>
          {documentAffiche && (
            <VisionneuseAvecTitre
              titre={"Aperçu des documents"}
              contenuBase64={documentAffiche.contenu}
              typeMime={documentAffiche.mimeType}
            />
          )}
          {afficherBoutonFinConsultation(requete.statutCourant.statut, requete.idUtilisateur, utilisateurConnecte) && (
            <BoutonDoubleSubmit onClick={finDeConsultation}>{"Fin consultation"}</BoutonDoubleSubmit>
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

function afficherBoutonFinConsultation(statut: StatutRequete, idUtilisateur: string, utilisateurConnecte: UtilisateurConnecte) {
  return statut === StatutRequete.TRAITE_REPONDU && utilisateurConnecte.id === idUtilisateur;
}
