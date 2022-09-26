import { getDateStringFromDateCompose } from "@util/DateUtils";
import { estRenseigne } from "@util/Utils";
import React from "react";
import Labels from "../Labels";
import {
  DateCoordonneesType,
  DomiciliationType,
  IdentiteType,
  NationaliteType
} from "./Types";

type LigneType = string | false | undefined;

// Création d'un string "A, B, C..." où ", " est le séparateur par défaut et les valeurs vides sont supprimées
export const formatLigne = (tableau?: LigneType[], separateur = ", ") => {
  const resultat = tableau?.filter(Boolean).join(separateur);
  return estRenseigne(resultat) ? resultat : undefined;
};

// Même utilité que formatLigne(), mais traite également les éléments JSX en plus des string dans tab[]
export const formatLigneSpecificite = (
  tab?: (LigneType | JSX.Element | JSX.Element[])[],
  separateur = ", "
) => {
  const resultat = tab?.filter(Boolean).map((elt, pos) => {
    const separation = pos < tab.filter(Boolean).length - 1 ? separateur : null;
    return (
      <React.Fragment key={Labels.resume.infos.specifiques + String(pos)}>
        {elt}
        {separation}
      </React.Fragment>
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
        `${Labels.resume.francisation}: ${texteFrancisationNomsPrenoms}`,
      noms.identification &&
        `${Labels.resume.identification}: ${noms.identification}`
    ],
    " ; "
  );
};

export const formatLigneDateCoordonnees = (
  dateCoordonnees?: DateCoordonneesType
) =>
  formatLigne([
    dateCoordonnees?.date,
    dateCoordonnees?.villeNaissance,
    dateCoordonnees?.arrondissementNaissance,
    dateCoordonnees?.regionNaissance,
    dateCoordonnees?.paysNaissance
  ]);

export const formatLigneAdresse = (adresse?: DomiciliationType) =>
  formatLigne([
    adresse?.codePostal,
    adresse?.ville ?? adresse?.lieuVilleEtranger,
    adresse?.pays
  ]);

export const formatLigneNationalites = (nationalites?: NationaliteType[]) =>
  formatLigne(nationalites?.map(nationalite => nationalite.nationalite));

export const presenceCorrectionSdanf = (
  champAControlerSdanf?: string | number | string[],
  champAControlerTitulaire?: string | number | string[]
): boolean => {
  return champAControlerSdanf
    ? champAControlerSdanf !== champAControlerTitulaire
    : false;
};

export const formatageDateNaissanceRetenueSdanf = (
  jourNaissance: string | undefined,
  moisNaissance: string | undefined,
  anneeNaissance: string | undefined
): string =>
  getDateStringFromDateCompose(
    anneeNaissance
      ? {
          jour: jourNaissance?.toString(),
          mois: moisNaissance?.toString(),
          annee: anneeNaissance?.toString()
        }
      : undefined
  );
