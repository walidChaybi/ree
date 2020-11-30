import { Droit } from "./Droit";
import { IOfficierSSOApi } from "./IOfficierSSOApi";

export interface IDroit {
  idDroit: string;
  nom: Droit;
}

export interface IProfil {
  idProfil: string;
  nom: string;
  droits: IDroit[];
}

export interface IHabilitation {
  idHabilitation: string;
  profil: IProfil;
}

/** Savoir si l'officier connecté à le droit ou le profilt demandé en paramètre */
export function officierHabiliterPourLeDroit(
  officier: IOfficierSSOApi,
  droit: Droit
) {
  let droitTrouve: IDroit | undefined;
  officier.habilitations.forEach(
    h =>
      (droitTrouve = droitTrouve || h.profil.droits.find(d => d.nom === droit))
  );
  return droitTrouve != null;
}

export function estOfficierHabiliterPourTousLesDroits(
  officier: IOfficierSSOApi,
  droits: Droit[]
) {
  if (!droits || droits.length === 0) {
    return true;
  }
  return droits.every(droit => officierHabiliterPourLeDroit(officier, droit));
}

export function estOfficierHabiliterPourUnDesDroits(
  officier: IOfficierSSOApi,
  droits: Droit[]
) {
  if (!droits || droits.length === 0) {
    return true;
  }
  return droits.some(droit => officierHabiliterPourLeDroit(officier, droit));
}
