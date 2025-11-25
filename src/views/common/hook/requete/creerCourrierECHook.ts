import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { filtrerFormaterEtTrierMentionsPlurilingues } from "@model/etatcivil/acte/mention/Mention";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentEC } from "@model/requete/enum/DocumentEC";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { OptionCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DEUX } from "@util/Utils";
import { gestionnaireMentionsRetireesAuto } from "@utilMetier/mention/GestionnaireMentionsRetireesAuto";
import { IGenerationCourrierParams, useGenerationCourrierHook } from "@views/common/hook/requete/GenerationCourrierHook";
import { useEffect, useState } from "react";
import { IActeApiHookParams, useInformationsActeApiHook } from "../acte/ActeApiHook";
import {
  IMiseAJourMentionsParams,
  IMiseAJourMentionsResultat,
  useMiseAJourMentionsApiHook
} from "../acte/mentions/MiseAJourMentionsApiHook";
import { IGenerationECParams, IGenerationECResultat, useGenerationEC } from "../generation/generationECHook/generationECHook";
import { estPresentIdActeEtChoixDelivrance } from "../generation/generationECHook/generationECHookUtil";
import { IResultGenerationUnDocument } from "../generation/generationUtils";

export interface ICreerCourrierECParams {
  idActe?: string;
  natureActe?: keyof typeof ENatureActe;
  requete: IRequeteDelivrance;
  saisieCourrier: SaisieCourrier;
  optionsChoisies: OptionCourrier[];
  handleDocumentEnregistre: (index: DocumentEC) => void;
  setOperationEnCours: (op: boolean) => void;
}

