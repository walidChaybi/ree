import { reinitialiserOnClick } from "@composant/menuTransfert/MenuTransfertUtil";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { A_NE_PAS_DELIVRER, TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { DocumentEC } from "@model/requete/enum/DocumentEC";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "@model/requete/IActionOption";
import { OptionCourrier, OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { PATH_EDITION } from "@router/ReceUrls";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { IBoutonPopin } from "@widget/popin/ConfirmationPopin";
import React, { MutableRefObject } from "react";
import { Location, NavigateFunction } from "react-router-dom";

const ORDRE_OPTION_MAX = 900;
const enum MaxTitulaireDelivrance {
  NAISSANCE = 1,
  DECES = 1,
  MARIAGE = 2
}
export const enum IndexAction {
  // Délivrer
  COPIE_INTEGRALE = 0,
  EXTRAIT_AVEC_FILIATION = 1,
  EXTRAIT_SANS_FILIATION = 2,
  EXTRAIT_PLURILINGUE = 3,
  COPIE_ARCHIVE = 4,

  // Réponse sans délivrance
  REQUETE_INCOMPLETE = 0,
  ACTE_NON_DETENU = 1,
  DIVERS = 2,
  IGNORER_REQUETE = 3
}

type BoutonsActionPopinType = [string, () => void];
type ControleCoherenceType = {
  indexMenu: number;
  actes?: IResultatRMCActe[];
  inscriptions?: IResultatRMCInscription[];
  requete?: IRequeteDelivrance;
  titulairesActeMap?: Map<string, ITitulaireActe[]>;
  nbTitulairesActeMap?: Map<string, number>;
  alertesActe?: IAlerte[];
  refs: MutableRefObject<HTMLElement[]>;
  setMessagesBloquant: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setBoutonsPopin: React.Dispatch<React.SetStateAction<IBoutonPopin[] | undefined>>;
};
type ErreurType = {
  indexMenu: number;
  acte?: IResultatRMCActe;
  titulaires?: ITitulaireActe[];
};
export type ErreurResult = {
  enErreur: boolean;
  popinErreur: {
    message: string;
    nonBloquant?: boolean;
  };
};
type GenresType = {
  titulaire?: string;
  conjoint?: string;
  parents: (string | undefined)[];
};

// Boutons ---------------------------------------------------------------

const getBoutonsActionPopin = (boutons: BoutonsActionPopinType[]): IBoutonPopin[] => {
  return boutons.map(bouton => ({
    label: bouton[0] ?? "",
    action: bouton[1]
  }));
};

// Choix -----------------------------------------------------------------

export const estChoixExtraitAvecOuSansFiliation = (indexMenu: number) =>
  indexMenu === IndexAction.EXTRAIT_AVEC_FILIATION || indexMenu === IndexAction.EXTRAIT_SANS_FILIATION;

export const estChoixExtraitPlurilingue = (indexMenu: number) => indexMenu === IndexAction.EXTRAIT_PLURILINGUE;

export const estChoixIgnorerRequete = (indexMenu: number) => indexMenu === IndexAction.IGNORER_REQUETE;

export const estChoixActeNonDetenu = (indexMenu: number) => indexMenu === IndexAction.ACTE_NON_DETENU;

// getOptionsMenu --------------------------------------------------------

export const getOptionsMenuDelivrer = (): IActionOption[] => {
  return [
    {
      value: IndexAction.COPIE_INTEGRALE,
      label: "Copie intégrale",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD, SousTypeDelivrance.RDDP],
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE
    },
    {
      value: IndexAction.EXTRAIT_AVEC_FILIATION,
      label: "Extrait avec filiation",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD, SousTypeDelivrance.RDDP],
      // attribut supplémentaire pour trouver facilement le choix de délivrance en fonction de l'index du menu sélectionné
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    },
    {
      value: IndexAction.EXTRAIT_SANS_FILIATION,
      label: "Extrait sans filiation",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD, SousTypeDelivrance.RDDP],
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
    },
    {
      value: IndexAction.EXTRAIT_PLURILINGUE,
      label: "Extrait plurilingue",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE
    },
    {
      value: IndexAction.COPIE_ARCHIVE,
      label: "Copie archive (118)",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE
    }
  ];
};

