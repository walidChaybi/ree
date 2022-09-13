import { storeRece } from "@util/storeRece";
import { estTableauNonVide } from "@util/Utils";
import { Provenance } from "../requete/enum/Provenance";
import { Droit } from "./enum/Droit";
import { Perimetre, PerimetreEnum } from "./enum/Perimetre";
import { IEntite } from "./IEntiteRattachement";
import { IUtilisateur, utilisateurADroit } from "./IUtilisateur";

export interface IOfficier extends IUtilisateur {
  idSSO: string;
  profils: string[];
  telephone: string;
  section: string;
  bureau: string;
  departement: string;
  sectionConsulaire: string;
  service: string;
  poste: string;
  ministere: string;
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

// Vérification que l'officier à le droit de consulter la visualisation de l'acte
// Soit il a le droit CONSULTER sur le périmètre de l'acte et le type de registre est présent dans ce périmètre
// Soit il a le droit CONSULTER_ARCHIVE
export function officierAutoriserSurLeTypeRegistre(idTypeRegistre: string) {
  const officier = storeRece.utilisateurCourant;
  let res = false;

  if (officier) {
    let i = 0;
    while (!res && i < officier.habilitations.length) {
      const h = officier.habilitations[i];
      if (
        h.perimetre &&
        h.perimetre.listeIdTypeRegistre &&
        h.profil.droits.find(d => d.nom === Droit.CONSULTER) &&
        h.perimetre.listeIdTypeRegistre.includes(idTypeRegistre)
      ) {
        res = true;
      }
      i++;
    }
  }

  return res;
}

// Vérification que l'officier à le droit de consulter la visualisation de l'acte
// Soit il a le droit CONSULTER sur le périmètre de l'acte et le type de registre est présent dans ce périmètre
// Soit il a le droit CONSULTER sur le périmètre MEAE
// Soit il a le droit CONSULTER_ARCHIVE
export function officierAutoriserSurLeTypeRegistreOuDroitMEAE(
  idTypeRegistre: string
) {
  return (
    officierAutoriserSurLeTypeRegistre(idTypeRegistre) ||
    officierALeDroitSurUnDesPerimetres(Droit.CONSULTER, [Perimetre.MEAE])
  );
}

export function officierALeDroitSurLePerimetre(
  droit: Droit,
  refPerimetre: Perimetre
) {
  return officierALeDroitSurUnDesPerimetres(droit, [refPerimetre]);
}

export function officierALeDroitSurUnDesPerimetres(
  droit: Droit,
  refPerimetres: Perimetre[]
) {
  const officier = storeRece.utilisateurCourant;
  let res = false;

  if (estTableauNonVide(refPerimetres)) {
    officier?.habilitations?.forEach(h => {
      if (
        h.perimetre &&
        h.profil.droits.find(d => d.nom === droit) &&
        refPerimetres.find(
          refPerimetre =>
            PerimetreEnum.getEnum(h.perimetre.nom) === refPerimetre
        )
      ) {
        res = true;
      }
    });
  } else {
    res = true;
  }

  return res;
}

export const mAppartient = (idUtilisateur: string) => {
  return idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;
};

export const mAppartientOuAppartientAPersonne = (idUtilisateur: string) =>
  !idUtilisateur || mAppartient(idUtilisateur);

export const provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer = (
  provenance: string
) =>
  (provenance === Provenance.COMEDEC.libelle &&
    officierHabiliterPourLeDroit(Droit.DELIVRER_COMEDEC)) ||
  (provenance !== Provenance.COMEDEC.libelle &&
    officierHabiliterPourLeDroit(Droit.DELIVRER));

export const appartientAMonServiceOuServicesMeresOuServicesFilles = (
  idEntite: string
) => {
  return (
    storeRece.utilisateurCourant?.entite?.idEntite === idEntite ||
    contientEntiteFille(idEntite) ||
    contientEntiteMere(idEntite)
  );
};

export function contientEntiteFille(idEntiteRequete: string) {
  return storeRece.utilisateurCourant?.entitesFilles?.some(
    el => el.idEntite === idEntiteRequete
  );
}

export function contientEntiteMere(idEntiteRequete: string): boolean {
  if (storeRece.utilisateurCourant) {
    return getIdEntitesMere(storeRece.utilisateurCourant).some(
      idEntiteMere => idEntiteMere === idEntiteRequete
    );
  }
  return false;
}

function getIdEntitesMere(utilisateur: IOfficier): string[] {
  const idEntites: string[] = [];
  if (utilisateur.entite) {
    collectIdEntiteMere(utilisateur.entite, idEntites);
  }
  return idEntites;
}

function collectIdEntiteMere(entite: IEntite, idEntites: string[]) {
  entite.hierarchieEntite?.forEach(h => {
    idEntites.push(h.entiteMere.idEntite);
    collectIdEntiteMere(h.entiteMere, idEntites);
  });
}
