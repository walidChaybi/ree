import { TransfertUnitaireParams } from "@hook/requete/TransfertHook";
import { IOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur, utilisateurADroit, utilisateurALeDroitSurUnDesPerimetres } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { DoubleClicUtil } from "@util/DoubleClicUtil";
import { Option, Options } from "@util/Type";
import { MutableRefObject } from "react";
import { Perimetre } from "./../../../../model/agent/enum/Perimetre";
import { IMenuTransfertProps } from "./MenuTransfert";
/* v8 ignore start */

export function onValidateService(
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  setParam: React.Dispatch<React.SetStateAction<TransfertUnitaireParams | undefined>>,
  props: React.PropsWithChildren<IMenuTransfertProps>,
  setServicePopinOpen: React.Dispatch<React.SetStateAction<boolean>>,
  service?: Option
) {
  setOperationEnCours(true);
  if (service) {
    setParam({
      idRequete: props.idRequete,
      idService: service.cle,
      idUtilisateur: "",
      statutRequete: props.estTransfert ? StatutRequete.TRANSFEREE : StatutRequete.A_TRAITER,
      libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${service.libelle}`,
      estTransfert: props.estTransfert
    });
    setServicePopinOpen(false);
  }
}

export function reinitialiserOnClick(refs: MutableRefObject<HTMLElement[]>) {
  refs.current.forEach(ref => {
    DoubleClicUtil.reactiveOnClick(ref);
  });
}

export function onValidateAgent(
  setParam: React.Dispatch<React.SetStateAction<TransfertUnitaireParams | undefined>>,
  props: React.PropsWithChildren<IMenuTransfertProps>,
  setAgentPopinOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOperationEnCours: (operation: boolean) => void,
  utilisateurs: IUtilisateur[],
  agent?: Option
) {
  setOperationEnCours(true);
  if (agent) {
    setParam({
      idRequete: props.idRequete,
      idService: utilisateurs.find(utilisateur => utilisateur.idUtilisateur === agent.cle)?.service?.idService,
      idUtilisateur: agent.cle,
      statutRequete: props.estTransfert ? StatutRequete.TRANSFEREE : StatutRequete.A_TRAITER,
      libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${agent.libelle}`,
      estTransfert: props.estTransfert
    });
    setAgentPopinOpen(false);
  }
}

export function listeServicesToOptions(services: IService[]): Options {
  return [
    { cle: "", libelle: "" },
    ...services
      .filter(service => service.estDansScec)
      .sort((a, b) => a.libelleService.localeCompare(b.libelleService))
      .map(service => {
        return { cle: service.idService, libelle: service.libelleService };
      })
  ];
}

export const listeUtilisateursToOptionsBis = (
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  utilisateurConnecte: IOfficier,
  estTransfert: boolean,
  utilisateurs: IUtilisateur[]
): Options => {
  return [
    { cle: "", libelle: "" },
    ...utilisateurs
      .filter(utilisateur =>
        filterUtilisateur(utilisateur, typeRequete, sousTypeRequete, idUtilisateurRequete, utilisateurConnecte, estTransfert)
      )
      .sort((a, b) => a.nom.localeCompare(b.nom))
      .map(utilisateur => mapUtilisateurToOption(utilisateur))
  ];
};

const filterUtilisateur = (
  utilisateur: IUtilisateur,
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  utilisateurConnecte: IOfficier,
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

const filtreUtilisateurRequeteCreation = (utilisateur: IUtilisateur, idUtilisateurRequete: string, utilisateurConnecte: IOfficier) => {
  const aDroit: boolean = utilisateurALeDroitSurUnDesPerimetres(
    Droit.CREER_ACTE_ETABLI,
    [Perimetre.TOUS_REGISTRES, Perimetre.ETAX],
    utilisateur
  );
  let estDansMonServiceOuServiceFils = false;
  if (utilisateur.service) {
    estDansMonServiceOuServiceFils =
      estDansServiceFils(utilisateur.service.idService, utilisateurConnecte) ||
      utilisateur.service.idService === utilisateurConnecte?.service?.idService;
  }
  return Boolean(estDansMonServiceOuServiceFils && aDroit && idUtilisateurRequete !== utilisateur.idUtilisateur);
};

const filtreUtilisateurRequeteInformation = (
  utilisateur: IUtilisateur,
  estTransfert: boolean,
  idUtilisateurRequete: string,
  utilisateurConnecte: IOfficier
): boolean => {
  const estDuSCEC = utilisateur.service?.estDansScec;
  const aDroit = utilisateurADroit(Droit.INFORMER_USAGER, utilisateur);
  let estDansMonServiceOuServiceFils = true;
  if (!estTransfert && utilisateur.service) {
    estDansMonServiceOuServiceFils =
      estDansServiceFils(utilisateur.service?.idService, utilisateurConnecte) ||
      utilisateur.service.idService === utilisateurConnecte?.service?.idService;
  }

  return Boolean(estDuSCEC && aDroit && idUtilisateurRequete !== utilisateur.idUtilisateur && estDansMonServiceOuServiceFils);
};

const filtreUtilisateurRequeteDelivrance = (
  utilisateur: IUtilisateur,
  sousTypeRequete: SousTypeRequete,
  estTransfert: boolean,
  idUtilisateurRequete: string,
  utilisateurConnecte: IOfficier
): boolean => {
  const estDuSCEC = utilisateur.service?.estDansScec;
  const aDroit =
    sousTypeRequete === SousTypeDelivrance.RDDCO
      ? utilisateurADroit(Droit.DELIVRER_COMEDEC, utilisateur)
      : utilisateurADroit(Droit.DELIVRER, utilisateur);
  let estDansMonServiceOuServiceFils = true;
  if (!estTransfert && utilisateur.service) {
    estDansMonServiceOuServiceFils =
      estDansServiceFils(utilisateur.service?.idService, utilisateurConnecte) ||
      utilisateur.service.idService === utilisateurConnecte?.service?.idService;
  }

  return Boolean(estDuSCEC && aDroit && idUtilisateurRequete !== utilisateur.idUtilisateur && estDansMonServiceOuServiceFils);
};

function filtrerValideur(utilisateur: IUtilisateur, idUtilisateurRequete?: string): boolean {
  const estDuSCEC = utilisateur.service?.estDansScec;
  const aDroit = utilisateurADroit(Droit.DELIVRER, utilisateur);

  return Boolean(estDuSCEC && aDroit && idUtilisateurRequete !== utilisateur.idUtilisateur);
}

export function listeValideurToOptions(utilisateurs: IUtilisateur[], idUtilisateurRequete?: string): Options {
  return [
    { cle: "", libelle: "" },
    ...utilisateurs
      .filter(utilisateur => filtrerValideur(utilisateur, idUtilisateurRequete))
      .sort((a, b) => a.nom.localeCompare(b.nom))
      .map(utilisateur => mapUtilisateurToOption(utilisateur))
  ];
}

function mapUtilisateurToOption(utilisateur: IUtilisateur): Option {
  return {
    cle: utilisateur.idUtilisateur,
    libelle: `${utilisateur.nom} ${utilisateur.prenom}`
  };
}

function estDansServiceFils(idService: string, utilisateurConnecte: IOfficier): boolean {
  return Boolean(utilisateurConnecte?.servicesFils?.some(el => el.idService === idService));
}
export function getServicesAsOptions(utilisateurConnecte: IOfficier): Options {
  return (
    utilisateurConnecte?.servicesFils?.map(service => {
      return {
        cle: service.idService,
        libelle: service.libelleService
      };
    }) || ([] as Options)
  );
}
/* v8 ignore end */
