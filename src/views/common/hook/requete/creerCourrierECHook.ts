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
import { getOngletSelectVenantDePriseEnCharge } from "../../../pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopieUtils";
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

  const resultatGenerationCourrier = useGenerationCourrierHook(
    generationCourrierHookParams
  );

  // 2 - Création des paramètre pour la génération du document demandé
  useEffect(() => {
    if (
      params &&
      params.idActe &&
      resultatGenerationCourrier &&
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
  }, [resultatGenerationCourrier]);

  // Génération du document demandé
  const resultatGenerationEC = useGenerationEC(generationDocumentECParams);

  useEffect(() => {
    if (
      params &&
      (resultatGenerationEC ||
        (resultatGenerationCourrier &&
          ChoixDelivrance.estReponseSansDelivrance(
            params?.requete.choixDelivrance
          )) ||
        (resultatGenerationCourrier &&
          params.requete.documentsReponses.length > 1))
    ) {
      params.setOperationEnCours(false);
      params.handleCourrierEnregistre(
        getIndexDocument(
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