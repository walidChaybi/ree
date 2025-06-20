import { IMiseAJourAnalyseMarginaleDto } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { IAnalyseMarginaleMiseAJour } from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import SchemaValidation from "../../../utils/SchemaValidation";
import { PrenomsForm } from "../commun/PrenomsForm";

const AnalyseMarginaleForm = {
  genererValeursDefautFormulaire: (analyseMarginale: any, motif: string | null): IAnalyseMarginaleMiseAJour => {
    const prenoms = Array.isArray(analyseMarginale.prenoms)
      ? PrenomsForm.depuisStringDto(analyseMarginale.prenoms)
      : analyseMarginale.prenoms;

    return {
      nom: analyseMarginale.nom ?? "",
      nomSecable: Boolean(analyseMarginale.nomPartie1 && analyseMarginale.nomPartie2),
      nomPartie1: analyseMarginale.nomPartie1 ?? "",
      nomPartie2: analyseMarginale.nomPartie2 ?? "",
      prenoms: prenoms ?? PrenomsForm.valeursInitiales(),
      motif: motif ?? ""
    };
  },

  versDto: (valeurs: IAnalyseMarginaleMiseAJour | null): IMiseAJourAnalyseMarginaleDto => {
    if (valeurs != null) {
      const secable = valeurs.nomSecable;
      const nomPartie1 = secable ? valeurs.nomPartie1.trim() : null;
      const nomPartie2 = secable ? valeurs.nomPartie2.trim() : null;
      const prenoms = PrenomsForm.versPrenomsStringDto(valeurs.prenoms);

      return {
        motifModification: valeurs.motif,
        titulaires: [
          {
            ordre: 1,
            nom: valeurs.nom.trim(),
            prenoms: prenoms,
            nomPartie1: nomPartie1,
            nomPartie2: nomPartie2
          }
        ]
      };
    } else return {} as IMiseAJourAnalyseMarginaleDto;
  },

  schemaValidation: () => {
    return SchemaValidation.objet({
      nom: SchemaValidation.texte({ obligatoire: true }),
      motif: SchemaValidation.texte({ obligatoire: true })
    });
  }
};

export default AnalyseMarginaleForm;
