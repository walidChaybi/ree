import { TransfertUnitaireParams } from "@hook/requete/TransfertHook";
import {
  IUtilisateur,
  utilisateurADroit,
  utilisateurALeDroitSurUnDesPerimetres
} from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { DoubleClicUtil } from "@util/DoubleClicUtil";
import { Option, Options } from "@util/Type";
import { storeRece } from "@util/storeRece";
import { MutableRefObject } from "react";
import { Perimetre } from "./../../../../model/agent/enum/Perimetre";
import { IMenuTransfertProps } from "./MenuTransfert";

export function onValidateService(
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  setParam: React.Dispatch<
    React.SetStateAction<TransfertUnitaireParams | undefined>
  >,
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
      statutRequete: props.estTransfert
        ? StatutRequete.TRANSFEREE
        : StatutRequete.A_TRAITER,
      libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${
        service.libelle
      }`,
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
  setParam: React.Dispatch<
    React.SetStateAction<TransfertUnitaireParams | undefined>
  >,
  props: React.PropsWithChildren<IMenuTransfertProps>,
  setAgentPopinOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOperationEnCours: (operation: boolean) => void,
  agent?: Option
) {
  setOperationEnCours(true);
  if (agent) {
    setParam({
      idRequete: props.idRequete,
      idService: storeRece.listeUtilisateurs.find(
        utilisateur => utilisateur.idUtilisateur === agent.cle
      )?.service?.idService,
      idUtilisateur: agent.cle,
      statutRequete: props.estTransfert
        ? StatutRequete.TRANSFEREE
        : StatutRequete.A_TRAITER,
      libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${
        agent.libelle
      }`,
      estTransfert: props.estTransfert
    });
    setAgentPopinOpen(false);
  }
}

export function listeServicesToOptions(): Options {
  return [
    { cle: "", libelle: "" },
    ...storeRece.listeServices
      .filter(service => service.estDansSCEC)
      .sort((a, b) => a.libelleService.localeCompare(b.libelleService))
      .map(service => {
        return { cle: service.idService, libelle: service.libelleService };
      })
  ];
}

export function listeUtilisateursToOptionsBis(
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  estTransfert: boolean
): Options {
  return [
    { cle: "", libelle: "" },
    ...storeRece.listeUtilisateurs
      .filter(utilisateur =>
        filterUtilisateur(
          utilisateur,
          typeRequete,
          sousTypeRequete,
          idUtilisateurRequete,
          estTransfert
        )
      )
      .sort((a, b) => a.nom.localeCompare(b.nom))
      .map(utilisateur => mapUtilisateurToOption(utilisateur))
  ];
}

export function filterUtilisateur(
  utilisateur: IUtilisateur,
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  estTransfert: boolean
) {
  if (typeRequete === TypeRequete.CREATION) {
    return filtreUtilisateurRequeteCreation(utilisateur, idUtilisateurRequete);
  } else if (typeRequete === TypeRequete.DELIVRANCE) {
    return filtreUtilisateurRequeteDelivrance(
      utilisateur,
      sousTypeRequete,
      idUtilisateurRequete,
      estTransfert
    );
  } else {
    return filtreUtilisateurRequeteInformation(
      utilisateur,
      idUtilisateurRequete,
      estTransfert
    );
  }
}

export function filtreUtilisateurRequeteCreation(
  utilisateur: IUtilisateur,
  idUtilisateurRequete: string
) {
  const aDroit: boolean = utilisateurALeDroitSurUnDesPerimetres(
    Droit.CREER_ACTE_ETABLI,
    [Perimetre.TOUS_REGISTRES, Perimetre.ETAX],
    utilisateur
  );
  let estDansMonServiceOuServiceFils = false;
  if (utilisateur.service) {
    estDansMonServiceOuServiceFils =
      estDansServiceFils(utilisateur.service.idService) ||
      utilisateur.service.idService ===
        storeRece.utilisateurCourant?.service?.idService;
  }
  return Boolean(
    estDansMonServiceOuServiceFils &&
      aDroit &&
      idUtilisateurRequete !== utilisateur.idUtilisateur
  );
}

export function filtreUtilisateurRequeteInformation(
  utilisateur: IUtilisateur,
  idUtilisateurRequete: string,
  estTransfert: boolean
): boolean {
  const estDuSCEC = utilisateur.service?.estDansSCEC;
  const aDroit = utilisateurADroit(Droit.INFORMER_USAGER, utilisateur);
  let estDansMonServiceOuServiceFils = true;
  if (!estTransfert && utilisateur.service) {
    estDansMonServiceOuServiceFils =
      estDansServiceFils(utilisateur.service?.idService) ||
      utilisateur.service.idService ===
        storeRece.utilisateurCourant?.service?.idService;
  }
  return Boolean(
    estDuSCEC &&
      aDroit &&
      idUtilisateurRequete !== utilisateur.idUtilisateur &&
      estDansMonServiceOuServiceFils
  );
}

export function filtreUtilisateurRequeteDelivrance(
  utilisateur: IUtilisateur,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  estTransfert: boolean
): boolean {
  const estDuSCEC = utilisateur.service?.estDansSCEC;
  const aDroit =
    sousTypeRequete === SousTypeDelivrance.RDDCO
      ? utilisateurADroit(Droit.DELIVRER_COMEDEC, utilisateur)
      : utilisateurADroit(Droit.DELIVRER, utilisateur);
  let estDansMonServiceOuServiceFils = true;
  if (!estTransfert && utilisateur.service) {
    estDansMonServiceOuServiceFils =
      estDansServiceFils(utilisateur.service?.idService) ||
      utilisateur.service.idService ===
        storeRece.utilisateurCourant?.service?.idService;
  }
  return Boolean(
    estDuSCEC &&
      aDroit &&
      idUtilisateurRequete !== utilisateur.idUtilisateur &&
      estDansMonServiceOuServiceFils
  );
}

export function filtrerValideur(
  utilisateur: IUtilisateur,
  idUtilisateurRequete?: string
): boolean {
  const estDuSCEC = utilisateur.service?.estDansSCEC;
  const aDroit = utilisateurADroit(Droit.DELIVRER, utilisateur);

  return Boolean(
    estDuSCEC && aDroit && idUtilisateurRequete !== utilisateur.idUtilisateur
  );
}

export function listeValideurToOptions(idUtilisateurRequete?: string): Options {
  return [
    { cle: "", libelle: "" },
    ...storeRece.listeUtilisateurs
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

function estDansServiceFils(idService: string): boolean {
  if (storeRece.utilisateurCourant?.servicesFils) {
    return storeRece.utilisateurCourant.servicesFils.some(
      el => el.idService === idService
    );
  }
  return false;
}
export function getServicesAsOptions(): Options {
  return (
    storeRece.utilisateurCourant?.servicesFils?.map(service => {
      return {
        cle: service.idService,
        libelle: service.libelleService
      };
    }) || ([] as Options)
  );
}
