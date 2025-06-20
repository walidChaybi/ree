import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";

interface IMiseAJourAnalyseMarginaleValeursForm {
  analyseMarginale: {
    nom: string;
    prenoms: { [cle: string]: string };
    motif: string;
  };
  nomSecable: {
    secable: boolean;
    nomPartie1: string;
    nomPartie2: string;
  };
}

interface IMentionsDetail {
  idMentionNiveauUn: string;
  idMentionNiveauDeux: string;
  idMentionNiveauTrois?: string;
}

interface IMajMention {
  texte: string;
  typeMention: IMentionsDetail;
  numeroOrdre: number;
}

export const MiseAJourAnalyseMarginaleValeursForm = {
  valeurParDefaut: (
    defaut: IDerniereAnalyseMarginalResultat | undefined,
    listeMentions?: IMajMention[]
  ): IMiseAJourAnalyseMarginaleValeursForm => {
    const nomPartie1 = defaut?.titulaire.nomPartie1 ?? "";
    const nomPartie2 = defaut?.titulaire.nomPartie2 ?? "";
    const secable = Boolean(nomPartie1 && nomPartie2);
    const prenoms = defaut?.titulaire.prenoms ?? [];
    const motif = listeMentions?.length ? (defaut?.motif ?? getMotif(listeMentions, defaut) ?? "") : "";

    return {
      analyseMarginale: {
        nom: defaut?.titulaire.nom ?? "",
        prenoms: prenoms.reduce(
          (prenoms, prenom) => ({
            ...prenoms,
            [`prenom${prenom.numeroOrdre}`]: prenom.prenom
          }),
          {}
        ),
        motif: motif
      },
      nomSecable: {
        secable: secable,
        nomPartie1: secable ? nomPartie1 : "",
        nomPartie2: secable ? nomPartie2 : ""
      }
    };
  }
} as const;

const getMotif = (listeMentions: IMajMention[], derniereAnalyseMarginaleEnregistree?: IDerniereAnalyseMarginalResultat) => {
  const listeMentionsAffecteAnalyseMarginal: IMajMention[] = listeMentions.filter(mention => {
    return TypeMention.getTypeMentionById(
      mention.typeMention.idMentionNiveauTrois || mention.typeMention.idMentionNiveauDeux || mention.typeMention.idMentionNiveauUn
    )?.affecteAnalyseMarginale;
  });

  const typeMention = listeMentionsAffecteAnalyseMarginal[0]?.typeMention;
  const codeTypeMention = TypeMention.getTypeMentionById(
    typeMention?.idMentionNiveauTrois || typeMention?.idMentionNiveauDeux || typeMention?.idMentionNiveauUn
  )
    ?.libelle.trim()
    .split(" ")[0];

  return derniereAnalyseMarginaleEnregistree && listeMentionsAffecteAnalyseMarginal.length === 1
    ? derniereAnalyseMarginaleEnregistree.estValide
      ? `Suite à apposition de mention ${codeTypeMention}`
      : derniereAnalyseMarginaleEnregistree?.motif
    : "";
};
