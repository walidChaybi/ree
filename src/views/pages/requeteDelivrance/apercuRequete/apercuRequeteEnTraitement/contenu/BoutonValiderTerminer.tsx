import {
  IDerniereDelivranceRcRcaPacsParams,
  useDerniereDelivranceRcRcaPacsApiHook
} from "@hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@hook/requete/ActionHook";
import { Droit } from "@model/agent/enum/Droit";
import { ETypeRcRcaPacs } from "@model/etatcivil/enum/ETypeRcRcaPacs";
import { Provenance } from "@model/requete/enum/Provenance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../../contexts/RECEContextProvider";

interface BoutonValiderTerminerProps {
  requete: IRequeteDelivrance;
}

export const BoutonValiderTerminer: React.FC<BoutonValiderTerminerProps> = props => {
  const requeteDelivrance = props.requete;
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [estDisabled, setEstDisabled] = useState(true);

  const [majStatutParams, setMajStatutParams] = useState<ICreationActionEtMiseAjourStatutParams | undefined>();

  const [majDateDerniereDelivranceParams, setMajDateDerniereDelivranceParams] = useState<
    IDerniereDelivranceRcRcaPacsParams[] | undefined
  >();
  const [pasDeMajDateDerniereDelivrance, setPasDeMajDateDerniereDelivrance] = useState(false);

  const futurStatut = ((): keyof typeof EStatutRequete => {
    switch (props.requete.canal) {
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

  // 1 - Ajout de l'action et mise à jour du statut
  const setActionEtUpdateStatut = () => {
    setMajStatutParams({
      requeteId: props.requete.id,
      libelleAction: EStatutRequete[futurStatut],
      statutRequete: futurStatut
    });
  };

  const idAction = usePostCreationActionEtMiseAjourStatutApi(majStatutParams);

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

  const estAValider = props.requete.statutCourant.statut === StatutRequete.A_VALIDER;

  const mAppartient = props.requete.idUtilisateur === utilisateurConnecte?.id;

  if (
    mAppartient &&
    ((requeteDelivrance.provenanceRequete.provenance.libelle === Provenance.COMEDEC.libelle &&
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER_COMEDEC })) ||
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER })) &&
    DocumentReponse.verifierDocumentsValides(props.requete.documentsReponses) &&
    estDisabled
  ) {
    setEstDisabled(false);
  }

  return (
    <>
      {estAValider && (
        <BoutonOperationEnCours
          onClick={setActionEtUpdateStatut}
          estDesactive={estDisabled}
          checkDirtyActive={true}
        >
          {"Valider et terminer"}
        </BoutonOperationEnCours>
      )}
    </>
  );
};

function recupererIdRepertoiresDocumentReponsesCs(requete: IRequeteDelivrance): IDerniereDelivranceRcRcaPacsParams[] {
  const repertoiresAMaj = [] as IDerniereDelivranceRcRcaPacsParams[];

  requete?.documentsReponses?.forEach(el => {
    if (el.idPacs != null) {
      repertoiresAMaj.push({
        idRepertoire: el.idPacs,
        typeRepertoire: ETypeRcRcaPacs.PACS
      });
    } else if (el.idRc != null) {
      repertoiresAMaj.push({
        idRepertoire: el.idRc,
        typeRepertoire: ETypeRcRcaPacs.RC
      });
    } else if (el.idRca != null) {
      repertoiresAMaj.push({
        idRepertoire: el.idRca,
        typeRepertoire: ETypeRcRcaPacs.RCA
      });
    }
  });

  return repertoiresAMaj;
}
