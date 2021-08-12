import { ICertificatRCAComposition } from "../../model/composition/ICertificatRCAComposition";
import { ICertificatSituationComposition } from "../../model/composition/ICertificatSituationComposition";
import { IReponseNegativeDemandeIncompleteComposition } from "../../model/composition/IReponseNegativeDemandeIncompleteComposition";
import { IReponseNegativeMariageComposition } from "../../model/composition/IReponseNegativeMariageComposition";
import { imagePngVideBase64 } from "./ImagePng";

export const reponseNegativeDemandeIncomplete: IReponseNegativeDemandeIncompleteComposition =
  {
    image_bloc_marques: imagePngVideBase64,
    nom_direction: {
      ligne1: "Direction",
      ligne2: "des Français à l'étranger",
      ligne3: "et de l’administration consulaire"
    },
    adresse_internet: "courrier.scec@diplomatie.gouv.fr",
    service_delivreur: "Service central d'état civil",
    adr_service_delivreur: {
      ligne4: "11, rue de la Maison Blanche",
      ligne6: "44941 Nantes CEDEX 9"
    },
    tel_service_delivreur: "01.41.86.42.47",
    ville_delivrance: "Nantes",
    cachet_signature:
      "P/le sous-directeur,chef du service central d’état civil",
    objet_courrier:
      "Certificat de situation relatif au registre des PACS des personnes de nationalité étrangère et nées à l’étranger, répertoire civil et répertoire civil annexe détenus par le service central d’état civil",
    identite_requerant: "Dubois Alice",
    adresse_requerant: {
      ligne2: "61 avenue Foch",
      ligne3: "Appartement 258",
      ligne4: "",
      ligne5: "",
      ligne6: "310 GL24",
      ligne7: "Saint-Germain-de-Tallevende-la-Lande-Vaumont"
    }
  };

export const reponseNegativeMariage: IReponseNegativeMariageComposition = {
  image_bloc_marques: imagePngVideBase64,
  nom_direction: {
    ligne1: "Direction",
    ligne2: "des Français à l'étranger",
    ligne3: "et de l’administration consulaire"
  },
  adresse_internet: "courrier.scec@diplomatie.gouv.fr",
  service_delivreur: "Service central d'état civil",
  adr_service_delivreur: {
    ligne4: "11, rue de la Maison Blanche",
    ligne6: "44941 Nantes CEDEX 9"
  },
  adresse_requerant: {
    ligne2: "61 avenue Foch",
    ligne3: "Appartement 258",
    ligne4: "",
    ligne5: "",
    ligne6: "310 GL24 Saint-Germain-de-Tallevende-la-Lande-Vaumont",
    ligne7: ""
  },
  tel_service_delivreur: "01.41.86.42.47",
  ville_delivrance: "Nantes",
  cachet_signature: "P/le sous-directeur,chef du service central d’état civil",
  objet_courrier: undefined,
  titre: undefined,
  numero_requete: "L5UG3Q",
  document_demande: "Certificat de situation au rca",
  identite_requerant: "DUBOIS Léonard",
  nom_titulaire1: "PRODESK",
  prenoms_titulaire1: "Elodie",
  nom_titulaire2: "DANIEL",
  prenoms_titulaire2: "Jack"
};

export const certificatSituation: ICertificatSituationComposition = {
  phrases_liees: "phrase",
  phrases_pieces_jointes: "phrasesPiecesJointes",
  decret1: "decret1",
  decret2: "decret2",
  adr_service_delivreur: {
    ligne4: "11, rue de la Maison Blanche",
    ligne6: "44941 Nantes CEDEX 9"
  },
  adresse_internet: "courrier.scec@diplomatie.gouv.fr",
  adresse_requerant: {
    ligne2: "l2",
    ligne3: "l3",
    ligne4: "l4",
    ligne5: "l5",
    ligne6: "123456 ville",
    ligne7: "pays"
  },
  annee_naissance: "2000",
  cachet_signature: "P/le sous-directeur,chef du service central d’état civil",
  identite_requerant: "nomFamille prenom",
  image_bloc_marques: imagePngVideBase64,
  jour_naissance: "1er",
  mois_naissance: "Février",
  nom: "nom",
  nom_direction: {
    ligne1: "Direction",
    ligne2: "des Français à l'étranger",
    ligne3: "et de l’administration consulaire"
  },
  pays_naissance: "paysNaissance",
  prenoms: "p1 p2",
  service_delivreur: "Service central d'état civil",
  sexe: "Masculin",
  tel_service_delivreur: "01.41.86.42.47",
  titre: "titre",
  ville_delivrance: "Nantes",
  ville_naissance: "villeNaissance"
} as ICertificatSituationComposition;

export const certificatRCA: ICertificatRCAComposition = {
  annee_inscription: "2020",
  numero_inscription: "1234",
  decision_recue: "phrase decision recue",
  interesse_decision: "phrase interesse_decision",
  decision_exequatur: "phrase decision_exequatur",
  paragraphe_fin: "phrase paragraphe_fin",
  adr_service_delivreur: {
    ligne4: "11, rue de la Maison Blanche",
    ligne6: "44941 Nantes CEDEX 9"
  },
  adresse_internet: "courrier.scec@diplomatie.gouv.fr",
  adresse_requerant: {
    ligne2: "l2",
    ligne3: "l3",
    ligne4: "l4",
    ligne5: "l5",
    ligne6: "123456 ville",
    ligne7: "pays"
  },
  annee_naissance: "2000",
  cachet_signature: "P/le sous-directeur,chef du service central d’état civil",
  identite_requerant: "nomFamille prenom",
  image_bloc_marques: imagePngVideBase64,
  jour_naissance: "1er",
  mois_naissance: "Février",
  nom: "nom",
  nom_direction: {
    ligne1: "Direction",
    ligne2: "des Français à l'étranger",
    ligne3: "et de l’administration consulaire"
  },
  pays_naissance: "paysNaissance",
  prenoms: "p1 p2",
  service_delivreur: "Service central d'état civil",
  sexe: "Masculin",
  tel_service_delivreur: "01.41.86.42.47",
  ville_delivrance: "Nantes",
  ville_naissance: "villeNaissance"
} as ICertificatRCAComposition;
