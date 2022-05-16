import { useEffect, useState } from "react";
import { ChoixDelivrance } from "../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../model/requete/enum/Validation";
import { OptionCourrier } from "../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import {
  IGenerationCourrierParams,
  useGenerationCourrierHook
} from "../../../pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/hook/GenerationCourrierHook";
import { SaisieCourrier } from "../../../pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";
import { sousTypeCreationCourrierAutomatique } from "../../../pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerUtil";
import { DocumentEC } from "../../../pages/requeteDelivrance/editionExtraitCopie/enum/DocumentEC";
import { DEUX } from "../../util/Utils";
import {
  IGenerationECParams,
  IGenerationECResultat,
  useGenerationEC
} from "../generation/generationECHook/generationECHook";
import { IResultGenerationUnDocument } from "../generation/generationUtils";

export interface ICreerCourrierECParam {
  idActe?: string;
  requete: IRequeteDelivrance;
  saisieCourrier: SaisieCourrier;
  optionsChoisies: OptionCourrier[];
  handleCourrierEnregistre: (index: DocumentEC) => void;
  setOperationEnCours: (op: boolean) => void;
}

export function useCreerCourrierEC(params?: ICreerCourrierECParam) {
  const [generationCourrierHookParams, setGenerationCourrierHookParams] =
    useState<IGenerationCourrierParams>();
  const [generationDocumentECParams, setGenerationDocumentECParams] =
    useState<IGenerationECParams>();

  useEffect(() => {
    if (params) {
      setGenerationCourrierHookParams({
        saisieCourrier: params.saisieCourrier,
        optionsChoisies: params.optionsChoisies,
        requete: params.requete,
        idActe: params.idActe,
        // On ne change le statut que lorsqu'on a aucun documents
        mettreAJourStatut:
          params.requete.documentsReponses.length === 0 &&
          ChoixDelivrance.estReponseSansDelivrance(
            params.requete.choixDelivrance
          )
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const generationCourrier = useGenerationCourrierHook(
    generationCourrierHookParams
  );

  // 2 - Création des paramètre pour la génération du document demandé
  useEffect(() => {
    if (
      params &&
      params.idActe &&
      generationCourrier &&
      ChoixDelivrance.estReponseAvecDelivrance(
        params.requete.choixDelivrance
      ) &&
      params.requete.documentsReponses.length < DEUX
    ) {
      setGenerationDocumentECParams({
        idActe: params.idActe,
        requete: params.requete,
        validation: getValidation(
          params.requete.sousType,
          params.requete.choixDelivrance
        ),
        mentionsRetirees: []
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generationCourrier]);

  // Génération du document demandé
  const resultatGenerationEC = useGenerationEC(generationDocumentECParams);

  useEffect(() => {
    if (
      params &&
      (resultatGenerationEC ||
        (generationCourrier &&
          ChoixDelivrance.estReponseSansDelivrance(
            params?.requete.choixDelivrance
          )) ||
        (generationCourrier && params.requete.documentsReponses.length > 1))
    ) {
      params.setOperationEnCours(false);
      params.handleCourrierEnregistre(
        getIndexDocument(resultatGenerationEC, generationCourrier)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, generationCourrier]);
}

function getIndexDocument(
  resultatGenerationEC?: IGenerationECResultat,
  generationCourrier?: IResultGenerationUnDocument
) {
  let res = DocumentEC.Courrier;
  if (!generationCourrier && resultatGenerationEC) {
    res = DocumentEC.Principal;
  }
  return res;
}

function getValidation(
  sousType: SousTypeDelivrance,
  choixDelivrance?: ChoixDelivrance
) {
  if (
    sousTypeCreationCourrierAutomatique(sousType) ||
    (choixDelivrance &&
      choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE)
  ) {
    return Validation.O;
  } else {
    return Validation.N;
  }
}