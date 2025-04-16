import { IEnregistrerAnalyseMarginaleEtMentionDto } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { MiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { IEvenementMention } from "@hook/acte/EnregistrerMentionsApiHook";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IAnalyseMarginaleMiseAJour, IMentionMiseAJour } from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import SchemaValidation from "../../../utils/SchemaValidation";
import { TObjetFormulaire, TValeurFormulaire } from "../commun/ObjetFormulaire";
import { PrenomsForm } from "../commun/PrenomsForm";

export default class MiseAJourForm {
  private constructor(
    public readonly mentions: IMentionMiseAJour[],
    public readonly analyseMarginale: IAnalyseMarginaleMiseAJour
  ) {}

  public static depuisFormulaire({
    mentions,
    analyseMarginale
  }: {
    mentions: IMentionMiseAJour[];
    analyseMarginale: IAnalyseMarginaleMiseAJour;
  }) {
    return new MiseAJourForm(mentions, analyseMarginale);
  }

  public static genererValeursDefautFormulaire(analyseMarginale: ITitulaireActe | IAnalyseMarginaleMiseAJour): MiseAJourForm {
    const prenoms = Array.isArray(analyseMarginale.prenoms)
      ? PrenomsForm.depuisStringDto(analyseMarginale.prenoms)
      : analyseMarginale.prenoms;

    return new MiseAJourForm([], {
      nom: analyseMarginale.nom ?? "",
      nomSecable: Boolean(analyseMarginale.nomPartie1 && analyseMarginale.nomPartie2),
      nomPartie1: analyseMarginale.nomPartie1 ?? "",
      nomPartie2: analyseMarginale.nomPartie2 ?? "",
      prenoms: prenoms ?? PrenomsForm.valeursInitiales(),
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

  public static getSchemaValidation(afficherAnalyseMarginale: boolean) {
    return SchemaValidation.objet(
      afficherAnalyseMarginale
        ? {
            nom: SchemaValidation.texte({ obligatoire: true }),
            motif: SchemaValidation.texte({ obligatoire: true })
          }
        : {}
    );
  }

  private static getEvenementMention(champs?: TObjetFormulaire): IEvenementMention | undefined {
    const champEvenement = Object.entries(champs ?? {}).find(([cle]) => cle.includes("evenement"))?.[1] as TObjetFormulaire;

    if (!Object.keys(champEvenement ?? {}).length) return undefined;

    const estDate = (valeur: TValeurFormulaire): valeur is { jour: string; mois: string; annee: string } =>
      Object.keys(valeur ?? {}).includes("annee");

    return Object.entries(champEvenement).reduce(
      (evenement: IEvenementMention, [cleEvenement, valeurEvenement]) => {
        if (valeurEvenement) {
          switch (true) {
            case valeurEvenement === "France":
              evenement.pays = "France";
              break;

            case !evenement.pays && cleEvenement.includes("pays"):
              evenement.pays = (valeurEvenement as string) || null;
              break;

            case !evenement.ville && cleEvenement.includes("ville"):
              evenement.ville = (valeurEvenement as string) || null;
              break;

            case cleEvenement.includes("arrondissement"):
              evenement.arrondissement = (valeurEvenement as string) || null;
              break;

            case cleEvenement.includes("departement"):
              evenement.departement = (valeurEvenement as string) || null;
              break;

            case estDate(valeurEvenement):
              evenement.jour = ((valeurEvenement as TObjetFormulaire)["jour" as keyof TObjetFormulaire] as string) || null;
              evenement.mois = ((valeurEvenement as TObjetFormulaire)["mois" as keyof TObjetFormulaire] as string) || null;
              evenement.annee = ((valeurEvenement as TObjetFormulaire)["annee" as keyof TObjetFormulaire] as string) || null;
              break;
          }
        }

        return evenement;
      },
      {
        jour: null,
        mois: null,
        annee: null,
        ville: null,
        arrondissement: null,
        departement: null,
        pays: null
      }
    );
  }
}
