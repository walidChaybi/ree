import {
  IGenerationCourrierParams,
  useGenerationCourrierHook
} from "@hook/requete/GenerationCourrierHook";
import {
  FicheActe,
  IFicheActe,
  necessiteMentionNationalite
} from "@model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { OptionCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SaisieCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";
import { mappingVersMentionApi } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { gestionnaireMentionsRetireesAuto } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionnaireMentionsRetireesAuto";
import { getOngletSelectVenantDePriseEnCharge } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopieUtils";
import { DocumentEC } from "@pages/requeteDelivrance/editionExtraitCopie/enum/DocumentEC";
import { DEUX } from "@util/Utils";
import { useEffect, useState } from "react";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../acte/ActeApiHook";
import {
  IMiseAJourMentionsParams,
  IMiseAJourMentionsResultat,
  useMiseAJourMentionsApiHook
} from "../acte/mentions/MiseAJourMentionsApiHook";
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
  const [majMentionsParams, setMajMentionsParams] =
    useState<IMiseAJourMentionsParams>();
  const [acteApiHookParams, setActeApiHookParams] =
    useState<IActeApiHookParams>();

  // 1- Récupération de l'acte complet pour la génération du document + images corpsImage
  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  useEffect(() => {
    // On ne rerecherche l'acte si il a déjà été chargé pour éviter de créer
    // 2 courriers dans le cas d'une modification de courrier
    if (!acteApiHookResultat && estPresentIdActeEtChoixDelivrance(params)) {
      setActeApiHookParams({
        idActe: params?.idActe,
        recupereImagesEtTexte:
          ChoixDelivrance.estCopieIntegraleOuArchive(
            //@ts-ignore params.requete.choixDelivrance non null
            params.requete.choixDelivrance
            //@ts-ignore params.requete.choixDelivrance non null
          ) || ChoixDelivrance.estAvecFiliation(params.requete.choixDelivrance)
      });
    }
  }, [params, acteApiHookResultat]);

  // 2 - Ajout des mentions auto et des mentions retirées
  useEffect(
    () => {
      if (acteApiHookResultat?.acte?.mentions && acteApiHookResultat?.acte) {
        setMentionsRetirees(
          gestionnaireMentionsRetireesAuto.getMentionsRetirees(
            acteApiHookResultat?.acte?.mentions,
            params?.requete.choixDelivrance,
            acteApiHookResultat?.acte?.nature
          )
        );
        if (
          necessiteMentionNationalite(
            acteApiHookResultat.acte,
            params?.requete.choixDelivrance
          )
        ) {
          setMajMentionsParams({
            idActe: acteApiHookResultat.acte.id,
            mentions: [
              ...acteApiHookResultat.acte.mentions.map(el =>
                mappingVersMentionApi(el)
              ),
              ...FicheActe.getMentionNationalite(
                acteApiHookResultat.acte,
                params?.requete.choixDelivrance
              )
            ]
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, acteApiHookResultat]
  );

  const majMentionFait = useMiseAJourMentionsApiHook(majMentionsParams);

  // 3 - Création des paramètres pour la création du courrier
  useEffect(() => {
    if (
      acteApiHookResultat ||
      (!params?.idActe &&
        ChoixDelivrance.estReponseSansDelivrance(
          params?.requete.choixDelivrance
        ))
    ) {
      setGenerationCourrierHookParams({
        saisieCourrier: params?.saisieCourrier,
        optionsChoisies: params?.optionsChoisies,
        requete: params?.requete,
        // Si aucune mention n'a été ajouté, on n'a pas besoin de recharger l'acte
        acte: acteApiHookResultat?.acte,
        // On ne change le statut que lorsqu'on a aucun documents
        mettreAJourStatut:
          params?.requete.documentsReponses.length === 0 &&
          ChoixDelivrance.estReponseSansDelivrance(
            params?.requete.choixDelivrance
          )
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, acteApiHookResultat]);

  const resultatGenerationCourrier = useGenerationCourrierHook(
    generationCourrierHookParams
  );

  // 4 - Création des paramètre pour la génération du document demandé
  useEffect(() => {
    if (params) {
      const mentionNationaliteAjoute = nationaliteAjouteSiBesoin(
        majMentionFait,
        params,
        acteApiHookResultat?.acte
      );
      if (
        params.idActe &&
        resultatGenerationCourrier &&
        ChoixDelivrance.estReponseAvecDelivrance(
          params.requete.choixDelivrance
        ) &&
        params.requete.documentsReponses.length < DEUX &&
        mentionsRetirees &&
        mentionNationaliteAjoute
      ) {
        setGenerationDocumentECParams({
          acte: majMentionFait ? undefined : acteApiHookResultat?.acte,
          idActe: majMentionFait ? params.idActe : undefined,
          requete: params.requete,
          mentionsRetirees,
          choixDelivrance: params.requete.choixDelivrance
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentionsRetirees, resultatGenerationCourrier, majMentionFait]);

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

function nationaliteAjouteSiBesoin(
  majMentionFait: IMiseAJourMentionsResultat | undefined,
  params: ICreerCourrierECParams,
  acte?: IFicheActe
) {
  return (
    (acte &&
      majMentionFait &&
      necessiteMentionNationalite(acte, params?.requete?.choixDelivrance)) ||
    (acte &&
      !necessiteMentionNationalite(acte, params?.requete?.choixDelivrance))
  );
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
