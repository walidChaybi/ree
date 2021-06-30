import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";

export function estSeulementActeMariage(
  requete: TRequete,
  selected: Map<string, string> | undefined
): boolean {
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const sousType: string = (requete as IRequeteDelivrance)?.sousType?.nom;
    return (
      (SousTypeDelivrance.RDCSC.nom === sousType ||
        SousTypeDelivrance.RDCSD.nom === sousType) &&
      estSeulementActeMariageSelectionne(selected)
    );
  }
  return true;
}

function estSeulementActeMariageSelectionne(
  selected: Map<string, string> | undefined
): boolean {
  return (
    selected?.size === 1 &&
    selected?.values()?.next()?.value === NatureActe.MARIAGE.libelle
  );
}
