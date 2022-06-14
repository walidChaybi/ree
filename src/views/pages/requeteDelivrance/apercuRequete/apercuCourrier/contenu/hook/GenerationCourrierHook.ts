import { useEffect, useState } from "react";
import { IDonneesComposition } from "../../../../../../../model/composition/commun/retourApiComposition/IDonneesComposition";
import { Orientation } from "../../../../../../../model/composition/enum/Orientation";
import {
  CourrierComposition,
  ICourrierComposition
} from "../../../../../../../model/composition/ICourrierComposition";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { IAdresseRequerant } from "../../../../../../../model/requete/IAdresseRequerant";
import { IDocumentReponse } from "../../../../../../../model/requete/IDocumentReponse";
import { OptionsCourrier } from "../../../../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { ISauvegardeCourrier } from "../../../../../../../model/requete/ISauvegardeCourrier";
import { MimeType } from "../../../../../../../ressources/MimeType";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../../../../../common/hook/acte/ActeApiHook";
import {
  ICourrierParams,
  useCourrierApiHook
} from "../../../../../../common/hook/composition/CompositionCourrierHook";
import {
  IElementsJasperCourrier,
  specificationCourrier
} from "../../../../../../common/hook/generation/generationCourrierHook/specificationCourrier";
import {
  IResultGenerationUnDocument,
  RESULTAT_VIDE
} from "../../../../../../common/hook/generation/generationUtils";
import { useSauvegarderCourrierCreerActionMajStatutRequete } from "../../../../../../common/hook/requete/SauvegardeCourrierCreerActionMajStatut";
import { getValeurOuVide } from "../../../../../../common/util/Utils";
import {
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_POINT_GEO,
  LIEU_DIT,
  MOTIF,
  NB_EXEMPLAIRE,
  PAYS,
  VOIE
} from "../../../../saisirRequete/modelForm/ISaisirRequetePageModel";
import { getStatutApresChoixDelivrance } from "../contenuForm/CourrierFonctions";
import {
  ADRESSE,
  REQUETE,
  SaisieCourrier,
  TEXTE,
  TEXTE_LIBRE
} from "../modelForm/ISaisiePageModel";

export interface IResultGenerationCourrier {
  idDocumentReponse?: string;
  idAction?: string;
  contenuDocumentReponse?: string;
}

export interface IGenerationCourrierParams {
  saisieCourrier?: SaisieCourrier;
  optionsChoisies?: OptionsCourrier;
  requete?: IRequeteDelivrance;
  idActe?: string;
  mettreAJourStatut: boolean;
}

