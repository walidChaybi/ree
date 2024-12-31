import { TEXTE_MENTION } from "@composant/formulaire/ConstantesNomsForm";
import { IMetamodeleTypeMention } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMiseAJourMentionsForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { FormikProps, FormikValues } from "formik";
import { useContext, useMemo } from "react";
import * as Yup from "yup";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import SchemaValidation from "../../../../../utils/SchemaValidation";
import AjoutMentionsMiseAJour from "./AjoutMentionsMiseAJour";
import "./scss/MiseAJourMentionsForm.scss";

const SCHEMA_VALIDATION_MENTIONS = {
  [TEXTE_MENTION]: Yup.string().required("Veuillez saisir le texte de la mention")
};

const genererSchemaValidationAideALaSaisie = (metamodeleTypeMention?: IMetamodeleTypeMention) => {
  return metamodeleTypeMention?.metamodelsBlocs.reduce((schemaValidationBlocs, bloc) => {
    const schemaValidationBloc = bloc.champs.reduce((champs, champ) => {
      const validationChamp = (() => {
        switch (champ.type) {
          case "text":
            return SchemaValidation.texte({ libelle: champ.libelle, obligatoire: champ.obligatoire });
          case "int":
            return SchemaValidation.entier({ libelle: champ.libelle, obligatoire: champ.obligatoire });
          case "boolean":
            return SchemaValidation.booleen({ libelle: champ.libelle, obligatoire: champ.obligatoire });
          case "select":
            return SchemaValidation.listeDeroulante({ libelle: champ.libelle, options: champ.options, obligatoire: champ.obligatoire });
          case "dateComplete":
            return SchemaValidation.dateComplete({ libelle: champ.libelle, obligatoire: champ.obligatoire });
          case "dateIncomplete":
            return SchemaValidation.dateIncomplete({ obligatoire: champ.obligatoire });
          default:
            return SchemaValidation.inconnu();
        }
      })();

      return { ...champs, [champ.id]: validationChamp };
    }, {});

    schemaValidationBlocs = { ...schemaValidationBlocs, [bloc.id]: Yup.object(schemaValidationBloc) };
    return schemaValidationBlocs;
  }, {});
};

const genererValeursInitialesAideALaSaisie = (metamodeleTypeMention?: IMetamodeleTypeMention) => {
  return metamodeleTypeMention?.metamodelsBlocs.reduce((valeursInitialesBlocs, bloc) => {
    const valeursInitialesBloc = bloc.champs.reduce((champs, champ) => {
      const valeurInitaleChamp = (() => {
        switch (champ.type) {
          case "text":
          case "int":
            return "";
          case "dateComplete":
          case "dateIncomplete":
            return {
              jour: "",
              mois: "",
              annee: ""
            };
          case "boolean":
            return false;
          case "select":
            return champ.options[0];
          default:
            return "";
        }
      })();

      return { ...champs, [champ.id]: valeurInitaleChamp };
    }, {});

    return { ...valeursInitialesBlocs, [bloc.id]: valeursInitialesBloc };
  }, {});
};

interface IMiseAJourMentionsFormProps {
  typeMentionSelectionne: ITypeMention;
  onValidationMention: (values: IMiseAJourMentionsForm | Record<string, any>) => void;
  onResetFormulaire: () => void;
  refFormulaire?: React.MutableRefObject<FormikProps<FormikValues> | null>;
}

export const MiseAJourMentionsForm: React.FC<IMiseAJourMentionsFormProps> = ({
  typeMentionSelectionne,
  onValidationMention,
  onResetFormulaire,
  refFormulaire
}) => {
  const { indexMentionModifiee, metamodeleTypeMention, listeMentions } = useContext(EditionMiseAJourContext.Valeurs);

  const schemaValidation = useMemo(() => {
    return Yup.object({
      ...SCHEMA_VALIDATION_MENTIONS,
      ...(genererSchemaValidationAideALaSaisie(metamodeleTypeMention) ?? {})
    });
  }, [metamodeleTypeMention]);

  const valeursInitiales = useMemo(() => {
    const valeurParDefautTexte = (() => {
      switch (true) {
        case indexMentionModifiee !== undefined && listeMentions[indexMentionModifiee]?.texte !== undefined:
          return { [TEXTE_MENTION]: indexMentionModifiee ? listeMentions[indexMentionModifiee].texte : "" };
        case Boolean(metamodeleTypeMention):
          return { [TEXTE_MENTION]: metamodeleTypeMention?.modeleHandleBars };
        default:
          return { [TEXTE_MENTION]: "" };
      }
    })();

    return {
      ...(genererValeursInitialesAideALaSaisie(metamodeleTypeMention) ?? {}),
      ...valeurParDefautTexte
    };
  }, [metamodeleTypeMention]);

  return (
    <Formulaire
      formDefaultValues={valeursInitiales}
      formValidationSchema={schemaValidation}
      onSubmit={(values, formik) => {
        onValidationMention(values as unknown as IMiseAJourMentionsForm); // | Record<string, any> pour récupérer dynamiquement les nouveaux champs, pas forcément dans le scope c'est en bonus
        formik?.resetForm();
      }}
      refFormulaire={refFormulaire}
    >
      <AjoutMentionsMiseAJour
        typeMentionSelectionne={typeMentionSelectionne}
        onResetFormulaire={onResetFormulaire}
      />
    </Formulaire>
  );
};
