import {
  MARIAGE,
  NATURE_ACTE_LIEN_REQUERANT,
  PARENTS,
  RECONNAISSANCE,
  REQUERANT,
  TITULAIRE
} from "@composant/formulaire/ConstantesNomsForm";
import { ISaisieRequeteRCTC } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { receUrl } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { History } from "history";
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
import TransmissionPopin from "./sousForm/transmissionPopin/TransmissionPopin";

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
  const [transmissionPopinOuverte, setTransmissionPopinOuverte] =
    useState(false);
  const [creationRequeteRCTCParams, setCreationRequeteRCTCParams] =
    useState<ICreationRequeteCreationParams>();

  // Hooks
  //////////////////////////////////////////////////////////////////////////
  const idRequeteCree = useCreationRequeteCreation(creationRequeteRCTCParams);

  // Effects
  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (idRequeteCree) {
      redirectionApercuPriseEnChargePage(history, idRequeteCree);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequeteCree]);

  // Evenements & fonctions
  //////////////////////////////////////////////////////////////////////////
  function onSubmitSaisirRequete(values: ISaisieRequeteRCTC) {
    const requete = mappingSaisieRequeteRCTCVersRequetesAEnvoyer(values);
    setCreationRequeteRCTCParams({ requete });
  }

  function fermePopin() {
    setTransmissionPopinOuverte(false);
  }

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
        <TransmissionPopin
          ouverte={transmissionPopinOuverte}
          onTransmissionEffectuee={(idRequeteCreerEtTransmise: string) => {
            fermePopin();
            redirectionApercuPriseEnChargePage(
              history,
              idRequeteCreerEtTransmise
            );
          }}
          onCancel={fermePopin}
          onErrors={fermePopin}
        />

        <SaisirRequeteBoutons
          onTransferer={() => setTransmissionPopinOuverte(true)}
        />
      </Formulaire>
    </div>
  );
};

function redirectionApercuPriseEnChargePage(
  history: History<unknown>,
  idRequeteCree: string
) {
  const url = receUrl.getUrlApercuPriseEnChargeCreationTranscriptionAPartirDe({
    url: history.location.pathname,
    idRequete: idRequeteCree
  });
  replaceUrl(history, url);
}
