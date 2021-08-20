import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";

export function estSeulementActeMariage(
  requete: TRequete,
  actes: IResultatRMCActe[] | undefined,
  inscriptions: IResultatRMCInscription[] | undefined
): boolean {
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const sousType: string = (requete as IRequeteDelivrance)?.sousType?.nom;
    return (
      (SousTypeDelivrance.RDCSC.nom === sousType ||
        SousTypeDelivrance.RDCSD.nom === sousType) &&
      (inscriptions?.length === undefined || inscriptions?.length === 0) &&
      estSeulementActeMariageSelectionne(actes)
    );
  }
  return true;
}

function estSeulementActeMariageSelectionne(
  actes: IResultatRMCActe[] | undefined
): boolean {
  return actes?.length === 1 && actes[0].nature === NatureActe.MARIAGE.libelle;
}
