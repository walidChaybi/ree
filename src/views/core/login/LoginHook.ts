import { useEffect, useState } from "react";
import { getLogin } from "../../../api/appels/agentApi";
import { IDroit, IHabilitation, IProfil } from "../../../model/Habilitation";
import { IOfficierSSOApi } from "../../../model/IOfficierSSOApi";
import { IPerimetre } from "../../../model/IPerimetre";
import { GestionnaireDoubleOuverture } from "../../common/util/GestionnaireDoubleOuverture";
import { formatNom, formatPrenom } from "../../common/util/Utils";

export interface ILoginApi {
  officierDataState?: IOfficierSSOApi;
  erreurState?: any;
}

export function useLoginApi() {
  const [officierDataState, setOfficierDataState] = useState<IOfficierSSOApi>();
  const [erreurState, setErreurState] = useState<any>(undefined);

  useEffect(() => {
    GestionnaireDoubleOuverture.decroitNAppliOnUnload();
    if (GestionnaireDoubleOuverture.verifSiAppliNonDejaOuverte()) {
      getLogin()
        .then(result => {
          const officier = setUtilisateurSSOApi(
            result.headers,
            result.body.data
          );
          officier.habilitations = setHabilitationsUtilisateur(
            result.body.data.habilitations
          );
          setOfficierDataState(officier);
        })
        .catch(error => {
          setErreurState(error);
        });
      GestionnaireDoubleOuverture.incrementeNAppliOuverte();
    } else {
      setErreurState({});
    }
  }, []);

  return {
    officierDataState,
    erreurState
  };
}

function setUtilisateurSSOApi(headers: any, body: any): IOfficierSSOApi {
  return {
    idUtilisateur: body.idUtilisateur,
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
    habilitations: [],
    entite: body.entite,
    entitesFilles: body.entitesFillesDirectes
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
      if (h.perimetre != null) {
        habilitation.perimetre = {} as IPerimetre;
        habilitation.perimetre.idPerimetre = h.perimetre.id;
        habilitation.perimetre.nom = h.perimetre.nom;
        habilitation.perimetre.description = h.perimetre.description;
        habilitation.perimetre.estActif = h.perimetre.estActif;
        habilitation.perimetre.listePays = h.perimetre.listePays
          ?.toUpperCase()
          .split(" ET ");
        habilitation.perimetre.listeIdTypeRegistre =
          h.perimetre.listeIdTypeRegistre;
      }
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
