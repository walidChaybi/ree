import { ICertificatRCAComposition } from "../../model/composition/ICertificatRCAComposition";
import { ICertificatSituationComposition } from "../../model/composition/ICertificatSituationComposition";
import { IReponseNegativeDemandeIncompleteComposition } from "../../model/composition/IReponseNegativeDemandeIncompleteComposition";
import { IReponseNegativeFrancaisComposition } from "../../model/composition/IReponseNegativeFrancaisComposition";
import { IReponseNegativeMariageComposition } from "../../model/composition/IReponseNegativeMariageComposition";
import { imagePngVideBase64 } from "./ImagePng";

const baseReponseNegative = {
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
  cachet_signature: "P/le sous-directeur,chef du service central d’état civil",
  identite_requerant_ligne_1: "DUBOIS Léonard",
  adresse_requerant: {
    ligne2: "61 avenue Foch",
    ligne3: "Appartement 258",
    ligne4: "",
    ligne5: "",
    ligne6: "310 GL24 Saint-Germain-de-Tallevende-la-Lande-Vaumont",
    ligne7: ""
  },
  numero_requete: "L5UG3Q",
  titre: undefined
};

export const reponseNegativeDemandeIncomplete: IReponseNegativeDemandeIncompleteComposition = {
  ...baseReponseNegative,
  objet_courrier:
    "Certificat de situation relatif au registre des PACS des personnes de nationalité étrangère et nées à l’étranger, répertoire civil et répertoire civil annexe détenus par le service central d’état civil"
};

export const reponseNegativeMariage: IReponseNegativeMariageComposition = {
  ...baseReponseNegative,
  objet_courrier: undefined,
  document_demande: "Certificat de situation au rca",
  nom_titulaire1: "GREENWALD",
  prenoms_titulaire1: "Paulita Zaria",
  nom_titulaire2: "DUPE",
  prenoms_titulaire2: "Laurent"
};

export const reponseNegativeFrancais: IReponseNegativeFrancaisComposition = {
  ...baseReponseNegative,
  objet_courrier:
    "Certificat de situation relatif au registre des PACS des personnes de nationalité étrangère et nées à l’étranger, répertoire civil et répertoire civil annexe détenus par le service central d’état civil",
  url: "https://www.service-public.fr"
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
  identite_requerant_ligne_1: "nomFamille prenom",
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
  identite_requerant_ligne_1: "nomFamille prenom",
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
