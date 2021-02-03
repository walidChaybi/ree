import {useEffect, useState} from "react";
import {getLogin} from "../../../api/appels/agentApi";
import {IDroit, IHabilitation, IProfil} from "../../../model/Habilitation";
import {IOfficierSSOApi} from "../../../model/IOfficierSSOApi";
import {logError} from "../../common/util/LogManager";
import {formatNom, formatPrenom} from "../../common/util/Utils";

export interface ILoginApi {
  officierDataState?: IOfficierSSOApi;
  erreurState?: any;
}

export function useLoginApi() {
  const [officierDataState, setOfficierDataState] = useState<IOfficierSSOApi>();

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
        logError({
          messageUtilisateur:
            "Impossible de récupérer les informations utilisateur via le service de login",
          error
        });
      });
  }, []);

  return {
    officierDataState
  };
}

function setUtilisateurSSOApiFromHeaders(headers: any): IOfficierSSOApi {
  return {
    idSSO: headers.id_sso,
    nom: formatNom(headers.nom),
    prenom: formatPrenom(headers.prenom),
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

  if (habilitations) {
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
  }
  return habilitationsUtilisateur;
}

function setProfilsUtilisateur(profils: string): string[] {
  let profilsUtilisateur: string[] = [];
  if (profils) {
    profilsUtilisateur = profils.split("\\; ").filter(x => x);
  }
  return profilsUtilisateur;
}
