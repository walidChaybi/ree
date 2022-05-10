import { SettingsBackupRestore } from "@material-ui/icons";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { DocumentDelivrance } from "../../../../../../../../model/requete/enum/DocumentDelivrance";
import {
  OptionCourrier,
  OptionsCourrier
} from "../../../../../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../../../model/requete/IRequeteDelivrance";
import { getLibelle } from "../../../../../../../common/util/Utils";
import { InputField } from "../../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SousFormulaire } from "../../../../../../../common/widget/formulaire/SousFormulaire";
import {
  SubFormProps,
  withNamespace
} from "../../../../../../../common/widget/formulaire/utils/FormUtil";
import { useOptionsCourriersApiHook } from "../../hook/OptionsCourriersHook";
import { CONTENU, LIBELLE_OPTION } from "../../modelForm/ISaisiePageModel";
import {
  classNameContenu,
  contenuDisabled,
  initialisationOptions,
  messageOptionVariables,
  optionAPuce,
  optionOptionLibre,
  optionPresenceVariables,
  recupererLesOptionsDuCourrier,
  reinitialiserDisabled,
  switchOption
} from "./GestionOptionsCourrier";
import {
  getTableauOptionsChoisies,
  getTableauOptionsDisponibles
} from "./OptionsCourrierFormTableau";
import "./scss/OptionsCourrierForm.scss";

interface OptionsCourrierFormProps {
  optionsChoisies: OptionsCourrier;
  setOptionsChoisies: (options: OptionsCourrier) => void;
  setCheckOptions: () => void;
  documentDelivranceChoisi?: DocumentDelivrance;
}

export type OptionsCourrierSubFormProps = SubFormProps &
  OptionsCourrierFormProps;

export const OptionCourrierFormDefaultValues = {
  [LIBELLE_OPTION]: "",
  [CONTENU]: ""
};

export const ValidationSchemaOptionCourrier = Yup.object().shape({
  [LIBELLE_OPTION]: Yup.string(),
  [CONTENU]: Yup.string()
});

const OptionsCourrierForm: React.FC<OptionsCourrierSubFormProps> = props => {
  const [optionsDisponibles, setOptionsDisponibles] = useState<OptionsCourrier>(
    []
  );
  const [optionSelectionne, setOptionSelectionne] = useState<OptionCourrier>();

  const optionsCourrierDisponibles = useOptionsCourriersApiHook(
    props.documentDelivranceChoisi,
    props.requete as IRequeteDelivrance
  );

  useEffect(() => {
    props.setCheckOptions();
  }, [props.setCheckOptions, props]);

  useEffect(() => {
    if (props.requete) {
      // Récupérer les options du courrier s'il y a déjà un document réponse
      const optionsDuCourrier = recupererLesOptionsDuCourrier(
        props.requete,
        optionsCourrierDisponibles
      );

      // Trier entre les options par défaut et les options du courrier, pour ne pas avoir de doublon
      const { optsDispos, optsChoisies } = initialisationOptions(
        optionsCourrierDisponibles,
        optionsDuCourrier
      );
      setOptionsDisponibles(optsDispos);
      props.setOptionsChoisies(optsChoisies);
      resetOptionSelectionne();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsCourrierDisponibles]);

  const ajouterUneOption = (opt: OptionCourrier) => {
    const { optionsAvecAjout, optionsAvecSuppression } = switchOption(
      opt,
      props.optionsChoisies,
      optionsDisponibles
    );
    setOptionsDisponibles(optionsAvecSuppression);
    props.setOptionsChoisies(optionsAvecAjout);
    modifierUneOption(opt);
  };

  const supprimerUneOption = (opt: OptionCourrier) => {
    const { optionsAvecAjout, optionsAvecSuppression } = switchOption(
      opt,
      optionsDisponibles,
      props.optionsChoisies
    );
    setOptionsDisponibles(optionsAvecAjout);
    props.setOptionsChoisies(optionsAvecSuppression);
    modifierUneOption(opt);
  };

  const modifierUneOption = (opt: OptionCourrier) => {
    setOptionSelectionne(opt);
    props.formik.setFieldValue(
      withNamespace(props.nom, LIBELLE_OPTION),
      opt.libelle
    );
    const texte = opt.texteOptionCourrierModifier
      ? opt.texteOptionCourrierModifier
      : opt.texteOptionCourrier;
    props.formik.setFieldValue(withNamespace(props.nom, CONTENU), texte);
  };

  const onChangeContenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      optionSelectionne &&
      (optionPresenceVariables(optionSelectionne) ||
        optionOptionLibre(optionSelectionne))
    ) {
      optionSelectionne.texteOptionCourrierModifier = e.target.value;
      setOptionSelectionne(optionSelectionne);
    }
  };

  const reinitialerContenu = () => {
    if (optionSelectionne) {
      optionSelectionne.texteOptionCourrierModifier =
        optionSelectionne.texteOptionCourrier;
      setOptionSelectionne(optionSelectionne);
      props.formik.setFieldValue(
        withNamespace(props.nom, CONTENU),
        optionSelectionne.texteOptionCourrier
      );
    }
  };

  const resetOptionSelectionne = () => {
    setOptionSelectionne(undefined);
    props.formik.setFieldValue(withNamespace(props.nom, LIBELLE_OPTION), "");
    props.formik.setFieldValue(withNamespace(props.nom, CONTENU), "");
  };

  return (
    <SousFormulaire titre={props.titre}>
      {optionsDisponibles.length > 0 || props.optionsChoisies.length > 0 ? (
        <>
          <div className="OptionsCourrierForm">
            <span>
              <label>{getLibelle("Ajouter un paragraphe")}</label>
              {messageOptionVariables(
                optionsDisponibles.concat(props.optionsChoisies)
              ) && (
                <p>
                  {getLibelle("(*) option comportant des variables à saisir")}
                </p>
              )}
            </span>
            {getTableauOptionsDisponibles(
              optionsDisponibles,
              props.optionsChoisies,
              ajouterUneOption,
              modifierUneOption,
              optionSelectionne
            )}
            {getTableauOptionsChoisies(
              props.optionsChoisies,
              supprimerUneOption,
              modifierUneOption,
              optionSelectionne
            )}
          </div>
          <div className="TitreContenuOption">
            {getLibelle("Contenu option")}
          </div>
          <div className="LibelleOptionForm">
            <InputField
              name={withNamespace(props.nom, LIBELLE_OPTION)}
              label={getLibelle("Option")}
              disabled={true}
            />
            {optionAPuce(optionSelectionne) && (
              <div className="OptionPuce">{getLibelle("Option à puce(s)")}</div>
            )}
          </div>
          <div className="ContenuOptionForm">
            <InputField
              name={withNamespace(props.nom, CONTENU)}
              label={getLibelle("Contenu")}
              onInput={onChangeContenu}
              disabled={contenuDisabled(
                optionSelectionne,
                props.optionsChoisies
              )}
              className={classNameContenu(
                optionSelectionne,
                props.optionsChoisies
              )}
              component={"textarea"}
            />
            <button
              type="button"
              onClick={reinitialerContenu}
              disabled={reinitialiserDisabled(
                optionSelectionne,
                props.optionsChoisies
              )}
              title={getLibelle("Rappel du modèle de l'option")}
            >
              <SettingsBackupRestore />
            </button>
          </div>
        </>
      ) : (
        <span className="PasOptions">
          <p>{getLibelle("Pas d'options pour ce courrier")}</p>
        </span>
      )}
    </SousFormulaire>
  );
};

export default connect(OptionsCourrierForm);
