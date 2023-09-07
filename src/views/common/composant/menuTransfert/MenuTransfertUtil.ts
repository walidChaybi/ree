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
  entite?: Option
) {
  setOperationEnCours(true);
  if (entite) {
    setParam({
      idRequete: props.idRequete,
      idEntite: entite.cle,
      idUtilisateur: "",
      statutRequete: props.estTransfert
        ? StatutRequete.TRANSFEREE
        : StatutRequete.A_TRAITER,
      libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${
        entite.libelle
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
      idEntite: storeRece.listeUtilisateurs.find(
        utilisateur => utilisateur.idUtilisateur === agent.cle
      )?.entite?.idEntite,
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

export function listeEntiteToOptions(): Options {
  return [
    { cle: "", libelle: "" },
    ...storeRece.listeEntite
      .filter(entite => entite.estDansSCEC)
      .sort((a, b) => a.libelleEntite.localeCompare(b.libelleEntite))
      .map(entite => {
        return { cle: entite.idEntite, libelle: entite.libelleEntite };
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
    [Perimetre.MEAE, Perimetre.ETAX],
    utilisateur
  );
  let estDansMonEntiteOuEntiteFille = false;
  if (utilisateur.entite) {
    estDansMonEntiteOuEntiteFille =
      estDansEntiteFille(utilisateur.entite.idEntite) ||
      utilisateur.entite.idEntite ===
        storeRece.utilisateurCourant?.entite?.idEntite;
  }
  return Boolean(
    estDansMonEntiteOuEntiteFille &&
      aDroit &&
      idUtilisateurRequete !== utilisateur.idUtilisateur
  );
}

export function filtreUtilisateurRequeteInformation(
  utilisateur: IUtilisateur,
  idUtilisateurRequete: string,
  estTransfert: boolean
): boolean {
  const estDuSCEC = utilisateur.entite?.estDansSCEC;
  const aDroit = utilisateurADroit(Droit.INFORMER_USAGER, utilisateur);
  let estDansMonEntiteOuEntiteFille = true;
  if (!estTransfert && utilisateur.entite) {
    estDansMonEntiteOuEntiteFille =
      estDansEntiteFille(utilisateur.entite?.idEntite) ||
      utilisateur.entite.idEntite ===
        storeRece.utilisateurCourant?.entite?.idEntite;
  }
  return Boolean(
    estDuSCEC &&
      aDroit &&
      idUtilisateurRequete !== utilisateur.idUtilisateur &&
      estDansMonEntiteOuEntiteFille
  );
}

export function filtreUtilisateurRequeteDelivrance(
  utilisateur: IUtilisateur,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  estTransfert: boolean
): boolean {
  const estDuSCEC = utilisateur.entite?.estDansSCEC;
  const aDroit =
    sousTypeRequete === SousTypeDelivrance.RDDCO
      ? utilisateurADroit(Droit.DELIVRER_COMEDEC, utilisateur)
      : utilisateurADroit(Droit.DELIVRER, utilisateur);
  let estDansMonEntiteOuEntiteFille = true;
  if (!estTransfert && utilisateur.entite) {
    estDansMonEntiteOuEntiteFille =
      estDansEntiteFille(utilisateur.entite?.idEntite) ||
      utilisateur.entite.idEntite ===
        storeRece.utilisateurCourant?.entite?.idEntite;
  }
  return Boolean(
    estDuSCEC &&
      aDroit &&
      idUtilisateurRequete !== utilisateur.idUtilisateur &&
      estDansMonEntiteOuEntiteFille
  );
}

export function filtrerValideur(
  utilisateur: IUtilisateur,
  idUtilisateurRequete?: string
): boolean {
  const estDuSCEC = utilisateur.entite?.estDansSCEC;
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

function estDansEntiteFille(idEntite: string): boolean {
  if (storeRece.utilisateurCourant?.entitesFilles) {
    return storeRece.utilisateurCourant.entitesFilles.some(
      el => el.idEntite === idEntite
    );
  }
  return false;
}
export function getEntiteAsOptions(): Options {
  return (
    storeRece.utilisateurCourant?.entitesFilles?.map(f => {
      return {
        cle: f.idEntite,
        libelle: f.libelleEntite
      };
    }) || ([] as Options)
  );
}
