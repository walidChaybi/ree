import { ANNEE } from "@composant/formulaire/ConstantesNomsForm";
import RecherchePocopas from "@composant/recherchePocopas/RecherchePocopas";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRMCRegistre } from "@model/rmc/acteInscription/rechercheForm/IRMCRegistre";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { MAX_ANNEE_MESSAGE, MIN_LENGTH_ANNEE_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import NumeroActeForm, {
  NUMERO_BIS_TER,
  NumeroActeDefaultValues,
  NumeroActeFormProps,
  NumeroActeValidationSchema
} from "@widget/formulaire/champNumeroActe/NumeroActeForm";
import RegistreSupportForm, {
  RegistreSupportDefaultValues,
  RegistreSupportFormProps,
  SUPPORT_DEUX,
  SUPPORT_UN
} from "@widget/formulaire/champRegistreSupport/RegistreSupportForm";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { digitSeulement, traiteCarAutorises } from "@widget/formulaire/utils/ControlesUtil";
import { ComponentFiltreProps, FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

// Noms des champs
const NATURE_ACTE = "natureActe";
const FAMILLE_REGISTRE = "familleRegistre";
const POCOPA = "pocopa";
const ANNEE_REGISTRE = "anneeRegistre";
const REGISTRE_SUPPORT = "registreSupport";
const NUMERO_ACTE = "numeroActe";

// Valeurs par défaut des champs
export const RegistreActeDefaultValues: IRMCRegistre = {
  [NATURE_ACTE]: "",
  [FAMILLE_REGISTRE]: "",
  [ANNEE_REGISTRE]: "",
  [POCOPA]: null, // Pocopa est un objet de type Option ({cle: "", libelle: ""})
  [REGISTRE_SUPPORT]: RegistreSupportDefaultValues,
  [NUMERO_ACTE]: NumeroActeDefaultValues
};

const MIN_LENGTH_ANNEE = 999;

const CHAMPS_VERROUILLES_VALEURS_PAR_DEFAUT = {
  natureActe: false,
  pocopa: false,
  anneeRegistre: false,
  supportUn: false,
  supportDeux: false,
  numeroBisTer: false
};

// Schéma de validation des champs
export const RegistreActeValidationSchema = Yup.object({
  [NATURE_ACTE]: Yup.string(),
  [FAMILLE_REGISTRE]: Yup.string(),
  [ANNEE]: Yup.number().min(MIN_LENGTH_ANNEE, MIN_LENGTH_ANNEE_MESSAGE).max(new Date().getFullYear(), MAX_ANNEE_MESSAGE),
  [NUMERO_ACTE]: NumeroActeValidationSchema
});

export type RegistreActeFiltreProps = ComponentFiltreProps & FormikComponentProps;

const NOMBRE_RESULTAT_MAX = 15;
const RegistreActeFiltre: React.FC<RegistreActeFiltreProps> = props => {
  const [familleRegistre, setFamilleRegistre] = useState<string>("");
  const [champsVerrouilles, setChampsVerrouilles] = useState(CHAMPS_VERROUILLES_VALEURS_PAR_DEFAUT);

  // Namespace champs
  const familleRegistreWithNamespace = withNamespace(props.nomFiltre, FAMILLE_REGISTRE);
  const anneeRegistreAvecNamespace = withNamespace(props.nomFiltre, ANNEE_REGISTRE);
  const pocopaWithNamespace = withNamespace(props.nomFiltre, POCOPA);
  const natureActeAvecNamespace = withNamespace(props.nomFiltre, NATURE_ACTE);
  const numeroActeAvecNamespace = withNamespace(props.nomFiltre, NUMERO_ACTE);
  const registreSupportAvecNamespace = withNamespace(props.nomFiltre, REGISTRE_SUPPORT);

  const registreSupportProps: RegistreSupportFormProps = {
    nomFiltre: registreSupportAvecNamespace,
    estInactifChampSupportUn: champsVerrouilles.supportUn,
    estInactifChampSupportDeux: champsVerrouilles.supportDeux
  };

  const numeroActeProps: NumeroActeFormProps = {
    nomFiltre: numeroActeAvecNamespace,
    estInactifChampNumeroBisTer: champsVerrouilles.numeroBisTer
  };

  // Evennement
  const anneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    traiteCarAutorises(e.target, digitSeulement);
  };

  function onFamilleRegistreChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFamilleRegistre(e.target.value);
    props.formik.handleChange(e);
  }

  // On place ce code dans ce useEffect (et non la fonction onFamilleRegistreChange())
  // afin que les champs se mettent à jour dès que 'familleRegistre' est mis à jour,
  // ce qui survient suite au clic de réinitialisation des champs ou du rappel des critères.

  useEffect(() => {
    const enumTypeFamille = TypeFamille.getEnumFor(familleRegistre);

    const estCPNOuPAC = estTypeFamilleCPNOuPAC(enumTypeFamille);
    const estOP2OuOP3 = estTypeFamilleOP2OuOP3(enumTypeFamille);
    const estACQOuCOLOuVide = estTypeFamilleACQOuCOL(enumTypeFamille) || enumTypeFamille === "";

    // Réinitialiser les champs.
    props.formik.setFieldValue(
      pocopaWithNamespace,
      TypeFamille.estMAR(enumTypeFamille)
        ? {
            cle: "TR-ACTES",
            libelle: "TR-ACTES"
          }
        : null
    );

    if (estCPNOuPAC) {
      props.formik.setFieldValue(natureActeAvecNamespace, "");
      props.formik.setFieldValue(withNamespace(registreSupportAvecNamespace, SUPPORT_UN), "");
      props.formik.setFieldValue(withNamespace(numeroActeAvecNamespace, NUMERO_BIS_TER), "");
    } else if (estOP2OuOP3) {
      props.formik.setFieldValue(anneeRegistreAvecNamespace, "");
    }

    if (!estACQOuCOLOuVide) {
      props.formik.setFieldValue(withNamespace(registreSupportAvecNamespace, SUPPORT_DEUX), "");
    }

    // (Dé)Verrouiller les champs.
    setChampsVerrouilles({
      natureActe: estCPNOuPAC,
      pocopa: estCPNOuPAC || estOP2OuOP3 || TypeFamille.estMAR(enumTypeFamille),
      anneeRegistre: estOP2OuOP3,
      supportUn: estCPNOuPAC,
      supportDeux: !estACQOuCOLOuVide,
      numeroBisTer: estCPNOuPAC
    });

    setFamilleRegistre(props.formik.getFieldProps(familleRegistreWithNamespace).value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familleRegistre]);

  return (
    <Fieldset titre={getLibelle("Filtre registre")}>
      <div className="FormFiltre">
        <SelectField
          name={natureActeAvecNamespace}
          label={getLibelle("Nature de l'acte")}
          options={NatureActe.getAllEnumsAsOptions()}
          disabled={props.filtreInactif || champsVerrouilles.natureActe}
        />
        <SelectField
          name={familleRegistreWithNamespace}
          label={getLibelle("Famille de registre")}
          options={TypeFamille.getAllEnumsAsOptions()}
          disabled={props.filtreInactif}
          onChange={onFamilleRegistreChange}
        />
        <RecherchePocopas
          nom={pocopaWithNamespace}
          label={"Type / Poste / Commune / Pays"}
          nombreResultatsMax={NOMBRE_RESULTAT_MAX}
          familleRegistre={familleRegistre}
          estOuvert={undefined}
          disabled={champsVerrouilles.pocopa}
          optionsValidesNonAffichees={[{ cle: "TR-ACTES", libelle: "TR-ACTES" }]}
        />
        <InputField
          name={anneeRegistreAvecNamespace}
          label={getLibelle("Année")}
          ariaLabel={`${props.nomFiltre}.annee`}
          maxLength="4"
          onInput={anneeChange}
          disabled={props.filtreInactif || champsVerrouilles.anneeRegistre}
        />
        <RegistreSupportForm {...registreSupportProps} />
        <NumeroActeForm {...numeroActeProps} />
      </div>
    </Fieldset>
  );
};

export default connect(RegistreActeFiltre);

function estTypeFamilleCPNOuPAC(familleRegistre: TypeFamille): boolean {
  return TypeFamille.estCPN(familleRegistre) || TypeFamille.estPAC(familleRegistre);
}

function estTypeFamilleOP2OuOP3(familleRegistre: TypeFamille): boolean {
  return TypeFamille.estOP2(familleRegistre) || TypeFamille.estOP3(familleRegistre);
}

function estTypeFamilleACQOuCOL(familleRegistre: TypeFamille): boolean {
  return TypeFamille.estACQ(familleRegistre) || TypeFamille.estCOL(familleRegistre);
}

export function registreFormEstModifie(valeurs: IRMCRegistre) {
  return (
    valeurs.familleRegistre !== "" ||
    valeurs.natureActe !== "" ||
    valeurs.anneeRegistre !== "" ||
    valeurs.numeroActe?.numeroActeOuOrdre !== "" ||
    valeurs.numeroActe?.numeroBisTer !== "" ||
    valeurs.registreSupport?.supportUn !== "" ||
    valeurs.registreSupport?.supportDeux !== "" ||
    valeurs.pocopa !== null
  );
}
