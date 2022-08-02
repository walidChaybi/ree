import { useEffect, useState } from "react";
import { ChoixDelivrance } from "../../../../model/requete/enum/ChoixDelivrance";
import { OptionCourrier } from "../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import {
  IGenerationCourrierParams,
  useGenerationCourrierHook
} from "../../../pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/hook/GenerationCourrierHook";
import { SaisieCourrier } from "../../../pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";
import { gestionnaireMentionsRetireesAuto } from "../../../pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionnaireMentionsRetireesAuto";
import { getOngletSelectVenantDePriseEnCharge } from "../../../pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopieUtils";
import { DocumentEC } from "../../../pages/requeteDelivrance/editionExtraitCopie/enum/DocumentEC";
import { DEUX } from "../../util/Utils";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../acte/ActeApiHook";
import {
  IGenerationECParams,
  IGenerationECResultat,
  useGenerationEC
} from "../generation/generationECHook/generationECHook";
import { estPresentIdActeEtChoixDelivrance } from "../generation/generationECHook/generationECHookUtil";
import { IResultGenerationUnDocument } from "../generation/generationUtils";

export interface ICreerCourrierECParams {
  idActe?: string;
  requete: IRequeteDelivrance;
  saisieCourrier: SaisieCourrier;
  optionsChoisies: OptionCourrier[];
  handleDocumentEnregistre: (index: DocumentEC) => void;
  setOperationEnCours: (op: boolean) => void;
}

export function useCreerCourrierEC(params?: ICreerCourrierECParams) {
  const [generationCourrierHookParams, setGenerationCourrierHookParams] =
    useState<IGenerationCourrierParams>();
  const [generationDocumentECParams, setGenerationDocumentECParams] =
    useState<IGenerationECParams>();
  const [mentionsRetirees, setMentionsRetirees] = useState<string[]>();
  const [acteApiHookParams, setActeApiHookParams] =
    useState<IActeApiHookParams>();

  useEffect(() => {
    if (estPresentIdActeEtChoixDelivrance(params)) {
      setActeApiHookParams({
        idActe: params?.idActe,
        recupereImagesEtTexte: ChoixDelivrance.estCopieIntegraleOuArchive(
          //@ts-ignore params.requete.choixDelivrance non null
          params.requete.choixDelivrance
        )
      });
    }
  }, [params]);

  // 1- Récupération de l'acte complet pour la génération du document + images corpsImage
  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  // 2 - Création des paramètres pour la création du courrier
  useEffect(() => {
    if (params && acteApiHookResultat) {
      setGenerationCourrierHookParams({
        saisieCourrier: params.saisieCourrier,
        optionsChoisies: params.optionsChoisies,
        requete: params.requete,
        acte: acteApiHookResultat.acte,
        // On ne change le statut que lorsqu'on a aucun documents
        mettreAJourStatut:
          params.requete.documentsReponses.length === 0 &&
          ChoixDelivrance.estReponseSansDelivrance(
            params.requete.choixDelivrance
          )
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, acteApiHookResultat]);

  const resultatGenerationCourrier = useGenerationCourrierHook(
    generationCourrierHookParams
  );

  // 3 - Ajout des mentions retirées auto
  useEffect(() => {
    if (acteApiHookResultat?.acte?.mentions && acteApiHookResultat?.acte) {
      setMentionsRetirees(
        gestionnaireMentionsRetireesAuto.getMentionsRetirees(
          acteApiHookResultat?.acte?.mentions,
          params?.requete.choixDelivrance,
          acteApiHookResultat?.acte?.nature
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acteApiHookResultat?.acte?.mentions, acteApiHookResultat]);

  // 4 - Création des paramètre pour la génération du document demandé
  useEffect(() => {
    if (
      params &&
      params.idActe &&
      resultatGenerationCourrier &&
      ChoixDelivrance.estReponseAvecDelivrance(
        params.requete.choixDelivrance
      ) &&
      params.requete.documentsReponses.length < DEUX &&
      mentionsRetirees
    ) {
      setGenerationDocumentECParams({
        acte: acteApiHookResultat?.acte,
        requete: params.requete,
        mentionsRetirees,
        choixDelivrance: params.requete.choixDelivrance
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentionsRetirees, resultatGenerationCourrier]);

  // Génération du document demandé
  const resultatGenerationEC = useGenerationEC(generationDocumentECParams);

  useEffect(() => {
    if (
      traitementFini(params, resultatGenerationCourrier, resultatGenerationEC)
    ) {
      //@ts-ignore params non null
      params.setOperationEnCours(false);
      //@ts-ignore params non null
      params.handleDocumentEnregistre(
        getIndexDocument(
          //@ts-ignore params non null
          params.requete,
          resultatGenerationEC,
          resultatGenerationCourrier
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, resultatGenerationCourrier]);
}

function getIndexDocument(
  requete: IRequeteDelivrance,
  resultatGenerationEC?: IGenerationECResultat,
  resultatGenerationCourrier?: IResultGenerationUnDocument
) {
  let res = DocumentEC.Courrier;
  if (
    // Si un EC est crée mais pas de courrier
    (!resultatGenerationCourrier && resultatGenerationEC) ||
    // Si on a créé deux documents et que c'est une RDD avec délivrance
    (resultatGenerationCourrier &&
      resultatGenerationEC &&
      getOngletSelectVenantDePriseEnCharge(
        requete.sousType,
        requete.choixDelivrance
      ) === DocumentEC.Principal)
  ) {
    res = DocumentEC.Principal;
  }
  return res;
}

function traitementFini(
  params?: ICreerCourrierECParams,
  resultatGenerationCourrier?: IResultGenerationUnDocument,
  resultatGenerationEC?: IGenerationECResultat
) {
  return (
    params &&
    (resultatGenerationEC ||
      (resultatGenerationCourrier &&
        ChoixDelivrance.estReponseSansDelivrance(
          params?.requete.choixDelivrance
        )) ||
      (resultatGenerationCourrier &&
        params.requete.documentsReponses.length > 1))
  );
}
