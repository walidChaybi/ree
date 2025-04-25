import { useReponseSansDelivranceCS } from "@hook/reponseSansDelivrance/ChoixReponseSansDelivranceCSHook";
import { createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit } from "@hook/reponseSansDelivrance/ReponseSansDelivranceCSFonctions";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT } from "@model/composition/IReponseSansDelivranceCSPACSNonInscritComposition";
import { EStatutFiche } from "@model/etatcivil/enum/EStatutFiche";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { FicheUtil, TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { mappingRequeteTableauVersRequeteDelivrance } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { PATH_APERCU_REQ_TRAITEMENT } from "@router/ReceUrls";
import messageManager from "@util/messageManager";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "../generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import {
  INbInscriptionsInfos,
  specificationPhraseRMCAutoVide
} from "../generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";

export interface ITraitementAutoRDCSParams {
  requete: IRequeteTableauDelivrance;
  urlCourante: string;
  dataRMCAutoActe: IResultatRMCActe[];
  dataRMCAutoInscription: IResultatRMCInscription[];
}

export const useTraitementAutoRDCSHook = (params: ITraitementAutoRDCSParams | null): boolean => {
  const navigate = useNavigate();
  const [traitementEnCours, setTraitementEnCours] = useState<boolean>(false);
  const [traitementAutoRDCSEffectue, setTraitementAutoRDCSEffectue] = useState<boolean>(false);

  const paramsCertificatSituation: IGenerationCertificatSituationParams | null = useMemo(() => {
    if (!params) return null;

    setTraitementEnCours(true);
    return {
      requete: params.requete,
      nbInscriptionsInfos: getNbInscriptionsInfos(params.dataRMCAutoActe, params.dataRMCAutoInscription),
      specificationPhrase: specificationPhraseRMCAutoVide
    };
  }, [params?.dataRMCAutoInscription, params?.dataRMCAutoActe]);

  // Génération du certificat de situation si la RMC n'a pas trouvé les Fiches Inscription ni d'actes. Sinon, renvoie un objet vide
  const resultGenerationCertificatSituationRMCAutoVide = useGenerationCertificatSituationHook(paramsCertificatSituation);

  useEffect(() => {
    if (!params || !resultGenerationCertificatSituationRMCAutoVide) return;

    if (resultGenerationCertificatSituationRMCAutoVide?.idDocumentReponse) {
      setTraitementAutoRDCSEffectue(true);
      setTraitementEnCours(false);
    } else if (
      !params.requete.documentsReponses?.length &&
      DocumentDelivrance.estAttestationPacs(params.requete.document) &&
      !contientPacsAuStatutActif(params.dataRMCAutoInscription)
    ) {
      const contenuReponseSansDelivranceCSPACSNonInscrit = createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit(
        mappingRequeteTableauVersRequeteDelivrance(params?.requete)
      );
      setReponseSansDelivranceCS({
        contenu: contenuReponseSansDelivranceCSPACSNonInscrit,
        fichier: NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT
      });
    }

    setTraitementEnCours(false);
  }, [resultGenerationCertificatSituationRMCAutoVide]);

  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<IReponseSansDelivranceCS | undefined>();

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    reponseSansDelivranceCS,
    params?.requete?.idRequete
  );

  useEffect(() => {
    if (!resultatReponseSansDelivranceCS || !params?.dataRMCAutoActe || !params.dataRMCAutoInscription) return;

    setTraitementAutoRDCSEffectue(true);
    setTraitementEnCours(false);
  }, [resultatReponseSansDelivranceCS]);

  useEffect(() => {
    if (!traitementAutoRDCSEffectue || !params) return;

    const INFO_TRAITEMENT_AUTO_EFFECTUE =
      "La recherche multi-critères sur les actes RC/RCA et PACS n'ayant donné aucun résultat, il vous est proposé de délivrer le certificat ci-dessous.";

    messageManager.showInfo(INFO_TRAITEMENT_AUTO_EFFECTUE);
    replaceUrl(navigate, `${getUrlPrecedente(params.urlCourante)}/${PATH_APERCU_REQ_TRAITEMENT}/${params.requete.idRequete}`);
  }, [traitementAutoRDCSEffectue]);

  return traitementEnCours;
};

const getNbInscriptionsInfos = (
  dataRMCAutoActe?: IResultatRMCActe[],
  dataRMCAutoInscription?: IResultatRMCInscription[]
): INbInscriptionsInfos => {
  const infos: INbInscriptionsInfos = {
    nbActe: dataRMCAutoActe?.length ?? 0,
    nbRc: 0,
    nbRca: 0,
    nbPacs: 0
  };

  dataRMCAutoInscription?.forEach(data => {
    const typeFiche: TypeFiche = FicheUtil.getTypeFicheFromString(data.categorie);
    switch (typeFiche) {
      case TypeFiche.RC:
        infos.nbRc++;
        break;
      case TypeFiche.RCA:
        infos.nbRca++;
        break;
      case TypeFiche.PACS:
        infos.nbPacs++;
        break;
    }
  });

  return infos;
};

const contientPacsAuStatutActif = (resulatatInscriptionPacs?: IResultatRMCInscription[]): boolean =>
  resulatatInscriptionPacs
    ? resulatatInscriptionPacs.some(inscription =>
        Boolean(
          FicheUtil.getTypeFicheFromString(inscription.categorie) === TypeFiche.PACS && inscription.statutInscription === EStatutFiche.ACTIF
        )
      )
    : false;

export const estEligibleAuTraitementAutoRDCS = (requete: IRequeteDelivrance): boolean => {
  const titulaire = requete.titulaires?.[0];

  return Boolean(
    titulaire?.anneeNaissance &&
      titulaire.villeNaissance &&
      !LieuxUtils.estPaysFrance(titulaire.paysNaissance) &&
      titulaire.nationalite !== Nationalite.FRANCAISE &&
      (requete.sousType === SousTypeDelivrance.RDCSC || requete.sousType === SousTypeDelivrance.RDCSD)
  );
};
