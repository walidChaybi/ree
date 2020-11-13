import { Droit } from "./Droit";
import { IOfficierSSOApi } from "../views/core/login/LoginHook";

export interface IDroit {
  idDroit: string;
  nom: string;
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
export function officierHabiliter(
  officier: IOfficierSSOApi,
  droit: Droit
): IDroit | undefined {
  let droitTrouve: IDroit | undefined = undefined;
  officier.habilitations.forEach(
    h =>
      (droitTrouve = droitTrouve || h.profil.droits.find(d => d.nom === droit))
  );
  return droitTrouve;
}