export const getOptionsMenuReponseSansDelivrance = (): IActionOption[] => {
  return [
    {
      value: IndexAction.REQUETE_INCOMPLETE,
      label: "Requête incomplète (117 - 18 - 19)",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD, SousTypeDelivrance.RDDP],
      choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE
    },
    {
      value: IndexAction.ACTE_NON_DETENU,
      label: "Acte non détenu au SCEC (115 - 64 - 24, ...)",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD, SousTypeDelivrance.RDDP],
      choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC
    },
    {
      value: IndexAction.DIVERS,
      label: "Divers (17, ...)",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD, SousTypeDelivrance.RDDP],
      choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_DIVERS
    },
    {
      value: IndexAction.IGNORER_REQUETE,
      label: "Ignorer la requête",
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDDP]
    }
  ];
};

// Courrier auto ---------------------------------------------------------

export const getIdCourrierAuto = (choixDelivrance?: ChoixDelivrance) => {
  let res = "";
  if (choixDelivrance) {
    if (choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE) {
      res = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.DELIVRANCE_ACTE_NON_ANTHENTIQUE);
    } else {
      res = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.DELIVRANCE_ACTE);
    }
  }
  return res;
};

export const compositionCourrierAutomatique = (
  choixDelivrance: ChoixDelivrance,
  optionsChoisies: OptionsCourrier,
  requete: IRequeteDelivrance
): { saisieCourrier: SaisieCourrier; optionsChoisies: OptionCourrier[] } => {
  return {
    saisieCourrier: {
      choixCourrier: {
        delivrance: ChoixDelivrance.getKeyForNom(ChoixDelivrance, choixDelivrance.nom),
        courrier: getIdCourrierAuto(choixDelivrance)
      },
      texteLibre: { texte: "" },
      requerant: {
        prenom: requete?.requerant.prenom,
        nom: requete?.requerant.nomFamille
      },
      requete: {
        motif: MotifDelivrance.getKey(requete?.motif),
        nbExemplaire: requete?.nbExemplaireImpression
      }
    } as SaisieCourrier,
    optionsChoisies: optionsChoisies
      ?.filter(option => {
        return option.optionParDefaut && option.ordreEdition < ORDRE_OPTION_MAX;
      })
      .sort((a, b) => a.ordreEdition - b.ordreEdition)
  };
};

// Utils -----------------------------------------------------------------

export const aNombreTitulairesIncoherent = (natureActe?: string, nbTitulaires?: number) => {
  if (nbTitulaires) {
    switch (natureActe) {
      case NatureActeRequete.NAISSANCE.libelle:
        return nbTitulaires > MaxTitulaireDelivrance.NAISSANCE;
      case NatureActeRequete.DECES.libelle:
        return nbTitulaires > MaxTitulaireDelivrance.DECES;
      case NatureActeRequete.MARIAGE.libelle:
        return nbTitulaires > MaxTitulaireDelivrance.MARIAGE;
      default:
        return false;
    }
  }
  return false;
};

const getGenreTitulaireConjointEtParents = (titulairesActe?: ITitulaireActe[]): GenresType =>
  ({
    titulaire: titulairesActe?.[0]?.sexe,
    conjoint: titulairesActe?.[1]?.sexe,
    parents:
      titulairesActe?.[0]?.filiations?.filter(filiation => filiation.lienParente === LienParente.PARENT).map(parent => parent.sexe) || []
  }) as unknown as GenresType;

export const aGenreIdentique = (genrePersonneA?: string, genrePersonneB?: string) => {
  return genrePersonneA && genrePersonneB && !aGenreInconnu([genrePersonneA, genrePersonneB]) && genrePersonneA === genrePersonneB;
};

export const aGenreIndetermine = (genres: (string | undefined)[]) => genres.find(genre => genre === Sexe.getKey(Sexe.INDETERMINE)) != null;

const aGenreInconnu = (genres: (string | undefined)[]) => genres.find(genre => genre === Sexe.getKey(Sexe.INCONNU)) != null;

export const redirection = ({
  navigate,
  location,
  idActe,
  idRequete,
  index
}: {
  navigate: NavigateFunction;
  location: Location;
  idActe?: string;
  idRequete?: string;
  index: DocumentEC;
}) => {
  const prefix = getUrlPrecedente(location.pathname);

  if (idRequete) {
    const url = `${prefix}/${PATH_EDITION}/${idRequete}/${idActe}`;

    replaceUrl(navigate, url, index);
  }
};

// Contrôles -------------------------------------------------------------

