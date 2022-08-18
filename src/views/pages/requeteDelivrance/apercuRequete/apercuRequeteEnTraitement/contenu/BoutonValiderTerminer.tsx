import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../../../model/agent/IOfficier";
import { TypePacsRcRca } from "../../../../../../model/etatcivil/enum/TypePacsRcRca";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { TypeCanal } from "../../../../../../model/requete/enum/TypeCanal";
import { DocumentReponse } from "../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import {
  IDerniereDelivranceRcRcaPacsParams,
  useDerniereDelivranceRcRcaPacsApiHook
} from "../../../../../common/hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../../../common/hook/requete/ActionHook";
import { getUrlPrecedente } from "../../../../../common/util/route/routeUtil";
import { storeRece } from "../../../../../common/util/storeRece";
import { getLibelle } from "../../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../../common/widget/attente/BoutonOperationEnCours";
import { receUrl } from "../../../../../router/ReceUrls";

interface BoutonValiderTerminerProps {
  requete: IRequeteDelivrance;
}

export const BoutonValiderTerminer: React.FC<
  BoutonValiderTerminerProps
> = props => {
  const requeteDelivrance = props.requete;
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);

  const [majStatutParams, setMajStatutParams] = useState<
    CreationActionEtMiseAjourStatutParams | undefined
  >();

  const [majDateDerniereDelivranceParams, setMajDateDerniereDelivranceParams] =
    useState<IDerniereDelivranceRcRcaPacsParams[] | undefined>();
  const [pasDeMajDateDerniereDelivrance, setPasDeMajDateDerniereDelivrance] =
    useState(false);

  let futurStatut: StatutRequete;
  switch (props.requete.canal) {
    case TypeCanal.COURRIER:
      futurStatut = StatutRequete.TRAITE_A_IMPRIMER;
      break;
    case TypeCanal.INTERNET:
      futurStatut = StatutRequete.TRAITE_A_DELIVRER_DEMAT;
      break;
    case TypeCanal.RECE:
      futurStatut = StatutRequete.TRAITE_REPONDU;
      break;
    default:
      futurStatut = StatutRequete.TRAITE_A_DELIVRER_DEMAT;
  }

  // 1 - Ajout de l'action et mise à jour du statut
  const setActionEtUpdateStatut = () => {
    setMajStatutParams({
      requeteId: props.requete.id,
      libelleAction: futurStatut.libelle,
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

  const majDateDerniereDelivrance = useDerniereDelivranceRcRcaPacsApiHook(
    majDateDerniereDelivranceParams
  );

  // 3 - Navigation après le traitement
  useEffect(() => {
    if (majDateDerniereDelivrance || pasDeMajDateDerniereDelivrance) {
      receUrl.replaceUrl(history, getUrlPrecedente(history.location.pathname));
    }
  }, [majDateDerniereDelivrance, pasDeMajDateDerniereDelivrance, history]);

  const estAValider =
    props.requete.statutCourant.statut === StatutRequete.A_VALIDER;

  const mAppartient =
    props.requete.idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;

  if (
    mAppartient &&
    provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
      requeteDelivrance.provenanceRequete.provenance.libelle
    ) &&
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
          {getLibelle("Valider et terminer")}
        </BoutonOperationEnCours>
      )}
    </>
  );
};

function recupererIdRepertoiresDocumentReponsesCs(
  requete: IRequeteDelivrance
): IDerniereDelivranceRcRcaPacsParams[] {
  const repertoiresAMaj = [] as IDerniereDelivranceRcRcaPacsParams[];

  requete?.documentsReponses?.forEach(el => {
    if (el.idPacs != null) {
      repertoiresAMaj.push({
        idRepertoire: el.idPacs,
        typeRepertoire: TypePacsRcRca.PACS
      });
    } else if (el.idRc != null) {
      repertoiresAMaj.push({
        idRepertoire: el.idRc,
        typeRepertoire: TypePacsRcRca.RC
      });
    } else if (el.idRca != null) {
      repertoiresAMaj.push({
        idRepertoire: el.idRca,
        typeRepertoire: TypePacsRcRca.RCA
      });
    }
  });

  return repertoiresAMaj;
}
