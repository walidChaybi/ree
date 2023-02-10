import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { getLibelle } from "@util/Utils";
import { SaisieRequeteRDC } from "../../../../../model/form/delivrance/ISaisirRDCPageForm";

/** Elements Popin "Confirmation" */
export function getMessagesPopin() {
  return [
    getLibelle(
      "Des données obligatoires du motif ou de l'événement sont manquantes."
    ),
    getLibelle("Voulez-vous continuer ?")
  ];
}

export function verifierDonneesObligatoires(values: SaisieRequeteRDC) {
  const motif = values.requete.motif;

  if (
    NatureActeRequete.NAISSANCE ===
    NatureActeRequete.getEnumFor(values.requete.natureActe)
  ) {
    const titulaire1 = values.titulaire1;
    return (
      titulaire1.naissance.dateEvenement.annee !== "" &&
      titulaire1.naissance.villeEvenement !== "" &&
      titulaire1.naissance.paysEvenement !== "" &&
      motif !== ""
    );
  }

  return (
    values.evenement.dateEvenement.annee !== "" &&
    values.evenement.villeEvenement !== "" &&
    values.evenement.paysEvenement !== "" &&
    motif !== ""
  );
}
