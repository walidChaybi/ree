import * as React from "react";
import {
  IOfficierSSOApi,
  estOfficierHabiliterPourSeulementLesDroits,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits
} from "../../../../model/IOfficierSSOApi";
import { storeRece } from "../storeRece";
import {
  habilitationsDescription,
  IHabiliationDescription,
  NomComposant
} from "./habilitationsDescription";

function getHabilitationPourLeComposant(
  nomComposant: string,
  habsDesc: IHabiliationDescription[]
) {
  return habsDesc.find(habDesc => habDesc.nomComposant === nomComposant);
}

function getComportement(
  habilitationPourLeComposant: IHabiliationDescription,
  utilisateurCourant: IOfficierSSOApi
) {
  const authorise = habilitationPourLeComposant.tousLesDroits
    ? estOfficierHabiliterPourTousLesDroits(
        habilitationPourLeComposant.tousLesDroits
      )
    : habilitationPourLeComposant.unDesDroits
    ? estOfficierHabiliterPourUnDesDroits(
        habilitationPourLeComposant.unDesDroits
      )
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
  class Habilitation extends React.Component<any> {
    public render() {
      let comportementComposant = {};
      let composantEstVisible = true;
      if (storeRece.utilisateurCourant) {
        const habilitationPourLeComposant = getHabilitationPourLeComposant(
          composantId,
          specifiquesHabilitationsDescription
            ? specifiquesHabilitationsDescription
            : habilitationsDescription
        );
        if (habilitationPourLeComposant) {
          comportementComposant = getComportement(
            habilitationPourLeComposant,
            storeRece.utilisateurCourant
          );
          composantEstVisible = visibiliteComposant(
            habilitationPourLeComposant,
            storeRece.utilisateurCourant
          );
        }
      }

      return (
        <>
          {composantEstVisible && (
            <ComponentToWrap {...comportementComposant} {...this.props} />
          )}
        </>
      );
    }
  }

  return Habilitation;
};
export default WithHabilitation;

function visibiliteComposant(
  habilitationPourLeComposant: IHabiliationDescription,
  utilisateurCourant: IOfficierSSOApi
): boolean {
  if (
    habilitationPourLeComposant.visiblePourLesDroits &&
    !estOfficierHabiliterPourUnDesDroits(
      habilitationPourLeComposant.visiblePourLesDroits
    )
  ) {
    return false;
  }
  if (
    habilitationPourLeComposant.visibleSeulementPourLesDroits &&
    !estOfficierHabiliterPourSeulementLesDroits(
      habilitationPourLeComposant.visibleSeulementPourLesDroits
    )
  ) {
    return false;
  }
  return true;
}
