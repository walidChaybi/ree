import * as React from "react";
import {
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits
} from "../../../../model/Habilitation";
import { storeRece } from "../storeRece";
import {
  habilitationsDescription,
  IHabiliationDescription,
  NomComposant
} from "./habilitationsDescription";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";

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
        utilisateurCourant,
        habilitationPourLeComposant.tousLesDroits
      )
    : habilitationPourLeComposant.unDesDroits
    ? estOfficierHabiliterPourUnDesDroits(
        utilisateurCourant,
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
  composantId?: NomComposant,
  specifiquesHabilitationsDescription?: IHabiliationDescription[]
) => {
  class Habilitation extends React.Component<any> {
    public render() {
      let comportementComposant = {};
      let composantEstVisible = true;
      if (storeRece.utilisateurCourant) {
        const habilitationPourLeComposant = getHabilitationPourLeComposant(
          composantId ? composantId : ComponentToWrap.name,
          specifiquesHabilitationsDescription
            ? specifiquesHabilitationsDescription
            : habilitationsDescription
        );
        if (habilitationPourLeComposant) {
          comportementComposant = getComportement(
            habilitationPourLeComposant,
            storeRece.utilisateurCourant
          );
          if (
            habilitationPourLeComposant.visiblePourLesDroits &&
            !estOfficierHabiliterPourUnDesDroits(
              storeRece.utilisateurCourant,
              habilitationPourLeComposant.visiblePourLesDroits
            )
          ) {
            composantEstVisible = false;
          }
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
