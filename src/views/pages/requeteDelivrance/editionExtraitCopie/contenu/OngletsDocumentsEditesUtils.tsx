import { IFicheActe } from "../../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";

export enum INDEX_PLUS {
  INDEX_EXTRAIT_PLURILINGUE,
  INDEX_EXTRAIT_SANS_FILIATION,
  INDEX_EXTRAIT_AVEC_FILIATION,
  INDEX_COPIE_INTEGRALE
}

export interface ItemListe {
  label: string;
  value: number;
}

export const listePlus = [
  { label: "Copie intégrale", value: INDEX_PLUS.INDEX_COPIE_INTEGRALE },
  {
    label: "Extrait avec filiation",
    value: INDEX_PLUS.INDEX_EXTRAIT_AVEC_FILIATION
  },
  {
    label: "Extrait sans filiation",
    value: INDEX_PLUS.INDEX_EXTRAIT_SANS_FILIATION
  },
  {
    label: "Extrait plurilingue",
    value: INDEX_PLUS.INDEX_EXTRAIT_PLURILINGUE
  }
];

export function genererListeAjoutComplementaire(documents: IDocumentReponse[], acte: IFicheActe): ItemListe[] {
  let listeMapped: ItemListe[] = [];
  const index = 0;
  if (acte.nature === NatureActe.DECES) {
    for (let i = index; i < documents.length; i++) {
      listeMapped = listePlus.filter((itemListe: ItemListe) => {
        return (
          documents[i].nom !== itemListe.label &&
          itemListe.label !== "Extrait avec filiation" &&
          itemListe.label !== "Extrait sans filiation"
        );
      });
    }
  } else {
    for (let i = index; i < documents.length; i++) {
      listeMapped = listePlus.filter((itemListe: ItemListe) => {
        return documents[i].nom !== itemListe.label;
      });
    }
  }

  return listeMapped;
}

export function getTypeDocument(indexChoix: number): string | undefined {
  let typeDocument: string | undefined;
  switch (indexChoix) {
    case INDEX_PLUS.INDEX_EXTRAIT_PLURILINGUE:
      typeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE);

      break;
    case INDEX_PLUS.INDEX_EXTRAIT_SANS_FILIATION:
      typeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION);

      break;
    case INDEX_PLUS.INDEX_EXTRAIT_AVEC_FILIATION:
      typeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION);

      break;
    case INDEX_PLUS.INDEX_COPIE_INTEGRALE:
      typeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE);
      break;
    default:
      typeDocument = "";
      break;
  }

  return typeDocument;
}
