/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class NatureRc extends EnumWithLibelle {
  public static readonly CURATELLE_SIMPLE = new NatureRc("Curatelle simple");
  public static readonly CURATELLE_AMENAGEE = new NatureRc(
    "Curatelle aménagée"
  );
  public static readonly CURATELLE_RENFORCEE = new NatureRc(
    "Curatelle renforcée"
  );
  public static readonly CURATELLE_RENFORCEE_ASSISTANCE = new NatureRc(
    "Curatelle renforcée avec assistance pour les actes à la personne"
  );
  public static readonly HABILITATION_FAMILIALE_GENERALE = new NatureRc(
    "Habilitation familiale générale"
  );
  public static readonly PRESOMPTION_ABSENCE = new NatureRc(
    "Présomption d'absence"
  );
  public static readonly PRESOMPTION_ABSENCE_AVEC_DESIGNATION = new NatureRc(
    "Présomption d’absence avec désignation d’un représentant"
  );
  public static readonly RADIATION_DEMANDE_HOMOLOGATION = new NatureRc(
    "Radiation de demande d'homologation d'un changement de régime matrimonial"
  );
  public static readonly DEMANDE_HOMOLOGATION_UN_CHANGEMENT = new NatureRc(
    "Demande d'homologation d’un changement de régime matrimonial"
  );
  public static readonly DEMANDE_JUDICIAIRE_EN_SEPARATION_BIENS = new NatureRc(
    "Demande judiciaire en séparation de biens"
  );
  public static readonly TUTELLE_AMENAGEE = new NatureRc("Tutelle aménagée");
  public static readonly TUTELLE_AUX_BIENS = new NatureRc("Tutelle aux biens");
  public static readonly TUTELLE_AUX_BIENS_AVEC_ASSISTANCE = new NatureRc(
    "Tutelle aux biens et à la personne (avec assistance)"
  );
  public static readonly TUTELLE_AUX_BIENS_AVEC_REPRESENTATION = new NatureRc(
    "Tutelle aux biens et à la personne (avec représentation) "
  );
  public static readonly HABILITATION_JUDICIAIRE_ENTRE_EPOUX_217CC = new NatureRc(
    "Habilitation judiciaire entre époux (217cc)"
  );
  public static readonly HABILITATION_ENTRE_EPOUX_219CC = new NatureRc(
    "Habilitation entre époux (219cc)"
  );
  public static readonly SAUVEGARDE_JUSTICE_433CC = new NatureRc(
    "Sauvegarde justice (433cc)"
  );
  public static readonly MESURE_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE = new NatureRc(
    "Mesure d’accompagnement social personnalisé (L271-1 casf)"
  );
  public static readonly MESURE_ACCOMPAGNEMENT_JUDICIAIRE = new NatureRc(
    "Mesure d’accompagnement judiciaire (495cc) "
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRc);
  }
}
