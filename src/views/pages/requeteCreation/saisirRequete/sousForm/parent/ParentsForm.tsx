import { IDENTIFIANT, NAISSANCE, NATIONALITES, NOM, PARENTS, PRENOMS, SEXE } from "@composant/formulaire/ConstantesNomsForm";
import { creerValidationSchemaPrenom } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { AddCircle, Delete } from "@mui/icons-material";
import { QUINZE } from "@util/Utils";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchemaSansTestFormat } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { NationalitesFormDefaultValues, NationalitesFormValidationSchema } from "@widget/formulaire/nationalites/NationalitesForm";
import { FormikComponentProps, INomForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import BoutonIcon from "../../../../../../composants/commun/bouton/BoutonIcon";
import ConteneurAvecBordure from "../../../../../../composants/commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../../../composants/commun/conteneurs/formulaire/SeparateurSection";
import { limitesParents } from "../../../../../../pages/requetesConsulaire/contenu/SaisirRCTCPage";
import { DATE_NAISSANCE, MARIAGE, RECONNAISSANCE } from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import EvenementMariageParentsForm from "../evenement/EvenementMariageParentsForm";
import { EvenementParentsFormDefaultValues, EvenementParentsFormValidationSchema } from "../evenement/EvenementParentsForm";
import EvenementReconnaissanceTitulaireForm from "../evenement/EvenementReconnaissanceTitulaireForm";
import IdentiteParentForm from "./IdentiteParentForm";
import "./scss/ParentsForm.scss";

export const ParentFormDefaultValues = {
  [IDENTIFIANT]: "",
  [NOM]: "",
  [PRENOMS]: { prenom1: "" },
  [SEXE]: "INCONNU",
  [DATE_NAISSANCE]: DateDefaultValues,
  [NAISSANCE]: EvenementParentsFormDefaultValues,
  [NATIONALITES]: NationalitesFormDefaultValues
};

// Schéma de validation des champs
export const ParentFormValidationSchema = Yup.object().shape({
  [NOM]: Yup.string().test({
    name: "nom-ou-prenom-obligatoire",
    message: "Le nom ou le prénom est obligatoire.",
    test: function (nom) {
      const prenom1 = this.parent[PRENOMS]?.prenom1;
      return nom || prenom1;
    }
  }),
  [PRENOMS]: creerValidationSchemaPrenom(),
  [SEXE]: Yup.string().when([NOM, `${PRENOMS}.prenom1`], {
    is: (nom: string | undefined, prenom1: string | undefined) => nom || prenom1,
    then: Yup.string().oneOf(["MASCULIN", "FEMININ"], "Le sexe est obligatoire.").required("Le sexe est obligatoire."),
    otherwise: Yup.string()
  }),
  [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
  [NAISSANCE]: EvenementParentsFormValidationSchema,
  [NATIONALITES]: NationalitesFormValidationSchema
});

interface ComponentParentsFormProps {
  parents?: ITitulaireRequeteCreation[];
}

export type ParentSubFormProps = SubFormProps & ComponentParentsFormProps;

const ParentsForm: React.FC<ParentSubFormProps & FormikComponentProps> = props => {
  const [parents, setParents] = useState<ITitulaireRequeteCreation[]>([{} as ITitulaireRequeteCreation]);

  useEffect(() => {
    if (props.parents) {
      setParents(props.parents);
    }
  }, [props.parents]);

  const boutonAjouterParent = useMemo(() => {
    return parents.length < limitesParents.MAX ? (
      <BoutonIcon
        type="button"
        title={"Ajouter un parent"}
        onClick={onAjoutParent}
        disabled={parents.length >= limitesParents.MAX}
        styleBouton="principal"
      >
        <div className="flex items-center gap-4 px-2">
          <AddCircle />
          <span className="font-noto-sans-ui text-sm font-bold">{"Ajouter un parent"}</span>
        </div>
      </BoutonIcon>
    ) : (
      <></>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents.length]);

  const boutonSupprimerParent = useMemo(() => {
    return parents.length > limitesParents.MIN ? (
      <BoutonIcon
        type="button"
        title={"Retirer un parent"}
        onClick={onRetraitParent}
        className="h-10 bg-rouge"
      >
        <div className="flex items-center gap-4 px-2">
          <Delete />
          <span className="font-noto-sans-ui text-sm font-bold">{"Retirer un parent"}</span>
        </div>
      </BoutonIcon>
    ) : (
      <></>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents.length]);

  function onAjoutParent() {
    const nomParent2 = withNamespace(PARENTS, "parent2");
    props.formik.setFieldValue(nomParent2, {
      ...ParentFormDefaultValues,
      [PRENOMS]: { prenom1: "" }
    });
    setParents([...parents, {} as ITitulaireRequeteCreation]);
  }

  function onRetraitParent() {
    const nomParent2 = withNamespace(PARENTS, "parent2");
    setParents(parents.slice(0, -1));
    props.formik.setFieldValue(nomParent2, {});
  }

  return (
    <>
      <ConteneurAvecBordure
        className="py-6"
        titreEnTete={"PARENTS"}
      >
        {parents.map((parent, index) => (
          <React.Fragment key={index}>
            <SeparateurSection titre={`Parent ${index + 1}`} />

            <IdentiteParentForm
              parent={parent}
              nom={withNamespace(props.nom, `parent${index + 1}`)}
              titre={`Parent ${index + 1}`}
              maxPrenoms={QUINZE}
            />
          </React.Fragment>
        ))}
        <div className="mt-8">
          {boutonAjouterParent}
          {boutonSupprimerParent}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <EvenementMariageParentsForm nom={withNamespace(props.nom, MARIAGE)} />
          </div>
          <div className="flex flex-col">
            <EvenementReconnaissanceTitulaireForm nom={withNamespace(props.nom, RECONNAISSANCE)} />
          </div>
        </div>
      </ConteneurAvecBordure>
    </>
  );
};

export default connect<ComponentParentsFormProps & INomForm>(ParentsForm);
