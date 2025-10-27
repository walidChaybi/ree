import { IMiseAJourAnalyseMarginaleDto } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { IAnalyseMarginaleMiseAJour } from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import SchemaValidation from "../../../utils/SchemaValidation";
import { PrenomsForm } from "../commun/PrenomsForm";

const AnalyseMarginaleForm = {
  genererValeursDefautFormulaire: (titulaires: TitulaireActe[], motif: string | null): IAnalyseMarginaleMiseAJour => ({
    titulaires: titulaires.map(titulaire => {
      return {
        nom: titulaire.nom ?? "",
        nomSecable: Boolean(titulaire.nomPartie1 && titulaire.nomPartie2),
        nomPartie1: titulaire.nomPartie1 ?? "",
        nomPartie2: titulaire.nomPartie2 ?? "",
        prenoms: PrenomsForm.depuisStringDto(titulaire.prenoms) ?? PrenomsForm.valeursInitiales()
      };
    }),

    motif: motif ?? ""
  }),

  versDto: (valeurs: IAnalyseMarginaleMiseAJour | null): IMiseAJourAnalyseMarginaleDto => {
    if (!valeurs) return {} as IMiseAJourAnalyseMarginaleDto;

    return {
      motifModification: valeurs.motif,
      titulaires: valeurs.titulaires.map((titulaire, i) => {
        return {
          ordre: i + 1,
          nom: titulaire.nom.trim(),
          prenoms: PrenomsForm.versPrenomsStringDto(titulaire.prenoms),
          nomPartie1: titulaire.nomSecable ? titulaire.nomPartie1.trim() : null,
          nomPartie2: titulaire.nomSecable ? titulaire.nomPartie2.trim() : null
        };
      })
    };
  },

  schemaValidation: () => {
    return SchemaValidation.objet({
      titulaires: SchemaValidation.tableau({
        nom: SchemaValidation.texte({ obligatoire: true })
      }),
      motif: SchemaValidation.texte({ obligatoire: true })
    });
  }
};

export default AnalyseMarginaleForm;
