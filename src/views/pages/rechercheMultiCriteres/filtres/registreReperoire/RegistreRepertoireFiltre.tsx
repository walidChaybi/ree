import { TypeRepertoire } from "@model/etatcivil/enum/TypeRepertoire";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IRMCRegistre } from "@model/rmc/acteInscription/rechercheForm/IRMCRegistre";
import { ComponentFiltreProps, FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import EvenementFiltre, { EvenementDefaultValues, EvenementFiltreProps, EvenementValidationSchema } from "./EvenementFiltre";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeFiltreProps,
  RegistreActeValidationSchema,
  registreFormEstModifie
} from "./RegistreActeFiltre";
import RepertoireInscriptionFiltre, {
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionFiltreProps,
  RepertoireInscriptionValidationSchema
} from "./RepertoireInscriptionFiltre";

// Noms des champs
const REGISTRE = "registre";
const REPERTOIRE = "repertoire";
const EVENEMENT = "evenement";

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

export type RegistreRepertoireFiltreProps = ComponentFiltreProps & { afficherNouvelleRMC?: boolean } & FormikComponentProps;

const RegistreRepertoireFiltre: React.FC<RegistreRepertoireFiltreProps> = props => {
  const [filtreActeInactif, setFiltreActeInactif] = useState<boolean>(false);
  const [filtreInscriptionInactif, setFiltreInscriptionInactif] = useState<boolean>(false);
  const [filtreEvenementInactif, setFiltreEvenementInactif] = useState<boolean>(false);
  const [filtreTypeRepertoire, setFiltreTypeRepertoire] = useState<TypeRepertoire | undefined>();

  // Permet de dégriser les filtres registre ou inscription apres un resetForm.
  // Ou de griser si besoin un des filtres apres un rappelCriteres
  useEffect(() => {
    setFiltreActeInactif(repertoireFormEstModifie(props.formik.values as IRMCActeInscription));

    setFiltreInscriptionInactif(
      registreFormEstModifie(props.formik.getFieldProps<IRMCRegistre>(withNamespace(props.nomFiltre, REGISTRE)).value)
    );

    setFiltreEvenementInactif(estTypeRcRca(props.formik.values as IRMCActeInscription));

    paysEvenementEstModifie(props.formik.values as IRMCActeInscription)
      ? setFiltreTypeRepertoire(TypeRepertoire.PACS)
      : setFiltreTypeRepertoire(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {!props.afficherNouvelleRMC && (
        <EvenementFiltre
          filtreInactif={filtreEvenementInactif}
          {...evenementFiltreProps}
        />
      )}
    </div>
  );
};

export default connect(RegistreRepertoireFiltre);

function repertoireFormEstModifie(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.repertoire;
  return criteres?.numeroInscription !== "" || criteres?.typeRepertoire !== "";
}

function paysEvenementEstModifie(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.evenement;
  return criteres?.paysEvenement !== "";
}

function estTypeRcRca(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.repertoire;
  return criteres?.typeRepertoire === TypeRepertoire.RC.libelle || criteres?.typeRepertoire === TypeRepertoire.RCA.libelle;
}
