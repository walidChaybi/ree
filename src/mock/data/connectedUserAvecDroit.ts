import { IOfficierSSOApi } from "../../model/IOfficierSSOApi";
import { Droit } from "../../model/Droit";

export const userDroitConsulterArchive: IOfficierSSOApi = {
  idSSO: "idSSOConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  service: "serviceConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: "pNom",
        droits: [{ idDroit: "d12345", nom: Droit.CONSULTER_ARCHIVES }]
      }
    }
  ]
};

export const userDroitConsulterConsulterArchive: IOfficierSSOApi = {
  idSSO: "idSSOConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  service: "serviceConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: "pNom",
        droits: [
          { idDroit: "d12345", nom: Droit.CONSULTER_ARCHIVES },
          { idDroit: "d12345", nom: Droit.CONSULTER }
        ]
      }
    }
  ]
};
