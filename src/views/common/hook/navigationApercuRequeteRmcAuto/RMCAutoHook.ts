import { useEffect, useState } from "react";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { useRMCAutoActeApiHook } from "../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActeApiHook";
import {
  redirectionRMCAuto,
  redirectionRMCAutoApercuTraitement
} from "../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActesInscriptionsUtils";
import { useRMCAutoInscriptionApiHook } from "../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoInscriptionApiHook";
import { IUrlData } from "../../../router/ReceUrls";
import { IParamsTableau } from "../../util/GestionDesLiensApi";
import { getLibelle } from "../../util/Utils";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_DEFAUT
} from "../../widget/tableau/TableauRece/TableauPaginationConstantes";
import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "../generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseRMCAutoVide } from "../generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { IResultGenerationUnDocument } from "../generation/generationUtils";

const INFO_CS_RMC_AUTO_VIDE = getLibelle(
  "La recherche multi-critères sur les actes/ RC / RCA et PACS n'ayant donné aucun résultat, il vous est proposé de délivrer le certificat ci-dessous."
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

  const {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  } = useRMCAutoInscriptionApiHook(
    params?.requete,
    `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
  );

  const [
    paramsCertificatSituation,
    setParamsCertificatSituation
  ] = useState<IGenerationCertificatSituationParams>();

  useEffect(() => {
    // si pasDeTraitementAuto=true alors pas de génération de certificat de situation automatiquement en fonction des résultats de la RMC auto
    if (params && !params.pasDeTraitementAuto) {
      setParamsCertificatSituation({
        requete: params.requete,
        dataRMCAutoInscription,
        dataRMCAutoActe,
        specificationPhrase: specificationPhraseRMCAutoVide
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRMCAutoInscription, dataRMCAutoActe]);

  // Génération du certificat de situation
  const resultGenerationCertificatSituationRMCAutoVide = useGenerationCertificatSituationHook(
    paramsCertificatSituation
  );

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
    resultGenerationCertificatSituationRMCAutoVide
  ]);

  return urlDataRMCAuto;
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
