import { useEffect, useState } from "react";
import { IFicheActe } from "../../../../model/etatcivil/acte/IFicheActe";
import { TitulaireActe } from "../../../../model/etatcivil/acte/ITitulaireActe";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "../../../../model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "../../../../model/requete/enum/Validation";
import {
  documentDejaCreer,
  getExtraitsCopies,
  IDocumentReponse
} from "../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { DocumentEC } from "../../../pages/requeteDelivrance/editionExtraitCopie/enum/DocumentEC";
import {
  IExtraitSaisiAEnvoyer,
  IMajEtatCivilSuiteSaisieExtraitParams,
  useMajEtatCivilSuiteSaisieExtrait
} from "../acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import {
  IGenerationECParams,
  useGenerationEC
} from "../generation/generationECHook/generationECHook";

export interface ISauvegardeValidationSaisieExtraitParams {
  requete: IRequeteDelivrance;
  acte: IFicheActe;
  extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer;
  callBack?: (arg: any) => void;
}

interface IRegenerationParams {
  documentsARegenerer: IDocumentReponse[];
  majEtatCivilSuiteSaisieExtraitParams: IMajEtatCivilSuiteSaisieExtraitParams;
}

export function useSauvegardeValidationSaisieExtrait(
  params?: ISauvegardeValidationSaisieExtraitParams
) {
  const [generationECParams, setGenerationECParams] =
    useState<IGenerationECParams>();

  const [regenerationParams, setRegenerationParams] =
    useState<IRegenerationParams>();

  const resultatGenerationEC = useGenerationEC(generationECParams);
  const resultatMajEtatCivilSuiteSaisieExtrait =
    useMajEtatCivilSuiteSaisieExtrait(
      regenerationParams?.majEtatCivilSuiteSaisieExtraitParams
    );

  // 1 - Sauvegarde des données de l'acte
  useEffect(() => {
    if (params) {
      setRegenerationParams({
        documentsARegenerer: getExtraitsCopies(params.requete),
        majEtatCivilSuiteSaisieExtraitParams: {
          idActe: params.acte.id,
          extraitSaisiAEnvoyer: params.extraitSaisiAEnvoyer
        }
      });
    }
  }, [params]);

  // 2 - Regénérer tous les fichiers
  useEffect(() => {
    let document;
    if (
      regenerationParams &&
      regenerationParams.documentsARegenerer.length !== 0
    ) {
      const documentsARegenerer = regenerationParams.documentsARegenerer;
      document = documentsARegenerer.pop();
      setRegenerationParams({
        documentsARegenerer,
        majEtatCivilSuiteSaisieExtraitParams:
          regenerationParams?.majEtatCivilSuiteSaisieExtraitParams
      });
    }
    if (params && resultatMajEtatCivilSuiteSaisieExtrait && document) {
      setGenerationECParams({
        idActe: params.acte.id,
        requete: params.requete,
        validation: getValidation(document, params.acte),
        mentionsRetirees: document.mentionsRetirees
          ? document.mentionsRetirees?.map(el => el.idMention)
          : [],
        pasDAction: documentDejaCreer(
          params.requete.documentsReponses,
          params.requete.choixDelivrance
        ),
        choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(
          document.typeDocument
        )
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, resultatMajEtatCivilSuiteSaisieExtrait]);

  useEffect(() => {
    if (
      regenerationParams?.documentsARegenerer.length === 0 &&
      resultatGenerationEC &&
      params?.callBack
    ) {
      params.callBack(DocumentEC.Principal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regenerationParams, resultatGenerationEC]);
}

function getValidation(document: IDocumentReponse, acte: IFicheActe) {
  if (
    document.typeDocument ===
      DocumentDelivrance.getKeyForCode(CODE_EXTRAIT_PLURILINGUE) &&
    acte.titulaires.some(el => TitulaireActe.genreIndetermineOuParentHomo(el))
  ) {
    return Validation.E;
  } else if (
    DocumentDelivrance.estExtraitAvecOuSansFilliation(document.typeDocument) &&
    document.validation === Validation.E
  ) {
    return Validation.N;
  }
  return document.validation ? document.validation : Validation.N;
}
