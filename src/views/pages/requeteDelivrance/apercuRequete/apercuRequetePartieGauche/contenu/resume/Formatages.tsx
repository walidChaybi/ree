import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IdentiteType } from "@model/requete/IdentiteType";
import { formatLigne, triPrenoms } from "@util/Utils";

export const formatLigneNomPrenoms = ({ noms, prenoms }: IdentiteType) =>
  formatLigne(
    [noms.usage ?? noms.naissance, formatLigne(prenoms.naissance)],
    " "
  );

export const formatLigneLieu = (
  ville?: string,
  pays?: string
): string | undefined =>
  formatLigne([ville, ville && pays ? `(${pays})` : pays], " ");

export const formatLigneQualiteType = (
  qualite?: string,
  type?: string
): string | undefined => formatLigne([qualite, type && `(${type})`], " ");

export const formatPrenoms = (prenoms?: IPrenomOrdonnes[]) =>
  prenoms ? triPrenoms(prenoms) : [];
