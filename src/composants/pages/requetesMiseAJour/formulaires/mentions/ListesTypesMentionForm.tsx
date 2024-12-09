import { CONFIG_GET_METAMODELE_TYPE_MENTION } from "@api/configurations/requete/miseAJour/GetMetamodeleTypeMentionConfigApi";
import { MENTION_NIVEAU_DEUX, MENTION_NIVEAU_TROIS, MENTION_NIVEAU_UN, TEXTE_MENTION } from "@composant/formulaire/ConstantesNomsForm";
import { IMetamodeleTypeMention } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { logError } from "@util/LogManager";
import { Options } from "@util/Type";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { OptionVide, SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { ISubForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import "./scss/MiseAJourMentionsForm.scss";

interface IListesTypesMentionForm {
  natureActe: NatureActe;
  setEstTypeMentionSelectionne: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListesTypesMentionForm: React.FC<IListesTypesMentionForm & SubFormProps> = ({
  formik,
  nom,
  natureActe,
  setEstTypeMentionSelectionne
}) => {
  const listeNiveau1 = TypeMention.getTypeMentionAsOptions([...TypeMention.getTypeMentionParNatureActe(natureActe)]);
  const [listeNiveau2, setListeNiveau2] = useState<Options>();
  const [listeNiveau3, setListeNiveau3] = useState<Options>();
  const [afficherTexteMention, setAfficherTexteMention] = useState<boolean>(false);
  const [idMentionTypeInformatise, setIdMentionTypeInformatise] = useState<string | null>(null);
  const [metamodeleTypeMention, setMetamodeleTypeMention] = useState<IMetamodeleTypeMention>();

  const { indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);
  const { appelApi: appelApiGetMetamodeleTypeMention } = useFetchApi(CONFIG_GET_METAMODELE_TYPE_MENTION);

  const NOM_CHAMP_MENTION_NIVEAU_UN = withNamespace(nom, MENTION_NIVEAU_UN);
  const NOM_CHAMP_MENTION_NIVEAU_DEUX = withNamespace(nom, MENTION_NIVEAU_DEUX);
  const NOM_CHAMP_MENTION_NIVEAU_TROIS = withNamespace(nom, MENTION_NIVEAU_TROIS);

  const formikValueInputUn = useMemo(
    () => formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value,
    [formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value]
  );
  const formikValueInputDeux = useMemo(
    () => formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_DEUX).value,
    [formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_DEUX).value]
  );
  const formikValueInputTrois = useMemo(
    () => formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_TROIS).value,
    [formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_TROIS).value]
  );

  useEffect(() => {
    if (indexMentionModifiee !== undefined) {
      setListeNiveau2([]);
      setListeNiveau3([]);
    }
  }, [indexMentionModifiee]);

  const resetFormikInput = (namespaceToReset: string[]) => {
    namespaceToReset.forEach(namespace => {
      formik.setFieldValue(namespace, "");
    });
    if (namespaceToReset.includes(NOM_CHAMP_MENTION_NIVEAU_DEUX)) setListeNiveau2(undefined);
    if (namespaceToReset.includes(NOM_CHAMP_MENTION_NIVEAU_TROIS)) setListeNiveau3(undefined);
  };

  const idTypeMentionInformatiseSelectionne = useMemo(() => {
    if (!gestionnaireFeatureFlag.estActif(FeatureFlag.FF_AIDE_A_LA_SAISIE_MENTION)) return null;

    const typeMentionUn = TypeMention.getTypesMention().find(mention => mention.id === formikValueInputUn);
    const typeMentionDeux = typeMentionUn?.sousTypes?.find(mention => mention.id === formikValueInputDeux);
    const typeMentionTrois = typeMentionDeux?.sousTypes?.find(mention => mention.id === formikValueInputTrois);
    if (typeMentionTrois?.estSaisieAssistee) {
      return typeMentionTrois.id;
    } else if (typeMentionDeux?.estSaisieAssistee) {
      return typeMentionDeux.id;
    } else if (typeMentionUn?.estSaisieAssistee) {
      return typeMentionUn.id;
    } else {
      return null;
    }
  }, [formikValueInputUn, formikValueInputDeux, formikValueInputTrois]);

  useEffect(() => {
    if (formikValueInputUn) {
      setEstTypeMentionSelectionne(true);
      const mentionsSelectionne = TypeMention.getTypesMention().find(mention => mention.id === formikValueInputUn);
      if (mentionsSelectionne?.sousTypes) {
        setListeNiveau2(TypeMention.getTypeMentionAsOptions(mentionsSelectionne.sousTypes));
      }
    } else {
      setEstTypeMentionSelectionne(false);
    }
  }, [formikValueInputUn]);

  useEffect(() => {
    if (formikValueInputDeux !== "") {
      const mentionSelectionneNiveauUn = TypeMention.getTypesMention().find(mention => mention.id === formikValueInputUn);
      const mentionSelectionneNiveauDeux = mentionSelectionneNiveauUn?.sousTypes?.find(mention => mention.id === formikValueInputDeux);
      if (mentionSelectionneNiveauDeux?.sousTypes) {
        setListeNiveau3(TypeMention.getTypeMentionAsOptions(mentionSelectionneNiveauDeux?.sousTypes));
      }
    }
  }, [formikValueInputDeux]);

  useEffect(() => {
    setAfficherTexteMention(() => {
      if (listeNiveau3 && listeNiveau3.length > 0) {
        return Boolean(formikValueInputTrois);
      } else if (listeNiveau2 && listeNiveau2.length > 0) {
        return Boolean(formikValueInputDeux);
      } else {
        return Boolean(formikValueInputUn);
      }
    });
    setIdMentionTypeInformatise(idTypeMentionInformatiseSelectionne);
  }, [formikValueInputUn, formikValueInputDeux, formikValueInputTrois, listeNiveau1, listeNiveau2, listeNiveau3, idMentionTypeInformatise]);

  useEffect(() => {
    if (idMentionTypeInformatise) {
      let idTypeMention = null;
      switch (true) {
        case Boolean(formikValueInputTrois):
          idTypeMention = formikValueInputTrois as string;
          break;
        case Boolean(formikValueInputDeux) && listeNiveau3 === undefined:
          idTypeMention = formikValueInputDeux as string;
          break;
        case Boolean(formikValueInputUn) && listeNiveau2 === undefined:
          idTypeMention = formikValueInputUn as string;
          break;
      }
      idTypeMention &&
        appelApiGetMetamodeleTypeMention({
          parametres: { path: { idTypeMention } },
          apresSucces: (metamodele: IMetamodeleTypeMention) => {
            setMetamodeleTypeMention(metamodele);
          },
          apresErreur: erreurs => {
            setMetamodeleTypeMention(undefined);
            logError({
              messageUtilisateur: "Impossible de récupérer les metamodeles",
              error: erreurs[0]
            });
          }
        });
    }
  }, [idMentionTypeInformatise, listeNiveau2, listeNiveau3]);

  return (
    <div className="ListesTypesMentionForm">
      <div className="selectFieldMentions">
        <SelectField
          name={NOM_CHAMP_MENTION_NIVEAU_UN}
          options={listeNiveau1}
          label={"Type"}
          onChange={() => {
            resetFormikInput([NOM_CHAMP_MENTION_NIVEAU_DEUX, NOM_CHAMP_MENTION_NIVEAU_TROIS]);
          }}
        />
      </div>

      {listeNiveau2 && listeNiveau2.length > 0 && formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value !== "" ? (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_DEUX}
            options={listeNiveau2}
            optionVide={OptionVide.SELECTIONNABLE}
            onChange={() => resetFormikInput([NOM_CHAMP_MENTION_NIVEAU_TROIS])}
            label={""}
          />
        </div>
      ) : undefined}

      {listeNiveau3 && listeNiveau3.length > 0 && formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_DEUX).value !== "" ? (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_TROIS}
            options={listeNiveau3}
            optionVide={OptionVide.SELECTIONNABLE}
            label={""}
          />
        </div>
      ) : undefined}

      {afficherTexteMention &&
        (idMentionTypeInformatise && metamodeleTypeMention ? (
          <p className="py-12 text-center text-red-500">Aide à la saisie en cours de développement</p>
        ) : (
          <div className="selectFieldMentions">
            <InputField
              label={""}
              name={TEXTE_MENTION}
              component="textarea"
              placeholder={"Texte mention à ajouter"}
              onChange={event => {
                formik.setFieldTouched(TEXTE_MENTION);
                formik.setFieldValue(TEXTE_MENTION, event.target.value, true);
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default connect<IListesTypesMentionForm & ISubForm>(ListesTypesMentionForm);
