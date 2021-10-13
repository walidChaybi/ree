import { useEffect, useState } from "react";
import { getLogin } from "../../../api/appels/agentApi";
import { IOfficier } from "../../../model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "../../../model/agent/IUtilisateur";
import { GestionnaireDoubleOuverture } from "../../common/util/GestionnaireDoubleOuverture";
import { formatNom, formatPrenom } from "../../common/util/Utils";

export interface ILoginApi {
  officierDataState?: IOfficier;
  erreurState?: any;
}

export function useLoginApi() {
  const [officierDataState, setOfficierDataState] = useState<IOfficier>();
  const [erreurState, setErreurState] = useState<any>(undefined);

  useEffect(() => {
    GestionnaireDoubleOuverture.decroitNAppliOnUnload();
    if (GestionnaireDoubleOuverture.verifSiAppliNonDejaOuverte()) {
      getLogin()
        .then(result => {
          const officier = mappingOfficier(result.headers, result.body.data);
          officier.habilitations = mapHabilitationsUtilisateur(
            result.body.data.habilitations
          );
          setOfficierDataState(officier);
          GestionnaireDoubleOuverture.incrementeNAppliOuverte();
        })
        .catch(error => {
          setErreurState(error);
        });
    } else {
      setErreurState({});
    }
  }, []);

  return {
    officierDataState,
    erreurState
  };
}

function mappingOfficier(headers: any, body: any): IOfficier {
  return {
    idUtilisateur: body.idUtilisateur,
    idSSO: headers.id_sso,
    nom: formatNom(headers.nom),
    prenom: formatPrenom(headers.prenom),
    trigramme: headers.trigramme,
    mail: headers.mail,
    profils: setProfilsOfficier(headers.profil),
    telephone: headers.telephone,
    section: headers.section,
    bureau: headers.bureau,
    departement: headers.departement,
    service: headers.service,
    poste: headers.poste,
    ministere: headers.ministere,
    habilitations: [],
    entite: body.entite,
    entitesFilles: body.entitesFillesDirectes,
    fonctionAgent: body.fonctionAgent
  };
}

export function setProfilsOfficier(profils: string): string[] {
  let profilsUtilisateur: string[] = [];
  if (profils) {
    profilsUtilisateur = profils.split("\\; ").filter(x => x);
  }
  return profilsUtilisateur;
}
