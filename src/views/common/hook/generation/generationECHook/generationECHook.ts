import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { Orientation } from "@model/composition/enum/Orientation";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useCallback, useEffect, useState } from "react";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../../ressources/EMimeType";
import AfficherMessage from "../../../../../utils/AfficherMessage";
import { IExtraitCopieApiHookParams, useExtraitCopieApiHook } from "../../composition/CompositionExtraitCopieHook";
import { ISauvegarderDocumentsParams, useSauvegarderDocument } from "../../requete/SauvegarderDocumentApiHook";
import {
  IStockerDocumentCreerActionMajStatutRequeteParams,
  useStockerDocumentCreerActionMajStatutRequete
} from "../../requete/StockerDocumentCreerActionMajStatutRequete";
import { IResultGenerationUnDocument } from "../generationUtils";
import { creationEC, creationECSansCTV, estDocumentAvecCTV, getNomDocument, toutesLesDonneesSontPresentes } from "./generationECHookUtil";
import { useRecupererCTV } from "./televerification/recupererCtvApiHook";
import { IStockeCTVParams, useStockeCTV } from "./televerification/stockeCtvApiHook";

export interface IGenerationECParams {
  idActe?: string;
  acte?: FicheActe;
  requete: IRequeteDelivrance;
  validation?: EValidation;
  pasDAction?: boolean;
  mentionsRetirees: string[];
  choixDelivrance: ChoixDelivrance;
}

export interface IGenerationECResultat {
  resultGenerationUnDocument?: IResultGenerationUnDocument;
  erreur?: any;
}

