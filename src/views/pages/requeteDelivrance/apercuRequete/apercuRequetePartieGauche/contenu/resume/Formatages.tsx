import { formatLigne } from "@util/Utils";
import { IdentiteType } from "./Types";

export const formatLigneNomPrenoms = ({ noms, prenoms }: IdentiteType) =>
  formatLigne([noms.naissance, formatLigne(prenoms.naissance)], " ");
//TODO: A ajouter dans Creation/Formatages ?

export const formatLigneLieu = (
  ville?: string,
  pays?: string
): string | undefined =>
  formatLigne([ville, ville && pays ? `(${pays})` : pays], " ");
  
  export const formatLigneQualiteType = (
    qualite?: string,
    type?: string
  ): string | undefined => formatLigne([qualite, type && `(${type})`], " ");

