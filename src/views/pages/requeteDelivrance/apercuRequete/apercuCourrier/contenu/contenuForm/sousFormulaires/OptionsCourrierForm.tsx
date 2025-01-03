import { CONTENU, LIBELLE_OPTION } from "@composant/formulaire/ConstantesNomsForm";
import { OptionCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import SettingsBackupRestore from "@mui/icons-material/SettingsBackupRestore";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useOptionsCourriersApiHook } from "../../hook/OptionsCourriersHook";
import {
  classNameContenu,
  contenuDisabled,
  initialisationOptions,
  messageOptionVariables,
  recupererLesOptionsDuCourrier,
  reinitialiserDisabled,
  switchOption,
  texteOptionCourrierModifie
} from "./GestionOptionsCourrier";
import { getTableauOptionsChoisies, getTableauOptionsDisponibles } from "./OptionsCourrierFormTableau";
import "./scss/OptionsCourrierForm.scss";

interface OptionsCourrierFormProps {
  optionsChoisies: OptionCourrier[];
  setOptionsChoisies: (options: OptionCourrier[]) => void;
  setCheckOptions: () => void;
  documentDelivranceChoisi?: IDocumentDelivrance | null;
}

export type OptionsCourrierSubFormProps = SubFormProps & OptionsCourrierFormProps;

export const OptionCourrierFormDefaultValues = {
  [LIBELLE_OPTION]: "",
  [CONTENU]: ""
};

export const ValidationSchemaOptionCourrier = Yup.object().shape({
  [LIBELLE_OPTION]: Yup.string(),
  [CONTENU]: Yup.string()
});

const OptionsCourrierForm: React.FC<OptionsCourrierSubFormProps> = props => {
  const [optionsDisponibles, setOptionsDisponibles] = useState<OptionCourrier[]>([]);
  const [optionSelectionnee, setOptionSelectionnee] = useState<OptionCourrier>();

  const optionsCourrierDisponibles = useOptionsCourriersApiHook(props.documentDelivranceChoisi, props.requete as IRequeteDelivrance);

  useEffect(() => {
    props.setCheckOptions();
  }, [props.setCheckOptions, props]);

  useEffect(() => {
    if (props.requete) {
      // Récupérer les options du courrier s'il y a déjà un document réponse
      const optionsDuCourrier = recupererLesOptionsDuCourrier(props.requete, optionsCourrierDisponibles);

      // Trier entre les options par défaut et les options du courrier, pour ne pas avoir de doublon
      const { optsDispos, optsChoisies } = initialisationOptions(optionsCourrierDisponibles, optionsDuCourrier);
      setOptionsDisponibles(optsDispos);
      props.setOptionsChoisies(optsChoisies);
      resetOptionSelectionnee();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsCourrierDisponibles]);

  // Auto-focus sur la 1ere option choisie ayant des variables non-modifiés
  useEffect(() => {
    if (props.optionsChoisies) {
      const optSelectParDefaut = props.optionsChoisies.filter(opt => opt.presenceVariables && !texteOptionCourrierModifie(opt));

      if (optSelectParDefaut[0]) {
        modifierUneOption(optSelectParDefaut[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.optionsChoisies]);

  const ajouterUneOption = (opt: OptionCourrier) => {
    const { disponibles, choisies } = switchOption(opt, optionsDisponibles, props.optionsChoisies, true);
    setOptionsDisponibles(disponibles);
    props.setOptionsChoisies(choisies);
    modifierUneOption(opt);
  };

  const supprimerUneOption = (opt: OptionCourrier) => {
    const { disponibles, choisies } = switchOption(opt, optionsDisponibles, props.optionsChoisies, false);
    setOptionsDisponibles(disponibles);
    props.setOptionsChoisies(choisies);
    modifierUneOption(opt);
  };

  const modifierUneOption = (opt: OptionCourrier) => {
    setOptionSelectionnee(opt);
    props.formik.setFieldValue(withNamespace(props.nom, LIBELLE_OPTION), opt.libelle);
    const texte = opt.texteOptionCourrierModifie ? opt.texteOptionCourrierModifie : opt.texteOptionCourrier;
    props.formik.setFieldValue(withNamespace(props.nom, CONTENU), texte);
  };

  const onChangeContenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (optionSelectionnee?.presenceVariables || optionSelectionnee?.optionLibre) {
      optionSelectionnee.texteOptionCourrierModifie = e.target.value;
      setOptionSelectionnee(optionSelectionnee); // NOSONAR composant à refacto (mauvaise gestion des états formik + lifecycle)
    }
  };

  const reinitialerContenu = () => {
    if (optionSelectionnee) {
      setOptionSelectionnee({
        ...optionSelectionnee,
        texteOptionCourrierModifie: optionSelectionnee.texteOptionCourrier
      });
      props.formik.setFieldValue(withNamespace(props.nom, CONTENU), optionSelectionnee.texteOptionCourrier);
    }
  };

  const resetOptionSelectionnee = () => {
    setOptionSelectionnee(undefined);
    props.formik.setFieldValue(withNamespace(props.nom, LIBELLE_OPTION), "");
    props.formik.setFieldValue(withNamespace(props.nom, CONTENU), "");
  };

  return (
    <SousFormulaire titre={props.titre}>
      {optionsDisponibles.length > 0 || props.optionsChoisies.length > 0 ? (
        <>
          <div className="OptionsCourrierForm">
            <span>
              <label>{"Ajouter un paragraphe"}</label>
              {messageOptionVariables(optionsDisponibles.concat(props.optionsChoisies)) && (
                <p>{"(*) option comportant des variables à saisir"}</p>
              )}
            </span>
            {getTableauOptionsDisponibles(
              optionsDisponibles,
              props.optionsChoisies,
              ajouterUneOption,
              modifierUneOption,
              optionSelectionnee
            )}
            {getTableauOptionsChoisies(props.optionsChoisies, supprimerUneOption, modifierUneOption, optionSelectionnee)}
          </div>
          <div className="TitreContenuOption">{"Contenu option"}</div>
          <div className="LibelleOptionForm">
            <InputField
              name={withNamespace(props.nom, LIBELLE_OPTION)}
              label={"Option"}
              disabled={true}
            />
            {Boolean(optionSelectionnee?.optionATiret) && <div className="OptionTiret">{"Option à tiret"}</div>}
          </div>
          <div className="ContenuOptionForm">
            <InputField
              name={withNamespace(props.nom, CONTENU)}
              label={"Contenu"}
              onInput={onChangeContenu}
              disabled={contenuDisabled(optionSelectionnee, props.optionsChoisies)}
              className={classNameContenu(optionSelectionnee, props.optionsChoisies)}
              component={"textarea"}
            />
            <button
              type="button"
              onClick={reinitialerContenu}
              disabled={reinitialiserDisabled(optionSelectionnee, props.optionsChoisies)}
              title={"Rappel du modèle de l'option"}
            >
              <SettingsBackupRestore />
            </button>
          </div>
        </>
      ) : (
        <span className="PasOptions">
          <p>{"Pas d'options pour ce courrier"}</p>
        </span>
      )}
    </SousFormulaire>
  );
};

export default connect(OptionsCourrierForm);
