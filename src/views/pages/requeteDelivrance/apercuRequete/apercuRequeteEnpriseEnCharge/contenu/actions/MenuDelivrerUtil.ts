import React from "react";
import { ChoixDelivrance } from "../../../../../../../model/requete/enum/ChoixDelivrance";
import {
  DELIVRANCE_ACTE,
  DELIVRANCE_ACTE_NON_ANTHENTIQUE,
  DocumentDelivrance
} from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "../../../../../../../model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "../../../../../../../model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "../../../../../../../model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../../../model/requete/IActionOption";
import { OptionsCourrier } from "../../../../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../common/util/Utils";
import { IBoutonPopin } from "../../../../../../common/widget/popin/ConfirmationPopin";
import { SaisieCourrier } from "../../../apercuCourrier/contenu/modelForm/ISaisiePageModel";

const ORDRE_OPTION_MAX = 900;
const MAX_TITULAIRE_DELIVRANCE_NAISSANCE_DECES = 1;
const MAX_TITULAIRE_DELIVRANCE_MARIAGE = 2;

export function getBoutonOK(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  resetDoubleSubmit: Function
): IBoutonPopin[] {
  return [
    {
      label: getLibelle("OK"),
      action: () => {
        setMessagesBloquant(undefined);
        resetDoubleSubmit();
      }
    }
  ];
}

export function getBoutonsOuiNon(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  resetDoubleSubmit: Function
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
        resetDoubleSubmit();
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
  optionsChoisies?: OptionsCourrier,
  requete?: IRequeteDelivrance,
  acte?: IResultatRMCActe
) => {
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
      .sort((a, b) => a.ordreEdition - b.ordreEdition),
    requete,
    acte
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