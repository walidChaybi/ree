import { RECEContextData } from "@core/contexts/RECEContext";
import {
  estOfficierHabiliterPourSeulementLesDroits,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits,
  IOfficier
} from "@model/agent/IOfficier";
import * as React from "react";
import { useContext } from "react";
import { habilitationsDescription, IHabiliationDescription, NomComposant } from "./habilitationsDescription";

function getHabilitationPourLeComposant(nomComposant: string, habsDesc: IHabiliationDescription[]) {
  return habsDesc.find(habDesc => habDesc.nomComposant === nomComposant);
}

function getComportement(habilitationPourLeComposant: IHabiliationDescription, utilisateurConnecte: IOfficier) {
  const authorise = habilitationPourLeComposant.tousLesDroits
    ? estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, habilitationPourLeComposant.tousLesDroits)
    : habilitationPourLeComposant.unDesDroits
      ? estOfficierHabiliterPourUnDesDroits(utilisateurConnecte, habilitationPourLeComposant.unDesDroits)
      : true;
  return authorise
    ? habilitationPourLeComposant.comportementSiAutorise
      ? habilitationPourLeComposant.comportementSiAutorise
      : {}
    : habilitationPourLeComposant.comportementSiNonAutorise;
}
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

function visibiliteComposant(habilitationPourLeComposant: IHabiliationDescription, utilisateurConnecte: IOfficier): boolean {
  if (
    habilitationPourLeComposant.visiblePourLesDroits &&
    !estOfficierHabiliterPourUnDesDroits(utilisateurConnecte, habilitationPourLeComposant.visiblePourLesDroits)
  ) {
    return false;
  }
  if (
    habilitationPourLeComposant.visibleSeulementPourLesDroits &&
    !estOfficierHabiliterPourSeulementLesDroits(utilisateurConnecte, habilitationPourLeComposant.visibleSeulementPourLesDroits)
  ) {
    return false;
  }
  return true;
}
