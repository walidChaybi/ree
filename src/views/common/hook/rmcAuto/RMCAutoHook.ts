import { useReponseSansDelivranceCS } from "@hook/reponseSansDelivrance/ChoixReponseSansDelivranceCSHook";
import { createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit } from "@hook/reponseSansDelivrance/ReponseSansDelivranceCSFonctions";
import { useRMCAutoActeApiHook } from "@hook/rmcAuto/RMCAutoActeApiHook";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT } from "@model/composition/IReponseSansDelivranceCSPACSNonInscritComposition";
import { StatutFiche } from "@model/etatcivil/enum/StatutFiche";
import { FicheUtil, TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IUrlData } from "@router/ReceUrls";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getLibelle, mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useEffect, useState } from "react";
import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "../generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import {
  INbInscriptionsInfos,
  specificationPhraseRMCAutoVide
} from "../generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { IResultGenerationUnDocument } from "../generation/generationUtils";
import {
  redirectionRMCAuto,
  redirectionRMCAutoApercuTraitement
} from "./RMCAutoActesInscriptionsUtils";
import { useRMCAutoInscriptionApiHook } from "./RMCAutoInscriptionApiHook";

const INFO_CS_RMC_AUTO_VIDE = getLibelle(
  "La recherche multi-critères sur les actes RC/RCA et PACS n'ayant donné aucun résultat, il vous est proposé de délivrer le certificat ci-dessous."
);
export interface IRMCAutoParams {
  requete: IRequeteTableauDelivrance;
  urlCourante: string;
  pasDeTraitementAuto?: boolean;
}

