import { ChoixEntitePopin } from "@composant/choixEntitesPopin/ChoixEntitesPopin";
import {
  MARIAGE,
  NATURE_ACTE_LIEN_REQUERANT,
  PARENTS,
  RECONNAISSANCE,
  REQUERANT,
  TITULAIRE
} from "@composant/formulaire/ConstantesNomsForm";
import { Entite } from "@model/agent/IEntiteRattachement";
import { ISaisieRequeteRCTC } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { receUrl } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import SaisirRequeteBoutons from "../../../common/composant/formulaire/boutons/SaisirRequeteBoutons";
import {
  ICreationRequeteCreationParams,
  useCreationRequeteCreation
} from "../../../common/hook/requete/CreationRequeteCreationApiHook";
import {
  getActeATranscrireEtLienRequerant,
  getParentsForm,
  getRequerantForm,
  getTitulaireForm
} from "./contenu/SaisirRCTCPageForms";
import { mappingSaisieRequeteRCTCVersRequetesAEnvoyer } from "./mapping/mappingFormulaireSaisirRCTCVersRequeteTranscription";
import "./scss/SaisirRCTCPage.scss";
import {
  NatureActeEtLienRequerantFormDefaultValues,
  NatureActeEtLienRequerantFormValidationSchema
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
  [NATURE_ACTE_LIEN_REQUERANT]: NatureActeEtLienRequerantFormDefaultValues,
  [TITULAIRE]: IdentiteFormDefaultValues,
  [PARENTS]: {
    parent1: ParentFormDefaultValues,
    parent2: {},
    [MARIAGE]: EvenementMariageParentsFormDefaultValues,
    [RECONNAISSANCE]: EvenementReconnaissanceTitulaireFormDefaultValues
  },
  [REQUERANT]: RequerantFormDefaultValue
};

const ValidationSchemaSaisirRCTC = Yup.object({
  [NATURE_ACTE_LIEN_REQUERANT]: NatureActeEtLienRequerantFormValidationSchema,
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
  const history = useHistory();

  //States
  //////////////////////////////////////////////////////////////////////////
  const [creationRequeteRCTCParams, setCreationRequeteRCTCParams] =
    useState<ICreationRequeteCreationParams>();
  const [choixEntitesPopinOuverte, setChoixEntitesPopinOuverte] =
    useState(false);

  // Evenements
  //////////////////////////////////////////////////////////////////////////
  function onEntiteChoisiePourTransfert(idEntiteChoisie?: string) {
    setChoixEntitesPopinOuverte(false);
    // TODO
  }

  function onSubmitSaisirRequete(values: ISaisieRequeteRCTC) {
    const requete = mappingSaisieRequeteRCTCVersRequetesAEnvoyer(values);
    setCreationRequeteRCTCParams({ requete });
  }

  // Hooks
  //////////////////////////////////////////////////////////////////////////
  const idRequeteCree = useCreationRequeteCreation(creationRequeteRCTCParams);

  // Formulaire
  //////////////////////////////////////////////////////////////////////////
  const blocsForm: JSX.Element[] = [
    getActeATranscrireEtLienRequerant(),
    getTitulaireForm(),
    getParentsForm(),
    getRequerantForm()
  ];

  useEffect(() => {
    if (idRequeteCree) {
      const url =
        receUrl.getUrlApercuPriseEnChargeCreationTranscriptionAPartirDe({
          url: history.location.pathname,
          idRequete: idRequeteCree
        });
      replaceUrl(history, url);
    }
  }, [idRequeteCree, history]);

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
        <ChoixEntitePopin
          ouverte={choixEntitesPopinOuverte}
          idEntiteMere={Entite.getEntiteEtablissement()?.idEntite}
          onEntiteChoisie={onEntiteChoisiePourTransfert}
          onCancel={() => setChoixEntitesPopinOuverte(false)}
        />
        <SaisirRequeteBoutons
          onTransferer={() => setChoixEntitesPopinOuverte(true)}
        />
      </Formulaire>
    </div>
  );
};