export function useGenerationCourrierHook(params?: IGenerationCourrierParams) {
  const [resultatGenerationCourrier, setResultatGenerationCourrier] =
    useState<IResultGenerationUnDocument>();

  const [courrierParams, setCourrierParams] = useState<ICourrierParams>();

  const [courrier, setCourrier] = useState<{ doc?: DocumentDelivrance }>();

  const [acteApiHookParams, setActeApiHookParams] =
    useState<IActeApiHookParams>();

  const [requeteDelivrancePourSauvegarde, setRequeteDelivrancePourSauvegarde] =
    useState<ISauvegardeCourrier | undefined>();

  const [basculerConstructionCourrier, setBasculerConstructionCourrier] =
    useState<boolean>(false);

  useEffect(() => {
    if (uuidCourrierPresent(params)) {
      // @ts-ignore params.saisieCourrier n'est pas null
      const uuidCourrier = params.saisieCourrier.choixCourrier.courrier;
      setCourrier({
        doc: DocumentDelivrance.getDocumentDelivrance(uuidCourrier)
      });
      setActApiHookParamsOuBasculerConstructionCourrier(
        setActeApiHookParams,
        setBasculerConstructionCourrier,
        params?.idActe
      );
    }
  }, [params]);

  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  useEffect(() => {
    if (acteApiHookResultat) {
      setBasculerConstructionCourrier(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acteApiHookResultat]);

  // 1 - Construction du Courrier
  useEffect(() => {
    if (
      presenceDeLaRequeteDuDocEtSaisieCourrier(
        params,
        basculerConstructionCourrier
      )
    ) {
      setBasculerConstructionCourrier(false);
      if (presenceDesElementsPourLaGeneration(params, courrier?.doc)) {
        const elements: IElementsJasperCourrier =
          specificationCourrier.getElementsJasper(
            // @ts-ignore presenceDesElementsPourLaGeneration
            params.saisieCourrier,
            // @ts-ignore presenceDesElementsPourLaGeneration
            params.requete,
            // @ts-ignore presenceDesElementsPourLaGeneration
            params.optionsChoisies,
            acteApiHookResultat?.acte
          );
        construitCourrier(
          elements,
          // @ts-ignore presenceDesElementsPourLaGeneration
          requeteAvecAdresseSaisie(params?.requete, params?.saisieCourrier),
          setCourrierParams,
          setResultatGenerationCourrier,
          // @ts-ignore presenceDesElementsPourLaGeneration
          courrier?.doc
        );
      } else {
        setResultatGenerationCourrier(RESULTAT_VIDE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basculerConstructionCourrier, courrier]);

  // 2 - Création du courrier: appel api composition
  // récupération du document en base64
  const donneesComposition: IDonneesComposition | undefined =
    useCourrierApiHook(courrierParams);

  // 3 - Création du document réponse pour stockage dans la BDD et Swift
  useEffect(() => {
    if (donneesComposition && courrier) {
      setRequeteDelivrancePourSauvegarde(
        mapCourrierPourSauvergarde(
          params?.saisieCourrier,
          donneesComposition,
          params?.optionsChoisies,
          courrier.doc
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donneesComposition]);

  // 4- Stockage du document réponse une fois celui-ci créé
  // 5- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 6- Mise à jour du status de la requête + création d'une action
  const uuidDocumentsReponse =
    useSauvegarderCourrierCreerActionMajStatutRequete(
      getStatutApresChoixDelivrance(params?.requete?.choixDelivrance),
      libelleSelonMajStatut(params),
      requeteDelivrancePourSauvegarde,
      params?.requete?.id
    );

  // 6- Une fois la requête mise à jour et l'action créé, changement de page
  useEffect(() => {
    if (
      uuidDocumentReponseEtDonneesCompositionPresents(
        uuidDocumentsReponse,
        donneesComposition
      )
    ) {
      setResultatGenerationCourrier({
        //@ts-ignore non null
        idDocumentReponse: uuidDocumentsReponse[0],
        //@ts-ignore non null
        contenuDocumentReponse: donneesComposition.contenu
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentsReponse]);

  return resultatGenerationCourrier;
}

function libelleSelonMajStatut(
  params: IGenerationCourrierParams | undefined
): string | undefined {
  return params?.mettreAJourStatut
    ? getStatutApresChoixDelivrance(params?.requete?.choixDelivrance).libelle
    : undefined;
}

function setActApiHookParamsOuBasculerConstructionCourrier(
  setActeApiHookParams: any,
  setBasculerConstructionCourrier: any,
  idActe?: string
) {
  if (idActe) {
    setActeApiHookParams({ idActe });
  } else {
    setBasculerConstructionCourrier(true);
  }
}

function uuidCourrierPresent(
  generationCourrierParams?: IGenerationCourrierParams
): boolean {
  return (
    generationCourrierParams?.saisieCourrier != null &&
    generationCourrierParams.saisieCourrier.choixCourrier.courrier != null
  );
}

function uuidDocumentReponseEtDonneesCompositionPresents(
  uuidDocumentsReponse: string[] | undefined,
  donneesComposition: IDonneesComposition | undefined
) {
  return uuidDocumentsReponse != null && donneesComposition != null;
}

function presenceDeLaRequeteDuDocEtSaisieCourrier(
  params: IGenerationCourrierParams | undefined,
  basculerConstructionCourrier: boolean
) {
  return (
    basculerConstructionCourrier &&
    params?.requete &&
    params.requete.documentDemande &&
    params.saisieCourrier
  );
}

function presenceDesElementsPourLaGeneration(
  params: IGenerationCourrierParams | undefined,
  courrier: DocumentDelivrance | undefined
) {
  return (
    params?.requete &&
    params?.requete.titulaires &&
    params.requete.titulaires.length > 0 &&
    courrier
  );
}

async function construitCourrier(
  elements: IElementsJasperCourrier,
  requete: IRequeteDelivrance,
  setCourrierParams: any,
  setResultGenerationCourrier: any,
  courrier: DocumentDelivrance
) {
  if (elements && requete && requete.documentDemande) {
    const composition = creerCourrierComposition(elements, requete);
    setCourrierParams({
      codeCourrier: courrier.code,
      courrierComposition: composition
    });
  } else {
    setResultGenerationCourrier(RESULTAT_VIDE);
  }
}

function creerCourrierComposition(
  elements: IElementsJasperCourrier,
  requete: IRequeteDelivrance
): ICourrierComposition {
  return CourrierComposition.creerCourrier(requete, elements);
}

function mapCourrierPourSauvergarde(
  saisieCourrier: SaisieCourrier | undefined,
  donneesComposition: IDonneesComposition,
  optionsChoisies: OptionsCourrier | undefined,
  courrier: any
): ISauvegardeCourrier {
  return {
    adresseRequerant: mappingAdresseSaisieToAdresseRequerant(saisieCourrier),
    motif: getValeurOuVide(saisieCourrier?.[REQUETE][MOTIF]),
    nombreExemplairesDemandes: parseInt(
      getValeurOuVide(saisieCourrier?.[REQUETE][NB_EXEMPLAIRE])
    ),
    documentReponse: {
      contenu: donneesComposition.contenu,
      nom: courrier.libelle,
      mimeType: MimeType.APPLI_PDF,
      typeDocument: DocumentDelivrance.getUuidFromDocument(courrier), // UUID du courrier (nomenclature)
      nbPages: donneesComposition.nbPages,
      orientation: Orientation.PORTRAIT,
      optionsCourrier: optionsChoisies?.map(el => {
        return {
          code: el.id,
          numeroOrdreEdition: el.ordreEdition,
          texte: el.texteOptionCourrierModifier
            ? el.texteOptionCourrierModifier
            : el.texteOptionCourrier
        };
      }),
      texteLibreCourrier: {
        texte: saisieCourrier?.[TEXTE_LIBRE][TEXTE]
      }
    } as IDocumentReponse
  };
}

function mappingAdresseSaisieToAdresseRequerant(
  saisieCourrier: SaisieCourrier | undefined
): IAdresseRequerant {
  return {
    ligne2: getValeurOuVide(
      saisieCourrier?.[ADRESSE]?.[COMPLEMENT_DESTINATAIRE]
    ),
    ligne3: getValeurOuVide(saisieCourrier?.[ADRESSE]?.[COMPLEMENT_POINT_GEO]),
    ligne4: getValeurOuVide(saisieCourrier?.[ADRESSE]?.[VOIE]),
    ligne5: getValeurOuVide(saisieCourrier?.[ADRESSE]?.[LIEU_DIT]),
    codePostal: getValeurOuVide(saisieCourrier?.[ADRESSE]?.[CODE_POSTAL]),
    ville: getValeurOuVide(saisieCourrier?.[ADRESSE]?.[COMMUNE]),
    pays: getValeurOuVide(saisieCourrier?.[ADRESSE]?.[PAYS])
  };
}

function requeteAvecAdresseSaisie(
  requete: IRequeteDelivrance,
  saisieCourrier: SaisieCourrier
) {
  if (saisieCourrier[ADRESSE]) {
    requete.requerant.adresse =
      mappingAdresseSaisieToAdresseRequerant(saisieCourrier);
  }
  return requete;
}
