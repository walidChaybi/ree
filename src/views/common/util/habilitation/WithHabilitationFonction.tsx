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
  console.log("WithHabilitationFonction", storeRece.utilisateurCourant);
  if (storeRece.utilisateurCourant) {
    const habilitationsPourLaFonction = getHabilitationsPourLaFonction(
      composantId ? composantId : functionToWrap.name,

      habilitationsDescription
    );
    if (habilitationsPourLaFonction.length > 0) {
      console.log("habilitationsPourLaFonction", habilitationsPourLaFonction);
      const valeurDeRetour = getValeurSuivantHabilitation(
        habilitationsPourLaFonction,
        storeRece.utilisateurCourant
      );
      console.log("valeurDeRetour", valeurDeRetour);
      if (valeurDeRetour !== null) {
        console.log("valeurDeRetour !");
        return valeurDeRetour;
      }
    }
  }
  console.log("functionToWrap !", functionToWrap, params);
  return functionToWrap(...params);
};

export default WithHabilitationFonction;

function getValeurSuivantHabilitation(
  habilitationsPourLaFonction: IHabiliationDescription[],
  utilisateur: IOfficierSSOApi
) {
  console.log("===WithHabilitationFonction");
  let valeur = null;
  habilitationsPourLaFonction.forEach(habDesc => {
    console.log("habDesc", habDesc);
    // A complèter avec les différents cas si besoin
    if (
      habDesc.uniquementLeDroit &&
      habDesc.comportementSiAutorise &&
      officierHabiliterUniquementPourLeDroit(
        utilisateur,
        habDesc.uniquementLeDroit
      )
    ) {
      console.log(
        "habDesc.comportementSiAutorise.retourne",
        habDesc.comportementSiAutorise.retourne
      );
      valeur = habDesc.comportementSiAutorise.retourne;
    }
  });
  return valeur;
}
