import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { ITitulaireRequeteCreation } from "../ITitulaireRequeteCreation";

export class QualiteFamille extends EnumWithLibelle {
  public static readonly POSTULANT = new QualiteFamille("Postulant");
  public static readonly PARENT = new QualiteFamille("Parent");
  public static readonly FRATRIE = new QualiteFamille("Fratrie");
  public static readonly ANCIEN_CONJOINT = new QualiteFamille(
    "Ancien conjoint"
  );
  public static readonly CONJOINT_ACTUEL = new QualiteFamille(
    "Conjoint actuel"
  );
  public static readonly ENFANT_MINEUR = new QualiteFamille("Enfant mineur");
  public static readonly ENFANT_MAJEUR = new QualiteFamille("Enfant majeur");
  public static readonly PARENT2ENFANT = new QualiteFamille("Parent 2 Enfant");

  public static getEnumFor(str: string): QualiteFamille {
    return EnumWithLibelle.getEnumFor(str, QualiteFamille);
  }

  public static getKey(obj: QualiteFamille) {
    return EnumWithLibelle.getKey(QualiteFamille, obj);
  }

  public static estParent(qualiteFamille?: QualiteFamille): boolean {
    return qualiteFamille === QualiteFamille.PARENT;
  }

  public static estPostulant(qualiteFamille?: QualiteFamille): boolean {
    return qualiteFamille === QualiteFamille.POSTULANT;
  }

  public static getEnumFromLibelle(libelle: string) {
    return EnumWithLibelle.getEnumFromLibelle(QualiteFamille, libelle);
  }

  public static getEnumFromTitulaire(
    titulaire: ITitulaireRequeteCreation
  ): QualiteFamille | undefined {
    if (titulaire.typeObjetTitulaire?.startsWith("POSTULANT")) {
      return QualiteFamille.POSTULANT;
    } else {
      return titulaire.qualite;
    }
  }

  public static afficheLibelleEnfantSiEstEnfant(
    qualiteFamille?: QualiteFamille
  ): string | undefined {
    if (
      qualiteFamille === QualiteFamille.ENFANT_MAJEUR ||
      qualiteFamille === QualiteFamille.ENFANT_MINEUR
    ) {
      return "Enfant";
    }
    return qualiteFamille?.libelle;
  }
}


