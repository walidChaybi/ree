import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  withNamespace,
  FormikComponentProps
} from "../../../../common/widget/formulaire/utils/FormUtil";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeValidationSchema,
  RegistreActeFiltreProps
} from "./RegistreActeFiltre";
import { getLibelle } from "../../../../common/widget/Text";
import RepertoireInscriptionFiltre, {
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionValidationSchema,
  RepertoireInscriptionFiltreProps
} from "./RepertoireInscriptionFiltre";
import EvenementFiltre, {
  EvenementFiltreProps,
  EvenementDefaultValues,
  EvenementValidationSchema
} from "./EvenementFiltre";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { connect } from "formik";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { TypeRepertoire } from "../../../../../model/etatcivil/enum/TypeRepertoire";

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

const RegistreRepertoireFiltre: React.FC<RegistreRepertoireFiltreProps> = props => {
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
      <Fieldset titre={getLibelle("Filtre registre et répertoire")}>
        <div className="FormFiltre">
          <RegistreActeFiltre
            filtreInactif={filtreActeInactif}
            {...registreActeFiltreProps}
          />
        </div>
        <div className="FormFiltre">
          <RepertoireInscriptionFiltre
            filtreInactif={filtreInscriptionInactif}
            {...registreRepertoireFiltreProps}
          />
        </div>
        <div className="FormFiltre">
          <EvenementFiltre
            filtreInactif={filteEvenementInactif}
            {...evenementFiltreProps}
          />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(RegistreRepertoireFiltre);

function isRegistreDirty(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.registre;
  return (
    criteres?.familleRegistre !== "" ||
    criteres?.natureActe !== "" ||
    criteres?.numeroActe !== "" ||
    criteres?.pocopa !== ""
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