// teste dans l'ordre la condition d'erreur de chaque controles en paramètre, et return le premier qui valide sa condition
const controleCoherence = (controles: ErreurResult[]): ErreurResult | undefined => controles.find(controle => controle.enErreur);

export const nombreActesSelectionnesDifferentDeUn = ({
  actes,
  inscriptions
}: {
  actes?: IResultatRMCActe[];
  inscriptions?: IResultatRMCInscription[];
}): ErreurResult => {
  return {
    enErreur: actes == null || actes.length !== 1 || (inscriptions != null && inscriptions.length !== 0),
    popinErreur: {
      message: "Veuillez sélectionner un et un seul acte à délivrer."
    }
  };
};

export const choixDifferentNonDetenuEtnombreActesSelectionnesDifferentDeUnOuZero = (
  props: Pick<ErreurType, "indexMenu"> & {
    actes?: IResultatRMCActe[];
    inscriptions?: IResultatRMCInscription[];
  }
): ErreurResult => {
  return {
    enErreur:
      !estChoixActeNonDetenu(props.indexMenu) &&
      ((props.actes != null && props.actes.length > 1) || (props.inscriptions != null && props.inscriptions.length !== 0)),
    popinErreur: {
      message: "Veuillez sélectionner zéro ou un seul acte."
    }
  };
};

const corpsActeNonDisponible = (props: Pick<ErreurType, "acte">): ErreurResult => {
  return {
    enErreur: props.acte?.type === TypeActe.INCONNU.libelle,
    popinErreur: {
      message: "Il n'y a pas de corps disponible pour l'acte sélectionné, sa délivrance n'est pas possible à ce jour."
    }
  };
};

const titulairesMultiples = (
  props: Omit<ErreurType, "titulaires"> & {
    nbTitulaires?: number;
  }
): ErreurResult => {
  return {
    enErreur:
      (estChoixExtraitAvecOuSansFiliation(props.indexMenu) || estChoixExtraitPlurilingue(props.indexMenu)) &&
      aNombreTitulairesIncoherent(props.acte?.nature, props.nbTitulaires),
    popinErreur: {
      message: "Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples."
    }
  };
};

const delivranceActeDeces = (props: Omit<ErreurType, "titulaires">): ErreurResult => {
  return {
    enErreur: estChoixExtraitAvecOuSansFiliation(props.indexMenu) && props.acte?.nature === NatureActeRequete.DECES.libelle,
    popinErreur: {
      message: "Pas de délivrance d'extrait avec ou sans filiation pour un acte de décès."
    }
  };
};

const natureActeDemandeSelectionneDifferents = (
  props: Pick<ErreurType, "acte"> & {
    natureActeRequete?: string;
  }
): ErreurResult => {
  return {
    enErreur: props.acte?.nature !== props.natureActeRequete,
    popinErreur: {
      message: "La nature de l'acte sélectionné ne correspond pas à la nature de l'acte demandé. Voulez-vous continuer ?",
      nonBloquant: true
    }
  };
};

const genresIndeterminesOuIdentiquesNaissance = (props: ErreurType): ErreurResult => {
  const genres = getGenreTitulaireConjointEtParents(props.titulaires);
  return {
    enErreur:
      estChoixExtraitPlurilingue(props.indexMenu) &&
      (aGenreIdentique(genres.parents[0], genres.parents[1]) ||
        aGenreIndetermine([genres.titulaire, genres.parents[0], genres.parents[1]])) &&
      props.acte?.nature === NatureActeRequete.NAISSANCE.libelle,
    popinErreur: {
      message: "Pas de délivrance d'extrait plurilingue de naissance avec une personne de genre indéterminé ou des parents de même sexe."
    }
  };
};

const genresIndeterminesOuIdentiquesMariage = (props: ErreurType): ErreurResult => {
  const genres = getGenreTitulaireConjointEtParents(props.titulaires);
  return {
    enErreur:
      estChoixExtraitPlurilingue(props.indexMenu) &&
      (aGenreIdentique(genres.titulaire, genres.conjoint) || aGenreIndetermine([genres.titulaire, genres.conjoint])) &&
      props.acte?.nature === NatureActeRequete.MARIAGE.libelle,
    popinErreur: {
      message: "Pas de délivrance d'extrait plurilingue de mariage pour des personnes de même sexe ou de genre indéterminé."
    }
  };
};

