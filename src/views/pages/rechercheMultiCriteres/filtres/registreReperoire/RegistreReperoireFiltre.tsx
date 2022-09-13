import { TypeRepertoire } from "@model/etatcivil/enum/TypeRepertoire";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import EvenementFiltre, {
  EvenementDefaultValues,
  EvenementFiltreProps,
  EvenementValidationSchema
} from "./EvenementFiltre";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeFiltreProps,
  RegistreActeValidationSchema
} from "./RegistreActeFiltre";
import RepertoireInscriptionFiltre, {
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionFiltreProps,
  RepertoireInscriptionValidationSchema
} from "./RepertoireInscriptionFiltre";

// Noms des champs
export const REGISTRE = "registre";
export const REPERTOIRE = "repertoire";
export const EVENEMENT = "evenement";

// Valeurs par défaut des champs
export const RegistreRepertoireDefaultValues = {
  [REGISTRE]: RegistreActeDefaultValues,
  [REPERTOIRE]: RepertoireInscriptionDefaultValues,
  [EVENEMENT]: EvenementDefaultValues
};

// Schéma de validation des champs
export const RegistreRepertoireValidationSchema = Yup.object({
  [REGISTRE]: RegistreActeValidationSchema,
  [REPERTOIRE]: RepertoireInscriptionValidationSchema,
  [EVENEMENT]: EvenementValidationSchema
});

export type RegistreRepertoireFiltreProps = ComponentFiltreProps &
  FormikComponentProps;

const RegistreRepertoireFiltre: React.FC<
  RegistreRepertoireFiltreProps
> = props => {
  const [filtreActeInactif, setFiltreActeInactif] = useState<
    boolean | undefined
  >(false);
  const [filtreInscriptionInactif, setFiltreInscriptionInactif] = useState<
    boolean | undefined
  >(false);
  const [filteEvenementInactif, setFilteEvenementInactif] = useState<
    boolean | undefined
  >(false);
  const [filtreTypeRepertoire, setFiltreTypeRepertoire] = useState<
    TypeRepertoire | undefined
  >();

  // Permet de dégriser les filtres registre ou inscription apres un resetForm.
  // Ou de griser si besoin un des filtres apres un rappelCriteres
  useEffect(() => {
    setFiltreActeInactif(
      isRepertoireDirty(props.formik.values as IRMCActeInscription)
    );

    setFiltreInscriptionInactif(
      isRegistreDirty(props.formik.values as IRMCActeInscription)
    );

    setFilteEvenementInactif(
      isTypeRcRca(props.formik.values as IRMCActeInscription)
    );

    isPaysEvenementDirty(props.formik.values as IRMCActeInscription)
      ? setFiltreTypeRepertoire(TypeRepertoire.PACS)
      : setFiltreTypeRepertoire(undefined);
  }, [props.formik.dirty, props.formik.values]);

  const registreRepertoireFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REPERTOIRE),
    filtreTypeRepertoire
  } as RepertoireInscriptionFiltreProps;

  const registreActeFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REGISTRE)
  } as RegistreActeFiltreProps;

  const evenementFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, EVENEMENT)
  } as EvenementFiltreProps;

  return (
    <div className={props.nomFiltre}>
      <RegistreActeFiltre
        filtreInactif={filtreActeInactif}
        {...registreActeFiltreProps}
      />
      <RepertoireInscriptionFiltre
        filtreInactif={filtreInscriptionInactif}
        {...registreRepertoireFiltreProps}
      />
      <EvenementFiltre
        filtreInactif={filteEvenementInactif}
        {...evenementFiltreProps}
      />
    </div>
  );
};

export default connect(RegistreRepertoireFiltre);

function isRegistreDirty(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.registre;
  return (
    criteres?.familleRegistre !== "" ||
    criteres?.natureActe !== "" ||
    criteres?.anneeRegistre !== "" ||
    criteres?.numeroActe !== "" ||
    criteres?.pocopa !== null
  );
}

function isRepertoireDirty(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.repertoire;
  return criteres?.numeroInscription !== "" || criteres?.typeRepertoire !== "";
}

function isPaysEvenementDirty(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.evenement;
  return criteres?.paysEvenement !== "";
}

function isTypeRcRca(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.repertoire;
  return (
    criteres?.typeRepertoire === TypeRepertoire.RC.libelle ||
    criteres?.typeRepertoire === TypeRepertoire.RCA.libelle
  );
}
