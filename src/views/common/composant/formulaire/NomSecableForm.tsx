import {
  ABSENCE_VALIDEE,
  DEUX,
  UN,
  ZERO,
  estRenseigne,
  getLibelle
} from "@util/Utils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { WarningMessage } from "@widget/formulaire/erreur/WarningMessage";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback, useState } from "react";
import { NOM_PARTIE1, NOM_PARTIE2, SECABLE } from "./ConstantesNomsForm";

interface ComponentFormProps {
  nomComposant: string;
  nomTitulaire?: string;
  nomPartie1?: string;
  nomPartie2?: string;
  origineTitulaireActe?: boolean;
  saisieVerrouillee: boolean;
  afficherAvertissementVocable: boolean;
}

type NomSecableFormProps = ComponentFormProps & FormikComponentProps;

const NomSecableForm: React.FC<NomSecableFormProps> = props => {
  const [afficheNomSecable, setAfficheNomSecable] = useState<boolean>(
    estRenseigne(props.nomPartie1) && props.nomPartie1 !== ABSENCE_VALIDEE
  );
  const disabled =
    estDisabled(props.nomPartie1, props.origineTitulaireActe) &&
    props.saisieVerrouillee;

    const afficherMessageAvertissement =
      props.afficherAvertissementVocable &&
      EtatCivilUtil.getVocables(props.nomTitulaire).length > DEUX;

  const onCaseACocherNomSecableChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //Provoque un comportement inaproprié : e.preventDefault();
      const nouvelEtatDeAfficheNomSecable = !afficheNomSecable;

      let nomPartie1 = "";
      let nomPartie2 = "";

      // Décompositon du nom du titulaire AM lorsqu'il n'y a deux vocables dans son nom
      if (nouvelEtatDeAfficheNomSecable) {
        const vocables = EtatCivilUtil.getVocables(props.nomTitulaire);
        if (vocables.length > UN) {
          nomPartie1 = vocables[ZERO];
          nomPartie2 = vocables.slice(UN).join(" ");
        }
      }

      setAfficheNomSecable(nouvelEtatDeAfficheNomSecable);

      props.formik.setFieldValue(
        withNamespace(props.nomComposant, NOM_PARTIE1),
        nomPartie1
      );
      props.formik.setFieldValue(
        withNamespace(props.nomComposant, NOM_PARTIE2),
        nomPartie2
      );

      props.formik.handleChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [afficheNomSecable, props.formik, props.nomComposant]
  );

  return (
    <div>
      <CheckboxField
        name={withNamespace(props.nomComposant, SECABLE)}
        label={getLibelle("Nom sécable")}
        values={[{ libelle: "", cle: "true" }]}
        disabled={disabled}
        onChange={onCaseACocherNomSecableChange}
      />
      {afficheNomSecable && (
        <>
          <InputField
            name={withNamespace(props.nomComposant, NOM_PARTIE1)}
            label={getLibelle("1re partie")}
            disabled={disabled}
          />
          <div className="AvertissementConteneur">
            <InputField
              name={withNamespace(props.nomComposant, NOM_PARTIE2)}
              label={getLibelle("2nde partie")}
              disabled={disabled}
            />
            <WarningMessage afficherMessage={afficherMessageAvertissement}>
              {getLibelle("Nom avec plus de deux vocables")}
            </WarningMessage>
          </div>
        </>
      )}
    </div>
  );
};

function estDisabled(nomPartie1?: string, origineTitulaireActe = false) {
  return !origineTitulaireActe || nomPartie1 === ABSENCE_VALIDEE;
}

export default connect<ComponentFormProps>(NomSecableForm);
