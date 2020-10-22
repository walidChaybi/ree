import { useState, useEffect } from "react";
import { getLogin } from "../../../api/appels/securiteApi";
import { IHabilitation, IDroit, IProfil } from "../../common/util/Habilitation";

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
  if (habilitations.length !== 0) {
    habilitations.forEach(h => {
      const habilitation: IHabilitation = {} as IHabilitation;
      habilitation.idHabilitation = h.idHabilitation;
      habilitation.droit = {} as IDroit;
      if (h.droit !== null) {
        habilitation.droit.idDroit = h.droit.idDroit;
        habilitation.droit.nom = h.droit.nom;
      }
      habilitation.profil = {} as IProfil;
      if (h.profil !== null) {
        habilitation.profil.idProfil = h.profil.idDroit;
        habilitation.profil.nom = h.profil.nom;
      }
      habilitationsUtilisateur.push(habilitation);
    });
  }
  return habilitationsUtilisateur;
}
