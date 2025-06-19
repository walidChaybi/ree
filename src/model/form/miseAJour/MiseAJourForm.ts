import {
  IEnregistrerAnalyseMarginaleEtMentionDto,
  IEvenementMention
} from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { MiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
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
        estSaisieAssistee: Boolean(Object.keys(mention.donneesAideSaisie?.champs ?? {}).length)
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

    const evenement = Object.entries(champEvenement).reduce<IEvenementMention>(
      (evenement: IEvenementMention, [cleEvenement, valeurEvenement]) => {
        if (!valeurEvenement) return evenement;

        if (valeurEvenement === "France") {
          return { ...evenement, pays: "France" };
        }

        if (!evenement.pays && cleEvenement.includes("pays")) {
          return { ...evenement, pays: valeurEvenement as string };
        }

        if (!evenement.ville && cleEvenement.includes("ville")) {
          return { ...evenement, ville: valeurEvenement as string };
        }

        if (cleEvenement.includes("arrondissement")) {
          return { ...evenement, arrondissement: valeurEvenement as string };
        }

        if (cleEvenement.includes("departement")) {
          return { ...evenement, departement: valeurEvenement as string };
        }

        if (estDate(valeurEvenement)) {
          return {
            ...evenement,
            jour: valeurEvenement.jour || null,
            mois: valeurEvenement.mois || null,
            annee: valeurEvenement.annee || null
          };
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

    return evenement.annee ? evenement : undefined;
  }
}
