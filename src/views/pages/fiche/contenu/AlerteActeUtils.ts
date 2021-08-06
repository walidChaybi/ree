import { TypeAlerte } from "../../../../model/etatcivil/enum/TypeAlerte";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import {
  getDateFromTimestamp,
  getDateString
} from "../../../common/util/DateUtils";
import { triListeObjetsSurPropriete } from "../../../common/util/Utils";
import { getLibelle } from "../../../common/widget/Text";

export function mapDataAlertesActe(acte: any): IAlerte[] {
  const sortedAlertes = triListeObjetsSurPropriete(
    acte?.alerteActes,
    "dateCreation"
  )?.reverse();
  return sortedAlertes?.map((alerte: any, index: number) => {
    const type = TypeAlerte.getEnumFor(alerte?.typeAlerte?.id);
    return {
      famille: acte?.registre?.famille,
      pocopa: acte?.registre?.pocopa,
      annee: acte?.registre?.annee,
      support1: acte?.registre?.support1,
      support2: acte?.registre?.support2,
      numeroActe: acte?.numero,
      numeroBisTer: acte?.numeroBisTer,
      description: `${type?.type} ${type?.libelle}`,
      complementDescription: alerte?.complementDescription,
      trigramme: alerte?.trigrammeUtilisateur,
      dateCreationStr: alerte?.dateCreation
        ? getDateString(getDateFromTimestamp(alerte?.dateCreation))
        : "",
      codeCouleur: TypeAlerte.getCodeCouleurAlerte(type?.type)
    } as IAlerte;
  });
}

export function toReferenceString(alerte: IAlerte): string {
  return (
    `${getLibelle("Référence :")} ${alerte?.famille}.` +
    `${alerte?.pocopa}.${alerte?.annee}.` +
    `${alerte?.support1}.${alerte?.support2}.` +
    `${alerte?.numeroActe}.${alerte?.numeroBisTer} - ` +
    `${alerte?.description} - ${alerte?.trigramme} - ${alerte?.dateCreationStr}`
  );
}
