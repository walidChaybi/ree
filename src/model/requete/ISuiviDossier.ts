import { AvancementProjetActe } from "./enum/AvancementProjetActe";
import { NatureProjetEtablissement } from "./enum/NatureProjetEtablissement";
import { UnionActuelle } from "./enum/UnionActuelle";

export interface ISuiviDossier {
  idSuiviDossier: string;
  idActe?: string;
  dateEtablissement?: number;
  jourEvenement?: string;
  moisEvenement?: string;
  anneeEvenement: string;
  natureProjet?: NatureProjetEtablissement;
  referenceActe?: string;
  avancement: AvancementProjetActe;
  unionActuelle?: UnionActuelle;
}
