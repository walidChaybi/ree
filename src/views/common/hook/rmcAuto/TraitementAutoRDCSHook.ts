import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT } from "@model/composition/IReponseSansDelivranceCSPACSNonInscritComposition";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { replaceUrl } from "@util/route/UrlUtil";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { useReponseSansDelivranceCS } from "@views/common/hook/reponseSansDelivrance/ChoixReponseSansDelivranceCSHook";
import { createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit } from "@views/common/hook/reponseSansDelivrance/ReponseSansDelivranceCSFonctions";
import { mappingRequeteTableauVersRequeteDelivrance } from "@views/pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT } from "../../../../router/infoPages/InfoPagesEspaceDelivrance";
import AfficherMessage from "../../../../utils/AfficherMessage";
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
  resultatRMCAutoActe: ResultatRMCActe[];
  resultatRMCAutoInscription: TResultatRMCInscription[];
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
      nbInscriptionsInfos: getNbInscriptionsInfos(params.resultatRMCAutoActe, params.resultatRMCAutoInscription),
      specificationPhrase: specificationPhraseRMCAutoVide
    };
  }, [params?.resultatRMCAutoInscription, params?.resultatRMCAutoActe]);

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
      !contientPacsAuStatutActif(params.resultatRMCAutoInscription)
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
    if (!resultatReponseSansDelivranceCS || !params?.resultatRMCAutoActe || !params.resultatRMCAutoInscription) return;

    setTraitementAutoRDCSEffectue(true);
    setTraitementEnCours(false);
  }, [resultatReponseSansDelivranceCS]);

  useEffect(() => {
    if (!traitementAutoRDCSEffectue || !params) return;

    const INFO_TRAITEMENT_AUTO_EFFECTUE =
      "La recherche multi-critères sur les actes RC/RCA et PACS n'ayant donné aucun résultat, il vous est proposé de délivrer le certificat ci-dessous.";

    AfficherMessage.info(INFO_TRAITEMENT_AUTO_EFFECTUE);
    replaceUrl(
      navigate,
      LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url, { idRequeteParam: params.requete.idRequete })
    );
  }, [traitementAutoRDCSEffectue]);

  return traitementEnCours;
};

const getNbInscriptionsInfos = (
  dataRMCAutoActe?: ResultatRMCActe[],
  dataRMCAutoInscription?: TResultatRMCInscription[]
): INbInscriptionsInfos => {
  const infos: INbInscriptionsInfos = {
    nbActe: dataRMCAutoActe?.length ?? 0,
    nbRc: 0,
    nbRca: 0,
    nbPacs: 0
  };

  dataRMCAutoInscription?.forEach(inscription => {
    switch (inscription.categorie) {
      case "RC":
        infos.nbRc++;
        break;
      case "RCA":
        infos.nbRca++;
        break;
      case "PACS":
        infos.nbPacs++;
        break;
    }
  });

  return infos;
};

const contientPacsAuStatutActif = (resulatatInscriptionPacs?: TResultatRMCInscription[]): boolean =>
  resulatatInscriptionPacs
    ? resulatatInscriptionPacs.some(inscription => inscription.categorie === "PACS" && inscription.statut === "ACTIF")
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
