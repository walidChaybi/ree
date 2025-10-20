import { UTILISATEUR_SYSTEME } from "@model/agent/Utilisateur";
import { champsObligatoiresDuDtoAbsents } from "@model/commun/dtoUtils";
import DateRECE from "../../utils/DateRECE";

interface IActionRequeteDto {
  id: string;
  numeroOrdre: number;
  libelle: string;
  dateAction: number;
  idUtilisateur: string;
  nomUtilisateur?: string;
  prenomUtilisateur?: string;
}

export class ActionRequete {
  private static readonly champsObligatoires: (keyof IActionRequeteDto)[] = ["id", "dateAction", "idUtilisateur", "libelle", "numeroOrdre"];

  private constructor(
    public readonly id: string,
    public readonly numeroOrdre: number,
    public readonly libelle: string,
    public readonly date: DateRECE,
    public readonly idUtilisateur: string,
    public readonly nomUtilisateur: string,
    public readonly prenomUtilisateur: string
  ) {}

  public get phraseHistorique(): string {
    const nomPrenom = `${this.nomUtilisateur} ${this.prenomUtilisateur}`.trim();
    const nomPrenomFormate = !nomPrenom || nomPrenom === UTILISATEUR_SYSTEME ? "" : ` - ${nomPrenom}`;

    return `${this.libelle} - ${this.date.format("JJ/MM/AAAA")}${nomPrenomFormate}`;
  }

  public static readonly depuisDto = (action: IActionRequeteDto): ActionRequete | null => {
    if (champsObligatoiresDuDtoAbsents("IActionDto", action, this.champsObligatoires)) return null;

    return new ActionRequete(
      action.id,
      action.numeroOrdre,
      action.libelle,
      DateRECE.depuisTimestamp(action.dateAction),
      action.idUtilisateur,
      action.nomUtilisateur?.toUpperCase() ?? "",
      action.prenomUtilisateur ?? ""
    );
  };

  public static depuisDtos(actions: IActionRequeteDto[]): ActionRequete[] {
    const actionsTriees = actions.sort((a, b) => b.numeroOrdre - a.numeroOrdre);
    return actionsTriees.map(this.depuisDto).filter((action): action is ActionRequete => action !== null);
  }
}
