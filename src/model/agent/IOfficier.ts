import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { getValeurOuVide } from "@util/Utils";
import { storeRece } from "@util/storeRece";
import { Provenance } from "../requete/enum/Provenance";
import { Habilitation } from "./Habilitation";
import { IService } from "./IService";
import {
  IUtilisateur,
  utilisateurADroit,
  utilisateurALeDroitSurUnDesPerimetres
} from "./IUtilisateur";
import { Droit } from "./enum/Droit";
import { Perimetre } from "./enum/Perimetre";

export interface IOfficier extends IUtilisateur {
  idSSO: string;
  profils: string[];
  telephone: string;
}

/** Savoir si l'officier connecté à le droit ou le profil demandé en paramètre */
export function officierHabiliterPourLeDroit(droit: Droit) {
  return storeRece.utilisateurCourant
    ? utilisateurADroit(droit, storeRece.utilisateurCourant)
    : false;
}

export function estOfficierHabiliterPourTousLesDroits(droits?: Droit[]) {
  if (!droits || droits.length === 0) {
    return true;
  }
  return droits.every(droit => officierHabiliterPourLeDroit(droit));
}

export function estOfficierHabiliterPourUnDesDroits(droits?: Droit[]) {
  if (!droits || droits.length === 0) {
    return true;
  }
  return droits.some(droit => officierHabiliterPourLeDroit(droit));
}

export function estOfficierHabiliterPourSeulementLesDroits(droits?: Droit[]) {
  const officier = storeRece.utilisateurCourant;

  if (!droits || droits.length === 0) {
    return true;
  }
  return (
    droits.length === officier?.habilitations?.length &&
    droits.every(droit => officierHabiliterPourLeDroit(droit))
  );
}

export function officierHabiliterUniquementPourLeDroit(droit: Droit): boolean {
  const officier = storeRece.utilisateurCourant;
  let droitTrouve = false;

  if (
    officier &&
    officier?.habilitations?.length === 1 &&
    officier?.habilitations[0].profil.droits.length === 1
  ) {
    droitTrouve = officier.habilitations[0].profil.droits[0].nom === droit;
  }

  return droitTrouve;
}

export function officierDroitConsulterSurLeTypeRegistre(
  idTypeRegistre?: string
): boolean {
  const officier = storeRece.utilisateurCourant;
  let res = false;

  if (officier) {
    let i = 0;
    while (!res && i < officier.habilitations.length) {
      const habilitationOfficier = officier.habilitations[i];
      if (
        Habilitation.aDroitConsulterSurPerimetre(
          habilitationOfficier,
          idTypeRegistre
        )
      ) {
        res = true;
      }
      i++;
    }
  }

  return res;
}

export function officierDroitDelivrerSurLeTypeRegistre(idTypeRegistre: string) {
  const officier = storeRece.utilisateurCourant;
  let estHabilite = false;

  if (officier) {
    let i = 0;
    while (!estHabilite && i < officier.habilitations.length) {
      const habilitationOfficier = officier.habilitations[i];
      if (
        Habilitation.aDroitDelivrerEtDelivrerComedecSurPerimetre(
          habilitationOfficier,
          idTypeRegistre
        )
      ) {
        estHabilite = true;
      }
      i++;
    }
  }

  return estHabilite;
}

export function officierDroitConsulterSurLeTypeRegistreOuDroitMAE(
  idTypeRegistre?: string
) {
  return (
    officierDroitConsulterSurLeTypeRegistre(idTypeRegistre) ||
    officierALeDroitSurUnDesPerimetres(Droit.CONSULTER, [
      Perimetre.TOUS_REGISTRES
    ])
  );
}

export function officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE(
  idTypeRegistre?: string
) {
  if (idTypeRegistre) {
    return (
      officierDroitDelivrerSurLeTypeRegistre(getValeurOuVide(idTypeRegistre)) ||
      officierALeDroitSurUnDesPerimetres(Droit.DELIVRER, [
        Perimetre.TOUS_REGISTRES
      ]) ||
      officierALeDroitSurUnDesPerimetres(Droit.DELIVRER_COMEDEC, [
        Perimetre.TOUS_REGISTRES
      ])
    );
  } else return false;
}

export function officierALeDroitSurLePerimetre(
  droit: Droit,
  refPerimetre: Perimetre
) {
  return officierALeDroitSurUnDesPerimetres(droit, [refPerimetre]);
}
export const officierALeDroitSurUnDesPerimetres = (
  droit: Droit,
  refPerimetres: Perimetre[]
): boolean =>
  utilisateurALeDroitSurUnDesPerimetres(
    droit,
    refPerimetres,
    storeRece.utilisateurCourant
  );

export const mAppartient = (idUtilisateur?: string): boolean =>
  idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;

export const mAppartientOuAppartientAPersonne = (idUtilisateur: string) =>
  !idUtilisateur || mAppartient(idUtilisateur);

export const provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer = (
  provenance?: string
): boolean =>
  (provenance === Provenance.COMEDEC.libelle &&
    officierHabiliterPourLeDroit(Droit.DELIVRER_COMEDEC)) ||
  (provenance !== Provenance.COMEDEC.libelle &&
    officierHabiliterPourLeDroit(Droit.DELIVRER));

export const appartientAMonServiceOuServicesParentsOuServicesFils = (
  idService?: string
): boolean => {
  return (
    idService != null &&
    (storeRece.utilisateurCourant?.service?.idService === idService ||
      contientServiceFils(idService) ||
      contientServiceParent(idService))
  );
};

export function contientServiceFils(idService: string) {
  return storeRece.utilisateurCourant?.servicesFils?.some(
    serviceFils => serviceFils.idService === idService
  );
}

export function contientServiceParent(idService: string): boolean {
  if (storeRece.utilisateurCourant) {
    return getIdServicesParent(storeRece.utilisateurCourant).some(
      idServiceParent => idServiceParent === idService
    );
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

export function aDroitConsulterRequeteDelivrance(): boolean {
  return utilisateurADroit(Droit.DELIVRER, storeRece.utilisateurCourant);
}

export function aDroitConsulterApercuRequeteInformation(): boolean {
  return utilisateurADroit(Droit.INFORMER_USAGER, storeRece.utilisateurCourant);
}

export function aDroitConsulterRequeteCreation(
  sousTypeRequete: string
): boolean {
  let aDroit = false;

  const sousTypeCreation =
    SousTypeCreation.getEnumFromLibelleCourt(sousTypeRequete);

  if (SousTypeCreation.estRCEXR(sousTypeCreation)) {
    aDroit = utilisateurALeDroitSurUnDesPerimetres(
      Droit.CREER_ACTE_ETABLI,
      [Perimetre.TOUS_REGISTRES, Perimetre.ETAX],
      storeRece.utilisateurCourant
    );
  } else if (SousTypeCreation.estRCTDOuRCTC(sousTypeCreation)) {
    return utilisateurADroit(
      Droit.CREER_ACTE_TRANSCRIT,
      storeRece.utilisateurCourant
    );
  }

  return aDroit;
}

export function estUtilisateurSysteme(
  nomUtilisateur?: string,
  prenomUtilisateur?: string
) {
  return nomUtilisateur === "RECE" && prenomUtilisateur === "Système";
}
