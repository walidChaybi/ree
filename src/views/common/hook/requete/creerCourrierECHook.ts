import { useEffect, useState } from "react";
import { ChoixDelivrance } from "../../../../model/requete/enum/ChoixDelivrance";
import { Validation } from "../../../../model/requete/enum/Validation";
import { OptionCourrier } from "../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import {
  IGenerationCourrierParams,
  useGenerationCourrierHook
} from "../../../pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/hook/GenerationCourrierHook";
import { SaisieCourrier } from "../../../pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";
import { DEUX } from "../../util/Utils";
import {
  IGenerationECParams,
  useGenerationEC
} from "../generation/generationECHook/generationECHook";

export interface ICreerCourrierECParam {
  idActe?: string;
  requete: IRequeteDelivrance;
  saisieCourrier: SaisieCourrier;
  optionsChoisies: OptionCourrier[];
  handleCourrierEnregistre: () => void;
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
        validation: Validation.N,
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
      params.handleCourrierEnregistre();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, generationCourrier]);
}
