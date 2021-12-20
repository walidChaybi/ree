import React from "react";
import { ChoixDelivrance } from "../../../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../../../model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../../../model/requete/IActionOption";
import { getLibelle } from "../../../../../../common/util/Utils";
import { IBoutonPopin } from "../../../../../../common/widget/popin/ConfirmationPopin";

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
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE
    },
    {
      value: INDEX_ACTION_EXTRAIT_AVEC_FILIATION,
      label: getLibelle("Extrait avec filiation"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      // attribut supplémentaire pour trouver facilement le choix de délivrance en fonction de l'index du menu sélectionné
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    },
    {
      value: INDEX_ACTION_EXTRAIT_SANS_FILIATION,
      label: getLibelle("Extrait sans filiation"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
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

export function nonVide(messages?: string[]) {
  return messages !== undefined && messages.length > 0;
}
