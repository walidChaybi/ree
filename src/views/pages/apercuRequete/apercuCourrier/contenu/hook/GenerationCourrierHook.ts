import { useEffect, useState } from "react";
import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import {
  CourrierComposition,
  ICourrierComposition
} from "../../../../../../model/composition/ICourrierComposition";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import { OptionsCourrier } from "../../../../../../model/requete/v2/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { MimeType } from "../../../../../../ressources/MimeType";
import {
  ICourrierParams,
  useCourrierApiHook
} from "../../../../../common/hook/v2/composition/CompositionCourrierHook";
import {
  IElementsJasperCourrier,
  specificationCourrier
} from "../../../../../common/hook/v2/generation/generationCourrierHook/specificationCourrier";
import {
  IResultGenerationUnDocument,
  RESULTAT_VIDE
} from "../../../../../common/hook/v2/generation/generationUtils";
import { useInformationsActeApiHook } from "../../../../../common/hook/v2/repertoires/ActeApiHook";
import { useStockerDocumentCreerActionMajStatutRequete } from "../../../../../common/hook/v2/requete/StockerDocumentCreerActionMajStatutRequete";
import { SaisieCourrier } from "../modelForm/ISaisiePageModel";

export interface IResultGenerationCourrier {
  idDocumentReponse?: string;
  idAction?: string;
  contenuDocumentReponse?: string;
}

export interface IGenerationCourrierParams {
  saisieCourrier?: SaisieCourrier;
  optionsChoisies?: OptionsCourrier;
  requete?: IRequeteDelivrance;
  acte?: IResultatRMCActe;
}

export function useGenerationCourrierHook(params?: IGenerationCourrierParams) {
  const [
    resultatGenerationCourrier,
    setResultatGenerationCourrier
  ] = useState<IResultGenerationUnDocument>();

  const [courrierParams, setCourrierParams] = useState<ICourrierParams>();

  const [courrier, setCourrier] = useState<DocumentDelivrance | undefined>();

  const [idActe, setIdActe] = useState<string | undefined>();

  const [acte, setActe] = useState<IFicheActe>();

  const [
    documentsReponsePourStockage,
    setDocumentsReponsePourStockage
  ] = useState<IDocumentReponse[] | undefined>();

  useEffect(() => {
    if (
      params?.saisieCourrier &&
      params.saisieCourrier.choixCourrier.courrier
    ) {
      const uuidCourrier = params.saisieCourrier.choixCourrier.courrier;
      setCourrier(DocumentDelivrance.getDocumentDelivrance(uuidCourrier));
      setIdActe(getIdActe(params?.acte));
    }
  }, [params]);

  const informationsActe = useInformationsActeApiHook(idActe) as IFicheActe;

  useEffect(() => {
    setActe(informationsActe);
  }, [informationsActe]);

  // 1 - Construction du Courrier
  useEffect(() => {
    if (presenceDeLaRequeteDuDocEtSaisieCourrier(params)) {
      if (presenceDesElementsPourLaGeneration(params, courrier, acte)) {
        const elements: IElementsJasperCourrier = specificationCourrier.getElementsJasper(
          // @ts-ignore presenceDesElementsPourLaGeneration
          params.saisieCourrier,
          // @ts-ignore presenceDesElementsPourLaGeneration
          params.requete,
          // @ts-ignore presenceDesElementsPourLaGeneration
          params.optionsChoisies,
          acte
        );
        construitCourrier(
          elements,
          // @ts-ignore presenceDesElementsPourLaGeneration
          params.requete,
          setCourrierParams,
          setResultatGenerationCourrier,
          courrier
        );
      } else {
        setResultatGenerationCourrier(RESULTAT_VIDE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acte]);

  // 2 - Création du courrier: appel api composition
  // récupération du document en base64
  const contenuComposition: string | undefined = useCourrierApiHook(
    courrierParams
  );

  // 3 - Création du document réponse pour stockage dans la BDD et Swift
  useEffect(() => {
    if (contenuComposition && courrier) {
      setDocumentsReponsePourStockage([
        {
          contenu: contenuComposition,
          nom: courrier.libelle,
          mimeType: MimeType.APPLI_PDF,
          typeDocument: DocumentDelivrance.getUuidFromDocument(courrier), // UUID du courrier (nomenclature)
          nbPages: 1,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuComposition]);

  // 4- Stockage du document réponse une fois celui-ci créé
  // 5- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 6- Mise à jour du status de la requête + création d'une action
  const {
    idAction,
    uuidDocumentsReponse
  } = useStockerDocumentCreerActionMajStatutRequete(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    documentsReponsePourStockage,
    params?.requete?.id
  );

  // 6- Une fois la requête mise à jour et l'action créé, changement de page
  useEffect(() => {
    if (idAction && uuidDocumentsReponse && contenuComposition) {
      setResultatGenerationCourrier({
        idDocumentReponse: uuidDocumentsReponse[0],
        contenuDocumentReponse: contenuComposition
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAction]);

  return resultatGenerationCourrier;
}

function getIdActe(acte?: IResultatRMCActe) {
  if (acte && acte?.idActe) {
    return acte?.idActe;
  } else {
    return "";
  }
}

function presenceDeLaRequeteDuDocEtSaisieCourrier(
  params: IGenerationCourrierParams | undefined
) {
  return (
    params?.requete && params.requete.documentDemande && params.saisieCourrier
  );
}

function presenceDesElementsPourLaGeneration(
  params: IGenerationCourrierParams | undefined,
  courrier: DocumentDelivrance | undefined,
  acte: IFicheActe | undefined
) {
  return (
    params?.requete &&
    params?.requete.titulaires &&
    params.requete.titulaires.length > 0 &&
    courrier &&
    acte
  );
}

async function construitCourrier(
  elements: IElementsJasperCourrier,
  requete: IRequeteDelivrance,
  setCourrierParams: any,
  setResultGenerationCourrier: any,
  courrier: DocumentDelivrance
) {
  if (elements && requete && requete.documentDemande) {
    const composition = creerCourrierComposition(elements, requete);
    setCourrierParams({
      codeCourrier: courrier.code,
      courrierComposition: composition
    });
  } else {
    setResultGenerationCourrier(RESULTAT_VIDE);
  }
}

function creerCourrierComposition(
  elements: IElementsJasperCourrier,
  requete: IRequeteDelivrance
): ICourrierComposition {
  return CourrierComposition.creerCourrier(requete, elements);
}
