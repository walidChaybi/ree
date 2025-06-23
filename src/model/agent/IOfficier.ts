import { ESousTypeCreation, SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { formatNom, formatPrenom, getValeurOuVide } from "@util/Utils";
import { Provenance } from "../requete/enum/Provenance";
import { Habilitation } from "./Habilitation";
import { IService } from "./IService";
import { IUtilisateur, mapHabilitationsUtilisateur, utilisateurADroit, utilisateurALeDroitSurUnDesPerimetres } from "./IUtilisateur";
import { Droit } from "./enum/Droit";
import { Perimetre } from "./enum/Perimetre";

export interface IOfficier extends IUtilisateur {
  idSSO: string;
  profils: string[];
  telephone: string;
}

/** Savoir si l'officier connecté à le droit ou le profil demandé en paramètre */
export function officierHabiliterPourLeDroit(utilisateurConnecte: IOfficier, droit: Droit) {
  return utilisateurConnecte ? utilisateurADroit(droit, utilisateurConnecte) : false;
}

export function estOfficierHabiliterPourTousLesDroits(utilisateurConnecte: IOfficier, droits?: Droit[]) {
  if (!droits || droits.length === 0) {
    return true;
  }
  return droits.every(droit => officierHabiliterPourLeDroit(utilisateurConnecte, droit));
}

export function estOfficierHabiliterPourUnDesDroits(utilisateurConnecte: IOfficier, droits?: Droit[]) {
  if (!droits || droits.length === 0) {
    return true;
  }
  return droits.some(droit => officierHabiliterPourLeDroit(utilisateurConnecte, droit));
}

export function estOfficierHabiliterPourSeulementLesDroits(utilisateurConnecte: IOfficier, droits?: Droit[]) {
  const officier = utilisateurConnecte;

  if (!droits || droits.length === 0) {
    return true;
  }
  return (
    droits.length === officier?.habilitations?.length && droits.every(droit => officierHabiliterPourLeDroit(utilisateurConnecte, droit))
  );
}

export function officierHabiliterUniquementPourLeDroit(droit: Droit, utilisateurConnecte: IOfficier): boolean {
  let droitTrouve = false;

  if (utilisateurConnecte?.habilitations?.length === 1 && utilisateurConnecte?.habilitations[0].profil.droits.length === 1) {
    droitTrouve = utilisateurConnecte.habilitations[0].profil.droits[0].nom === droit;
  }

  return droitTrouve;
}

export function officierDroitConsulterSurLeTypeRegistre(utilisateurConnecte: IOfficier, idTypeRegistre?: string): boolean {
  let res = false;

  if (utilisateurConnecte) {
    let i = 0;
    while (!res && i < utilisateurConnecte.habilitations.length) {
      const habilitationOfficier = utilisateurConnecte.habilitations[i];
      if (Habilitation.aDroitConsulterSurPerimetre(habilitationOfficier, idTypeRegistre)) {
        res = true;
      }
      i++;
    }
  }

  return res;
}

function officierDroitDelivrerSurLeTypeRegistre(idTypeRegistre: string, utilisateurConnecte: IOfficier): boolean {
  let estHabilite = false;

  if (utilisateurConnecte) {
    let i = 0;
    while (!estHabilite && i < utilisateurConnecte.habilitations.length) {
      const habilitationOfficier = utilisateurConnecte.habilitations[i];
      if (Habilitation.aDroitDelivrerEtDelivrerComedecSurPerimetre(habilitationOfficier, idTypeRegistre)) {
        estHabilite = true;
      }
      i++;
    }
  }
  return estHabilite;
}

export function officierDroitConsulterSurLeTypeRegistreOuDroitMAE(utilisateurConnecte: IOfficier, idTypeRegistre?: string) {
  return (
    officierDroitConsulterSurLeTypeRegistre(utilisateurConnecte, idTypeRegistre) ||
    officierALeDroitSurUnDesPerimetres(Droit.CONSULTER, [Perimetre.TOUS_REGISTRES], utilisateurConnecte)
  );
}

export function officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE(utilisateurConnecte: IOfficier, idTypeRegistre?: string) {
  if (idTypeRegistre) {
    return (
      officierDroitDelivrerSurLeTypeRegistre(getValeurOuVide(idTypeRegistre), utilisateurConnecte) ||
      officierALeDroitSurUnDesPerimetres(Droit.DELIVRER, [Perimetre.TOUS_REGISTRES], utilisateurConnecte) ||
      officierALeDroitSurUnDesPerimetres(Droit.DELIVRER_COMEDEC, [Perimetre.TOUS_REGISTRES], utilisateurConnecte)
    );
  } else return false;
}

export function officierALeDroitSurLePerimetre(droit: Droit, refPerimetre: Perimetre, utilisateurConnecte: IOfficier) {
  return officierALeDroitSurUnDesPerimetres(droit, [refPerimetre], utilisateurConnecte);
}
export const officierALeDroitSurUnDesPerimetres = (droit: Droit, refPerimetres: Perimetre[], utilisateurConnecte: IOfficier): boolean =>
  utilisateurALeDroitSurUnDesPerimetres(droit, refPerimetres, utilisateurConnecte);

export const appartientAUtilisateurConnecte = (utilisateurConnecte: IOfficier, idUtilisateur?: string): boolean =>
  idUtilisateur === utilisateurConnecte.idUtilisateur;

export const appartientAUtilisateurConnecteOuPersonne = (utilisateurConnecte: IOfficier, idUtilisateur: string) =>
  !idUtilisateur || appartientAUtilisateurConnecte(utilisateurConnecte, idUtilisateur);

export const provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer = (
  utilisateurConnecte: IOfficier,
  provenance?: string
): boolean =>
  (provenance === Provenance.COMEDEC.libelle && officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER_COMEDEC)) ||
  (provenance !== Provenance.COMEDEC.libelle && officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER));

