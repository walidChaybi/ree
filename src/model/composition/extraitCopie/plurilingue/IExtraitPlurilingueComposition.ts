import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { IDateCompose } from "@util/DateUtils";
import { IMentionsExtraitPlurilingue } from "./createur/ExtraitPlurilingueCommunComposition";

export interface IExtraitPlurilingueComposition {
  nature_acte: string;
  etat: string;
  reference_acte: string;
  service_etat_civil: string;
  titulaire_1?: ITitulaireComposition;
  titulaire_2?: ITitulaireComposition;
  date_acte?: IDateCompose;
  lieu_acte: string;
  autres_enonciations_acte: IMentionsExtraitPlurilingue;
  date_delivrance: IDateCompose;
  fonction_agent: string;
  signature_manuscrite: string;
  sceau_ministere: string;
  pas_de_bloc_signature: boolean;
  filigrane_incomplet: boolean;
  filigrane_erreur: boolean;
  code_CTV: string;
}
