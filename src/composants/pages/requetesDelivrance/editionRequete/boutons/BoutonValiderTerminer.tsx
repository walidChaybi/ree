import {
  IDerniereDelivranceRcRcaPacsParams,
  useDerniereDelivranceRcRcaPacsApiHook
} from "@hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@hook/requete/ActionHook";
import { Droit } from "@model/agent/enum/Droit";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { IBoutonProps } from "../../../../commun/bouton/Bouton";
import { BoutonAvecChargement } from "../../../../commun/bouton/BoutonAvecChargement";

interface BoutonValiderTerminerProps extends IBoutonProps {
  requete: IRequeteDelivrance;
}

export const BoutonValiderTerminer: React.FC<BoutonValiderTerminerProps> = ({ requete, ...props }) => {
  const requeteDelivrance = requete;
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [estDisabled, setEstDisabled] = useState(true);

  const [postCreationActionEtMiseAJourStatutParams, setPostCreationActionEtMiseAJourStatutParams] = useState<
    ICreationActionEtMiseAjourStatutParams | undefined
  >();

  const [majDateDerniereDelivranceParams, setMajDateDerniereDelivranceParams] = useState<
    IDerniereDelivranceRcRcaPacsParams[] | undefined
  >();
  const [pasDeMajDateDerniereDelivrance, setPasDeMajDateDerniereDelivrance] = useState(false);

  const miseAJourStatutRequeteEtAjoutAction = () => {
    const futurStatut = ((): keyof typeof EStatutRequete => {
      switch (requete.canal) {
        case TypeCanal.COURRIER:
          return "TRAITE_A_IMPRIMER";
        case TypeCanal.INTERNET:
          return "TRAITE_A_DELIVRER_DEMAT";
        case TypeCanal.RECE:
          return "TRAITE_REPONDU";
        default:
          return "TRAITE_A_DELIVRER_DEMAT";
      }
    })();

    setPostCreationActionEtMiseAJourStatutParams({
      requeteId: requete.id,
      libelleAction: EStatutRequete[futurStatut],
      statutRequete: futurStatut
    });
  };

  const idAction = usePostCreationActionEtMiseAjourStatutApi(postCreationActionEtMiseAJourStatutParams);

  // 2 - Mise à jour des dates de délivrance si des documents réponses sont des CS RC, RCA ou PACS
  useEffect(() => {
    const params = recupererIdRepertoiresDocumentReponsesCs(requeteDelivrance);
    if (idAction && params.length !== 0) {
      setMajDateDerniereDelivranceParams(params);
    } else if (idAction) {
      setPasDeMajDateDerniereDelivrance(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAction]);

  const majDateDerniereDelivrance = useDerniereDelivranceRcRcaPacsApiHook(majDateDerniereDelivranceParams);

  // 3 - Navigation après le traitement
  useEffect(() => {
    if (majDateDerniereDelivrance || pasDeMajDateDerniereDelivrance) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [majDateDerniereDelivrance, pasDeMajDateDerniereDelivrance, navigate, location]);

  const recupererIdRepertoiresDocumentReponsesCs = (requete: IRequeteDelivrance): IDerniereDelivranceRcRcaPacsParams[] => {
    const repertoiresAMaj = [] as IDerniereDelivranceRcRcaPacsParams[];

    requete?.documentsReponses?.forEach(el => {
      if (el.idPacs != null) {
        repertoiresAMaj.push({
          idRepertoire: el.idPacs,
          typeRepertoire: ETypePacsRcRca.PACS
        });
      } else if (el.idRc != null) {
        repertoiresAMaj.push({
          idRepertoire: el.idRc,
          typeRepertoire: ETypePacsRcRca.RC
        });
      } else if (el.idRca != null) {
        repertoiresAMaj.push({
          idRepertoire: el.idRca,
          typeRepertoire: ETypePacsRcRca.RCA
        });
      }
    });

    return repertoiresAMaj;
  };

  const estAValider = requete.statutCourant.statut === StatutRequete.A_VALIDER;

  const mAppartient = requete.idUtilisateur === utilisateurConnecte.id;

  if (
    mAppartient &&
    ((requeteDelivrance.provenanceRequete.provenance.libelle === Provenance.COMEDEC.libelle &&
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER_COMEDEC })) ||
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER })) &&
    DocumentReponse.verifierDocumentsValides(requete.documentsReponses) &&
    estDisabled
  ) {
    setEstDisabled(false);
  }

  return (
    <>
      {estAValider && (
        <BoutonAvecChargement
          executerApresClick={miseAJourStatutRequeteEtAjoutAction}
          activerVerificationDirty={true}
          disabled={estDisabled}
          {...props}
        >
          Valider et terminer
        </BoutonAvecChargement>
      )}
    </>
  );
};
