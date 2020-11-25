import * as React from "react";
import { estOfficierHabiliterPourLesDroits } from "../../../../model/Habilitation";
import { storeRece } from "../storeRece";
import {
  habilitationsDescription,
  IHabiliationDescription
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
  const authorise = estOfficierHabiliterPourLesDroits(
    utilisateurCourant,
    habilitationPourLeComposant.droits
  );
  return authorise
    ? habilitationPourLeComposant.comportementSiAutorise
      ? habilitationPourLeComposant.comportementSiAutorise
      : {}
    : habilitationPourLeComposant.comportementSiNonAutorise;
}
/**
 * HOC permettant d'injecter un comportement à un composant en fonction des droits de l'utilisateur connecté
 * ComponentToWrap: composant recevant un comportement (props) en fonction des droits
 * specifiquesHabilitationsDescription: il est possible de passer des descriptions d'habilitations spécifiques qui remplacent celles de l'application (cf. habilitationsDescription.ts)
 */
const WithHabilitation = (
  ComponentToWrap: any,
  specifiquesHabilitationsDescription?: IHabiliationDescription[]
) => {
  class Habilitation extends React.Component<any> {
    public render() {
      let comportementComposant = {};
      let composantEstVisible = true;
      if (storeRece.utilisateurCourant) {
        const habilitationPourLeComposant = getHabilitationPourLeComposant(
          ComponentToWrap.name,
          specifiquesHabilitationsDescription
            ? specifiquesHabilitationsDescription
            : habilitationsDescription
        );
        if (habilitationPourLeComposant) {
          if (habilitationPourLeComposant.nonvisibleSiNonAutorise) {
            composantEstVisible = false;
          } else {
            comportementComposant = getComportement(
              habilitationPourLeComposant,
              storeRece.utilisateurCourant
            );
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
