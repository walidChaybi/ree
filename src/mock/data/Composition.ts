import { IReponseNegativeDemandeIncomplete } from "../../model/composition/IReponseNegativeDemandeIncomplete";
import { imagePngVideBase64 } from "./ImagePng";

export const reponseNegativeDemandeIncomplete: IReponseNegativeDemandeIncomplete = {
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
