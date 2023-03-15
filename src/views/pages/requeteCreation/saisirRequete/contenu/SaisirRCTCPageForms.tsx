import {
  PARENTS,
  REQUERANT,
  TITULAIRE
} from "@composant/formulaire/ConstantesNomsForm";
import { getLibelle } from "@util/Utils";
import React from "react";
import { NATURE_ACTE_LIEN_REQUERANT } from "../../../../common/composant/formulaire/ConstantesNomsForm";
import NatureActeEtLienRequerantForm from "../sousForm/acteATranscrireEtLienRequerant/NatureActeEtLienRequerant";
import IdentiteTitulaireForm from "../sousForm/identite/IdentiteTitulaireForm";
import ParentsForm from "../sousForm/parent/ParentsForm";
import RequerantForm from "../sousForm/requerant/RequerantForm";

export function getActeATranscrireEtLienRequerant(): JSX.Element {
  return (
    <NatureActeEtLienRequerantForm
      key={NATURE_ACTE_LIEN_REQUERANT}
      nom={NATURE_ACTE_LIEN_REQUERANT}
      titre={getLibelle("Acte à transcrire")}
    />
  );
}

export function getTitulaireForm(): JSX.Element {
  return (
    <IdentiteTitulaireForm
      nom={TITULAIRE}
      key={TITULAIRE}
      titre={getLibelle("Titulaire 1")}
    />
  );
}

export function getParentsForm(): JSX.Element {
  return <ParentsForm key={PARENTS} nom={PARENTS} />;
}

export function getRequerantForm(): JSX.Element {
  return (
    <RequerantForm
      nom={REQUERANT}
      key={REQUERANT}
      titre={getLibelle("Requérant")}
    />
  );
}
