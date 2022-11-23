/* istanbul ignore file */
// FIXME : class à supprimer ?

import { officierHabiliterUniquementPourLeDroit } from "@model/agent/IOfficier";
import { storeRece } from "../storeRece";
import {
  habilitationsDescription,
  IHabiliationDescription,
  NomFonction
} from "./habilitationsDescription";

function getHabilitationsPourLaFonction(
  nomComposant: string,
  habsDesc: IHabiliationDescription[]
): IHabiliationDescription[] {
  return habsDesc.filter(
    habDesc => habDesc.nomComposant === nomComposant && habDesc.estFonction
  );
}

const WithHabilitationFonction = (
  functionToWrap: any,
  params: any[],
  composantId: NomFonction
) => {
  if (storeRece.utilisateurCourant) {
    const habilitationsPourLaFonction = getHabilitationsPourLaFonction(
      composantId,
      habilitationsDescription
    );
    if (habilitationsPourLaFonction.length > 0) {
      const valeurDeRetour = getValeurSuivantHabilitation(
        habilitationsPourLaFonction
      );
      if (valeurDeRetour !== null) {
        return valeurDeRetour;
      }
    }
  }
  return functionToWrap(...params);
};

export default WithHabilitationFonction;

function getValeurSuivantHabilitation(
  habilitationsPourLaFonction: IHabiliationDescription[]
) {
  let valeur = null;
  habilitationsPourLaFonction.forEach(habDesc => {
    // A complèter avec les différents cas si besoin

    if (
      habDesc.uniquementLeDroit &&
      habDesc.comportementSiAutorise &&
      officierHabiliterUniquementPourLeDroit(habDesc.uniquementLeDroit)
    ) {
      valeur = habDesc.comportementSiAutorise.retourne;
    }
  });
  return valeur;
}
