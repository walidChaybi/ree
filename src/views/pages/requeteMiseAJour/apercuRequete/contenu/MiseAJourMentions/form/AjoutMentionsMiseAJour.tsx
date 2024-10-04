import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { getLibelle } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext, useEffect } from "react";
import ListesTypesMentionForm from "./ListesTypesMentionForm";

interface IAjoutMentionsMiseAJourProps {
  libelleTitreFormulaire: string;
}

const AjoutMentionsMiseAJour: React.FC<
  IAjoutMentionsMiseAJourProps & FormikComponentProps
> = ({ formik, libelleTitreFormulaire }) => {
  const {
    listeMentions,
    numeroOrdreEnModification,
    setNumeroOrdreEnModification,
    estFormulaireDirty,
    setEstFormulaireDirty,
    estFormulaireValide,
    setEstFormulaireValide
  } = useContext(MiseAJourMentionsContext);

  useEffect(() => {
    setEstFormulaireDirty({
      ...estFormulaireDirty,
      mentionsFormEstDirty: formik.dirty
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.dirty]);

  useEffect(() => {
    setEstFormulaireValide({
      ...estFormulaireValide,
      mentionsFormEstValide: formik.isValid
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.isValid]);

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

  const annulerEnAjoutOuModification = () => {
    formik.resetForm();
    setNumeroOrdreEnModification(undefined);
  };

  const boutonAJouterModifier =
    numeroOrdreEnModification !== undefined
      ? getLibelle("Modifier mention")
      : getLibelle("Ajouter mention");

  return (
    <div>
      <h3>{getLibelle(libelleTitreFormulaire)}</h3>
      <ListesTypesMentionForm
        natureActe={NatureActe.NAISSANCE} // TODO: Pour le moment spécifique aux actes de naissance, à rendre plus générique plus tard.
        nom={LISTES_TYPES_MENTION}
      />
      <div className="boutons-mention">
        <BoutonDoubleSubmit disabled={!formik.dirty || !formik.isValid} type="submit">
          {boutonAJouterModifier}
        </BoutonDoubleSubmit>
        <BoutonDoubleSubmit disabled={!formik.dirty} onClick={annulerEnAjoutOuModification}>
          {getLibelle("Annuler")}
        </BoutonDoubleSubmit>
      </div>
    </div>
  );
};

export default connect<IAjoutMentionsMiseAJourProps & FormikComponentProps>(
  AjoutMentionsMiseAJour
);