export const useCreerCourrierEC = (params?: ICreerCourrierECParams) => {
  const [generationCourrierHookParams, setGenerationCourrierHookParams] = useState<IGenerationCourrierParams>();
  const [generationDocumentECParams, setGenerationDocumentECParams] = useState<IGenerationECParams>();
  const [idsMentionsRetirees, setIdsMentionsRetirees] = useState<string[]>();
  const [majMentionsParams, setMajMentionsParams] = useState<IMiseAJourMentionsParams>();
  const [acteApiHookParams, setActeApiHookParams] = useState<IActeApiHookParams>({});

  // 1- Récupération de l'acte complet pour la génération du document + images
  const acte = useInformationsActeApiHook(acteApiHookParams);

  useEffect(() => {
    // On ne rerecherche l'acte si il a déjà été chargé pour éviter de créer
    // 2 courriers dans le cas d'une modification de courrier
    if (!acte && estPresentIdActeEtChoixDelivrance(params)) {
      setActeApiHookParams({
        idActe: params?.idActe,
        recupereImagesEtTexte:
          ChoixDelivrance.estCopieIntegraleOuArchive(
            //@ts-ignore params.requete.choixDelivrance non null
            params.requete.choixDelivrance
            //@ts-ignore params.requete.choixDelivrance non null
          ) || ChoixDelivrance.estAvecFiliation(params.requete.choixDelivrance),
        remplaceIdentiteTitulaireParIdentiteTitulaireAM: params?.natureActe !== "RECONNAISSANCE"
      });
    }
  }, [params, acte]);

  // 2 - Ajout des mentions auto et des mentions retirées
  useEffect(
    () => {
      if (acte?.mentions) {
        let mentions;
        if (params?.requete.choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE) {
          mentions = filtrerFormaterEtTrierMentionsPlurilingues(acte?.mentions, acte?.nature);
        } else {
          mentions = acte?.mentions;
        }

        setIdsMentionsRetirees(
          gestionnaireMentionsRetireesAuto.getIdsMentionsRetirees(mentions, params?.requete.choixDelivrance, acte?.nature)
        );

        if (acte.necessiteMentionNationalite(params?.requete.choixDelivrance)) {
          setMajMentionsParams({
            idActe: acte.id,
            mentions: [
              ...acte.mentions.map(mention => mention.versMentionMiseAJourDto()),
              ...acte.getMentionNationalite(params?.requete.choixDelivrance)
            ]
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, acte]
  );

  const mentionNationaliteAjoutee = useMiseAJourMentionsApiHook(majMentionsParams);

  // 3 - Création des paramètres pour la création du courrier
  useEffect(() => {
    if (acte || (!params?.idActe && ChoixDelivrance.estReponseSansDelivrance(params?.requete.choixDelivrance))) {
      setGenerationCourrierHookParams({
        saisieCourrier: params?.saisieCourrier,
        optionsChoisies: params?.optionsChoisies,
        requete: params?.requete,
        // Si aucune mention n'a été ajouté, on n'a pas besoin de recharger l'acte
        acte: acte,
        // On ne change le statut que lorsqu'on a aucun documents
        mettreAJourStatut:
          params?.requete.documentsReponses.length === 0 && ChoixDelivrance.estReponseSansDelivrance(params?.requete.choixDelivrance)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, acte]);

  const resultatGenerationCourrier = useGenerationCourrierHook(generationCourrierHookParams);

  // 4 - Création des paramètre pour la génération du document demandé
  useEffect(() => {
    if (params) {
      const mentionNationaliteAjoute = nationaliteAjouteeSiBesoin(mentionNationaliteAjoutee, params, acte);

      if (
        params.idActe &&
        resultatGenerationCourrier &&
        ChoixDelivrance.estReponseAvecDelivrance(params.requete.choixDelivrance) &&
        params.requete.documentsReponses.length < DEUX &&
        idsMentionsRetirees &&
        mentionNationaliteAjoute
      ) {
        setGenerationDocumentECParams({
          acte: mentionNationaliteAjoutee ? undefined : (acte ?? undefined),
          idActe: mentionNationaliteAjoutee ? params.idActe : undefined,
          requete: params.requete,
          mentionsRetirees: idsMentionsRetirees,
          // @ts-ignore cf. estReponseAvecDelivrance
          choixDelivrance: params.requete.choixDelivrance
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsMentionsRetirees, resultatGenerationCourrier, mentionNationaliteAjoutee]);

  // Génération du document demandé
  const resultatGenerationEC = useGenerationEC(generationDocumentECParams);

  useEffect(() => {
    if (traitementFini(params, resultatGenerationCourrier, resultatGenerationEC)) {
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
};

const nationaliteAjouteeSiBesoin = (
  majMentionFaite: IMiseAJourMentionsResultat | undefined,
  params: ICreerCourrierECParams,
  acte: FicheActe | null
): boolean => Boolean(acte && (!acte.necessiteMentionNationalite(params?.requete?.choixDelivrance) || majMentionFaite));

const getIndexDocument = (
  requete: IRequeteDelivrance,
  resultatGenerationEC?: IGenerationECResultat,
  resultatGenerationCourrier?: IResultGenerationUnDocument
) => {
  let res = DocumentEC.Courrier;
  if (
    // Si un EC est crée mais pas de courrier
    (!resultatGenerationCourrier && resultatGenerationEC) ||
    // Si on a créé deux documents et que c'est une RDD avec délivrance
    (resultatGenerationCourrier &&
      resultatGenerationEC &&
      getOngletSelectVenantDePriseEnCharge(requete.sousType, requete.choixDelivrance) === DocumentEC.Principal)
  ) {
    res = DocumentEC.Principal;
  }
  return res;
};

const getOngletSelectVenantDePriseEnCharge = (sousType: SousTypeDelivrance, choixDelivrance?: ChoixDelivrance) => {
  return choixDelivrance &&
    ChoixDelivrance.estReponseAvecDelivrance(choixDelivrance) &&
    SousTypeDelivrance.estSousTypeCreationCourrierAutomatique(sousType)
    ? DocumentEC.Principal
    : DocumentEC.Courrier;
};

const traitementFini = (
  params?: ICreerCourrierECParams,
  resultatGenerationCourrier?: IResultGenerationUnDocument,
  resultatGenerationEC?: IGenerationECResultat
) => {
  return (
    params &&
    (resultatGenerationEC ||
      (resultatGenerationCourrier && ChoixDelivrance.estReponseSansDelivrance(params?.requete.choixDelivrance)) ||
      (resultatGenerationCourrier && params.requete.documentsReponses.length > 1))
  );
};
