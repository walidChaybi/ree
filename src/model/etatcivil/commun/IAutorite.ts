import { TypeAutorite } from "../TypeAutorite";
import { LieuxUtils } from "../../Lieux";
import {
  getValeurOuVide,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  formatPrenom,
  formatNom
} from "../../../views/common/util/Utils";
import { TypeJuridiction } from "../enum/TypeJuridiction";
import { TypePoste } from "../enum/TypePoste";

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
  typeJuridiction?: TypeJuridiction;
  // Poste
  typePoste?: TypePoste;
}

export const Autorite = {
  getVille(autorite?: IAutorite): string {
    return autorite
      ? premiereLettreEnMajusculeLeResteEnMinuscule(autorite.ville)
      : "";
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
    return autorite ? getValeurOuVide(autorite.numeroCrpcen) : "";
  }
};
