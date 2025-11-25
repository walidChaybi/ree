import { CourrierComposition, ICourrierComposition, IElementsJasperCourrier } from "@model/composition/ICourrierComposition";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { Orientation } from "@model/composition/enum/Orientation";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { IAdresseRequerant } from "@model/requete/IAdresseRequerant";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ISauvegardeCourrier } from "@model/requete/ISauvegardeCourrier";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { useEffect, useState } from "react";
import { EMimeType } from "../../../../ressources/EMimeType";
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
} from "../../composant/formulaire/ConstantesNomsForm";
import { IActeApiHookParams, useInformationsActeApiHook } from "../acte/ActeApiHook";
import { ICourrierParams, useCourrierApiHook } from "../composition/CompositionCourrierHook";
import { specificationCourrier } from "../generation/generationCourrierHook/specificationCourrier";
import { IResultGenerationUnDocument, RESULTAT_VIDE } from "../generation/generationUtils";
import { useSauvegarderCourrierCreerActionMajStatutRequete } from "./SauvegardeCourrierCreerActionMajStatut";

export interface IGenerationCourrierParams {
  saisieCourrier?: SaisieCourrier;
  optionsChoisies?: OptionsCourrier;
  requete?: IRequeteDelivrance;
  idActe?: string;
  acte: FicheActe | null;
  mettreAJourStatut: boolean;
}

