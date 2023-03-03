import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { getLibelle } from "@util/Utils";
import PiecesJointesForm from "@widget/formulaire/piecesJointes/PiecesJointesForm";
import React from "react";
import {
  NATURE_ACTE_LIEN_REQUERANT,
  PARENTS,
  PIECES_JOINTES,
  REQUERANT,
  TITULAIRE
} from "../modelForm/ISaisirRCTCPageModel";
import NatureActeEtLienRequerant from "../sousForm/acteATranscrireEtLienRequerant/NatureActeEtLienRequerant";
import IdentiteTitulaireForm from "../sousForm/identite/IdentiteTitulaireForm";
import ParentsForm from "../sousForm/parent/ParentsForm";
import RequerantForm from "../sousForm/requerant/RequerantForm";

export function getActeATranscrireEtLienRequerant(): JSX.Element {
  return (
    <NatureActeEtLienRequerant
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

export function getPiecesJointesForm(): JSX.Element {
  return (
    <PiecesJointesForm
      nom={PIECES_JOINTES}
      typeRequete={TypeRequete.CREATION}
      titre={getLibelle("Pièces justificatives")}
      key={PIECES_JOINTES}
    />
  );
}
