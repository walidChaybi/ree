import { IMiseAJourAnalyseMarginaleDto } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { IAnalyseMarginaleMiseAJour } from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import SchemaValidation from "../../../utils/SchemaValidation";
import { PrenomsForm } from "../commun/PrenomsForm";

const AnalyseMarginaleForm = {
  genererValeursDefautFormulaire: (titulaire: TitulaireActe, motif: string | null): IAnalyseMarginaleMiseAJour => ({
    nom: titulaire.nom ?? "",
    nomSecable: Boolean(titulaire.nomPartie1 && titulaire.nomPartie2),
    nomPartie1: titulaire.nomPartie1 ?? "",
    nomPartie2: titulaire.nomPartie2 ?? "",
    prenoms: PrenomsForm.depuisStringDto(titulaire.prenoms) ?? PrenomsForm.valeursInitiales(),
    motif: motif ?? ""
  }),

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