export const useGenerationCourrierHook = (params?: IGenerationCourrierParams) => {
  const [resultatGenerationCourrier, setResultatGenerationCourrier] = useState<IResultGenerationUnDocument>();

  const [courrierParams, setCourrierParams] = useState<ICourrierParams>();

  const [courrier, setCourrier] = useState<{ doc?: IDocumentDelivrance | null }>();

  const [acteApiHookParams, setActeApiHookParams] = useState<IActeApiHookParams>({});

  const [requeteDelivrancePourSauvegarde, setRequeteDelivrancePourSauvegarde] = useState<ISauvegardeCourrier | undefined>();

  const [basculerConstructionCourrier, setBasculerConstructionCourrier] = useState<boolean>(false);

  const [acte, setActe] = useState<FicheActe>();

  useEffect(() => {
    if (uuidCourrierPresent(params)) {
      // @ts-ignore params.saisieCourrier n'est pas null
      const uuidCourrier = params.saisieCourrier.choixCourrier.courrier;
      setCourrier({
        doc: DocumentDelivrance.depuisId(uuidCourrier)
      });
      setActApiHookParamsOuBasculerConstructionCourrier(
        setActeApiHookParams,
        setBasculerConstructionCourrier,
        setActe,
        params?.acte ?? undefined,
        params?.idActe
      );
    }
  }, [params]);

  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  useEffect(() => {
    if (acteApiHookResultat) {
      setActe(acteApiHookResultat);
      setBasculerConstructionCourrier(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acteApiHookResultat]);

  // 1 - Construction du Courrier
  useEffect(() => {
    if (presenceDeLaRequeteDuDocEtSaisieCourrier(params, basculerConstructionCourrier)) {
      setBasculerConstructionCourrier(false);
      if (verificationElementPourLaGeneration(params, courrier?.doc)) {
        const elements: IElementsJasperCourrier = specificationCourrier.getElementsJasper(
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
  const donneesComposition: IDonneesComposition | undefined = useCourrierApiHook(courrierParams);

  // 3 - Création du document réponse pour stockage dans la BDD et Swift
  useEffect(() => {
    if (donneesComposition && courrier) {
      setRequeteDelivrancePourSauvegarde(
        mapCourrierPourSauvegarde(params?.saisieCourrier, donneesComposition, params?.optionsChoisies, courrier.doc)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donneesComposition]);

  // 4- Stockage du document réponse une fois celui-ci créé
  // 5- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 6- Mise à jour du status de la requête + création d'une action
  const uuidDocumentsReponse = useSauvegarderCourrierCreerActionMajStatutRequete(
    ChoixDelivrance.getStatutApresChoixDelivrance(params?.requete?.choixDelivrance),
    libelleSelonMajStatut(params),
    requeteDelivrancePourSauvegarde,
    params?.requete?.id
  );

  // 6- Une fois la requête mise à jour et l'action créé, changement de page
  useEffect(() => {
    if (uuidDocumentsReponse && donneesComposition) {
      setResultatGenerationCourrier({
        idDocumentReponse: uuidDocumentsReponse,
        contenuDocumentReponse: donneesComposition.contenu
      });
    }
  }, [uuidDocumentsReponse]);

  return resultatGenerationCourrier;
};

const libelleSelonMajStatut = (params: IGenerationCourrierParams | undefined): string | undefined => {
  return params?.mettreAJourStatut ? ChoixDelivrance.getStatutApresChoixDelivrance(params?.requete?.choixDelivrance).libelle : undefined;
};

const setActApiHookParamsOuBasculerConstructionCourrier = (
  setActeApiHookParams: any,
  setBasculerConstructionCourrier: any,
  setActe: any,
  acte?: FicheActe,
  idActe?: string
) => {
  if (acte) {
    setActe(acte);
    setBasculerConstructionCourrier(true);
  } else if (idActe) {
    setActeApiHookParams({ idActe });
  } else {
    setBasculerConstructionCourrier(true);
  }
};

const uuidCourrierPresent = (generationCourrierParams?: IGenerationCourrierParams): boolean => {
  return generationCourrierParams?.saisieCourrier?.choixCourrier.courrier != null;
};

const presenceDeLaRequeteDuDocEtSaisieCourrier = (params: IGenerationCourrierParams | undefined, basculerConstructionCourrier: boolean) => {
  return basculerConstructionCourrier && params?.requete?.documentDemande && params.saisieCourrier;
};

const verificationElementPourLaGeneration = (params?: IGenerationCourrierParams, courrier?: IDocumentDelivrance | null) => {
  return (
    params?.requete?.titulaires &&
    params.requete.titulaires.length > 0 &&
    courrier &&
    estSousTypeRequeteRDDPEtChoixDelivranceEstReponseSansDelivrance(params)
  );
};

const estSousTypeRequeteRDDPEtChoixDelivranceEstReponseSansDelivrance = (params: IGenerationCourrierParams | undefined): boolean => {
  if (SousTypeDelivrance.estRDDP(params?.requete?.sousType)) {
    return ChoixDelivrance.estReponseSansDelivrance(params?.requete?.choixDelivrance);
  } else {
    return true;
  }
};

const construitCourrier = (
  elements: IElementsJasperCourrier,
  requete: IRequeteDelivrance,
  setCourrierParams: any,
  setResultGenerationCourrier: any,
  courrier: IDocumentDelivrance
) => {
  if (elements && requete?.documentDemande) {
    const composition = creerCourrierComposition(elements, requete);
    setCourrierParams({
      codeCourrier: courrier.code,
      courrierComposition: composition
    });
  } else {
    setResultGenerationCourrier(RESULTAT_VIDE);
  }
};

const creerCourrierComposition = (elements: IElementsJasperCourrier, requete: IRequeteDelivrance): ICourrierComposition => {
  return CourrierComposition.creerCourrier(requete, elements);
};

const mapCourrierPourSauvegarde = (
  saisieCourrier: SaisieCourrier | undefined,
  donneesComposition: IDonneesComposition,
  optionsChoisies: OptionsCourrier | undefined,
  courrier: any
): ISauvegardeCourrier => {
  return {
    nomRequerant: saisieCourrier?.[REQUERANT]?.[NOM] ?? "",
    prenomRequerant: saisieCourrier?.[REQUERANT]?.[PRENOM] ?? "",
    raisonSocialeRequerant: saisieCourrier?.[REQUERANT]?.[RAISON_SOCIALE] ?? "",
    adresseRequerant: mappingSaisieAdresseVersAdresseRequerant(saisieCourrier),
    motif: saisieCourrier?.[REQUETE]?.[MOTIF] ?? "",
    nombreExemplairesDemandes: parseInt(saisieCourrier?.[REQUETE]?.[NB_EXEMPLAIRE]?.toString() ?? ""),
    documentReponse: {
      contenu: donneesComposition.contenu,
      nom: courrier.libelle,
      mimeType: EMimeType.APPLI_PDF,
      typeDocument: courrier.id, // UUID du courrier (nomenclature)
      nbPages: donneesComposition.nbPages,
      orientation: Orientation.PORTRAIT,
      optionsCourrier: optionsChoisies?.map(optionChoisie => {
        return {
          code: optionChoisie.id,
          numeroOrdreEdition: optionChoisie.ordreEdition,
          texte: optionChoisie.texteOptionCourrierModifie ?? optionChoisie.texteOptionCourrier
        };
      }),
      texteLibreCourrier: {
        texte: saisieCourrier?.[TEXTE_LIBRE]?.[TEXTE] ?? ""
      }
    } as IDocumentReponse
  };
};

const requeteAvecSaisieRequerant = (requete: IRequeteDelivrance, saisieCourrier: SaisieCourrier) => {
  if (saisieCourrier[REQUERANT]) {
    requete.requerant = ajoutSaisieIdentiteRequerantVersRequerantRequete(saisieCourrier, requete.requerant);
  }
  if (saisieCourrier[ADRESSE]) {
    requete.requerant.adresse = mappingSaisieAdresseVersAdresseRequerant(saisieCourrier);
  }
  return requete;
};

const mappingSaisieAdresseVersAdresseRequerant = (saisieCourrier: SaisieCourrier | undefined): IAdresseRequerant => {
  return {
    ligne2: saisieCourrier?.[ADRESSE]?.[COMPLEMENT_DESTINATAIRE] ?? "",
    ligne3: saisieCourrier?.[ADRESSE]?.[COMPLEMENT_POINT_GEO] ?? "",
    ligne4: saisieCourrier?.[ADRESSE]?.[VOIE] ?? "",
    ligne5: saisieCourrier?.[ADRESSE]?.[LIEU_DIT] ?? "",
    codePostal: saisieCourrier?.[ADRESSE]?.[CODE_POSTAL] ?? "",
    ville: saisieCourrier?.[ADRESSE]?.[COMMUNE] ?? "",
    pays: saisieCourrier?.[ADRESSE]?.[PAYS] ?? ""
  };
};

const ajoutSaisieIdentiteRequerantVersRequerantRequete = (saisieCourrier: SaisieCourrier, requerantRequete: IRequerant): IRequerant => {
  const requerant: IRequerant = { ...requerantRequete };

  const nomRequerant = saisieCourrier[REQUERANT]?.[NOM];
  const raisonSocialeRequerant = saisieCourrier[REQUERANT]?.[RAISON_SOCIALE];

  requerant.nomFamille = nomRequerant;
  requerant.prenom = saisieCourrier[REQUERANT]?.[PRENOM];

  switch (requerantRequete.qualiteRequerant.qualite) {
    case Qualite.PARTICULIER:
      if (requerant.qualiteRequerant.particulier) {
        requerant.qualiteRequerant.particulier.nomUsage = nomRequerant;
      }
      break;
    case Qualite.MANDATAIRE_HABILITE:
      if (requerant.qualiteRequerant.mandataireHabilite) {
        requerant.qualiteRequerant.mandataireHabilite.raisonSociale = raisonSocialeRequerant;
      }
      break;
    case Qualite.INSTITUTIONNEL:
      if (requerant.qualiteRequerant.institutionnel) {
        requerant.qualiteRequerant.institutionnel.nomInstitution = raisonSocialeRequerant;
      }
      break;
    case Qualite.AUTRE_PROFESSIONNEL:
      if (requerant.qualiteRequerant.autreProfessionnel) {
        requerant.qualiteRequerant.autreProfessionnel.raisonSociale = raisonSocialeRequerant;
      }
      break;
    default:
      break;
  }
  return requerant;
};
