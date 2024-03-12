import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { getLibelle, shallowEgal } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext, useEffect } from "react";
import ListesTypesMentionForm from "./ListesTypesMentionForm";

interface IAjoutMentionsMiseAJourProps {
  libelleTitreFormulaire: string;
  actualiserEtVisualiserCallback: () => void;
}

const AjoutMentionsMiseAJour: React.FC<
  IAjoutMentionsMiseAJourProps & FormikComponentProps
> = ({ formik, libelleTitreFormulaire, actualiserEtVisualiserCallback }) => {
  const {
    listeMentions,
    listeMentionsEnregistrees,
    numeroOrdreEnModification,
    setNumeroOrdreEnModification,
    setEstFormulaireDirty
  } = useContext(MiseAJourMentionsContext);

  useEffect(() => {
    setEstFormulaireDirty(formik.dirty);
  }, [formik.dirty, setEstFormulaireDirty]);

  useEffect(() => {
    if (numeroOrdreEnModification !== undefined) {
      const { texte, typeMention } = listeMentions[numeroOrdreEnModification];
      formik.setFieldValue(
        withNamespace(LISTES_TYPES_MENTION, MENTION_NIVEAU_UN),
        typeMention.idMentionNiveauUn
      );
      formik.setFieldValue(
        withNamespace(LISTES_TYPES_MENTION, MENTION_NIVEAU_DEUX),
        typeMention.idMentionNiveauDeux
      );
      formik.setFieldValue(
        withNamespace(LISTES_TYPES_MENTION, MENTION_NIVEAU_TROIS),
        typeMention.idMentionNiveauTrois
      );
      formik.setFieldValue(TEXTE_MENTION, texte);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numeroOrdreEnModification]);

  const inputValueNiveauUn = formik.getFieldMeta(
    withNamespace(LISTES_TYPES_MENTION, MENTION_NIVEAU_UN)
  ).value;

  const annulerEnAjoutOuModification = () => {
    formik.resetForm();
    setNumeroOrdreEnModification(undefined);
  };

  const boutonAJouterModifier =
    numeroOrdreEnModification !== undefined
      ? getLibelle("Modifier mention")
      : getLibelle("Ajouter mention");

  const estVerrouilleActualiserEtVisualiser =
    shallowEgal(listeMentions, listeMentionsEnregistrees) || formik.dirty;

  return (
    <div>
      <h3>{getLibelle(libelleTitreFormulaire)}</h3>
      <ListesTypesMentionForm
        natureActe={NatureActe.NAISSANCE} // TODO: Pour le moment spécifique aux actes de naissance, à rendre plus générique plus tard.
        nom={LISTES_TYPES_MENTION}
      />
      <div className="texte-mention">
        <InputField
          name={TEXTE_MENTION}
          component="textarea"
          placeholder={getLibelle("Texte mention à ajouter")}
          disabled={!inputValueNiveauUn}
        />
        <div className="boutons-mention">
          <Bouton
            disabled={!formik.dirty}
            onClick={annulerEnAjoutOuModification}
          >
            Annuler
          </Bouton>
          <Bouton disabled={!formik.dirty || !formik.isValid} type="submit">
            {boutonAJouterModifier}
          </Bouton>
        </div>
      </div>
      <Bouton
        disabled={estVerrouilleActualiserEtVisualiser}
        onClick={actualiserEtVisualiserCallback}
      >
        {getLibelle("Actualiser et visualiser")}
      </Bouton>
    </div>
  );
};

export default connect<IAjoutMentionsMiseAJourProps & FormikComponentProps>(
  AjoutMentionsMiseAJour
);
