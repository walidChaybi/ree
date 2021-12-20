import { useEffect, useState } from "react";
import { Orientation } from "../../../../../model/composition/enum/Orientation";
import { IExtraitCopieComposition } from "../../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { MimeType } from "../../../../../ressources/MimeType";
import { useExtraitCopieApiHook } from "../../composition/CompositionExtraitCopieHook";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../repertoires/ActeApiHook";
import {
  IStockerDocumentCreerActionMajStatutRequeteParams,
  useStockerDocumentCreerActionMajStatutRequete
} from "../../requete/StockerDocumentCreerActionMajStatutRequete";
import { IResultGenerationUnDocument } from "../generationUtils";
import {
  creationComposition,
  getNomDocument,
  getStatutRequete,
  getTypeDocument,
  nonNull
} from "./generationECHookUtil";

// Paramètre du hook useGenerationEC
export interface IGenerationECParams {
  idActe: string;
  requete: IRequeteDelivrance;
  choixDelivrance: ChoixDelivrance;
}

export interface IGenerationECResultat {
  resultGenerationUnDocument?: IResultGenerationUnDocument;
  erreur?: any;
}

export function useGenerationEC(
  params?: IGenerationECParams
): IGenerationECResultat | undefined {
  const [resultat, setResultat] = useState<IGenerationECResultat>();

  const [paramECHook, setParamECHook] = useState<IExtraitCopieComposition>();

  const [
    stockerDocumentCreerActionMajStatutRequeteParams,
    setStockerDocumentCreerActionMajStatutRequeteParams
  ] = useState<IStockerDocumentCreerActionMajStatutRequeteParams>();

  const [acteApiHookParams, setActeApiHookParams] = useState<
    IActeApiHookParams
  >();

  useEffect(() => {
    if (params && params.idActe) {
      setActeApiHookParams({ idActe: params.idActe });
    }
  }, [params]);

  // 1- Récupération de l'acte complet pour la génération du document
  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  // 2- Création du bon EC composition suivant le choix de délivrance
  useEffect(() => {
    if (nonNull(acteApiHookResultat?.acte, params)) {
      let composition;
      const acte = acteApiHookResultat?.acte;

      //@ts-ignore nonNull
      composition = creationComposition(acte, params.choixDelivrance);

      setParamECHook(composition);
    }
  }, [acteApiHookResultat, params]);

  // 3 - Création de l'EC PDF pour un acte texte: appel api composition
  // récupération du document en base64
  const extraitCopieApiHookResultat = useExtraitCopieApiHook(paramECHook);

  // 4 - Création du document réponse pour stockage dans la BDD et Swift
  useEffect(() => {
    if (extraitCopieApiHookResultat?.donneesComposition && params) {
      const statutRequete = getStatutRequete(params.choixDelivrance);
      setStockerDocumentCreerActionMajStatutRequeteParams({
        documentReponsePourStockage: {
          contenu: extraitCopieApiHookResultat.donneesComposition.contenu,
          nom: getNomDocument(params.choixDelivrance),
          typeDocument: getTypeDocument(params.choixDelivrance), // UUID du type de document demandé (nomenclature)
          nbPages: extraitCopieApiHookResultat.donneesComposition.nbPages,
          mimeType: MimeType.APPLI_PDF,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse,

        libelleAction: statutRequete.libelle,
        statutRequete,
        requeteId: params.requete.id
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraitCopieApiHookResultat]);

  // Traitement de l'erreur si useExtraitCopieApiHook plante
  useEffect(() => {
    if (extraitCopieApiHookResultat?.erreur) {
      setResultat({
        erreur: extraitCopieApiHookResultat.erreur
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraitCopieApiHookResultat]);

  // 5- Stockage du document réponse une fois celui-ci créé
  const uuidDocumentReponse = useStockerDocumentCreerActionMajStatutRequete(
    stockerDocumentCreerActionMajStatutRequeteParams
  );

  // 6- Maj du résultat
  useEffect(() => {
    if (
      uuidDocumentReponse &&
      extraitCopieApiHookResultat &&
      extraitCopieApiHookResultat.donneesComposition
    ) {
      setResultat({
        resultGenerationUnDocument: {
          idDocumentReponse: uuidDocumentReponse,
          contenuDocumentReponse:
            extraitCopieApiHookResultat.donneesComposition.contenu
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentReponse]);

  return resultat;
}
