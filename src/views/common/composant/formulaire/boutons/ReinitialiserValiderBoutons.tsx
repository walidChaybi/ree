import { Droit } from "@model/agent/enum/Droit";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";

interface IReinitialiserValiderBoutonsProps {
  afficherBouton: boolean;
  onClickReInitialiser?: any;
  reInitialiserDisabled?: boolean;
  onClickValider?: any;
  validerDisabled?: boolean;
  titreBoutons?: string;
}

export const ReinitialiserValiderBoutons: React.FC<IReinitialiserValiderBoutonsProps> = ({
  afficherBouton,
  onClickReInitialiser,
  reInitialiserDisabled,
  onClickValider,
  validerDisabled,
  titreBoutons
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);

  return (
    <>
      {afficherBouton && (
        <div className="sticky bottom-8">
          <BoutonDoubleSubmit
            type="reset"
            onClick={onClickReInitialiser}
            disabled={reInitialiserDisabled}
            title={titreBoutons ? `Réinitialiser ${titreBoutons}` : undefined}
          >
            {"Réinitialiser"}
          </BoutonDoubleSubmit>
          <BoutonDoubleSubmit
            type="button"
            onClick={onClickValider}
            disabled={validerDisabled || !utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER })}
            title={titreBoutons ? `Valider ${titreBoutons}` : undefined}
          >
            {"Valider"}
          </BoutonDoubleSubmit>
        </div>
      )}
    </>
  );
};

type TReinitialiserValiderFormBoutonsProps = IReinitialiserValiderBoutonsProps & FormikComponentProps;

const _ReinitialiserValiderFormBoutons: React.FC<TReinitialiserValiderFormBoutonsProps> = props => {
  const getReinitialiserDisabled = () => {
    return props.reInitialiserDisabled ?? !props.formik.dirty;
  };

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
      validerDisabled={props.validerDisabled ?? !props.formik.dirty}
      afficherBouton={props.afficherBouton}
      titreBoutons={props.titreBoutons}
    />
  );
};

export const ReinitialiserValiderFormBoutons = connect<IReinitialiserValiderBoutonsProps>(_ReinitialiserValiderFormBoutons);
