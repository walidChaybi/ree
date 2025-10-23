import { IService } from "@model/agent/IService";
import { Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { DoubleClicUtil } from "@util/DoubleClicUtil";
import { Options } from "@util/Type";
import { MutableRefObject } from "react";

export function reinitialiserOnClick(refs: MutableRefObject<HTMLElement[]>) {
  refs.current.forEach(ref => {
    DoubleClicUtil.reactiveOnClick(ref);
  });
}

export function listeServicesToOptions(services: IService[]): Options {
  return [
    ...services
      .filter(service => service.estDansScec)
      .sort((a, b) => a.libelleService.localeCompare(b.libelleService))
      .map(service => {
        return { cle: service.idService, libelle: service.libelleService };
      })
  ];
}

export const getUtilisateursParTypeRequeteVersOptions = (
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  utilisateurConnecte: UtilisateurConnecte,
  estTransfert: boolean,
  utilisateurs: Utilisateur[],
  seulementUtilisateursActifs = false
): Options => {
  const utilisateursFiltres = seulementUtilisateursActifs ? utilisateurs.filter(utilisateur => utilisateur.actif) : utilisateurs;

  return [
    ...utilisateursFiltres
      .filter(utilisateur =>
        filterUtilisateur(utilisateur, typeRequete, sousTypeRequete, idUtilisateurRequete, utilisateurConnecte, estTransfert)
      )
      .sort((a, b) => a.prenomNom.localeCompare(b.prenomNom))
      .map(utilisateur => utilisateur.versOption)
  ];
};

const filterUtilisateur = (
  utilisateur: Utilisateur,
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  utilisateurConnecte: UtilisateurConnecte,
  estTransfert: boolean
): boolean => {
  switch (typeRequete) {
    case TypeRequete.CREATION:
      return filtreUtilisateurRequeteCreation(utilisateur, idUtilisateurRequete, utilisateurConnecte);
    case TypeRequete.DELIVRANCE:
      return filtreUtilisateurRequeteDelivrance(utilisateur, sousTypeRequete, estTransfert, idUtilisateurRequete, utilisateurConnecte);
    case TypeRequete.INFORMATION:
      return filtreUtilisateurRequeteInformation(utilisateur, estTransfert, idUtilisateurRequete, utilisateurConnecte);
    default:
      return true;
  }
};

const filtreUtilisateurRequeteCreation = (
  utilisateur: Utilisateur,
  idUtilisateurRequete: string,
  utilisateurConnecte: UtilisateurConnecte
) => {
  const aDroit: boolean = utilisateur.estHabilitePour({
    leDroit: Droit.CREER_ACTE_ETABLI,
    surUnDesPerimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX]
  });
  let estDansMonServiceOuServiceFils = false;
  if (utilisateur.idService) {
    estDansMonServiceOuServiceFils = utilisateur.estDansUnDesServices([
      utilisateurConnecte.idService,
      ...utilisateurConnecte.idServicesFils
    ]);
  }
  return Boolean(estDansMonServiceOuServiceFils && aDroit && idUtilisateurRequete !== utilisateur.id);
};

const filtreUtilisateurRequeteInformation = (
  utilisateur: Utilisateur,
  estTransfert: boolean,
  idUtilisateurRequete: string,
  utilisateurConnecte: UtilisateurConnecte
): boolean => {
  let estDansMonServiceOuServiceFils = true;
  if (!estTransfert && utilisateur.idService) {
    estDansMonServiceOuServiceFils = utilisateur.estDansUnDesServices([
      utilisateurConnecte.idService,
      ...utilisateurConnecte.idServicesFils
    ]);
  }

  return Boolean(
    utilisateur.estDuSCEC &&
      utilisateur.estHabilitePour({ leDroit: Droit.INFORMER_USAGER }) &&
      idUtilisateurRequete !== utilisateur.id &&
      estDansMonServiceOuServiceFils
  );
};

const filtreUtilisateurRequeteDelivrance = (
  utilisateur: Utilisateur,
  sousTypeRequete: SousTypeRequete,
  estTransfert: boolean,
  idUtilisateurRequete: string,
  utilisateurConnecte: UtilisateurConnecte
): boolean => {
  let estDansMonServiceOuServiceFils = true;
  if (!estTransfert && utilisateur.idService) {
    estDansMonServiceOuServiceFils = utilisateur.estDansUnDesServices([
      utilisateurConnecte.idService,
      ...utilisateurConnecte.idServicesFils
    ]);
  }

  return Boolean(
    utilisateur.estDuSCEC &&
      utilisateur.estHabilitePour({ leDroit: sousTypeRequete === SousTypeDelivrance.RDDCO ? Droit.DELIVRER_COMEDEC : Droit.DELIVRER }) &&
      idUtilisateurRequete !== utilisateur.id &&
      estDansMonServiceOuServiceFils
  );
};

const filtrerValideur = (utilisateur: Utilisateur, idUtilisateurRequete?: string): boolean =>
  Boolean(utilisateur.estDuSCEC && utilisateur.estHabilitePour({ leDroit: Droit.DELIVRER }) && idUtilisateurRequete !== utilisateur.id);

export function getValideursVersOptions(
  utilisateurs: Utilisateur[],
  idUtilisateurRequete?: string,
  seulementUtilisateursActifs = false
): Options {
  const utilisateursFiltres = seulementUtilisateursActifs ? utilisateurs.filter(utilisateur => utilisateur.actif) : utilisateurs;

  return [
    ...utilisateursFiltres
      .filter(utilisateur => filtrerValideur(utilisateur, idUtilisateurRequete))
      .sort((a, b) => a.prenomNom.localeCompare(b.prenomNom))
      .map(utilisateur => utilisateur.versOption)
  ];
}
