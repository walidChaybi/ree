import {
  ADRESSE_INTERNET_MINISTERE,
  BLOC_MARQUES_MINISTERE,
  DIRECTION_LIGNE_2,
  DIRECTION_LIGNE_3,
  LIBELLE_FONCTION_AGENT_2,
  NOM_DIRECTION,
  SCEAU_MINISTERE,
  SERVICE_DELIVREUR_NOM,
  SERVICE_DELIVREUR_RUE,
  SERVICE_DELIVREUR_SERVICE_TELEPHONE,
  SERVICE_DELIVREUR_SERVICE_VILLE,
  SERVICE_DELIVREUR_VILLE
} from "../../parametres/clesParametres";
import { ParametreBaseRequete } from "../../parametres/enum/ParametresBaseRequete";

export interface IParametresComposition {
  image_bloc_marques: string; //"+base64+";
  nom_direction: {
    ligne1: string; //"Direction";
    ligne2: string; //"des Français à l'étranger";
    ligne3: string; //"et de l’administration consulaire";
  };
  adresse_internet: string; //"www.diplomatie.gouv.fr/fr/";
  service_delivreur: string; //"Service central de l'état civil";
  adr_service_delivreur: {
    ligne4: string; //"11, rue de la Maison Blanche";
    ligne6: string; //"44941 NANTES CEDEX 9";
  };
  tel_service_delivreur: string; //"00.33.1.41.86.42.47";
  ville_delivrance: string; //"Nantes";
  cachet_signature: string; //"P/le sous-directeur, chef du service central d’état civil."
  sceau_ministere: string;
}

export const ParametresComposition = {
  ajoutParametres(obj: IParametresComposition) {
    obj = obj || {};

    obj.image_bloc_marques = ParametreBaseRequete.getEnumFor(
      BLOC_MARQUES_MINISTERE
    )?.libelle;
    obj.nom_direction = {
      ligne1: ParametreBaseRequete.getEnumFor(NOM_DIRECTION)?.libelle,
      ligne2: ParametreBaseRequete.getEnumFor(DIRECTION_LIGNE_2)?.libelle,
      ligne3: ParametreBaseRequete.getEnumFor(DIRECTION_LIGNE_3)?.libelle
    };
    obj.adresse_internet = ParametreBaseRequete.getEnumFor(
      ADRESSE_INTERNET_MINISTERE
    )?.libelle;
    obj.service_delivreur = ParametreBaseRequete.getEnumFor(
      SERVICE_DELIVREUR_NOM
    )?.libelle;
    obj.adr_service_delivreur = {
      ligne4: ParametreBaseRequete.getEnumFor(SERVICE_DELIVREUR_RUE)?.libelle,
      ligne6: ParametreBaseRequete.getEnumFor(SERVICE_DELIVREUR_VILLE)?.libelle
    };
    obj.tel_service_delivreur = ParametreBaseRequete.getEnumFor(
      SERVICE_DELIVREUR_SERVICE_TELEPHONE
    )?.libelle;
    obj.ville_delivrance = ParametreBaseRequete.getEnumFor(
      SERVICE_DELIVREUR_SERVICE_VILLE
    )?.libelle;

    obj.cachet_signature = ParametreBaseRequete.getEnumFor(
      LIBELLE_FONCTION_AGENT_2
    )?.libelle;
    obj.sceau_ministere = ParametreBaseRequete.getEnumFor(
      SCEAU_MINISTERE
    )?.libelle;

    return obj;
  }
};
