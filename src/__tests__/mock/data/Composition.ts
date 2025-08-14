import { ICertificatRCAComposition } from "@model/composition/ICertificatRCAComposition";
import { ICertificatSituationComposition } from "@model/composition/ICertificatSituationComposition";
import DateUtils from "@util/DateUtils";
import { imagePngVideBase64 } from "./ImagePng";

export const certificatSituation: ICertificatSituationComposition = {
  numero_requete: "012345",
  objet_courrier: undefined,
  phrases_liees: "phrase",
  phrases_pieces_jointes: "phrasesPiecesJointes",
  decrets: [{ decret: "decret1" }, { decret: "decret2" }],
  adr_service_delivreur: {
    ligne4: "11, rue de la Maison Blanche",
    ligne6: "44941 Nantes CEDEX 9"
  },
  adresse_internet: "https://etat-civil.diplomatie.gouv.fr/rece-informationusager-ui/",
  adresse_requerant: {
    ligne2: "l2",
    ligne3: "l3",
    ligne4: "l4",
    ligne5: "l5",
    ligne6: "123456 ville",
    ligne7: "pays"
  },
  annee_naissance: "2000",
  cachet_signature: "P/la sous-directrice,\ncheffe du Service central d’état civil",
  sceau_ministere: imagePngVideBase64,
  identite_requerant: {
    ligne1: "PRENOM NOMFAMILLE"
  },
  image_bloc_marques: imagePngVideBase64,
  jour_naissance: "1er",
  mois_naissance: "février",
  nom: "nom",
  nom_direction: {
    ligne1: "Direction",
    ligne2: "des Français à l'étranger",
    ligne3: "et de l’administration consulaire"
  },
  pays_naissance: "paysNaissance",
  prenoms: "Pre1, Pre2",
  sexe: "masculin",
  tel_service_delivreur: "01.41.86.42.47",
  titre: "titre",
  ville_delivrance: "Nantes",
  date_delivrance: DateUtils.dateCourrier(),
  ville_naissance: "villeNaissance"
} as ICertificatSituationComposition;

export const certificatRCA: ICertificatRCAComposition = {
  numero_requete: "012345",
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
  adresse_internet: "https://etat-civil.diplomatie.gouv.fr/rece-informationusager-ui/",
  adresse_requerant: {
    ligne2: "l2",
    ligne3: "l3",
    ligne4: "l4",
    ligne5: "l5",
    ligne6: "123456 ville",
    ligne7: "pays"
  },
  annee_naissance: "2000",
  cachet_signature: "P/la sous-directrice,\ncheffe du Service central d’état civil",
  sceau_ministere: imagePngVideBase64,
  identite_requerant: {
    ligne1: "PRENOM NOMFAMILLE"
  },
  image_bloc_marques: imagePngVideBase64,
  jour_naissance: "1er",
  mois_naissance: "février",
  nom: "nom",
  nom_direction: {
    ligne1: "Direction",
    ligne2: "des Français à l'étranger",
    ligne3: "et de l’administration consulaire"
  },
  pays_naissance: "paysNaissance",
  prenoms: "Pre1, Pre2",
  sexe: "masculin",
  tel_service_delivreur: "01.41.86.42.47",
  ville_delivrance: "Nantes",
  date_delivrance: DateUtils.dateCourrier(),
  ville_naissance: "villeNaissance"
} as ICertificatRCAComposition;
