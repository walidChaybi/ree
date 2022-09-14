import { Droit } from "./enum/Droit";
import { INomenclatureAgentApi } from "./INomenclatureAgentApi";
import { IPerimetre } from "./IPerimetre";

export interface IDroit {
  idDroit: string;
  nom: Droit;
}

export interface IProfil {
  idProfil: string;
  nom: INomenclatureAgentApi;
  droits: IDroit[];
}

export interface IHabilitation {
  idHabilitation: string;
  profil: IProfil;
  perimetre: IPerimetre;
}

export const Habilitation = {
  aDroitConsulterSurPerimetre(
    habiliation: IHabilitation,
    idTypeRegistre: string
  ) {
    return (
      habiliation.perimetre &&
      habiliation.perimetre.listeIdTypeRegistre &&
      habiliation.profil.droits.find(d => d.nom === Droit.CONSULTER) &&
      habiliation.perimetre.listeIdTypeRegistre.includes(idTypeRegistre)
    );
  },
  aDroitDelivrerEtDelivrerComedecSurPerimetre(
    habiliation: IHabilitation,
    idTypeRegistre: string
  ) {
    return (
      habiliation.perimetre &&
      habiliation.perimetre.listeIdTypeRegistre &&
      (habiliation.profil.droits.find(d => d.nom === Droit.DELIVRER) ||
        habiliation.profil.droits.find(
          d => d.nom === Droit.DELIVRER_COMEDEC
        )) &&
      habiliation.perimetre.listeIdTypeRegistre.includes(idTypeRegistre)
    );
  }
};