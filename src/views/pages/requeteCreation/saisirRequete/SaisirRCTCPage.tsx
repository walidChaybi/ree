import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "@pages/requeteDelivrance/saisirRequete/boutons/SaisirRequeteBoutons";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React from "react";
import * as Yup from "yup";
import {
  getActeATranscrireEtLienRequerant,
  getParentsForm,
  getPiecesJointesForm,
  getRequerantForm,
  getTitulaireForm
} from "./contenu/SaisirRCTCPageForms";
import {
  MARIAGE,
  NATURE_ACTE_LIEN_REQUERANT,
  PARENTS,
  RECONNAISSANCE,
  REQUERANT,
  TITULAIRE
} from "./modelForm/ISaisirRCTCPageModel";
import "./scss/SaisirRCTCPage.scss";
import {
  NatureActeLienRequerantFormDefaultValues,
  NatureActeLienRequerantFormValidationSchema
} from "./sousForm/acteATranscrireEtLienRequerant/NatureActeEtLienRequerant";
import {
  EvenementMariageParentsFormDefaultValues,
  EvenementMariageParentsFormValidationSchema
} from "./sousForm/evenement/EvenementMariageParentsForm";
import {
  EvenementReconnaissanceTitulaireFormDefaultValues,
  EvenementReconnaissanceTitulaireFormValidationSchema
} from "./sousForm/evenement/EvenementReconnaissanceTitulaireForm";
import {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "./sousForm/identite/IdentiteTitulaireForm";
import {
  ParentFormDefaultValues,
  ParentFormValidationSchema
} from "./sousForm/parent/ParentsForm";
import {
  RequerantFormDefaultValue,
  RequerantFormValidationSchema
} from "./sousForm/requerant/RequerantForm";

export const enum limitesParents {
  MIN = 1,
  MAX = 2
}

const TITRE_FORMULAIRE = SousTypeCreation.RCTC.libelle;
export const ValeursRequeteCreationRCTCParDefaut = {
  [NATURE_ACTE_LIEN_REQUERANT]: NatureActeLienRequerantFormDefaultValues,
  [TITULAIRE]: IdentiteFormDefaultValues,
  [PARENTS]: {
    parent1: ParentFormDefaultValues,
    parent2: ParentFormDefaultValues,
    [MARIAGE]: EvenementMariageParentsFormDefaultValues,
    [RECONNAISSANCE]: EvenementReconnaissanceTitulaireFormDefaultValues
  },
  [REQUERANT]: RequerantFormDefaultValue
};

const ValidationSchemaSaisirRCTC = Yup.object({
  [NATURE_ACTE_LIEN_REQUERANT]: NatureActeLienRequerantFormValidationSchema,
  [TITULAIRE]: IdentiteFormValidationSchema,
  [PARENTS]: Yup.object({
    parent1: ParentFormValidationSchema,
    parent2: ParentFormValidationSchema,
    [MARIAGE]: EvenementMariageParentsFormValidationSchema,
    [RECONNAISSANCE]: EvenementReconnaissanceTitulaireFormValidationSchema
  }),
  [REQUERANT]: RequerantFormValidationSchema
});

export const SaisirRCTCPage: React.FC = () => {
  const onSubmitSaisirRequete = () => {};

  const boutonsProps = {} as SaisirRequeteBoutonsProps;

  const blocsForm: JSX.Element[] = [
    getActeATranscrireEtLienRequerant(),
    getTitulaireForm(),
    getParentsForm(),
    getRequerantForm(),
    getPiecesJointesForm()
  ];
  return (
    <div className="SaisirRCTCPage">
      <title>{TITRE_FORMULAIRE}</title>
      <Formulaire
        titre={TITRE_FORMULAIRE}
        formDefaultValues={ValeursRequeteCreationRCTCParDefaut}
        formValidationSchema={ValidationSchemaSaisirRCTC}
        onSubmit={onSubmitSaisirRequete}
        className="FormulaireSaisirRCTC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
    </div>
  );
};
