import { ILoginApi } from "@core/login/LoginHook";
import { Droit } from "@model/agent/enum/Droit";
import { userDroitConsulterPerimetreTousRegistres } from "./mockConnectedUserAvecDroit";

export const infosLoginOfficier: ILoginApi = {
  officierDataState: userDroitConsulterPerimetreTousRegistres
};

export const infosLoginOfficier2: ILoginApi = {
  officierDataState: {
    idUtilisateur: userDroitConsulterPerimetreTousRegistres.idUtilisateur,
    idSSO: "idSSOConnectedUser",
    nom: "nomConnectedUser",
    prenom: "prenomConnectedUser",
    trigramme: "trigrammeConnectedUser",
    mail: "mailConnectedUser",
    profils: ["profilConnectedUser"],
    telephone: "telephoneConnectedUser",
    service: userDroitConsulterPerimetreTousRegistres.service,
    habilitations: [
      {
        idHabilitation: "h12345",
        perimetre: {
          ...userDroitConsulterPerimetreTousRegistres.habilitations[0].perimetre
        },
        profil: {
          idProfil: "p12345",
          nom: {
            idNomenclature: "",
            categorie: "",
            code: "",
            libelle: "",
            estActif: true
          },
          droits: [{ idDroit: "d12345", nom: Droit.ATTRIBUER_REQUETE }]
        }
      }
    ],
    modeAuthentification: "AROBAS_MDP"
  }
};
