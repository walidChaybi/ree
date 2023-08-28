import {
  ADRESSE,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_POINT_GEO,
  LIEU_DIT,
  MOTIF,
  NB_EXEMPLAIRE,
  NOM,
  PAYS,
  PRENOM,
  RAISON_SOCIALE,
  REQUERANT,
  REQUETE,
  TEXTE,
  TEXTE_LIBRE,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import { useSauvegarderCourrierCreerActionMajStatutRequete } from "@hook/requete/SauvegardeCourrierCreerActionMajStatut";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { Orientation } from "@model/composition/enum/Orientation";
import {
  CourrierComposition,
  ICourrierComposition,
  IElementsJasperCourrier
} from "@model/composition/ICourrierComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IAdresseRequerant } from "@model/requete/IAdresseRequerant";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ISauvegardeCourrier } from "@model/requete/ISauvegardeCourrier";
import { getValeurOuVide } from "@util/Utils";
import { useEffect, useState } from "react";
import { MimeType } from "../../../../ressources/MimeType";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../acte/ActeApiHook";
import {
  ICourrierParams,
  useCourrierApiHook
} from "../composition/CompositionCourrierHook";
import { specificationCourrier } from "../generation/generationCourrierHook/specificationCourrier";
import {
  IResultGenerationUnDocument,
  RESULTAT_VIDE
} from "../generation/generationUtils";

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
  acte?: IFicheActe;
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

  const [acte, setActe] = useState<IFicheActe>();

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
        setActe,
        params?.idActe,
        params?.acte
      );
    }
  }, [params]);

  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  useEffect(() => {
    if (acteApiHookResultat) {
      setActe(acteApiHookResultat.acte);
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
      if (verificationElementPourLaGeneration(params, courrier?.doc)) {
        const elements: IElementsJasperCourrier =
          specificationCourrier.getElementsJasper(
            // @ts-ignore presenceDesElementsPourLaGeneration
            params.saisieCourrier,
            // @ts-ignore presenceDesElementsPourLaGeneration
            params.requete,
            // @ts-ignore presenceDesElementsPourLaGeneration
            params.optionsChoisies,
            acte
          );
        construitCourrier(
          elements,
          // @ts-ignore presenceDesElementsPourLaGeneration
          requeteAvecSaisieRequerant(params?.requete, params?.saisieCourrier),
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
  }, [basculerConstructionCourrier, courrier, acte]);

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
      ChoixDelivrance.getStatutApresChoixDelivrance(
        params?.requete?.choixDelivrance
      ),
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
    ? ChoixDelivrance.getStatutApresChoixDelivrance(
        params?.requete?.choixDelivrance
      ).libelle
    : undefined;
}

function setActApiHookParamsOuBasculerConstructionCourrier(
  setActeApiHookParams: any,
  setBasculerConstructionCourrier: any,
  setActe: any,
  idActe?: string,
  acte?: IFicheActe
) {
  if (acte) {
    setActe(acte);
    setBasculerConstructionCourrier(true);
  } else if (idActe) {
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

function verificationElementPourLaGeneration(
  params: IGenerationCourrierParams | undefined,
  courrier: DocumentDelivrance | undefined
) {
  return (
    params?.requete &&
    params?.requete.titulaires &&
    params.requete.titulaires.length > 0 &&
    courrier &&
    estSousTypeRequeteRDDPEtChoixDelivranceEstReponseSansDelivrance(params)
  );
}

function estSousTypeRequeteRDDPEtChoixDelivranceEstReponseSansDelivrance(
  params: IGenerationCourrierParams | undefined
): boolean {
  if (SousTypeDelivrance.estRDDP(params?.requete?.sousType)) {
    return ChoixDelivrance.estReponseSansDelivrance(
      params?.requete?.choixDelivrance
    );
  } else {
    return true;
  }
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
    nomRequerant: getValeurOuVide(saisieCourrier?.[REQUERANT][NOM]),
    prenomRequerant: getValeurOuVide(saisieCourrier?.[REQUERANT][PRENOM]),
    raisonSocialeRequerant: getValeurOuVide(
      saisieCourrier?.[REQUERANT][RAISON_SOCIALE]
    ),
    adresseRequerant: mappingSaisieAdresseVersAdresseRequerant(saisieCourrier),
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
      optionsCourrier: optionsChoisies?.map(optionChoisie => {
        return {
          code: optionChoisie.id,
          numeroOrdreEdition: optionChoisie.ordreEdition,
          texte: optionChoisie.texteOptionCourrierModifier
            ? optionChoisie.texteOptionCourrierModifier
            : optionChoisie.texteOptionCourrier
        };
      }),
      texteLibreCourrier: {
        texte: saisieCourrier?.[TEXTE_LIBRE][TEXTE]
      }
    } as IDocumentReponse
  };
}

function requeteAvecSaisieRequerant(
  requete: IRequeteDelivrance,
  saisieCourrier: SaisieCourrier
) {
  if (saisieCourrier[REQUERANT]) {
    requete.requerant = ajoutSaisieIdentiteRequerantVersRequerantRequete(
      saisieCourrier,
      requete.requerant
    );
  }
  if (saisieCourrier[ADRESSE]) {
    requete.requerant.adresse =
      mappingSaisieAdresseVersAdresseRequerant(saisieCourrier);
  }
  return requete;
}

function mappingSaisieAdresseVersAdresseRequerant(
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

function ajoutSaisieIdentiteRequerantVersRequerantRequete(
  saisieCourrier: SaisieCourrier,
  requerantRequete: IRequerant
): IRequerant {
  const requerant: IRequerant = { ...requerantRequete };

  const nomRequerant = saisieCourrier[REQUERANT][NOM];
  const raisonSocialeRequerant = saisieCourrier[REQUERANT][RAISON_SOCIALE];

  requerant.nomFamille = nomRequerant;
  requerant.prenom = saisieCourrier[REQUERANT][PRENOM];

  switch (requerantRequete.qualiteRequerant.qualite) {
    case Qualite.PARTICULIER:
      if (requerant.qualiteRequerant.particulier) {
        requerant.qualiteRequerant.particulier.nomUsage = nomRequerant;
      }
      break;
    case Qualite.MANDATAIRE_HABILITE:
      if (requerant.qualiteRequerant.mandataireHabilite) {
        requerant.qualiteRequerant.mandataireHabilite.raisonSociale =
          raisonSocialeRequerant;
      }
      break;
    case Qualite.INSTITUTIONNEL:
      if (requerant.qualiteRequerant.institutionnel) {
        requerant.qualiteRequerant.institutionnel.nomInstitution =
          raisonSocialeRequerant;
      }
      break;
    case Qualite.AUTRE_PROFESSIONNEL:
      if (requerant.qualiteRequerant.autreProfessionnel) {
        requerant.qualiteRequerant.autreProfessionnel.raisonSociale =
          raisonSocialeRequerant;
      }
      break;
    default:
      break;
  }
  return requerant;
}
