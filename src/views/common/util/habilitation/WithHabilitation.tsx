import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import * as React from "react";
import { useContext } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import { IHabiliationDescription, NomComposant, habilitationsDescription } from "./habilitationsDescription";

const getHabilitationPourLeComposant = (nomComposant: string, habsDesc: IHabiliationDescription[]) => {
  return habsDesc.find(habDesc => habDesc.nomComposant === nomComposant);
};

const getComportement = (habilitationPourLeComposant: IHabiliationDescription, utilisateurConnecte: UtilisateurConnecte) => {
  const authorise = habilitationPourLeComposant.tousLesDroits
    ? utilisateurConnecte.estHabilitePour({ tousLesDroits: habilitationPourLeComposant.tousLesDroits })
    : habilitationPourLeComposant.unDesDroits
      ? utilisateurConnecte.estHabilitePour({ unDesDroits: habilitationPourLeComposant.unDesDroits })
      : true;
  return authorise
    ? habilitationPourLeComposant.comportementSiAutorise
      ? habilitationPourLeComposant.comportementSiAutorise
      : {}
    : habilitationPourLeComposant.comportementSiNonAutorise;
};
/**
 * HOC permettant d'injecter un comportement à un composant en fonction des droits de l'utilisateur connecté
 * ComponentToWrap: composant recevant un comportement (props) en fonction des droits
 * specifiquesHabilitationsDescription: il est possible de passer des descriptions d'habilitations spécifiques qui
 * remplacent celles de l'application (cf. habilitationsDescription.ts)
 */
const WithHabilitation = (
  ComponentToWrap: any,
  composantId: NomComposant,
  specifiquesHabilitationsDescription?: IHabiliationDescription[]
) => {
  const Habilitation: React.FC<any> = props => {
    const { utilisateurConnecte } = useContext(RECEContextData);
    let comportementComposant = {};
    let composantEstVisible = true;
    if (utilisateurConnecte) {
      const habilitationPourLeComposant = getHabilitationPourLeComposant(
        composantId,
        specifiquesHabilitationsDescription ? specifiquesHabilitationsDescription : habilitationsDescription
      );
      if (habilitationPourLeComposant) {
        comportementComposant = getComportement(habilitationPourLeComposant, utilisateurConnecte);
        composantEstVisible = visibiliteComposant(habilitationPourLeComposant, utilisateurConnecte);
      }
    }

    return (
      <>
        {composantEstVisible && (
          <ComponentToWrap
            {...comportementComposant}
            {...props}
          />
        )}
      </>
    );
  };
  return Habilitation;
};

export default WithHabilitation;

const visibiliteComposant = (habilitationPourLeComposant: IHabiliationDescription, utilisateurConnecte: UtilisateurConnecte): boolean => {
  if (
    habilitationPourLeComposant.visiblePourLesDroits &&
    !utilisateurConnecte.estHabilitePour({ unDesDroits: habilitationPourLeComposant.visiblePourLesDroits })
  ) {
    return false;
  }
  if (
    habilitationPourLeComposant.visibleSeulementPourLesDroits &&
    !(
      utilisateurConnecte.nombreHabilitations === habilitationPourLeComposant.visibleSeulementPourLesDroits.length &&
      utilisateurConnecte.estHabilitePour({ tousLesDroits: habilitationPourLeComposant.visibleSeulementPourLesDroits })
    )
  ) {
    return false;
  }
  return true;
};
