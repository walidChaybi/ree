import { officierHabiliterUniquementPourLeDroit } from "../../../../model/Habilitation";
import { storeRece } from "../storeRece";
import {
  habilitationsDescription,
  IHabiliationDescription,
  NomFonction
} from "./habilitationsDescription";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";

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
  composantId?: NomFonction
) => {
  if (storeRece.utilisateurCourant) {
    const habilitationsPourLaFonction = getHabilitationsPourLaFonction(
      composantId ? composantId : functionToWrap.name,

      habilitationsDescription
    );
    if (habilitationsPourLaFonction.length > 0) {
      const valeurDeRetour = getValeurSuivantHabilitation(
        habilitationsPourLaFonction,
        storeRece.utilisateurCourant
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
  habilitationsPourLaFonction: IHabiliationDescription[],
  utilisateur: IOfficierSSOApi
) {
  let valeur = null;
  habilitationsPourLaFonction.forEach(habDesc => {
    // A complèter avec les différents cas si besoin
    if (
      habDesc.uniquementLeDroit &&
      habDesc.comportementSiAutorise &&
      officierHabiliterUniquementPourLeDroit(
        utilisateur,
        habDesc.uniquementLeDroit
      )
    ) {
      valeur = habDesc.comportementSiAutorise.retourne;
    }
  });
  return valeur;
}
