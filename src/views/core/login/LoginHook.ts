import { getLogin } from "@api/appels/agentApi";
import { IOfficier } from "@model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { storeRece } from "@util/storeRece";
import { formatNom, formatPrenom } from "@util/Utils";
import { useEffect, useState } from "react";

export interface ILoginApi {
  officierDataState?: IOfficier;
  erreurState?: any;
}

export function useLoginApi() {
  const [officierDataState, setOfficierDataState] = useState<IOfficier>();
  const [erreurState, setErreurState] = useState<any>(undefined);
  useEffect(() => {
    if (!storeRece.utilisateurCourant) {
      getLogin()
        .then(result => {
          const officier = mappingOfficier(result.headers, result.body.data);
          gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
            result.headers
          );
          officier.habilitations = mapHabilitationsUtilisateur(
            result.body.data.habilitations
          );
          setOfficierDataState(officier);
          gestionnaireDoubleOuverture.init();
        })
        .catch(error => {
          setErreurState(error);
        });
    } else {
      setOfficierDataState(storeRece.utilisateurCourant);
    }
  }, []);

  return {
    officierDataState,
    erreurState
  } as ILoginApi;
}

export function mappingOfficier(headers: any, body: any): IOfficier {
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
    sectionConsulaire: headers.section_consulaire,
    service: headers.service,
    poste: headers.poste,
    ministere: headers.ministere,
    habilitations: [],
    entite: body.entite,
    entitesFilles: body.entitesFillesDirectes,
    fonctionAgent: body.fonctionAgent,
    modeAuthentification: "AROBAS_MDP"
  };
}

export function setProfilsOfficier(profils: string): string[] {
  let profilsUtilisateur: string[] = [];
  if (profils) {
    profilsUtilisateur = profils.split("\\; ").filter(x => x);
  }
  return profilsUtilisateur;
}