export function useRMCAutoHook(params?: IRMCAutoParams): IUrlData | undefined {
  const [urlDataRMCAuto, setUrlDataRMCAuto] = useState<IUrlData | undefined>();

  const { dataRMCAutoActe, dataTableauRMCAutoActe } = useRMCAutoActeApiHook(
    params?.requete,
    `0-${NB_LIGNES_PAR_APPEL_ACTE}`
  );

  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<
    IReponseSansDelivranceCS | undefined
  >();

  const { dataRMCAutoInscription, dataTableauRMCAutoInscription } =
    useRMCAutoInscriptionApiHook(
      params?.requete,
      `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
    );

  const [paramsCertificatSituation, setParamsCertificatSituation] =
    useState<IGenerationCertificatSituationParams>();

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    reponseSansDelivranceCS,
    params?.requete?.idRequete
  );

  useEffect(() => {
    // si pasDeTraitementAuto=true alors pas de génération de certificat de situation automatiquement en fonction des résultats de la RMC auto
    if (
      params &&
      !params.pasDeTraitementAuto &&
      dataRMCAutoInscription &&
      dataRMCAutoActe
    ) {
      setParamsCertificatSituation({
        requete: params.requete,
        nbInscriptionsInfos: getNbInscriptionsInfos(
          dataRMCAutoActe,
          dataRMCAutoInscription
        ),
        specificationPhrase: specificationPhraseRMCAutoVide
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRMCAutoInscription, dataRMCAutoActe]);

  // Génération du certificat de situation
  const resultGenerationCertificatSituationRMCAutoVide =
    useGenerationCertificatSituationHook(paramsCertificatSituation);

  useEffect(() => {
    if (
      toutLesTraitementAmontOntEteEffectues(
        params,
        dataRMCAutoActe,
        dataTableauRMCAutoActe,
        dataRMCAutoInscription,
        dataTableauRMCAutoInscription,
        resultGenerationCertificatSituationRMCAutoVide
      )
    ) {
      const data = {
        dataRMCAutoActe,
        dataTableauRMCAutoActe,
        dataRMCAutoInscription,
        dataTableauRMCAutoInscription,
        info: ""
      };
      if (resultGenerationCertificatSituationRMCAutoVide?.idDocumentReponse) {
        data.info = INFO_CS_RMC_AUTO_VIDE;
        setUrlDataRMCAuto({
          url: redirectionRMCAutoApercuTraitement(
            //@ts-ignore
            params.requete.idRequete,
            //@ts-ignore
            params.urlCourante
          ),
          data
        });
      } else if (
        !getPacsAuStatutActif(dataRMCAutoInscription).length &&
        DocumentDelivrance.estAttestationPacs(params?.requete.document) &&
        !params?.requete.documentsReponses?.length
      ) {
        data.info = INFO_CS_RMC_AUTO_VIDE;
        const contenuReponseSansDelivranceCSPACSNonInscrit =
          createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit(
            mappingRequeteTableauVersRequeteDelivrance(params?.requete)
          );

        setReponseSansDelivranceCS({
          contenu: contenuReponseSansDelivranceCSPACSNonInscrit,
          fichier: NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT
        });

        if (resultatReponseSansDelivranceCS) {
          setUrlDataRMCAuto({
            url: redirectionRMCAutoApercuTraitement(
              //@ts-ignore
              params.requete.idRequete,
              //@ts-ignore
              params.urlCourante
            ),
            data
          });
        }
      } else {
        setUrlDataRMCAuto({
          url: redirectionRMCAuto(
            //@ts-ignore
            params.requete,
            //@ts-ignore
            params.urlCourante
          ),
          data
        });
      }
    }
  }, [
    params,
    dataRMCAutoActe,
    dataTableauRMCAutoActe,
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription,
    resultGenerationCertificatSituationRMCAutoVide,
    resultatReponseSansDelivranceCS
  ]);

  return urlDataRMCAuto;
}

function getNbInscriptionsInfos(
  dataRMCAutoActe?: IResultatRMCActe[],
  dataRMCAutoInscription?: IResultatRMCInscription[]
) {
  const infos: INbInscriptionsInfos = {
    nbActe: 0,
    nbRc: 0,
    nbRca: 0,
    nbPacs: 0
  };

  if (dataRMCAutoActe) {
    infos.nbActe = dataRMCAutoActe.length;
  }

  if (dataRMCAutoInscription) {
    dataRMCAutoInscription.forEach(data => {
      const typeFiche: TypeFiche = FicheUtil.getTypeFicheFromString(
        data.categorie
      );
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
  }

  return infos;
}

function getPacsAuStatutActif(
  resulatatInscriptionPacs?: IResultatRMCInscription[]
): IResultatRMCInscription[] {
  const pacs = getPacs(resulatatInscriptionPacs);

  return pacs.filter(
    inscription => inscription.statutInscription === StatutFiche.ACTIF.libelle
  );
}

function getPacs(
  tableauPacs?: IResultatRMCInscription[]
): IResultatRMCInscription[] {
  return tableauPacs
    ? tableauPacs.filter(
        pacs =>
          FicheUtil.getTypeFicheFromString(pacs.categorie) === TypeFiche.PACS
      )
    : [];
}

function toutLesTraitementAmontOntEteEffectues(
  params: IRMCAutoParams | undefined,
  dataRMCAutoActe: IResultatRMCActe[] | undefined,
  dataTableauRMCAutoActe: IParamsTableau | undefined,
  dataRMCAutoInscription: IResultatRMCInscription[] | undefined,
  dataTableauRMCAutoInscription: IParamsTableau | undefined,
  resultGenerationCertificatSituationRMCAutoVide:
    | IResultGenerationUnDocument
    | undefined
) {
  return (
    estNonVide(
      params,
      dataRMCAutoActe,
      dataTableauRMCAutoActe,
      dataRMCAutoInscription,
      dataTableauRMCAutoInscription
    ) &&
    // Si la génération automatique de certificat de situation n'a pas été faite mais que pasDeTraitementAuto=true alors on continue le traitement
    (resultGenerationCertificatSituationRMCAutoVide ||
      //@ts-ignore (param est forcément non vide)
      params.pasDeTraitementAuto)
  );
}

function estNonVide(
  params?: IRMCAutoParams,
  dataRMCAutoActe?: IResultatRMCActe[],
  dataTableauRMCAutoActe?: IParamsTableau,
  dataRMCAutoInscription?: IResultatRMCInscription[],
  dataTableauRMCAutoInscription?: IParamsTableau
) {
  return (
    params?.requete &&
    params?.urlCourante &&
    dataRMCAutoActe &&
    dataTableauRMCAutoActe &&
    dataRMCAutoInscription &&
    dataTableauRMCAutoInscription
  );
}

function mappingRequeteTableauVersRequeteDelivrance(
  requeteTableauDelivrance?: IRequeteTableauDelivrance
): IRequeteDelivrance {
  return requeteTableauDelivrance?.titulaires
    ? ({
        ...requeteTableauDelivrance,
        // Dans le cas du PACS il n'y a qu'un seul titulaire !
        titulaires: [
          {
            ...requeteTableauDelivrance.titulaires[0],
            prenoms: mapPrenomsVersPrenomsOrdonnes(
              requeteTableauDelivrance.titulaires[0].prenoms
            ),
            nomNaissance: requeteTableauDelivrance.titulaires[0].nom
          }
        ]
      } as any as IRequeteDelivrance)
    : ({
        ...requeteTableauDelivrance
      } as any as IRequeteDelivrance);
}
