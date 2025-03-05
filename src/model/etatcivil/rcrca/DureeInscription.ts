import DateUtils, { TDateArrayDTO } from "@util/DateUtils";

export interface IDureeInscriptionDTO {
  nombreDuree?: number;
  uniteDuree?: string;
  dateFinDeMesure?: TDateArrayDTO;
}

export class DureeInscription {
  private constructor(
    public readonly nombreDuree?: number,
    public readonly uniteDuree?: string,
    public readonly dateFinDeMesure?: number
  ) {}

  public static readonly depuisDto = (dureeInscription: IDureeInscriptionDTO): DureeInscription => {
    return new DureeInscription(
      dureeInscription.nombreDuree,
      dureeInscription.uniteDuree,
      dureeInscription.dateFinDeMesure ? DateUtils.getTimestampFromDateArrayDto(dureeInscription.dateFinDeMesure) : undefined
    );
  };

  get valeurAvecUnite() {
    if (this.uniteDuree) {
      return `${this.nombreDuree} ${this.uniteDuree}`;
    }
    return "";
  }
}
