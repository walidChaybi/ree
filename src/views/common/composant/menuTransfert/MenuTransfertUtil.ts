import {
  IUtilisateur,
  utilisateurADroit
} from "../../../../model/agent/IUtilisateur";
import { Droit } from "../../../../model/Droit";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "../../../../model/requete/enum/SousTypeRequete";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import { IActionOption } from "../../../../model/requete/IActionOption";
import { TransfertParams } from "../../hook/requete/TransfertHook";
import { DoubleSubmitUtil } from "../../util/DoubleSubmitUtil";
import { storeRece } from "../../util/storeRece";
import { Option, Options } from "../../util/Type";
import { IMenuTransfertProps } from "./MenuTransfert";

export function onValidateService(
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  setParam: React.Dispatch<React.SetStateAction<TransfertParams | undefined>>,
  props: React.PropsWithChildren<IMenuTransfertProps>,
  setServicePopinOpen: React.Dispatch<React.SetStateAction<boolean>>,
  entite?: Option
) {
  setOperationEnCours(true);
  if (entite) {
    setParam({
      idRequete: props.idRequete,
      idEntite: entite.value,
      idUtilisateur: "",
      statutRequete: props.estTransfert
        ? StatutRequete.TRANSFEREE
        : StatutRequete.A_TRAITER,
      libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${
        entite.str
      }`,
      estTransfert: props.estTransfert
    });
    setServicePopinOpen(false);
  }
}

export function resetDoubleSubmit(
  reponseSansDelivranceCSOptions: IActionOption[]
) {
  reponseSansDelivranceCSOptions.forEach(el => {
    DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
  });
}

export function onValidateAgent(
  setParam: React.Dispatch<React.SetStateAction<TransfertParams | undefined>>,
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
        utilisateur => utilisateur.idUtilisateur === agent.value
      )?.entite?.idEntite,
      idUtilisateur: agent.value,
      statutRequete: props.estTransfert
        ? StatutRequete.TRANSFEREE
        : StatutRequete.A_TRAITER,
      libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${
        agent.str
      }`,
      estTransfert: props.estTransfert
    });
    setAgentPopinOpen(false);
  }
}

export function listeEntiteToOptions(): Options {
  return [
    { value: "", str: "" },
    ...storeRece.listeEntite
      .filter(entite => entite.estDansSCEC)
      .sort((a, b) => a.libelleEntite.localeCompare(b.libelleEntite))
      .map(entite => {
        return { value: entite.idEntite, str: entite.libelleEntite };
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
    { value: "", str: "" },
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
      .map(utilisateur => {
        return {
          value: utilisateur.idUtilisateur,
          str: `${utilisateur.nom} ${utilisateur.prenom}`
        };
      })
  ];
}

export function filterUtilisateur(
  utilisateur: IUtilisateur,
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  idUtilisateurRequete: string,
  estTransfert: boolean
) {
  if (typeRequete === TypeRequete.DELIVRANCE) {
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

function estDansEntiteFille(idEntite: string) {
  if (storeRece.utilisateurCourant?.entitesFilles) {
    return storeRece.utilisateurCourant.entitesFilles.some(
      el => el.idEntite === idEntite
    );
  } else return false;
}
