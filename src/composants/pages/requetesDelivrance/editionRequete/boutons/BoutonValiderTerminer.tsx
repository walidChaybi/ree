import { RECEContextData } from "@core/contexts/RECEContext";
import {
  IDerniereDelivranceRcRcaPacsParams,
  useDerniereDelivranceRcRcaPacsApiHook,
} from "@hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import {
  ICreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi,
} from "@hook/requete/ActionHook";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "@model/agent/IOfficier";
import { TypePacsRcRca } from "@model/etatcivil/enum/TypePacsRcRca";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IBoutonProps } from "../../../../commun/bouton/Bouton";
import { BoutonAvecChargement } from "../../../../commun/bouton/BoutonAvecChargement";

interface BoutonValiderTerminerProps extends IBoutonProps {
  requete: IRequeteDelivrance;
}

export const BoutonValiderTerminer: React.FC<BoutonValiderTerminerProps> = ({
  requete,
  ...props
}) => {
  const requeteDelivrance = requete;
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [estDisabled, setEstDisabled] = useState(true);

  const [
    postCreationActionEtMiseAJourStatutParams,
    setPostCreationActionEtMiseAJourStatutParams,
  ] = useState<ICreationActionEtMiseAjourStatutParams | undefined>();

  const [majDateDerniereDelivranceParams, setMajDateDerniereDelivranceParams] =
    useState<IDerniereDelivranceRcRcaPacsParams[] | undefined>();
  const [pasDeMajDateDerniereDelivrance, setPasDeMajDateDerniereDelivrance] =
    useState(false);

  let futurStatut: StatutRequete;
  switch (requete.canal) {
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

  const miseAJourStatutRequeteEtAjoutAction = () => {
    setPostCreationActionEtMiseAJourStatutParams({
      requeteId: requete.id,
      libelleAction: futurStatut.libelle,
      statutRequete: futurStatut,
    });
  };

  const idAction = usePostCreationActionEtMiseAjourStatutApi(
    postCreationActionEtMiseAJourStatutParams,
  );

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
    majDateDerniereDelivranceParams,
  );

  // 3 - Navigation après le traitement
  useEffect(() => {
    if (majDateDerniereDelivrance || pasDeMajDateDerniereDelivrance) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [
    majDateDerniereDelivrance,
    pasDeMajDateDerniereDelivrance,
    navigate,
    location,
  ]);

  const recupererIdRepertoiresDocumentReponsesCs = (
    requete: IRequeteDelivrance,
  ): IDerniereDelivranceRcRcaPacsParams[] => {
    const repertoiresAMaj = [] as IDerniereDelivranceRcRcaPacsParams[];

    requete?.documentsReponses?.forEach((el) => {
      if (el.idPacs != null) {
        repertoiresAMaj.push({
          idRepertoire: el.idPacs,
          typeRepertoire: TypePacsRcRca.PACS,
        });
      } else if (el.idRc != null) {
        repertoiresAMaj.push({
          idRepertoire: el.idRc,
          typeRepertoire: TypePacsRcRca.RC,
        });
      } else if (el.idRca != null) {
        repertoiresAMaj.push({
          idRepertoire: el.idRca,
          typeRepertoire: TypePacsRcRca.RCA,
        });
      }
    });

    return repertoiresAMaj;
  };

  const estAValider = requete.statutCourant.statut === StatutRequete.A_VALIDER;

  const mAppartient =
    requete.idUtilisateur === utilisateurConnecte?.idUtilisateur;

  if (
    mAppartient &&
    provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
      utilisateurConnecte,
      requeteDelivrance.provenanceRequete.provenance.libelle,
    ) &&
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
