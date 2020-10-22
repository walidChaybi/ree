import { Droit } from "../../../model/Droit";
import { Profil } from "../../../model/Profil";
import { IOfficierSSOApi } from "../../core/login/LoginHook";

export interface IDroit {
  idDroit: string;
  nom: string;
}

export interface IProfil {
  idProfil: string;
  nom: string;
}

export interface IHabilitation {
  idHabilitation: string;
  droit?: IDroit;
  profil?: IProfil;
}

/** Savoir si l'officier connecté à le droit ou le profilt demandé en paramètre */
export function officierHabiliter(
  officier: IOfficierSSOApi,
  nomHabilitation: Droit | Profil
) {
  const habilitations = officier.habilitations;
  let autoriser = false;
  if (habilitations.length !== 0) {
    habilitations.forEach(h => {
      if (h.droit !== undefined && h.droit.nom === nomHabilitation) {
        autoriser = true;
      }
      if (h.profil !== undefined && h.profil.nom === nomHabilitation) {
        autoriser = true;
      }
    });
  }
  return autoriser;
}
