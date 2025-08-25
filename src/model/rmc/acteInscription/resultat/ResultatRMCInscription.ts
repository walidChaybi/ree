import { EStatutRcRcaPacs } from "@model/etatcivil/enum/EStatutRcRcaPacs";
import { ETypeInscriptionRc } from "@model/etatcivil/enum/ETypeInscriptionRc";
import { ETypeInscriptionRca } from "@model/etatcivil/enum/ETypeInscriptionRca";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "../../../commun/dtoUtils";
import PersonneRMCInscription, { IPersonneRMCInscriptionDto } from "./PersonneRMCInscription";

export type IResultatRMCInscriptionDto<TTypeFiche extends keyof typeof ETypePacsRcRca> = {
  id: string;
  annee: string;
  numero: string;
  personne: IPersonneRMCInscriptionDto;
  statut: keyof typeof EStatutRcRcaPacs;
  categorie: TTypeFiche;
  idNature: TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "RC" | "RCA"> ? string : undefined;
  type: TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "PACS">
    ? undefined
    : TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "RC">
      ? keyof typeof ETypeInscriptionRc
      : TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "RCA">
        ? keyof typeof ETypeInscriptionRca
        : never;
};

export type TResultatRMCInscription = ResultatRMCInscription<"PACS"> | ResultatRMCInscription<"RCA"> | ResultatRMCInscription<"RC">;

export default class ResultatRMCInscription<TTypeFiche extends keyof typeof ETypePacsRcRca> {
  private static readonly champsObligatoires: (keyof (
    | IResultatRMCInscriptionDto<"PACS">
    | IResultatRMCInscriptionDto<"RCA">
    | IResultatRMCInscriptionDto<"RC">
  ))[] = ["id", "annee", "numero", "statut", "categorie"];
  private static readonly champsObligatoiresRc: (keyof IResultatRMCInscriptionDto<"RC">)[] = ["idNature", "type"];
  private static readonly champsObligatoiresRca: (keyof IResultatRMCInscriptionDto<"RCA">)[] = ["idNature", "type"];

  private constructor(
    public readonly id: string,
    public readonly numero: string,
    public readonly personne: PersonneRMCInscription,
    public readonly statut: keyof typeof EStatutRcRcaPacs,
    public readonly categorie: TTypeFiche,
    public readonly idNature: TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "RC" | "RCA"> ? string : undefined,
    public readonly type: TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "PACS">
      ? undefined
      : TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "RC">
        ? keyof typeof ETypeInscriptionRc
        : TTypeFiche extends Extract<keyof typeof ETypePacsRcRca, "RCA">
          ? keyof typeof ETypeInscriptionRca
          : never
  ) {}

  public static readonly depuisDto = <TTypeFiche extends keyof typeof ETypePacsRcRca>(
    rcRcaPacs: IResultatRMCInscriptionDto<TTypeFiche>
  ): ResultatRMCInscription<TTypeFiche> | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("IResultatRMCInscriptionDto", rcRcaPacs, this.champsObligatoires):
      case rcRcaPacs.categorie === "RC" &&
        champsObligatoiresDuDtoAbsents("IResultatRMCInscriptionDto", rcRcaPacs, this.champsObligatoiresRc):
      case rcRcaPacs.categorie === "RCA" &&
        champsObligatoiresDuDtoAbsents("IResultatRMCInscriptionDto", rcRcaPacs, this.champsObligatoiresRca):
        return null;

      case rcRcaPacs.categorie === "PACS" && Boolean(rcRcaPacs.idNature):
        console.error(`L'idNature d'un IResultatRMCInscriptionDto<"PACS"> est défini alors qu'il ne devrait pas.`);
        return null;
      case rcRcaPacs.categorie === "PACS" && Boolean(rcRcaPacs.type):
        console.error(`Le type d'un IResultatRMCInscriptionDto<"PACS"> est défini alors qu'il ne devrait pas.`);
        return null;

      case valeurDtoAbsenteDansEnum("IResultatRMCInscriptionDto", rcRcaPacs, "statut", EStatutRcRcaPacs):
      case valeurDtoAbsenteDansEnum("IResultatRMCInscriptionDto", rcRcaPacs, "categorie", ETypePacsRcRca):
      case rcRcaPacs.categorie === "RC" && valeurDtoAbsenteDansEnum("IResultatRMCInscriptionDto", rcRcaPacs, "type", ETypeInscriptionRc):
      case rcRcaPacs.categorie === "RCA" && valeurDtoAbsenteDansEnum("IResultatRMCInscriptionDto", rcRcaPacs, "type", ETypeInscriptionRca):
        return null;
    }

    const personne = PersonneRMCInscription.depuisDto(rcRcaPacs.personne);
    if (!personne) return null;

    return new ResultatRMCInscription<TTypeFiche>(
      rcRcaPacs.id,
      `${rcRcaPacs.categorie} - ${rcRcaPacs.annee} - ${rcRcaPacs.numero}`,
      personne,
      rcRcaPacs.statut,
      rcRcaPacs.categorie,
      rcRcaPacs.idNature,
      rcRcaPacs.type
    );
  };
}
