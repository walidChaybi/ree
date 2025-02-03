import { IParametreBaseRequeteDTO } from "@model/parametres/enum/ParametresBaseRequete";
import { imagePngVideBase64 } from "./ImagePng";

export const PARAMETRE_BASE_REQUETE: IParametreBaseRequeteDTO[] = [
  { idParametre: "6a0e6e3e-163d-4856-8b5f-58fa2d2c37de", cle: "nom.direction", valeur: "Direction" },
  { idParametre: "1cc1a382-fc15-406b-9080-0adbc2cd4e8a", cle: "nom.direction.ligne2", valeur: "des Français à l'étranger" },
  { idParametre: "0f61dd80-c7e0-4697-a5ae-4b44e995e38d", cle: "nom.direction.ligne3", valeur: "et de l’administration consulaire" },
  {
    idParametre: "22a82255-eaa4-4d47-97b8-eaff42f49591",
    cle: "adresse.internet.ministere",
    valeur: "https://etat-civil.diplomatie.gouv.fr/rece-informationusager-ui/"
  },
  { idParametre: "43592aae-ea46-420d-beaa-ce78339c0c42", cle: "service.delivreur.nom", valeur: "Service central d'état civil" },
  { idParametre: "4350e9c7-e6e7-44af-bb75-99607168c32e", cle: "service.delivreur.adresse.rue", valeur: "11, rue de la Maison Blanche" },
  { idParametre: "907f6168-1c88-4e1e-a98c-87273deae9fe", cle: "service.delivreur.adresse.ville", valeur: "44941 Nantes CEDEX 9" },
  { idParametre: "0dd7cd29-9552-4840-8fdd-d41814bd0a02", cle: "service.delivreur.service.telephone", valeur: "01.41.86.42.47" },
  { idParametre: "1fe1330e-f7a8-4970-854d-c044fc5dda86", cle: "service.delivreur.service.ville", valeur: "Nantes" },
  { idParametre: "375e3b6b-2afe-4e93-b54b-bc9e102a9c91", cle: "code1.libelle.fonction.agent", valeur: "L'officier de l'état civil" },
  { idParametre: "1f0d850c-f66b-46f7-906c-c9d9f0cc6db8", cle: "code3.libelle.fonction.agent", valeur: "Officier de l'état civil" },
  {
    idParametre: "188c2a72-1942-4592-8c2d-5d1e47d1d57b",
    cle: "sceau.ministere.affaires.etrangeres",
    fichierB64: imagePngVideBase64
  },
  {
    idParametre: "929568bb-dcaa-481f-82c0-a67d02c622c9",
    cle: "sceau.signature",
    fichierB64: imagePngVideBase64
  },
  {
    idParametre: "375f4b04-688f-4811-90cb-1c47d4cb6c39",
    cle: "code2.libelle.fonction.agent",
    valeur: "P/la sous-directrice,\ncheffe du Service central d’état civil"
  }
];
