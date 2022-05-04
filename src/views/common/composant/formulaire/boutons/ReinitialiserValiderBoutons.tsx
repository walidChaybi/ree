import { connect } from "formik";
import React from "react";
import { officierHabiliterPourLeDroit } from "../../../../../model/agent/IOfficier";
import { Droit } from "../../../../../model/Droit";
import { getLibelle } from "../../../util/Utils";
import { FormikComponentProps } from "../../../widget/formulaire/utils/FormUtil";
import "./scss/ReinitialiserValiderBoutons.scss";
interface ReinitialiserValiderBoutonsProps {
  onClickReInitialiser?: any;
  reInitialiserDisabled?: boolean;
  onClickValider?: any;
  validerDisabled?: boolean;
}

export const ReinitialiserValiderBoutons: React.FC<
  ReinitialiserValiderBoutonsProps
> = props => {
  return (
    <div className="ReinitialiserValiderBoutons">
      <button
        type="reset"
        onClick={props.onClickReInitialiser}
        disabled={props.reInitialiserDisabled}
        aria-label="Réinitialiser"
      >
        {getLibelle("Réinitialiser")}
      </button>
      <button
        type="button"
        onClick={props.onClickValider}
        disabled={
          props.validerDisabled || !officierHabiliterPourLeDroit(Droit.DELIVRER)
        }
        aria-label="Valider"
      >
        {getLibelle("Valider")}
      </button>
    </div>
  );
};

type ReinitialiserValiderFormBoutonsProps = ReinitialiserValiderBoutonsProps &
  FormikComponentProps;

const _ReinitialiserValiderFormBoutons: React.FC<
  ReinitialiserValiderFormBoutonsProps
> = props => {
  return (
    <ReinitialiserValiderBoutons
      onClickReInitialiser={props.onClickReInitialiser}
      reInitialiserDisabled={
        props.reInitialiserDisabled !== undefined
          ? props.reInitialiserDisabled
          : !props.formik.dirty
      }
      onClickValider={
        props.onClickValider !== undefined
          ? props.onClickValider
          : () => {
              props.formik.submitForm();
            }
      }
      validerDisabled={
        props.validerDisabled !== undefined
          ? props.validerDisabled
          : !props.formik.dirty
      }
    />
  );
};

export const ReinitialiserValiderFormBoutons =
  connect<ReinitialiserValiderBoutonsProps>(_ReinitialiserValiderFormBoutons);
