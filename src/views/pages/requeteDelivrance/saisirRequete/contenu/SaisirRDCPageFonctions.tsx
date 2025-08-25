import { SaisieRequeteRDC } from "@model/form/delivrance/ISaisirRDCPageForm";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TYPE_LIEN_REQUERANT_POUR_TITULAIRE, TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { TypeRequerantRDC } from "@model/requete/enum/TypeRequerantRDC";
import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";

/** Elements Popin "Confirmation" */
export function getMessagesPopin() {
  return [getLibelle("Des données obligatoires du motif ou de l'événement sont manquantes."), getLibelle("Voulez-vous continuer ?")];
}

export function verifierDonneesObligatoires(values: SaisieRequeteRDC) {
  const motif = values.requete.motif;

  if (NatureActeRequete.estNaissance(NatureActeRequete.getEnumFor(values.requete.natureActe))) {
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

export const modificationChamps = (
  typeRequerant: string,
  setMandantVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setLienTitulaireVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setOptionsLienTitulaire: React.Dispatch<React.SetStateAction<Options>>
): void => {
  const typeRequerantRDC = TypeRequerantRDC.getEnumFor(typeRequerant);

  setMandantVisible(TypeRequerantRDC.estMandataire(typeRequerantRDC));

  setLienTitulaireVisible(
    !(TypeRequerantRDC.estInstitutionnel(typeRequerantRDC) || TypeRequerantRDC.estAutreProfessionnel(typeRequerantRDC))
  );

  if (TypeRequerantRDC.estTitulaire(typeRequerantRDC)) {
    setOptionsLienTitulaire(TypeLienRequerant.getListEnumsAsOptions(TYPE_LIEN_REQUERANT_POUR_TITULAIRE));
  } else if (TypeRequerantRDC.estParticulier(typeRequerantRDC)) {
    setOptionsLienTitulaire(TypeLienRequerant.getAllEnumsAsOptions());
  } else if (TypeRequerantRDC.estMandataire(typeRequerantRDC)) {
    setOptionsLienTitulaire(TypeLienMandant.getAllEnumsAsOptions());
  }
};
