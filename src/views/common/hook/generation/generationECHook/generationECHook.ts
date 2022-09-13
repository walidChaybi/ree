import { Orientation } from "@model/composition/enum/Orientation";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { useCallback, useEffect, useState } from "react";
import { MimeType } from "../../../../../ressources/MimeType";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../acte/ActeApiHook";
import {
  IExtraitCopieApiHookParams,
  useExtraitCopieApiHook
} from "../../composition/CompositionExtraitCopieHook";
import {
  ISauvegarderDocumentsParams,
  useSauvegarderDocument
} from "../../requete/SauvegarderDocumentApiHook";
import {
  IStockerDocumentCreerActionMajStatutRequeteParams,
  useStockerDocumentCreerActionMajStatutRequete
} from "../../requete/StockerDocumentCreerActionMajStatutRequete";
import { IResultGenerationUnDocument } from "../generationUtils";
import {
  creationEC,
  estPresentActeEtChoixDelivrance,
  estPresentIdActeEtChoixDelivrance,
  getNomDocument,
  getStatutRequete,
  getTypeDocument,
  toutesLesDonneesSontPresentes
} from "./generationECHookUtil";

// Paramètre du hook useGenerationEC
export interface IGenerationECParams {
  idActe?: string;
  acte?: IFicheActe;
  requete: IRequeteDelivrance;
  validation?: Validation;
  pasDAction?: boolean;
  mentionsRetirees: string[];
  choixDelivrance?: ChoixDelivrance;
}

export interface IGenerationECResultat {
  resultGenerationUnDocument?: IResultGenerationUnDocument;
  erreur?: any;
}

export function useGenerationEC(
  params?: IGenerationECParams
): IGenerationECResultat | undefined {
  const [resultat, setResultat] = useState<IGenerationECResultat>();

  const [extraitCopieApiHookParams, setExtraitCopieApiHookParams] =
    useState<IExtraitCopieApiHookParams>();

  const [sauvegarderDocumentParams, setSauvegarderDocumentParams] =
    useState<ISauvegarderDocumentsParams>();

  const [
    stockerDocumentCreerActionMajStatutRequeteParams,
    setStockerDocumentCreerActionMajStatutRequeteParams
  ] = useState<IStockerDocumentCreerActionMajStatutRequeteParams>();

  const [acteApiHookParams, setActeApiHookParams] =
    useState<IActeApiHookParams>();
  const [acteDejaPresent, setActeDejaPresent] = useState<IFicheActe>();
  const [validation, setValidation] = useState<Validation>();

  useEffect(() => {
    if (estPresentIdActeEtChoixDelivrance(params)) {
      setActeApiHookParams({
        idActe: params?.idActe,
        recupereImagesEtTexte: ChoixDelivrance.estCopieIntegraleOuArchive(
          //@ts-ignore params.requete.choixDelivrance non null
          params.choixDelivrance
        )
      });
    } else if (estPresentActeEtChoixDelivrance(params)) {
      setActeDejaPresent(params?.acte);
    }
  }, [params]);

  // 1- Récupération de l'acte complet pour la génération du document + images corpsImage
  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  // 2- Création du bon EC composition suivant le choix de délivrance
  useEffect(() => {
    creationEC(
      acteApiHookResultat?.acte || acteDejaPresent,
      params,
      setValidation,
      setExtraitCopieApiHookParams
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acteApiHookResultat, acteDejaPresent]);

  // 3 - Création de l'EC PDF pour un acte: appel api composition
  // récupération du document en base64
  const extraitCopieApiHookResultat = useExtraitCopieApiHook(
    extraitCopieApiHookParams
  );

  // 4 - Création du document réponse pour stockage dans la BDD et Swift
  const creationDocumentReponseOuResultat = useCallback(
    (requete: IRequeteDelivrance, contenu: string, nbPages: number) => {
      if (requete.choixDelivrance && params?.choixDelivrance) {
        const statutRequete = getStatutRequete(
          requete.choixDelivrance,
          requete.sousType
        );

        const typeDocument = getTypeDocument(params.choixDelivrance);
        const avecCtv = DocumentDelivrance.estExtraitCopieAsigner(typeDocument);
        const documentReponsePourStockage = {
          contenu,
          nom: getNomDocument(params.choixDelivrance),
          typeDocument, // UUID du type de document demandé (nomenclature),
          avecCtv,
          nbPages,
          mimeType: MimeType.APPLI_PDF,
          orientation: Orientation.PORTRAIT,
          validation,
          mentionsRetirees: params?.mentionsRetirees.map(idMention => ({
            idMention
          })),
          idActe: acteApiHookResultat?.acte?.id || acteDejaPresent?.id
        } as IDocumentReponse;

        if (params?.pasDAction) {
          setSauvegarderDocumentParams({
            documentsReponsePourStockage: [documentReponsePourStockage],
            requeteId: requete.id
          });
        } else {
          setStockerDocumentCreerActionMajStatutRequeteParams({
            documentReponsePourStockage,
            libelleAction: statutRequete.libelle,
            statutRequete,
            requeteId: requete.id
          });
        }
      }
    },
    [acteApiHookResultat, acteDejaPresent, validation, params]
  );

  useEffect(() => {
    if (extraitCopieApiHookResultat?.donneesComposition && params) {
      creationDocumentReponseOuResultat(
        params.requete,
        extraitCopieApiHookResultat.donneesComposition.contenu,
        extraitCopieApiHookResultat.donneesComposition.nbPages
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

  // 5bis - Stockage du document sans Maj statut
  const uuidDocumentReponseSansAction = useSauvegarderDocument(
    sauvegarderDocumentParams
  );

  // 6- Maj du résultat
  useEffect(() => {
    if (
      toutesLesDonneesSontPresentes(
        uuidDocumentReponse,
        uuidDocumentReponseSansAction,
        extraitCopieApiHookResultat
      )
    ) {
      setResultat({
        resultGenerationUnDocument: {
          idDocumentReponse: uuidDocumentReponse
            ? uuidDocumentReponse
            : uuidDocumentReponseSansAction,
          contenuDocumentReponse:
            //@ts-ignore
            extraitCopieApiHookResultat.donneesComposition.contenu
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentReponse, uuidDocumentReponseSansAction]);

  return resultat;
}
