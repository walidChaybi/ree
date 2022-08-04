import React from "react";
import { estRenseigne } from "../../../../../common/util/Utils";
import { resume as Labels } from "../Labels";
import {
  DateCoordonneesType,
  DomiciliationType,
  IdentiteType,
  NationaliteType
} from "./Types";

type LigneType = string | false | undefined;

// Création d'un string "A, B, C..." où ", " est le séparateur par défaut et les valeurs vides sont supprimées
export const formatLigne = (tab?: LigneType[], separateur = ", ") => {
  const resultat = tab?.filter(Boolean).join(separateur);
  return estRenseigne(resultat) ? resultat : undefined;
};

// Même utilité que formatLigne(), mais traite également les éléments JSX en plus des string dans tab[]
export const formatLigneSpecificite = (
  tab?: (LigneType | JSX.Element | JSX.Element[])[],
  separateur = ", "
) => {
  const resultat = tab?.filter(Boolean).map((elt, i) => {
    const separation = i < tab.filter(Boolean).length - 1 ? separateur : null;
    return (
      <>
        {elt}
        {separation}
      </>
    );
  });

  return estRenseigne(resultat) ? resultat : undefined;
};

export const formatLigneNomsPrenomsGenre = ({
  noms,
  prenoms,
  genre
}: IdentiteType) =>
  formatLigne(
    [
      noms.naissance,
      noms.actuel && `(Actuel : ${noms.actuel})`,
      formatLigne(prenoms.naissance),
      genre
    ],
    " ; "
  );

export const formatLigneFrancisationIdentification = ({
  noms,
  prenoms
}: IdentiteType) => {
  const francisationOK =
    noms.francisation ||
    (prenoms.francisation && prenoms.francisation.length > 0);
  const texteFrancisationNomsPrenoms = formatLigne(
    [noms.francisation, formatLigne(prenoms.francisation)],
    " ; "
  );

  return formatLigne(
    [
      francisationOK &&
        `${Labels.francisation}: ${texteFrancisationNomsPrenoms}`,
      noms.identification && `${Labels.identification}: ${noms.identification}`
    ],
    " ; "
  );
};

export const formatLigneDateCoordonnees = (
  dateCoordonnees?: DateCoordonneesType
) =>
  formatLigne([
    dateCoordonnees?.date,
    dateCoordonnees?.ville,
    dateCoordonnees?.arrondissement,
    dateCoordonnees?.regionDeptEtat,
    dateCoordonnees?.pays
  ]);

export const formatLigneAdresse = (adresse?: DomiciliationType) =>
  formatLigne([
    adresse?.codePostal,
    adresse?.ville ?? adresse?.lieuVilleEtranger,
    adresse?.pays
  ]);

export const formatLigneNationalites = (nationalites?: NationaliteType[]) =>
  formatLigne(nationalites?.map(nationalite => nationalite.nationalite));