export function useGenerationEC(params?: IGenerationECParams): IGenerationECResultat | undefined {
  const [resultat, setResultat] = useState<IGenerationECResultat>();

  const [extraitCopieApiHookParams, setExtraitCopieApiHookParams] = useState<IExtraitCopieApiHookParams>();
  const [sauvegarderDocumentParams, setSauvegarderDocumentParams] = useState<ISauvegarderDocumentsParams>();
  const [stockerDocumentCreerActionMajStatutRequeteParams, setStockerDocumentCreerActionMajStatutRequeteParams] =
    useState<IStockerDocumentCreerActionMajStatutRequeteParams>();
  const [acteDejaPresent, setActeDejaPresent] = useState<FicheActe>();
  const [triggerEtapeUnTer, setTriggerEtapeUnTer] = useState<boolean>(true);
  const [validation, setValidation] = useState<EValidation>();
  const [recupererCtvApiHookParam, setRecupererCtvApiHookParam] = useState<{}>();
  const [stockeCtvApiHookParam, setStockeCtvApiHookParam] = useState<IStockeCTVParams>();

  useEffect(() => {
    if (!params?.choixDelivrance) return;

    if (!params.idActe && params.acte) {
      setActeDejaPresent(params.acte);
      setTriggerEtapeUnTer(!triggerEtapeUnTer);
    }
  }, [params?.choixDelivrance, params?.idActe, params?.acte]);

  // 1- Récupération de l'acte complet pour la génération du document + images corpsImage
  const [acte, setActe] = useState<FicheActe | null>(null);

  const { appelApi: recupererActe } = useFetchApi(CONFIG_GET_RESUME_ACTE);

  useEffect(() => {
    if (!params?.idActe) return;

    recupererActe({
      parametres: {
        path: { idActe: params.idActe },
        query: {
          recupereImagesEtTexte: ChoixDelivrance.estCopieIntegraleOuArchive(params.choixDelivrance),
          remplaceIdentiteTitulaireParIdentiteTitulaireAM: true
        }
      },
      apresSucces: acte => {
        setActe(FicheActe.depuisDto(acte));
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de récupérer les informations de l'acte", {
          erreurs,
          fermetureAuto: true
        })
    });
  }, [params?.choixDelivrance, params?.idActe]);

  // 1bis - Récupérer code CTV
  const recupererCtvResultat = useRecupererCTV(recupererCtvApiHookParam);

  // 1ter
  useEffect(() => {
    if (acte || acteDejaPresent) {
      if (estDocumentAvecCTV(DocumentDelivrance.getTypeDocument(params?.choixDelivrance), params?.requete.sousType)) {
        setRecupererCtvApiHookParam({});
      } else {
        creationECSansCTV(acte || acteDejaPresent, params, setValidation, setExtraitCopieApiHookParams);
      }
    }
  }, [acte, triggerEtapeUnTer]);

  // 2- Création du bon EC composition suivant le choix de délivrance
  useEffect(() => {
    creationEC(acte || acteDejaPresent, params, setValidation, setExtraitCopieApiHookParams, recupererCtvResultat?.ctv);
  }, [recupererCtvResultat]);

  // 3 - Création de l'EC PDF pour un acte: appel api composition
  // récupération du document en base64
  const extraitCopieApiHookResultat = useExtraitCopieApiHook(extraitCopieApiHookParams);

  // 4 - Création du document réponse pour stockage dans la BDD et Swift
  const creationDocumentReponseOuResultat = useCallback(
    (requete: IRequeteDelivrance, contenu: string, nbPages: number) => {
      if (requete.choixDelivrance && params?.choixDelivrance) {
        const typeDocument = DocumentDelivrance.getTypeDocument(params.choixDelivrance);
        const avecCtv = estDocumentAvecCTV(typeDocument, requete.sousType);
        const futurStatutRequete = avecCtv ? StatutRequete.A_SIGNER : StatutRequete.A_VALIDER;

        const documentReponsePourStockage = {
          contenu,
          nom: getNomDocument(params.choixDelivrance),
          typeDocument, // UUID du type de document demandé (nomenclature),
          avecCtv,
          nbPages,
          mimeType: EMimeType.APPLI_PDF,
          orientation: Orientation.PORTRAIT,
          validation,
          mentionsRetirees: params?.mentionsRetirees.map(idMention => ({
            idMention
          })),
          idActe: acte?.id ?? acteDejaPresent?.id
        } as IDocumentReponse;

        if (params?.pasDAction) {
          setSauvegarderDocumentParams({
            documentsReponsePourStockage: [documentReponsePourStockage],
            requeteId: requete.id
          });
        } else {
          setStockerDocumentCreerActionMajStatutRequeteParams({
            documentReponsePourStockage,
            libelleAction: futurStatutRequete.libelle,
            statutRequete: futurStatutRequete,
            requeteId: requete.id
          });
        }
      }
    },
    [acte, acteDejaPresent, validation, params]
  );

  useEffect(() => {
    if (extraitCopieApiHookResultat?.donneesComposition && params) {
      creationDocumentReponseOuResultat(
        params.requete,
        extraitCopieApiHookResultat.donneesComposition.contenu,
        extraitCopieApiHookResultat.donneesComposition.nbPages
      );
    }
    // Traitement de l'erreur si useExtraitCopieApiHook plante
    if (extraitCopieApiHookResultat?.erreur) {
      setResultat({
        erreur: extraitCopieApiHookResultat.erreur
      });
    }
  }, [extraitCopieApiHookResultat]);

  // 5- Stockage du document réponse une fois celui-ci créé
  const uuidDocumentReponse = useStockerDocumentCreerActionMajStatutRequete(stockerDocumentCreerActionMajStatutRequeteParams);

  // 5.1 - Stockage du document sans Maj statut
  const uuidDocumentReponseSansAction = useSauvegarderDocument(sauvegarderDocumentParams);

  // 6- Stocke CTV dans téléverification
  const stockeCtvApiHookResultat = useStockeCTV(stockeCtvApiHookParam);

  useEffect(() => {
    if (toutesLesDonneesSontPresentes(uuidDocumentReponse, uuidDocumentReponseSansAction, extraitCopieApiHookResultat)) {
      setStockeCtvApiHookParam({
        ctv: recupererCtvResultat?.ctv ?? "",
        //@ts-ignore
        idDocument: uuidDocumentReponse ?? uuidDocumentReponseSansAction
      });
    }
  }, [uuidDocumentReponse, uuidDocumentReponseSansAction]);

  // 7- Maj du résultat
  useEffect(() => {
    if (
      stockeCtvApiHookResultat &&
      toutesLesDonneesSontPresentes(uuidDocumentReponse, uuidDocumentReponseSansAction, extraitCopieApiHookResultat)
    ) {
      setResultat({
        resultGenerationUnDocument: {
          idDocumentReponse: uuidDocumentReponse ?? uuidDocumentReponseSansAction,
          contenuDocumentReponse:
            //@ts-ignore
            extraitCopieApiHookResultat.donneesComposition.contenu
        }
      });
    }
  }, [stockeCtvApiHookResultat, uuidDocumentReponse, uuidDocumentReponseSansAction]);

  return resultat;
}
