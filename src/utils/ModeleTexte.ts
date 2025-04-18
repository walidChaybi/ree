import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import DateRECE from "./DateRECE";
import Texte from "./Texte";

type TCondition = {
  si: string;
  alors: (string | TCondition)[];
  sinon: (string | TCondition)[];
};

interface IConditionEnCours {
  index: number;
  estSinon: boolean;
}

export enum EModeleTexteDocument {
  PROJET_NAISSANCE_MINEUR = "PROJET_NAISSANCE_MINEUR"
}

class ModeleTexte {
  private static [EModeleTexteDocument.PROJET_NAISSANCE_MINEUR]: string | null = null;

  private constructor(private readonly modele: string) {}

  public static creer(modele: string): ModeleTexte {
    return new ModeleTexte(modele);
  }

  public generer(valeurs: object) {
    const valeursFormulaire = ObjetFormulaire.depuisValeurs(valeurs);
    const texteParConditions =
      this.modele.match(/({{#if[^}]{0,200}}})|({{else}})|({{\/if}})|({{\/nl}})|({{#valeur[^}]{0,200}}})|[^{}]{0,500}/g) ?? [];

    const valeursEtConditions: (string | TCondition)[] = [];
    const conditionsEnCours: IConditionEnCours[] = [];

    const insererValeur = (valeur: string): string => {
      switch (true) {
        case valeur === "{{/nl}}":
          return "<br/>";
        case !valeur.startsWith("{{#valeur "):
          return valeur;
        default:
          break;
      }

      const [cle, ...partiesValeurDefaut] = valeur.replace(/({{#valeur |}})/g, "").split(" ");
      const [cleAttribut, variation] = cle.split("/");
      const valeurRenseignee = ObjetFormulaire.recupererValeur({ valeurs: valeursFormulaire, cleAttribut: cleAttribut });
      const valeurDefaut = `${partiesValeurDefaut.join(" ")}`.toUpperCase();

      switch (true) {
        case Array.isArray(valeurRenseignee):
          return valeurDefaut;
        case ObjetFormulaire.estDate(valeurRenseignee):
          return (
            (ObjetFormulaire.estDate(valeurRenseignee) &&
              DateRECE.depuisObjetDate(valeurRenseignee).format(variation === "sansPrefixe" ? "JJ mois AAAA" : "le/en JJ mois AAAA")) ||
            valeurDefaut
          );
        case ObjetFormulaire.estPrenoms(valeurRenseignee):
          return (ObjetFormulaire.estPrenoms(valeurRenseignee) && ModeleTexte.formaterPrenoms(valeurRenseignee)) || valeurDefaut;
        case valeurRenseignee && typeof valeurRenseignee !== "object":
          return `${valeurRenseignee}`;
        default:
          return valeurDefaut;
      }
    };

    const ajouterCondition = (
      tableauPourAjout: (string | TCondition)[],
      listeConditionsEnCours: IConditionEnCours[],
      condition: TCondition
    ) => {
      if (!listeConditionsEnCours.length) {
        const indexCondition = tableauPourAjout.push(condition) - 1;
        conditionsEnCours.push({ index: indexCondition, estSinon: false });

        return;
      }

      const conditionSuivante = listeConditionsEnCours.shift() as IConditionEnCours;
      ajouterCondition(
        (tableauPourAjout[conditionSuivante.index] as TCondition)?.[conditionSuivante.estSinon ? "sinon" : "alors"],
        listeConditionsEnCours,
        condition
      );
    };

    const ajouterValeurACondition = (
      tableauPourAjout: (string | TCondition)[],
      listeConditionsEnCours: IConditionEnCours[],
      valeur: string
    ) => {
      if (!listeConditionsEnCours.length) {
        tableauPourAjout.push(valeur);

        return;
      }

      const conditionSuivante = listeConditionsEnCours.shift() as IConditionEnCours;
      ajouterValeurACondition(
        (tableauPourAjout[conditionSuivante.index] as TCondition)?.[conditionSuivante.estSinon ? "sinon" : "alors"],
        listeConditionsEnCours,
        valeur
      );
    };

    texteParConditions.forEach(valeur => {
      switch (true) {
        case valeur.startsWith("{{#if "):
          ajouterCondition(valeursEtConditions, [...conditionsEnCours], {
            si: valeur.replace(/{{#if|}}/g, "").trim(),
            alors: [],
            sinon: []
          });
          break;
        case valeur === "{{else}}":
          conditionsEnCours[conditionsEnCours.length - 1].estSinon = true;
          break;
        case valeur === "{{/if}}":
          conditionsEnCours.pop();
          break;
        case Boolean(conditionsEnCours.length):
          ajouterValeurACondition(valeursEtConditions, [...conditionsEnCours], insererValeur(valeur));
          break;
        default:
          valeursEtConditions.push(insererValeur(valeur));
          break;
      }
    });

    const gererConditon = (condition: TCondition): string[] => {
      const conditionValide = condition.si
        .split("&")
        .filter(partieCondition => Boolean(partieCondition.trim()))
        .every(partieCondition => {
          const [cle, ...valeurAttendue] = partieCondition.trim().split(" ");
          const negation = cle.startsWith("!");
          const valeurSaisie = Texte.normalise(
            ObjetFormulaire.recupererValeurTexte({ valeurs: valeursFormulaire, cleAttribut: cle.replace("!", "") })
          );
          const comparaison = valeurAttendue.length
            ? valeurSaisie === Texte.normalise(valeurAttendue.join(" "))
            : Boolean(valeurSaisie) && valeurSaisie !== "false";

          return negation ? !comparaison : comparaison;
        });

      return (conditionValide ? condition.alors : condition.sinon).reduce(
        (valeursCondition: string[], valeur: string | TCondition) => [
          ...valeursCondition,
          ...(typeof valeur === "string" ? [valeur] : gererConditon(valeur))
        ],
        []
      );
    };

    return valeursEtConditions
      .reduce(
        (partiesTexte: string[], valeurOuCondition: string | TCondition) => [
          ...partiesTexte,
          ...(typeof valeurOuCondition === "string" ? [valeurOuCondition] : gererConditon(valeurOuCondition))
        ],
        []
      )
      .join("");
  }

  private static formaterPrenoms(prenomsForm: TPrenomsForm): string {
    return PrenomsForm.versPrenomsStringDto(prenomsForm).join(", ");
  }

  public static getModeleTexteDocument(typeDocument: EModeleTexteDocument): string | null {
    return ModeleTexte[typeDocument];
  }

  public static enregistrerModeleTexteDocument(typeDocument: EModeleTexteDocument, texte: string): void {
    ModeleTexte[typeDocument] = texte;
  }

  public static reinitialiserModelesTexte(): void {
    Object.values(EModeleTexteDocument).forEach(modeleTexteDocument => (ModeleTexte[modeleTexteDocument] = null));
  }
}

export default ModeleTexte;
