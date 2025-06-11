import { INumeroRcRca } from "@model/form/commun/NumeroInscriptionRcRcaForm";
import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import DateRECE, { TFormatDate, TOptionPrefixe } from "./DateRECE";
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
  PROJET_NAISSANCE_MINEUR = "PROJET_NAISSANCE_MINEUR",
  PROJET_MARIAGE = "PROJET_MARIAGE",
  PROJET_DECES = "PROJET_DECES"
}

class ModeleTexte {
  private static modeles: Record<EModeleTexteDocument, string | null> = {
    [EModeleTexteDocument.PROJET_NAISSANCE_MINEUR]: null,
    [EModeleTexteDocument.PROJET_MARIAGE]: null,
    [EModeleTexteDocument.PROJET_DECES]: null
  };

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
      const [cleAttribut, ...variations] = cle.split("/");
      const valeurRenseignee = ObjetFormulaire.recupererValeur({ valeurs: valeursFormulaire, cleAttribut: cleAttribut });
      const valeurDefaut = `${partiesValeurDefaut.join(" ")}`.toUpperCase();

      const valeurFinale = (() => {
        switch (true) {
          case Array.isArray(valeurRenseignee):
            return null;
          case ObjetFormulaire.estDate(valeurRenseignee): {
            return (
              (ObjetFormulaire.estDate(valeurRenseignee) &&
                DateRECE.depuisObjetDate(valeurRenseignee).format(...ModeleTexte.optionFormatDate(variations))) ||
              null
            );
          }
          case ObjetFormulaire.estPrenoms(valeurRenseignee):
            return (ObjetFormulaire.estPrenoms(valeurRenseignee) && ModeleTexte.formaterPrenoms(valeurRenseignee)) || null;
          case ObjetFormulaire.estNumeroRcRca(valeurRenseignee):
            return (ObjetFormulaire.estNumeroRcRca(valeurRenseignee) && ModeleTexte.formaterNumeroRcRca(valeurRenseignee)) || null;
          case valeurRenseignee && typeof valeurRenseignee !== "object":
            return `${valeurRenseignee}`;
          default:
            return null;
        }
      })();

      return ModeleTexte.formatTexte(valeurFinale, valeurDefaut, variations);
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
      const estConditionOu = condition.si.includes("|");

      const conditionValide = condition.si
        .split(estConditionOu ? "|" : "&")
        .filter(partieCondition => Boolean(partieCondition.trim()))
        [estConditionOu ? "some" : "every"](partieCondition => {
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

  public genererParPage(valeurs: object, donneesPage: { tailleLigne: number; ligneParPage: number }) {
    const texteComplet = this.generer(valeurs);
    if (!texteComplet) return {};

    const texteParLigne: string[] = [];
    texteComplet.split("<br/>").forEach((partieTexte: string) => {
      if (!partieTexte || partieTexte.length < donneesPage.tailleLigne) {
        texteParLigne.push(partieTexte);

        return;
      }

      let nombreCaractereCourant = 0;
      let ligneCourante: string[] = [];
      partieTexte.split(" ").forEach((motPartieTexte: string) => {
        if (motPartieTexte.length >= donneesPage.tailleLigne) {
          if (ligneCourante.length) {
            texteParLigne.push(ligneCourante.join(" "));
            ligneCourante = [];
          }

          (motPartieTexte.match(new RegExp(`.{1,${donneesPage.tailleLigne}}`, "g")) ?? []) /** NOSONAR "exec" différent avec le flag G */
            .forEach(partieMotLong => {
              if (partieMotLong.length >= donneesPage.tailleLigne - 2) {
                texteParLigne.push(partieMotLong);

                return;
              }

              ligneCourante.push(partieMotLong);
              nombreCaractereCourant = partieMotLong.length + 1;
            });

          return;
        }

        if (nombreCaractereCourant + motPartieTexte.length > donneesPage.tailleLigne) {
          texteParLigne.push(ligneCourante.join(" "));
          ligneCourante = [motPartieTexte];
          nombreCaractereCourant = motPartieTexte.length + 1;

          return;
        }

        ligneCourante.push(motPartieTexte);
        nombreCaractereCourant += motPartieTexte.length + 1;
      });

      if (ligneCourante.length) {
        texteParLigne.push(ligneCourante.join(" "));
      }
    });

    let indexPageCourante = 1;
    return texteParLigne.reduce((parPage: { [cle: string]: string[] }, ligne: string) => {
      const clePage = `page-${indexPageCourante}`;
      if (!parPage[clePage]) {
        parPage[clePage] = [ligne];

        return parPage;
      }

      parPage[clePage].push(ligne);
      parPage[clePage].length >= donneesPage.ligneParPage && indexPageCourante++;

      return parPage;
    }, {});
  }

  /** Formateurs **/
  private static optionFormatDate(options: string[]): [TFormatDate, TOptionPrefixe] {
    return [
      options.includes("formatDateTouteLettre") ? "Date/heure Toutes Lettres" : "JJ mois AAAA",
      (() => {
        switch (true) {
          case options.includes("sansPrefixe"):
            return "SANS_PREFIXE";
          case options.includes("sansPrefixeLe"):
            return "SANS_PREFIXE_LE";
          case options.includes("sansPrefixeEn"):
            return "SANS_PREFIXE_EN";
          default:
            return "AVEC_PREFIXE";
        }
      })()
    ];
  }

  private static formatTexte(valeur: string | null, valeurDefaut: string, options: string[]) {
    if (!valeur) return valeurDefaut;
    return options.includes("premiereLettreMajuscule") ? Texte.premiereLettreMajuscule(valeur) : valeur;
  }

  private static formaterPrenoms(prenomsForm: TPrenomsForm): string {
    return PrenomsForm.versPrenomsStringDto(prenomsForm).join(", ");
  }

  private static formaterNumeroRcRca(numeroForm: INumeroRcRca): string {
    return numeroForm.anneeInscription && numeroForm.numero ? `${numeroForm.anneeInscription}-${numeroForm.numero}` : "";
  }

  /** Gestions modèles texte **/
  public static getModeleTexteDocument(typeDocument: EModeleTexteDocument): string | null {
    return ModeleTexte.modeles[typeDocument];
  }

  public static enregistrerModeleTexteDocument(typeDocument: EModeleTexteDocument, texte: string): void {
    ModeleTexte.modeles[typeDocument] = texte;
  }

  public static reinitialiserModelesTexte(): void {
    Object.values(EModeleTexteDocument).forEach(modeleTexteDocument => {
      ModeleTexte.modeles[modeleTexteDocument as EModeleTexteDocument] = null;
    });
  }
}

export default ModeleTexte;
