import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class NatureActeTranscription extends EnumWithLibelle {
  public static readonly NAISSANCE_MAJEUR = new NatureActeTranscription(
    "Naissance majeure"
  );
  public static readonly NAISSANCE_MINEUR = new NatureActeTranscription(
    "Naissance mineure"
  );
  public static readonly MARIAGE_AVEC_CCAM = new NatureActeTranscription(
    "Mariage avec ccam"
  );
  public static readonly MARIAGE_SANS_CCAM = new NatureActeTranscription(
    "Mariage sans ccam"
  );
  public static readonly DECES = new NatureActeTranscription("Décès");
  public static readonly RECONNAISSANCE = new NatureActeTranscription(
    "Reconnaissance"
  );
  public static readonly ENFANT_SANS_VIE = new NatureActeTranscription(
    "Enfant sans vie"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureActeTranscription);
  }

  public static getEnumFromLibelle(str?: string): NatureActeTranscription {
    return str
      ? EnumWithLibelle.getEnumFromLibelle(NatureActeTranscription, str)
      : undefined;
  }

  public static getKey(obj?: NatureActeTranscription) {
    return EnumWithLibelle.getKey(NatureActeTranscription, obj);
  }

  public static estNaissanceMajeure(
    natureActe?: NatureActeTranscription
  ): boolean {
    return natureActe === NatureActeTranscription.NAISSANCE_MAJEUR;
  }

  public static estNaissanceMineure(
    natureActe?: NatureActeTranscription
  ): boolean {
    return natureActe === NatureActeTranscription.NAISSANCE_MINEUR;
  }

  public static estNaissanceMineureOuMajeure(
    natureActe?: NatureActeTranscription
  ): boolean {
    return (
      this.estNaissanceMineure(natureActe) ||
      this.estNaissanceMajeure(natureActe)
    );
  }

  public static estMariageAvecCCAM(
    natureActe?: NatureActeTranscription
  ): boolean {
    return natureActe === NatureActeTranscription.MARIAGE_AVEC_CCAM;
  }

  public static estMariageSansCCAM(
    natureActe?: NatureActeTranscription
  ): boolean {
    return natureActe === NatureActeTranscription.MARIAGE_SANS_CCAM;
  }

  public static estMariage(natureActe?: NatureActeTranscription): boolean {
    return (
      this.estMariageAvecCCAM(natureActe) || this.estMariageSansCCAM(natureActe)
    );
  }
}
