import { IEnregistrerAnalyseMarginaleEtMentionDto } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { MiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IAnalyseMarginaleMiseAJour, IMentionMiseAJour } from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import SchemaValidation from "../../../utils/SchemaValidation";
import { TObjetFormulaire } from "../commun/ObjetFormulaire";

export default class MiseAJourForm {
  private constructor(
    public readonly mentions: IMentionMiseAJour[],
    public readonly analyseMarginale: IAnalyseMarginaleMiseAJour
  ) {}

  static depuisFormulaire({ mentions, analyseMarginale }: { mentions: IMentionMiseAJour[]; analyseMarginale: IAnalyseMarginaleMiseAJour }) {
    return new MiseAJourForm(mentions, analyseMarginale);
  }
  static genererValeursDefautFormulaire(analyseMarginale: ITitulaireActe | IAnalyseMarginaleMiseAJour): MiseAJourForm {
    const prenoms = Array.isArray(analyseMarginale?.prenoms)
      ? analyseMarginale?.prenoms?.reduce(
          (prenoms: { [cle: string]: string }, prenom: string, index: number) => ({ ...prenoms, [`prenom${index + 1}`]: prenom }),
          {}
        )
      : analyseMarginale?.prenoms;

    return new MiseAJourForm([], {
      nom: analyseMarginale?.nom ?? "",
      nomSecable: Boolean(analyseMarginale?.nomPartie1 && analyseMarginale?.nomPartie2),
      nomPartie1: analyseMarginale?.nomPartie1 ?? "",
      nomPartie2: analyseMarginale?.nomPartie2 ?? "",
      prenoms: prenoms ?? {},
      motif: (analyseMarginale as IAnalyseMarginaleMiseAJour).motif ?? ""
    });
  }

  public versDto(idActe: string, analyseMarginaleModifiee: boolean): IEnregistrerAnalyseMarginaleEtMentionDto {
    return {
      idActe: idActe,
      mentionCreationList: this.mentions?.map((mention, index) => ({
        idTypeMention: mention.idTypeMention,
        numeroOrdre: index + 1,
        texteMention: mention.texte,
        evenement: MiseAJourForm.getEvenementMention(mention.donneesAideSaisie?.champs),
        estSaisieAssistee: Boolean(mention.donneesAideSaisie)
      })),
      analyseMarginale: analyseMarginaleModifiee ? MiseAJourAnalyseMarginaleValeursForm.versDto(this.analyseMarginale) : null
    } as IEnregistrerAnalyseMarginaleEtMentionDto;
  }

  static getSchemaValidation(afficherAnalyseMarginale: boolean) {
    return SchemaValidation.objet(
      afficherAnalyseMarginale
        ? {
            nom: SchemaValidation.nom(),
            motif: SchemaValidation.motif()
          }
        : {}
    );
  }

  static getEvenementMention(champs?: TObjetFormulaire) {
    if (!champs) return null;

    const cleEvenement = Object.keys(champs).find(cle => cle.includes("evenement"));

    return cleEvenement ? champs[cleEvenement] : null;
  }
}