const genresIndeterminesOuIdentiquesDeces = (props: ErreurType): ErreurResult => {
  const genres = getGenreTitulaireConjointEtParents(props.titulaires);
  return {
    enErreur:
      estChoixExtraitPlurilingue(props.indexMenu) &&
      (aGenreIdentique(genres.parents[0], genres.parents[1]) ||
        aGenreIndetermine([genres.titulaire, genres.parents[0], genres.parents[1]])) &&
      props.acte?.nature === NatureActeRequete.DECES.libelle,
    popinErreur: {
      message: "Pas de délivrance d'extrait plurilingue de décès avec une personne de genre indéterminé ou des parents de même sexe."
    }
  };
};

export const acteAvecAlerteDeTypeANePasDelivrer = (alertesActe?: IAlerte[]): ErreurResult => {
  return {
    enErreur: Boolean(
      alertesActe?.find(alerte => TypeAlerte.listeDepuisType(A_NE_PAS_DELIVRER).filter(type => type === alerte.type).length !== 0)
    ),
    popinErreur: {
      message: "L'acte n'est pas délivrable. Voulez-vous continuer ?",
      nonBloquant: true
    }
  };
};

export const controleCoherenceEntreDocumentSelectionneEtActionDelivrer = ({
  indexMenu,
  actes,
  inscriptions,
  requete,
  titulairesActeMap,
  nbTitulairesActeMap,
  alertesActe,
  refs,
  setBoutonsPopin,
  setMessagesBloquant
}: ControleCoherenceType) => {
  if (SousTypeDelivrance.estRDDouRDCouRDDP(requete?.sousType)) {
    const fermer = () => {
      setMessagesBloquant(undefined);
      reinitialiserOnClick(refs);
    };
    const continuer = () => setMessagesBloquant([]);

    const acte = actes?.[0];
    const nbTitulaires = acte ? nbTitulairesActeMap?.get(acte.idActe) : 0;
    const titulaires = acte ? titulairesActeMap?.get(acte.idActe) : undefined;
    const boutonOK = getBoutonsActionPopin([["OK", fermer]]);
    const boutonsOuiNon = getBoutonsActionPopin([
      ["Oui", continuer],
      ["Non", fermer]
    ]);

    const erreur = controleCoherence([
      nombreActesSelectionnesDifferentDeUn({ actes, inscriptions }),
      corpsActeNonDisponible({ acte }),
      titulairesMultiples({
        indexMenu,
        acte,
        nbTitulaires
      }),
      delivranceActeDeces({ indexMenu, acte }),
      genresIndeterminesOuIdentiquesNaissance({
        indexMenu,
        acte,
        titulaires
      }),
      genresIndeterminesOuIdentiquesMariage({
        indexMenu,
        acte,
        titulaires
      }),
      genresIndeterminesOuIdentiquesDeces({
        indexMenu,
        acte,
        titulaires
      }),
      natureActeDemandeSelectionneDifferents({
        acte,
        natureActeRequete: requete?.evenement?.natureActe?.libelle
      }),
      acteAvecAlerteDeTypeANePasDelivrer(alertesActe)
    ]);
    if (erreur) {
      const {
        popinErreur: { message, nonBloquant }
      } = erreur;

      setMessagesBloquant([message]);
      setBoutonsPopin(nonBloquant ? boutonsOuiNon : boutonOK);
    } else {
      setMessagesBloquant([]);
    }
  }
};

export const controleCoherenceEntreDocumentSelectionneEtActionReponseSansDelivrance = ({
  indexMenu,
  actes,
  inscriptions,
  requete,
  refs,
  setBoutonsPopin,
  setMessagesBloquant
}: Omit<ControleCoherenceType, "titulairesActeMap" | "nbTitulairesActeMap">) => {
  if (SousTypeDelivrance.estRDDouRDCouRDDP(requete?.sousType)) {
    const fermer = () => {
      setMessagesBloquant(undefined);
      reinitialiserOnClick(refs);
    };

    const boutonOK = getBoutonsActionPopin([["OK", fermer]]);

    const erreur = controleCoherence([
      choixDifferentNonDetenuEtnombreActesSelectionnesDifferentDeUnOuZero({
        indexMenu,
        actes,
        inscriptions
      })
    ]);

    if (erreur) {
      const {
        popinErreur: { message }
      } = erreur;

      setMessagesBloquant([message]);
      setBoutonsPopin(boutonOK);
    } else {
      setMessagesBloquant([]);
    }
  }
};
