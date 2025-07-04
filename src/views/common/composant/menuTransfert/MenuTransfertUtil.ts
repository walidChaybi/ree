import { TransfertUnitaireParams } from "@hook/requete/TransfertHook";
import { IService } from "@model/agent/IService";
import { Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
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
  utilisateurs: Utilisateur[],
  agent?: Option
) {
  setOperationEnCours(true);
  if (agent) {
    setParam({
      idRequete: props.idRequete,
      idService: utilisateurs.find(utilisateur => utilisateur.id === agent.cle)?.idService,
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
  utilisateurConnecte: UtilisateurConnecte,
  estTransfert: boolean,
  utilisateurs: Utilisateur[]
): Options => {
  return [
    { cle: "", libelle: "" },
    ...utilisateurs
      .filter(utilisateur =>
        filterUtilisateur(utilisateur, typeRequete, sousTypeRequete, idUtilisateurRequete, utilisateurConnecte, estTransfert)
      )
      .sort((a, b) => a.prenomNom.localeCompare(b.prenomNom))
      .map(utilisateur => mapUtilisateurToOption(utilisateur))
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

export function listeValideurToOptions(utilisateurs: Utilisateur[], idUtilisateurRequete?: string): Options {
  return [
    { cle: "", libelle: "" },
    ...utilisateurs
      .filter(utilisateur => filtrerValideur(utilisateur, idUtilisateurRequete))
      .sort((a, b) => a.prenomNom.localeCompare(b.prenomNom))
      .map(utilisateur => mapUtilisateurToOption(utilisateur))
  ];
}

function mapUtilisateurToOption(utilisateur: Utilisateur): Option {
  return {
    cle: utilisateur.id,
    libelle: utilisateur.prenomNom
  };
}
/* v8 ignore end */
