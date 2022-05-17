import React from "react";
import { TypeActe } from "../../../../../../../model/etatcivil/enum/TypeActe";
import { ChoixDelivrance } from "../../../../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import {
  DELIVRANCE_ACTE,
  DELIVRANCE_ACTE_NON_ANTHENTIQUE
} from "../../../../../../../model/requete/enum/DocumentDelivranceConstante";
import { MotifDelivrance } from "../../../../../../../model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "../../../../../../../model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "../../../../../../../model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../../../model/requete/IActionOption";
import {
  OptionCourrier,
  OptionsCourrier
} from "../../../../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { DoubleSubmitUtil } from "../../../../../../common/util/DoubleSubmitUtil";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../common/util/Utils";
import { IBoutonPopin } from "../../../../../../common/widget/popin/ConfirmationPopin";
import { SaisieCourrier } from "../../../apercuCourrier/contenu/modelForm/ISaisiePageModel";
import { IChoixActionDelivranceProps } from "./ChoixAction";

const ORDRE_OPTION_MAX = 900;
const MAX_TITULAIRE_DELIVRANCE_NAISSANCE_DECES = 1;
const MAX_TITULAIRE_DELIVRANCE_MARIAGE = 2;

export function getBoutonOK(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  listeActions: IActionOption[]
): IBoutonPopin[] {
  return [
    {
      label: getLibelle("OK"),
      action: () => {
        setMessagesBloquant(undefined);
        resetDoubleSubmit(listeActions);
      }
    }
  ];
}

export function getBoutonsOuiNon(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  listeActions: IActionOption[]
): IBoutonPopin[] {
  return [
    {
      label: getLibelle("Oui"),
      action: () => {
        setMessagesBloquant([]);
      }
    },
    {
      label: getLibelle("Non"),
      action: () => {
        setMessagesBloquant(undefined);
        resetDoubleSubmit(listeActions);
      }
    }
  ];
}

const INDEX_ACTION_COPIE_INTEGRALE = 0;
const INDEX_ACTION_EXTRAIT_AVEC_FILIATION = 1;
const INDEX_ACTION_EXTRAIT_SANS_FILIATION = 2;
const INDEX_ACTION_EXTRAIT_PLURILINGUE = 3;
const INDEX_ACTION_COPIE_ARCHIVE = 4;