export const appartientAMonServiceOuServicesParentsOuServicesFils = (utilisateurConnecte: IOfficier, idService?: string): boolean => {
  return (
    idService != null &&
    (utilisateurConnecte.service?.idService === idService ||
      contientServiceFils(idService, utilisateurConnecte) ||
      contientServiceParent(idService, utilisateurConnecte))
  );
};

function contientServiceFils(idService: string, utilisateurConnecte: IOfficier) {
  return utilisateurConnecte?.servicesFils?.some(serviceFils => serviceFils.idService === idService);
}

export function contientServiceParent(idService: string, utilisateurConnecte: IOfficier): boolean {
  if (utilisateurConnecte) {
    return getIdServicesParent(utilisateurConnecte).some(idServiceParent => idServiceParent === idService);
  }
  return false;
}

function getIdServicesParent(utilisateur: IOfficier): string[] {
  const idServices: string[] = [];
  if (utilisateur.service) {
    collectIdServiceParent(utilisateur.service, idServices);
  }
  return idServices;
}

function collectIdServiceParent(service: IService, idServices: string[]) {
  service.hierarchieService?.forEach(hierarchie => {
    idServices.push(hierarchie.serviceParent.idService);
    collectIdServiceParent(hierarchie.serviceParent, idServices);
  });
}

export function aDroitConsulterRequeteDelivrance(utilisateurConnecte: IOfficier): boolean {
  return utilisateurADroit(Droit.DELIVRER, utilisateurConnecte);
}

export function aDroitConsulterApercuRequeteInformation(utilisateurConnecte: IOfficier): boolean {
  return utilisateurADroit(Droit.INFORMER_USAGER, utilisateurConnecte);
}

export const aDroitConsulterRequeteCreation = (sousTypeRequete: string | ESousTypeCreation, utilisateurConnecte: IOfficier): boolean => {
  const sousTypeCreation = SousTypeCreation.getEnumFromLibelleCourt(sousTypeRequete);

  if (sousTypeCreation === SousTypeCreation.RCEXR || (sousTypeRequete as ESousTypeCreation) === ESousTypeCreation.RCEXR) {
    return utilisateurALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [Perimetre.TOUS_REGISTRES, Perimetre.ETAX], utilisateurConnecte);
  } else if (
    [SousTypeCreation.RCTD, SousTypeCreation.RCTC].includes(sousTypeCreation) ||
    [ESousTypeCreation.RCTD, ESousTypeCreation.RCTC].includes(sousTypeRequete as ESousTypeCreation)
  ) {
    return utilisateurADroit(Droit.CREER_ACTE_TRANSCRIT, utilisateurConnecte);
  }

  return false;
};

export function estUtilisateurSysteme(nomUtilisateur?: string, prenomUtilisateur?: string) {
  return nomUtilisateur === "RECE" && prenomUtilisateur === "Système";
}

export function mappingOfficier(headers: any, body: any): IOfficier {
  return {
    idUtilisateur: body.idUtilisateur,
    idSSO: body.idArobas,
    nom: formatNom(body.nom),
    prenom: formatPrenom(body.prenom),
    trigramme: body.trigramme,
    mail: body.mel,
    profils: setProfilsOfficier(headers.profil),
    telephone: body.telephone || "",
    habilitations: mapHabilitationsUtilisateur(body.habilitations),
    service: body.service,
    servicesFils: body.servicesFilsDirects,
    fonctionAgent: body.fonctionAgent,
    modeAuthentification: "AROBAS_MDP"
  };
}

function setProfilsOfficier(profils: string): string[] {
  let profilsUtilisateur: string[] = [];
  if (profils) {
    profilsUtilisateur = profils.split("\\; ").filter(x => x);
  }
  return profilsUtilisateur;
}
