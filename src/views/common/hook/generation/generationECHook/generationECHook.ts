import { useCallback, useEffect, useState } from "react";
import { Orientation } from "../../../../../model/composition/enum/Orientation";
import { IExtraitCopieComposition } from "../../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { MimeType } from "../../../../../ressources/MimeType";
import {
  IExtraitCopieApiHookResultat,
  useExtraitCopieApiHook
} from "../../composition/CompositionExtraitCopieHook";
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
  controlerDonneesGenerationExtraitMariageOuNaissance,
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
  validation: Validation;
  pasDeStockageDocument?: boolean;
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

  const [acteApiHookParams, setActeApiHookParams] =
    useState<IActeApiHookParams>();

  const [validation, setValidation] = useState<Validation>();

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

      // Verification des données pour la génération d'extrait mariage/naissance
      // En cas de validation en erreur alors un etrait en erreur sera généré
      const validationControle =
        controlerDonneesGenerationExtraitMariageOuNaissance(
          // @ts-ignore NonNull
          acte,
          // @ts-ignore NonNull
          params.choixDelivrance,
          // @ts-ignore NonNull
          params.validation
        );

      composition = creationComposition(
        // @ts-ignore NonNull
        acte,
        // @ts-ignore NonNull
        params.choixDelivrance,
        // @ts-ignore NonNull
        params.requete.sousType,
        validationControle
      );
      setValidation(validationControle);
      setParamECHook(composition);
    }
  }, [acteApiHookResultat, params]);

  // 3 - Création de l'EC PDF pour un acte texte: appel api composition
  // récupération du document en base64
  const extraitCopieApiHookResultat = useExtraitCopieApiHook(paramECHook);

  // 4 - Création du document réponse pour stockage dans la BDD et Swift
  const creationDocumentReponseOuResultat = useCallback(
    (
      requete: IRequeteDelivrance,
      contenu: string,
      nbPages: number,
      choixDelivrance: ChoixDelivrance,
      pasDeStockageDocument = false
    ) => {
      if (pasDeStockageDocument) {
        // Pas de stockage demandé, le résultat est retourné avec uniquement le document généré
        setResultat({
          resultGenerationUnDocument: {
            contenuDocumentReponse: contenu
          }
        });
      } else {
        const statutRequete = getStatutRequete(
          choixDelivrance,
          requete.sousType
        );
        setStockerDocumentCreerActionMajStatutRequeteParams({
          documentReponsePourStockage: {
            contenu,
            nom: getNomDocument(choixDelivrance),
            typeDocument: getTypeDocument(choixDelivrance), // UUID du type de document demandé (nomenclature)
            nbPages,
            mimeType: MimeType.APPLI_PDF,
            orientation: Orientation.PORTRAIT,
            validation,
            idActe: acteApiHookResultat?.acte?.id
          } as IDocumentReponse,

          libelleAction: statutRequete.libelle,
          statutRequete,
          requeteId: requete.id
        });
      }
    },
    [acteApiHookResultat, validation]
  );

  useEffect(() => {
    if (extraitCopieApiHookResultat?.donneesComposition && params) {
      creationDocumentReponseOuResultat(
        params.requete,
        extraitCopieApiHookResultat.donneesComposition.contenu,
        extraitCopieApiHookResultat.donneesComposition.nbPages,
        params.choixDelivrance,
        params.pasDeStockageDocument
      );
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
      toutesLesDonneesSontPresentes(
        uuidDocumentReponse,
        extraitCopieApiHookResultat
      )
    ) {
      setResultat({
        resultGenerationUnDocument: {
          idDocumentReponse: uuidDocumentReponse,
          contenuDocumentReponse:
            //@ts-ignore
            extraitCopieApiHookResultat.donneesComposition.contenu
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentReponse]);

  return resultat;
}
function toutesLesDonneesSontPresentes(
  uuidDocumentReponse: string | undefined,
  extraitCopieApiHookResultat?: IExtraitCopieApiHookResultat
) {
  return (
    uuidDocumentReponse &&
    extraitCopieApiHookResultat &&
    extraitCopieApiHookResultat.donneesComposition
  );
}
