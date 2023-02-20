import { IdentiteType } from "@model/requete/IdentiteType";
import { formatLigne } from "@util/Utils";

export const formatLigneNomPrenoms = ({ noms, prenoms }: IdentiteType) =>
  formatLigne([noms.naissance, formatLigne(prenoms.naissance)], " ");

export const formatLigneLieu = (
  ville?: string,
  pays?: string
): string | undefined =>
  formatLigne([ville, ville && pays ? `(${pays})` : pays], " ");

export const formatLigneQualiteType = (
  qualite?: string,
  type?: string
): string | undefined => formatLigne([qualite, type && `(${type})`], " ");
