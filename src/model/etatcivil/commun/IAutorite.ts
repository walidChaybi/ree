import { formatNom, formatPrenom, getValeurOuVide } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { TypeAutorite, TypeAutoriteUtil } from "../enum/TypeAutorite";

// Regroupe les autorités commune, notaire, onac, juridiction, poste
export interface IAutorite {
  typeAutorite?: TypeAutorite;
  numeroDepartement?: string;
  libelleDepartement?: string;
  ville?: string;
  region?: string;
  pays?: string;
  arrondissement?: string;
  // Notaire
  nomNotaire?: string;
  prenomNotaire?: string;
  numeroCrpcen?: string;
  // ONAC
  titreOnac?: string;
  // Juridiction
  typeJuridiction?: string;
  // Poste
  typePoste?: string;
}

export const Autorite = {
  getVille(autorite?: IAutorite): string {
    return getValeurOuVide(autorite?.ville);
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
          autorite.ville,
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
    return autorite ? autorite.typeAutorite === TypeAutorite.NOTAIRE : false;
  },
  getLibelleNotaire(autorite?: IAutorite): string {
    return autorite
      ? `Maître ${formatPrenom(autorite.prenomNotaire)} ${formatNom(
          autorite.nomNotaire
        )}`
      : "";
  },
  getNumeroCrpcen(autorite?: IAutorite): string {
    return getValeurOuVide(autorite?.numeroCrpcen);
  },
  getTypeAutorite(autorite?: IAutorite): string {
    let res = "";
    if (autorite) {
      if (TypeAutoriteUtil.isJuridiction(autorite.typeAutorite)) {
        res = autorite.typeJuridiction ? autorite.typeJuridiction : "";
      } else if (TypeAutoriteUtil.isPoste(autorite.typeAutorite)) {
        res = autorite.typePoste ? autorite.typePoste : "";
      } else {
        res = TypeAutoriteUtil.getLibelle(autorite.typeAutorite);
      }
    }

    return res;
  }
};
