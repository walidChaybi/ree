import { estNonRenseigne, getLibelle } from "@util/Utils";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import {
  LIEU_COMPLET,
  PAYS,
  REGION_DEPARTEMENT,
  VILLE
} from "../ConstantesNomsForm";

export function valideCompletudeLieu(
  formik: any,
  nomChamp: string,
  value: string,
  nomForm: string,
  modeSaisiLieuInconnu: boolean
) {
  let messageErreur;

  const lieuComplet = formik.getFieldProps(
    withNamespace(nomForm, LIEU_COMPLET)
  ).value;
  let ville = formik.getFieldProps(withNamespace(nomForm, VILLE)).value;
  let region = formik.getFieldProps(
    withNamespace(nomForm, REGION_DEPARTEMENT)
  ).value;
  let pays = formik.getFieldProps(withNamespace(nomForm, PAYS)).value;

  switch (nomChamp) {
    case VILLE:
      ville = value;
      break;
    case REGION_DEPARTEMENT:
      region = value;
      break;
    case PAYS:
      pays = value;
      break;

    default:
      break;
  }

  const erreur: boolean = !lieuComplet && !ville && !region && !pays;
  if (erreur && !modeSaisiLieuInconnu) {
    messageErreur = getLibelle("Au moins un des champs est obligatoire");
  }

  return messageErreur;
}

export function valideLieuReprise(
  lieuReprise: string,
  lieuRepriseAfficheSeul: boolean
) {
  return lieuRepriseAfficheSeul && estNonRenseigne(lieuReprise)
    ? "Lieu obligatoire"
    : undefined;
}
