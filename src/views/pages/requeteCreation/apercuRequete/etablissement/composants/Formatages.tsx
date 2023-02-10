import { getDateStringFromDateCompose } from "@util/DateUtils";
import {
  chainesEgalesIgnoreCasse,
  estRenseigne,
  formatLigne,
  LigneType
} from "@util/Utils";
import React from "react";
import { DateCoordonneesType } from "../../../../../../model/requete/DateCoordonneesType";
import { DomiciliationType } from "../../../../../../model/requete/DomiciliationType";
import { IdentiteType } from "../../../../../../model/requete/IdentiteType";
import { NationaliteType } from "../../../../../../model/requete/NationaliteType";
import Labels from "../../../commun/Labels";

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

  return estRenseigne(resultat) ? resultat : "";
};

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
    dateCoordonnees?.ville,
    dateCoordonnees?.arrondissement,
    dateCoordonnees?.region,
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

export const presenceCorrectionSdanf = (
  champAControlerSdanf?: string,
  champAControlerTitulaire?: string
): boolean => {
  return (
    estRenseigne(champAControlerSdanf) &&
    !chainesEgalesIgnoreCasse(champAControlerSdanf, champAControlerTitulaire)
  );
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

export const auMoinsUnDesDeuxChampsEstRenseigne = (
  texteTitulaire?: string,
  texteRetenueSdanf?: string
): boolean => {
  return estRenseigne(texteTitulaire) || estRenseigne(texteRetenueSdanf);
};