import { RECEContextData } from "@core/contexts/RECEContext";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext } from "react";

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
            aria-label="Réinitialiser"
            title={titreBoutons ? `Réinitialiser ${titreBoutons}` : undefined}
          >
            {"Réinitialiser"}
          </BoutonDoubleSubmit>
          <BoutonDoubleSubmit
            type="button"
            onClick={onClickValider}
            disabled={validerDisabled || !officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER)}
            aria-label="Valider"
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
  function getReinitialiserDisabled() {
    return props.reInitialiserDisabled ?? !props.formik.dirty;
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
      validerDisabled={props.validerDisabled ?? !props.formik.dirty}
      afficherBouton={props.afficherBouton}
      titreBoutons={props.titreBoutons}
    />
  );
};

export const ReinitialiserValiderFormBoutons = connect<IReinitialiserValiderBoutonsProps>(_ReinitialiserValiderFormBoutons);
