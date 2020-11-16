import { useState, useEffect } from "react";
import { getLogin } from "../../../api/appels/securiteApi";
import { IHabilitation, IDroit, IProfil } from "../../../model/Habilitation";
import messageManager from "../../common/util/messageManager";

export interface ILoginApi {
  officierDataState?: IOfficierSSOApi;
  erreurState?: any;
}

export interface IOfficierSSOApi {
  idSSO: string;
  nom: string;
  prenom: string;
  trigramme: string;
  mail: string;
  profils: string[];
  telephone: string;
  section: string;
  bureau: string;
  departement: string;
  service: string;
  habilitations: IHabilitation[];
}

export function useLoginApi() {
  const [officierDataState, setOfficierDataState] = useState<IOfficierSSOApi>();
  const [erreurState, setErreurState] = useState(undefined);

  useEffect(() => {
    getLogin()
      .then(result => {
        const officier = setUtilisateurSSOApiFromHeaders(result.headers);
        officier.habilitations = setHabilitationsUtilisateur(
          result.body.data.habilitations
        );
        setOfficierDataState(officier);
      })
      .catch(error => {
        messageManager.showError(
          "Impossible récupérer les informations utilisateur via le service de login"
        );
        console.log("Erreur survenue: ", error);
        setErreurState(error);
      });
  }, []);

  return {
    officierDataState,
    erreurState
  };
}

function setUtilisateurSSOApiFromHeaders(headers: any): IOfficierSSOApi {
  return {
    idSSO: headers.id_sso,
    nom: headers.nom,
    prenom: headers.prenom,
    trigramme: headers.trigramme,
    mail: headers.mail,
    profils: setProfilsUtilisateur(headers.profil),
    telephone: headers.telephone,
    section: headers.section,
    bureau: headers.bureau,
    departement: headers.departement,
    service: headers.service,
    habilitations: []
  };
}

function setHabilitationsUtilisateur(habilitations: any[]): IHabilitation[] {
  const habilitationsUtilisateur: IHabilitation[] = [];
  habilitations.forEach(h => {
    const habilitation: IHabilitation = {} as IHabilitation;
    habilitation.idHabilitation = h.idHabilitation;
    habilitation.profil = {} as IProfil;
    habilitation.profil.idProfil = h.profil.idProfil;
    habilitation.profil.nom = h.profil.nom;
    habilitation.profil.droits =
      habilitation.profil &&
      h.profil.profilDroit.map(
        (profilDroit: any) =>
          ({
            idDroit: profilDroit.droit.idDroit,
            nom: profilDroit.droit.nom
          } as IDroit)
      );
    habilitationsUtilisateur.push(habilitation);
  });
  return habilitationsUtilisateur;
}

function setProfilsUtilisateur(profils: string): string[] {
  let profilsUtilisateur: string[] = [];
  if (profils !== "") {
    profilsUtilisateur = profils.split("\\; ").filter(x => x);
  }
  return profilsUtilisateur;
}