export function getOptionsMenuDelivrer(
  refDelivrerOptions0: React.MutableRefObject<null>
): IActionOption[] {
  return [
    {
      value: INDEX_ACTION_COPIE_INTEGRALE,
      label: getLibelle("Copie intégrale"),
      sousTypes: [
        SousTypeDelivrance.RDC,
        SousTypeDelivrance.RDD,
        SousTypeDelivrance.RDDP
      ],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE
    },
    {
      value: INDEX_ACTION_EXTRAIT_AVEC_FILIATION,
      label: getLibelle("Extrait avec filiation"),
      sousTypes: [
        SousTypeDelivrance.RDC,
        SousTypeDelivrance.RDD,
        SousTypeDelivrance.RDDP
      ],
      ref: refDelivrerOptions0,
      // attribut supplémentaire pour trouver facilement le choix de délivrance en fonction de l'index du menu sélectionné
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    },
    {
      value: INDEX_ACTION_EXTRAIT_SANS_FILIATION,
      label: getLibelle("Extrait sans filiation"),
      sousTypes: [
        SousTypeDelivrance.RDC,
        SousTypeDelivrance.RDD,
        SousTypeDelivrance.RDDP
      ],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
    },
    {
      value: INDEX_ACTION_EXTRAIT_PLURILINGUE,
      label: getLibelle("Extrait plurilingue"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE
    },
    {
      value: INDEX_ACTION_COPIE_ARCHIVE,
      label: getLibelle("Copie archive (118)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE
    }
  ];
}

export function unActeEtUnSeulSelectionne(
  listeActes?: any[],
  listeInscriptions?: any[]
) {
  return listeActes?.length === 1 && listeInscriptions?.length === 0;
}

export function estChoixExtraitAvecOuSansFiliation(indexMenu: number) {
  return (
    indexMenu === INDEX_ACTION_EXTRAIT_AVEC_FILIATION ||
    indexMenu === INDEX_ACTION_EXTRAIT_SANS_FILIATION
  );
}

export function estChoixExtraitAvecOuSansFiliationOuPlurilingue(
  indexMenu: number
) {
  return (
    indexMenu === INDEX_ACTION_EXTRAIT_AVEC_FILIATION ||
    indexMenu === INDEX_ACTION_EXTRAIT_SANS_FILIATION ||
    indexMenu === INDEX_ACTION_EXTRAIT_PLURILINGUE
  );
}

export function estNombreTitulairesIncoherent(
  natureActe?: string,
  nombreTitulaires?: number
) {
  if (nombreTitulaires) {
    return (
      (NatureActeRequete.NAISSANCE.libelle === natureActe &&
        nombreTitulaires > MAX_TITULAIRE_DELIVRANCE_NAISSANCE_DECES) ||
      (NatureActeRequete.DECES.libelle === natureActe &&
        nombreTitulaires > MAX_TITULAIRE_DELIVRANCE_NAISSANCE_DECES) ||
      (NatureActeRequete.MARIAGE.libelle === natureActe &&
        nombreTitulaires > MAX_TITULAIRE_DELIVRANCE_MARIAGE)
    );
  }
  return false;
}

export function nonVide(messages?: string[]) {
  return messages !== undefined && messages.length > 0;
}

export const sousTypeCreationCourrierAutomatique = (type: SousTypeDelivrance) =>
  type === SousTypeDelivrance.RDD || type === SousTypeDelivrance.RDDP;

export const compositionCourrierAutomatique = (
  choixDelivrance: ChoixDelivrance,
  optionsChoisies: OptionsCourrier,
  requete: IRequeteDelivrance
): { saisieCourrier: SaisieCourrier; optionsChoisies: OptionCourrier[] } => {
  return {
    saisieCourrier: {
      choixCourrier: {
        delivrance: ChoixDelivrance.getKeyForNom(
          ChoixDelivrance,
          choixDelivrance.nom
        ),
        courrier: getIdCourrierAuto(choixDelivrance)
      },
      texteLibre: { texte: "" },
      requerant: {
        requerantLigne1: requete?.requerant.prenom,
        requerantLigne2: requete?.requerant.nomFamille
      },
      requete: {
        motif: MotifDelivrance.getKey(getValeurOuVide(requete?.motif)),
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

export const getIdCourrierAuto = (choixDelivrance?: ChoixDelivrance) => {
  let res = "";
  if (choixDelivrance) {
    if (choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE) {
      res = DocumentDelivrance.getKeyForCode(DELIVRANCE_ACTE_NON_ANTHENTIQUE);
    } else {
      res = DocumentDelivrance.getKeyForCode(DELIVRANCE_ACTE);
    }
  }
  return res;
};

export function controleCoherenceUnActeSelectionne(
  indexMenu: number,
  listeActes: IResultatRMCActe[] | undefined,
  props: React.PropsWithChildren<IChoixActionDelivranceProps>,
  setBoutonsPopin: React.Dispatch<
    React.SetStateAction<IBoutonPopin[] | undefined>
  >,
  boutonOK: IBoutonPopin[],
  boutonsOuiNon: IBoutonPopin[]
) {
  const requeteDelivrance = props.requete;
  const nbrTitulaire = listeActes?.[0]
    ? props.nbrTitulairesActe?.get(listeActes?.[0].idActe)
    : undefined;
  let message: string[] = [];
  if (listeActes?.[0]?.type === TypeActe.INCONNU.libelle) {
    message = [
      getLibelle(
        "Il n'y a pas de corps disponible pour l'acte sélectionné, sa délivrance n'est pas possible à ce jour."
      )
    ];
    setBoutonsPopin(boutonOK);
  } else if (
    estChoixExtraitAvecOuSansFiliationOuPlurilingue(indexMenu) &&
    estNombreTitulairesIncoherent(listeActes?.[0]?.nature, nbrTitulaire)
  ) {
    message = [
      getLibelle(
        "Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples."
      )
    ];
    setBoutonsPopin(boutonOK);
  } else if (
    estChoixExtraitAvecOuSansFiliation(indexMenu) &&
    listeActes?.[0]?.nature === NatureActeRequete.DECES.libelle
  ) {
    message = [
      getLibelle(
        "Pas de délivrance d'extrait avec ou sans filiation pour un acte de décès."
      )
    ];
    setBoutonsPopin(boutonOK);
  } else if (
    listeActes?.[0]?.nature !==
    requeteDelivrance?.evenement?.natureActe?.libelle
  ) {
    message = [
      getLibelle(
        "La nature de l'acte sélectionné ne correspond pas à la nature de l'acte demandé. Voulez-vous continuer ?"
      )
    ];
    setBoutonsPopin(boutonsOuiNon);
  }
  return message;
}
export function controleCoherenceEntreDocumentSelectionneEtActionDelivrer(
  props: React.PropsWithChildren<IChoixActionDelivranceProps>,
  listeActes: IResultatRMCActe[] | undefined,
  listeInscriptions: IResultatRMCInscription[] | undefined,
  indexMenu: number,
  setBoutonsPopin: React.Dispatch<
    React.SetStateAction<IBoutonPopin[] | undefined>
  >,
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  listeActions: IActionOption[]
) {
  const boutonOK: IBoutonPopin[] = getBoutonOK(
    setMessagesBloquant,
    listeActions
  );
  const boutonsOuiNon: IBoutonPopin[] = getBoutonsOuiNon(
    setMessagesBloquant,
    listeActions
  );

  const sousType = props.requete?.sousType?.nom;
  let message: string[] = [];
  if (
    sousType === SousTypeDelivrance.RDC.nom ||
    sousType === SousTypeDelivrance.RDD.nom ||
    sousType === SousTypeDelivrance.RDDP.nom
  ) {
    if (unActeEtUnSeulSelectionne(listeActes, listeInscriptions)) {
      message = controleCoherenceUnActeSelectionne(
        indexMenu,
        listeActes,
        props,
        setBoutonsPopin,
        boutonOK,
        boutonsOuiNon
      );
    } else {
      message = [
        getLibelle("Veuillez sélectionner un et un seul acte à délivrer.")
      ];
      setBoutonsPopin(boutonOK);
    }
  }
  setMessagesBloquant(message);
}

function resetDoubleSubmit(listeActions: IActionOption[]) {
  listeActions.forEach(el => {
    DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
  });
}
