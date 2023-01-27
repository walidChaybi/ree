import { StatutRequete } from "@model/requete/enum/StatutRequete";

export const statutsRequetesCreation = [
  StatutRequete.PRISE_EN_CHARGE.nom,
  StatutRequete.A_TRAITER.nom,
  StatutRequete.PROJET_VALIDE.nom,
  StatutRequete.RETOUR_SDANF.nom,
  StatutRequete.A_SIGNER.nom,
  StatutRequete.EN_TRAITEMENT.nom
];

export const styleColonne = {
  width: "7.6em"
};
