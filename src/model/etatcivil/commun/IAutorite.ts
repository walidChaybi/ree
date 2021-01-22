import { TypeAutorite } from "../TypeAutorite";
import { LieuxUtils } from "../../Lieux";
import { getValeurOuVide } from "../../../views/common/util/Utils";

export interface IAutorite {
  type: TypeAutorite;
  numeroDepartement: string;
  libelleDepartement: string;
  ville: string;
  region: string;
  pays: string;
  arrondissement: string;
  nomNotaire: string;
  prenomNotaire: string;
  numeroCrpcen: string;
  titreOnac?: string;
}

export const Autorite = {
  getVille(autorite?: IAutorite): string {
    if (!autorite) {
      return "";
    }
    return autorite.ville ? autorite.ville : "";
  },
  getDepartement(autorite?: IAutorite): string {
    return autorite
      ? LieuxUtils.getDepartement(autorite.libelleDepartement)
      : "";
  },
  getArrondissement(autorite?: IAutorite): string {
    return autorite
      ? LieuxUtils.getArrondissement(autorite.ville, autorite.arrondissement)
      : "";
  },
  getRegionDepartement(autorite?: IAutorite): string {
    return autorite
      ? LieuxUtils.getRegionDepartement(
          autorite.libelleDepartement,
          autorite.numeroDepartement,
          autorite.region
        )
      : "";
  },
  getPays(autorite?: IAutorite): string {
    return autorite ? getValeurOuVide(autorite.pays) : "";
  },
  isNotaire(autorite?: IAutorite): boolean {
    return autorite ? autorite.type === TypeAutorite.NOTAIRE : false;
  },
  getLibelleNotaire(autorite?: IAutorite): string {
    return autorite
      ? `Maître ${getValeurOuVide(autorite.prenomNotaire)} ${getValeurOuVide(
          autorite.nomNotaire
        )}`
      : "";
  },
  getNumeroCrpcen(autorite?: IAutorite): string {
    return autorite ? getValeurOuVide(autorite.numeroCrpcen) : "";
  }
};
