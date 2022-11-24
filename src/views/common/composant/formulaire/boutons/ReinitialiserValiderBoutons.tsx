import { Droit } from "@model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import "./scss/ReinitialiserValiderBoutons.scss";

interface ReinitialiserValiderBoutonsProps {
  afficherBouton: boolean;
  onClickReInitialiser?: any;
  reInitialiserDisabled?: boolean;
  onClickValider?: any;
  validerDisabled?: boolean;
  validationEnCours?: boolean;
}

export const ReinitialiserValiderBoutons: React.FC<
  ReinitialiserValiderBoutonsProps
> = props => {
  return (
    <>
      {props.afficherBouton && (
        <div className="ReinitialiserValiderBoutons">
          <Bouton
            type="reset"
            onClick={props.onClickReInitialiser}
            disabled={props.reInitialiserDisabled}
            aria-label="Réinitialiser"
          >
            {getLibelle("Réinitialiser")}
          </Bouton>
          <Bouton
            type="button"
            onClick={props.onClickValider}
            disabled={
              props.validerDisabled ||
              !officierHabiliterPourLeDroit(Droit.DELIVRER)
            }
            aria-label="Valider"
          >
            {getLibelle("Valider")}
          </Bouton>
        </div>
      )}
    </>
  );
};

type ReinitialiserValiderFormBoutonsProps = ReinitialiserValiderBoutonsProps &
  FormikComponentProps;

const _ReinitialiserValiderFormBoutons: React.FC<
  ReinitialiserValiderFormBoutonsProps
> = props => {
  function getReinitialiserDisabled() {
    return props.reInitialiserDisabled !== undefined
      ? props.reInitialiserDisabled
      : !props.formik.dirty;
  }

  return (
    <ReinitialiserValiderBoutons
      onClickReInitialiser={props.onClickReInitialiser}
      reInitialiserDisabled={getReinitialiserDisabled()}
      onClickValider={
        props.onClickValider !== undefined
          ? props.onClickValider
          : async () => {
              await props.formik.submitForm();
              GestionnaireBlockErreur.scrollALaPremiereErreur();
            }
      }
      validerDisabled={
        props.validerDisabled !== undefined
          ? props.validerDisabled
          : !props.formik.dirty
      }
      afficherBouton={props.afficherBouton}
    />
  );
};

export const ReinitialiserValiderFormBoutons =
  connect<ReinitialiserValiderBoutonsProps>(_ReinitialiserValiderFormBoutons);
