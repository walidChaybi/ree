import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { getLibelle } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import {
  ETRANGER_FRANCE,
  LIEU_COMPLET,
  PAYS,
  REGION_DEPARTEMENT,
  VILLE
} from "../ConstantesNomsForm";

export function valideLieu(
  formik: any,
  nomChamp: string,
  value: string,
  nomForm: string
) {
  let lieuComplet = formik.getFieldProps(
    withNamespace(nomForm, LIEU_COMPLET)
  ).value;
  let ville = formik.getFieldProps(withNamespace(nomForm, VILLE)).value;
  let region = formik.getFieldProps(
    withNamespace(nomForm, REGION_DEPARTEMENT)
  ).value;
  let pays = formik.getFieldProps(withNamespace(nomForm, PAYS)).value;

  switch (nomChamp) {
    case LIEU_COMPLET:
      lieuComplet = value;
      break;
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

  const modeSaisie = formik.getFieldProps(
    withNamespace(nomForm, ETRANGER_FRANCE)
  ).value;

  return getMessageErreur(
    lieuComplet,
    ville,
    region,
    pays,
    nomChamp,
    modeSaisie
  );
}

function getMessageErreur(
  lieuComplet: string,
  ville: string,
  region: string,
  pays: string,
  nomChamp: string,
  modeSaisie: any
) {
  let messageErreur;
  const erreur: boolean = !lieuComplet && !ville && !region && !pays;
  if (erreur && modeSaisie !== EtrangerFrance.getKey(EtrangerFrance.INCONNU)) {
    messageErreur = getLibelle("Au moins un des champs est obligatoire");
  } else if (
    nomChamp === PAYS &&
    !LieuxUtils.estVilleJerusalem(ville) &&
    modeSaisie === EtrangerFrance.getKey(EtrangerFrance.ETRANGER) &&
    !pays
  ) {
    messageErreur = getLibelle("Le pays est obligatoire");
  }
  return messageErreur;
}
