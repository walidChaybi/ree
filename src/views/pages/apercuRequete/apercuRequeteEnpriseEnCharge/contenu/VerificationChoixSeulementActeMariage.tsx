import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";

export function estSeulementActeMariage(
  requete: TRequete,
  acteSelected: IResultatRMCActe[] | undefined
): boolean {
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const sousType: string = (requete as IRequeteDelivrance)?.sousType?.nom;
    return (
      (SousTypeDelivrance.RDCSC.nom === sousType ||
        SousTypeDelivrance.RDCSD.nom === sousType) &&
      estSeulementActeMariageSelectionne(acteSelected)
    );
  }
  return true;
}

function estSeulementActeMariageSelectionne(
  acteSelected: IResultatRMCActe[] | undefined
): boolean {
  return (
    acteSelected?.length === 1 &&
    acteSelected[0].nature === NatureActe.MARIAGE.libelle
  );
}
